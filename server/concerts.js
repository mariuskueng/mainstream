Meteor.publish('Concerts', function() {
  return Concerts.find();
});

Meteor.methods({

  loadConcerts: function() {
    Concerts.remove({});
    var data = Meteor.http.call("GET", "http://www.kimonolabs.com/api/9pcb6qu6?apikey=94174d4d6c775c2eb6154db4ab889563");
    Meteor.call("loadConcertData", data);
  },

  loadConcertData: function(data) {
    var concertData = "";
    var parseOffset = 3;
    var concerts = JSON.parse(data.content).results.konzerte;

    // convert all text to a string and omit the last 3 lines
    for (var i = 0; i < concerts.length - parseOffset; i++) {
        concertData += "\n" + concerts[i].data.text;
    }

    // separate each line into array item
    concertData = concertData.split("\n");

    //parse the data
    Meteor.call("parseConcertData", concertData);
  },

  parseConcertData: function(concertData) {
    var substringIndex = 0;
    var currentDate = Meteor.call("getCurrentDate");
    var currentYear = currentDate.getFullYear();

    for (var i = 0; i < concertData.length; i++) {

      // remove whitespaces
      concertData[i] = concertData[i].trim();

      // if it's empty skip to the next
      if (!concertData[i]) continue;

      var date;
      var endDate;
      var dateRange = concertData[i].substring(0, 11);
      var artist;
      var venue = "";
      var city;
      var isFestival = false;

      // the dates for festivals have a - in it
      // each date has a certain length. this get's stored in the substringIndex

      if (dateRange.indexOf("–") > -1) { // is festival
        substringIndex = 11;

        date = concertData[i].substring(0, substringIndex);
        endDate = date.split("– ")[1].split(".")[0];
        date = new Date(currentDate.getFullYear(), parseInt(date.split(".")[1]) - 1, parseInt(date.split(".")[0]));
        endDate = new Date(date.getFullYear(), date.getMonth(), endDate);

        venue = concertData[i].split("mit");
        venue = venue[0].substring(substringIndex, venue[0].length).trim();
        artist = concertData[i].substring(date.length + venue.length + 1, concertData[i].length).replace("mit ", "");
        city = concertData[i];
        isFestival = true;

      } else { // is single concert
        substringIndex = 5;

        date = concertData[i].substring(0, substringIndex);
        var dateCopy = date;
        date = new Date(currentDate.getFullYear(), parseInt(dateCopy.split(".")[1]) - 1, parseInt(dateCopy.split(".")[0]));
        artist = concertData[i].substring(substringIndex + 1, concertData[i].length).split(",")[0];

        // if the location name has more than one word
        var location = concertData[i].substring(substringIndex + 1, concertData[i].length).split(",");
        if (location.length > 1) {
          location = location[1].split(" ");
        }

        // Put the name together to one string
        for (var j = 1; j < location.length - 1; j++) {
          venue += " " + location[j];
        }

        // city get's set in the city constructor
        city = concertData[i];
      }


      // adjust concert date year
      // if current month is smaller than the one before eg. january (1) and december (12)
      // and the adjusted year isn't bigger than the current year + 1 then

      if (date.getMonth() < currentDate.getMonth()) { // jan < dec
        date.setYear(date.getFullYear() + 1);
      }

      if (date >= currentDate || endDate >= currentDate) {
        Meteor.call("addConcert", date, endDate, artist, venue, city, isFestival);
      }

      // reset the venue name
      venue = "";
    }
  },

  getCurrentDate: function(){
      // reset time to check todays concerts
      var currentDate = new Date();
      // remove Minutes & Seconds (concerts only have a date)
      currentDate = currentDate.setHours(0);
      currentDate = new Date(currentDate).setMinutes(0);
      currentDate = new Date(currentDate).setSeconds(0);
      currentDate = new Date(currentDate).setMilliseconds(0);
      currentDate = new Date(currentDate);
      return currentDate;
  }

});
