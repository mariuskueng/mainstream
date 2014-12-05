Meteor.subscribe('Concerts');

Template.concerts.helpers({
    concerts: function() {
        return Concerts.find({}, {sort: [['date', 'asc']]});
    }
});

Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).format("DD.M.");
});
