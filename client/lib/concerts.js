Meteor.subscribe('Concerts');

Template.concerts.helpers({
    concerts: function() {
        return Concerts.find({}, {sort: [['date', 'asc']]});
    }
})
