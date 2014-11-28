Meteor.publish('Venues', function() {
  return Venues.find();
})