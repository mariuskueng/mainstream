Meteor.subscribe('Cities');

Template.cities.helpers({
    cities: function() {
        return Cities.find({}, {sort: [['name', 'asc']]});
    }
})
