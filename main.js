var concerts = [];
var venues = [];
var cities = [];
var concertNode;

// Concert class
function Concert(d, a, v, c) {
    this.date = d;
    this.artist = a;
    this.venue = new Venue(v);
    this.city = new City(c);
    console.log(this.city);
}

function Venue(v) {
    this.venue = v;
}

function City(c) {
    this.city = c;
    console.log(this.city);
    if (!$.inArray(this.city, cities)) {
        cities.push(this.city);
    }
}

function loadConcertData(data) {
    var concertData = data.find("#content p");

    // get all contents as node objects

    // concertData = concertData.pop(concertData.lastIndexOf);
    var concertDataText = "";
    var re = new RegExp("<br>", 'g');

    // convert content to string
    for (var i = 0; i < concertData.length - 3; i++) {
        concertDataText += concertData[i].innerHTML;
    };

    // remove html line breaks
    concertDataText = concertDataText.replace(re, '')

    // separate each line into array item
    concertData = concertDataText.split("\n");

    var substringIndex = 0;

    for (var i = 0; i < concertData.length; i++) {
        var date;
        var dateRange = concertData[i].substring(0, 11);
        var artist;
        var venue;
        var city;

        if (dateRange.indexOf("–") > -1) { // is festival
            substringIndex = 11;
            date = concertData[i].substring(0, substringIndex);
            venue = concertData[i].split("mit");
            venue = venue[0].substring(substringIndex, venue[0].length)
            artist = concertData[i].substring(date.length + venue.length, concertData[i].length).replace("mit ", "");
        } else { // is single concert
            substringIndex = 5;
            date = concertData[i].substring(0, substringIndex);
            artist = concertData[i].substring(substringIndex + 1, concertData[i].length).split(",")[0];
            venue = concertData[i].substring(substringIndex + 1, concertData[i].length).split(",")[1].split("\n")[0];
            city = venue.split(" ");
            city = city[city.length - 1];
        }

        artist = artist.trim();
        venue = venue.trim();

        var concert = new Concert(date, artist, venue, city);

        concerts.push(concert);
    };

    renderConcerts();
}

function renderConcerts() {
    for (var i = 0; i < concerts.length; i++) {
        concertNode.append("<p>" + concerts[i].date + ": " + concerts[i].artist + ", " + concerts[i].venue.venue + "</p>");
    };
}

$(document).ready(function(){
    concertNode = $("#concerts");

    concertNode.html("");
    $.get("http://mainstream.radiox.ch/konzerte", function(data){
        loadConcertData($(data));
    });

});
