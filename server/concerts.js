Meteor.publish('Concerts', function() {
  return Concerts.find();
})