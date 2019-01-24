import appdaemon.plugins.hass.hassapi as hass

FORCEABLY_CHANGED = 'CHROMECAST_FORCEABLY_CHANGED'
VIDEO_FINISHED = 'CHROMECAST_VIDEO_FINISHED'
FORCE_CHANGE_FINISHED = 'CHROMECAST_CHANGER_FINISHED'

class ChromecastVideoAnnouncer(hass.Hass):
  def initialize(self):
    self.start_state_listeners()
    self.start_event_listeners()
  
  def start_event_listeners(self):
    self.force_change_listener = self.listen_event(self.listen_to_chromecast, FORCEABLY_CHANGED)
    self.video_finished_listener = self.listen_event(self.stop_listening_to_chromecast, VIDEO_FINISHED)
    self.totally_finished_listener = self.listen_event(self.finished, FORCE_CHANGE_FINISHED)

  def start_state_listeners(self):
    self.chromecast_url_listener = self.listen_state(self.announce_change, 'input_text.chromecast_url')
  
  def cancel_state_listeners(self):
    self.cancel_listen_state(self.chromecast_url_listener)
  
  def announce_change(self, entity, attribute, old, new, kwargs):
    self.debug_message('Chromecast is being forced on! Firing event: ' + FORCEABLY_CHANGED)
    self.cancel_state_listeners()
    self.fire_event(FORCEABLY_CHANGED)
  
  def listen_to_chromecast(self, event_id, payload_event, *args):
    self.debug_message('Listening to chromecast...')
    self.handle = self.listen_state(self.wait_for_finished, 'media_player.livingroomcast', duration=2)
  
  def wait_for_finished(self, entity, attribute, old, new, kwargs):
    self.debug_message('Waiting for video to finish...')
    cc_state = self.get_state('media_player.livingroomcast')
    if cc_state != 'idle':
      return
    self.fire_event(VIDEO_FINISHED)
  
  def stop_listening_to_chromecast(self, event_id, payload_event, *args):
    self.debug_message('Video finished. No longer listening to chromecast...')
    self.cancel_listen_state(self.handle)
    self.fire_event(FORCE_CHANGE_FINISHED)
  
  def finished(self, event_id, payload_event, *args):
    self.start_state_listeners()
    self.debug_message('Force changer totally done now.')
    
  def debug_message(self, message):
    if int(self.args["DEBUG"]) == 1:
      self.log(message)
