import appdaemon.plugins.hass.hassapi as hass
import ast
import json
import re

FORCE_CHANGE_FINISHED = 'CHROMECAST_CHANGER_FINISHED'
FORCEABLY_CHANGED = 'CHROMECAST_FORCEABLY_CHANGED'

class MediaPlayerStateRestorer(hass.Hass):

  def initialize(self):
    self.debug_message('===================================================')
    self.debug_message('////// Initializing Media Player Restorer /////////')
    self.debug_message('===================================================')

    self.current_chromecast_state = self.get_chromecast_state()
    self.previous_chromecast_state = self.current_chromecast_state
    self.temp_current = self.get_state(entity='media_player.livingroomcast', attribute='all')
    self.temp_prev = self.temp_current
    self.should_save = True

    self.listen_state(self.save_media_state, entity='media_player.livingroomcast')
    self.listen_event(self.turn_off_saving, FORCEABLY_CHANGED)
    self.listen_event(self.restore_media_state, FORCE_CHANGE_FINISHED)

  def turn_off_saving(self, event_id, payload_event, *args):
    self.should_save = False
  
  def save_media_state(self, entity, attribute, old, new, kwargs):
    if self.should_save is False:
      self.debug_message('Chromecast change detected, but saving has been turned off')
      return
    
    self.debug_message('===================================================')
    self.debug_message('///////// Chromecast state is changing ////////////')
    self.debug_message('===================================================')
    self.debug_message('-----DIFF----')
    
    self.temp_prev = self.temp_current
    self.temp_current = self.get_state(entity='media_player.livingroomcast', attribute='all')
    diff_attr = self.get_state_diff(self.temp_prev['attributes'], self.temp_current['attributes'])
    diff_state = self.temp_current['state'] if self.temp_current['state'] != self.temp_prev['state'] else '[]'
    if diff_attr or diff_state:
      self.debug_message(diff_state + ', ' + json.dumps(diff_attr))

    # self.current_harmony_hub_state = self.get_harmony_state() 
    self.current_chromecast_state = self.get_chromecast_state()

    if self.did_chromecast_change(self.previous_chromecast_state, self.current_chromecast_state) is False:
      self.debug_message('Not enough change detected to store previous state')
      return
    
    # Conditions have changed enough that we should save previous state
    self.previous_chromecast_state = self.current_chromecast_state

  def restore_media_state(self, event_id, payload_event, *args):
    self.debug_message('Forced video change is finished. Restoring previous media state to: ' + json.dumps(self.previous_chromecast_state))
    self.restore_chromecast_state(self.previous_chromecast_state)
    self.should_save = True
    # current_harmony_hub_state is no longer valid. Save as previous
    # if self.previous_harmony_hub_state is '':
    #   return
    
    # self.restore_harmony_state(self.previous_harmony_hub_state)
    # self.restore_chromecast_state(self.previous_chromecast_state)

    # self.debug_message("Attempted to restore state to: " + json.dumps(self.current_harmony_hub_state))

  # def restore_harmony_state(self, state):
    
    # if (state is '' or state is None):
    #   return
    
    # prev_state = state['state']
    # prev_attr = state['attributes']
    
    # if prev_state is '' or prev_attr is '':
    #   return

    # if prev_state == 'off':
    #   self.call_service('remote/turn_off', entity_id='remote.harmony_hub')
    #   return
    # elif prev_state == 'on':
    #   self.call_service('remote/turn_on', entity_id='remote.harmony_hub', activity=prev_attr['current_activity'])

  def restore_chromecast_state(self, cc_state):
    state = cc_state['state']
    media_content_id = cc_state['media_content_id']
    media_position = cc_state['media_position']
    youtube_content_type = 'video/youtube'

    if state == 'off':
        self.call_service('media_player/turn_off', entity_id='media_player.livingroomcast')
    elif  (
            state == 'on' or
            state == 'idle'
          ):
          self.call_service('media_player/turn_on', entity_id='media_player.livingroomcast')
    else:
      self.call_service('media_extractor/play_media', entity_id='media_player.livingroomcast', media_content_id=media_content_id, media_content_type=youtube_content_type)
      self.call_service('media_player/media_seek', entity_id='media_player.livingroomcast', seek_position=media_position)
      if state == 'paused':
        self.call_service('media_player/media_pause', entity_id='media_player.livingroomcast')

  def get_harmony_state(self):
    return self.get_state(entity='remote.harmony_hub', attribute='all')

  def get_chromecast_state(self):
    temp_state = self.get_state(entity='media_player.livingroomcast', attribute='all')
    rtn_state = self.reduce_state_obj(temp_state)
    self.debug_message('Received chromecast state and reduced it to: ' + json.dumps(rtn_state))
    return rtn_state

  def get_state_diff(self, prev_state, new_state):
    value = { k : new_state[k] for k in set(new_state) - set(prev_state) }
    return value
  
  def did_chromecast_change(self, prev_cc_state, new_cc_state):
    try:
      diff = self.get_state_diff(prev_cc_state, new_cc_state)
      return  (
                (
                  prev_cc_state['state'] != new_cc_state['state'] or
                  prev_cc_state['attributes']['media_position'] != new_cc_state['attributes']['media_position'] or
                  prev_cc_state['media_content_id'] != new_cc_state['media_content_id']
                ) and
                new_cc_state['media_content_id'] is not ''
              )
    except (KeyError, TypeError) as err:
      #self.debug_message("Critical comparison key missing key in dictionary: " + str(err))
      return False
  
  def get_state_digest(self, prev_cc_state, new_cc_state):
    prev_state_str = self.reduce_state_obj(prev_cc_state)
    new_state_str = self.reduce_state_obj(new_cc_state)
    self.debug_message('IN DIGEST: ' + json.dumps(prev_state_str))
    rtn = '\n'
    rtn += "  PREVIOUS: " + prev_state_str['state'] + " " + prev_state_str['media_content_id'] + " " + str(prev_state_str['media_position']) + "\n"
    rtn += "  CURRENT: " + new_state_str['state'] + " " + new_state_str['media_content_id'] + " " + str(new_state_str['media_position']) + " "
    rtn += '\n'

    self.debug_message(rtn)
    return rtn

  def reduce_state_obj(self, state):
    media_content_id = 'none'
    signature = 'none'
    media_position = -1

    if 'attributes' in state:
      #self.debug_message('MEDIA POSITION: ' + json.dumps(state['attributes']))
      media_content_id = state['attributes']['media_content_id'] if 'media_content_id' in state['attributes'] else 'none'
      signature = self.get_video_signature(media_content_id)
      media_position = state['attributes']['media_position'] if 'media_position' in state['attributes'] else -1

    reduced_state = self.make_reduced_state_obj(
      state['state'] if state['state'] else 'unknown',
      media_content_id,
      signature,
      media_position
    )

    return reduced_state

  def make_reduced_state_obj(self, state, media_content_id, media_content_id_signature, media_position):
    return {
      "state": state,
      "media_content_id": media_content_id,
      "media_content_id_signature": media_content_id_signature,
      "media_position": media_position
    }
  
  def debug_message(self, message):
    if int(self.args["DEBUG"]) == 1:
      self.log(message)

  def get_video_signature(self, media_content_id):
    found = ''
    try:
      short_id = re.search('signature=([^&]+)&', media_content_id)
      if short_id:
        found = short_id.group(1)[:10]
    except:
      found = 'none'
    
    return found