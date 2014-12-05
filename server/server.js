Meteor.startup(function () {

  if (Cities.find().count() === 0) {

    var cities = [
      "Aarau",
      "Basel",
      "Bern",
      "Chiasso",
      "Chur",
      "Cully",
      "Crans-Près-Céligny",
      "Düdingen",
      "Feldkirch",
      "Frauenfeld",
      "Freiburg i. b.",
      "Fribourg",
      "St. Gallen",
      "Genf",
      "Horgen",
      "Langenthal",
      "Lausanne",
      "Le Locle",
      "Lugano",
      "Luzern",
      "Lörrach",
      "Martigny",
      "Monthey",
      "Montreux",
      "Münchenstein",
      "Neuchâtel",
      "Nyon",
      "Olten",
      "Pratteln",
      "Rorschach",
      "Brugg",
      "Schaffhausen",
      "Sion",
      "Solothurn",
      "Strasbourg",
      "Thun",
      "Vevey",
      "Winterthur",
      "Wohlen",
      "Yverdon",
      "Zug",
      "Zürich" ,
      "Riehen",
      "Belfort",
      "Zofingen",
      "Wetzikon",
      "Colmar",
      "Wil",
      "Muri",
      "Pully",
      "Orpund",
      "Eggersriet",
      "Begnins",
      "Mulhouse"
    ];

    _.each(cities, function(city) {
      Meteor.call("addCity", city);
    });

  }

  if (Concerts.find().count() === 0) {
    Meteor.call("loadConcerts");
  }

});
