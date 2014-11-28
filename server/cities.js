Meteor.publish('Cities', function() {
  return Cities.find();
})
