import appdaemon.appapi as appapi

class TestApp(appapi.AppDaemon):

  def initialize(self):
    self.listen_state(self.motion, "sensor.aeotech_multisensor_6_burglar", new = "-1")
    self.listen_state(self.no_motion, "sensor.aeotech_multisensor_6_burglar", new = "-1")
    #self.listen_state(self.motion, "input_boolean.tv_on", new = "on")

  def motion(self, entity, attribute, old, new, kwargs):
    self.turn_on("light.nightstand")

  def no_motion(self, entity, attribute, old, new, kwargs):
    self.turn_off("light.nightstand")
