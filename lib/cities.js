Cities = new Meteor.Collection('Cities');

Meteor.methods({
  addCity: function(name) {
    Cities.insert({
      name: name,
      slug: URLify2(name),
      concerts: null
    });
  }
});
