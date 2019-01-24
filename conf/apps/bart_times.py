import appdaemon.plugins.hass.hassapi as hass
import ast

class BartTimes(hass.Hass):

  def initialize(self):
    bart_times_entity = self.args["bart_times_entity"]
    #self.includeDepartureTime = self.args["include_departure_time"]
    self.listen_state(self.format_time, bart_times_entity)


  def format_time(self, entity, attribute, old, new, kwargs):
    travel_time = int(self.args["expected_travel_time"])
    display_entity = self.args["display_entity"]

    if old:
      blah = ast.literal_eval(old)
    else:
      return
      
    next_catchable_train_if_parking_at_bart = next(x for x in blah if x > travel_time)
    leave_in = next_catchable_train_if_parking_at_bart - travel_time
    self.set_state(display_entity, state = leave_in)

  def debug_message(self, message):
    if int(self.args["DEBUG"]) == 1:
      self.log(message)
