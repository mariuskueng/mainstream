Concerts = new Meteor.Collection('Concerts');

Meteor.methods({
  addConcert: function(d, e, a, v, c, f) {
    var venue = Venues.findOne({"slug" : URLify2(v)});
    var city;

    Cities.find().forEach(function (obj) {
      if (c.indexOf(obj.slug) > 1) {
        city = obj;
      }
    });

    if (!venue) {
      Venues.insert({name: v});
      venue = Venues.findOne({"slug" : URLify2(v)});
    }

    Concerts.insert({
      date: d,
      endDate: e,
      artist: a,
      venue: venue,
      city: city,
      isFestival: f
    });
  }
});
