Meteor.publish('Artists', function() {
  return Artists.find();
})