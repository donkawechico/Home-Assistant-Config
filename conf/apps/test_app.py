import appdaemon.plugins.hass.hassapi as hass

class TestApp(hass.Hass):

  def initialize(self):
    self.listen_state(self.do_something, entity='media_player.livingroomcast')
    #self.listen_state(self.do_something, 'media_player.livingroomcast')

  def do_something(self, entity, attribute, old, new, kwargs):
    self.log('old: ' + old)
