Venues = new Meteor.Collection('Venues');

Meteor.methods({
  addVenue: function(name) {
    Venues.insert({
      name: name,
      slug: URLify2(name)
    });
  }
});
