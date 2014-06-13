var concerts = [];
var venues = [];
var cities = [];
var concertNode;

// Concert class
function Concert(d, a, v, c, f) {
    this.date = d;
    this.artist = a;
    this.venue = new Venue(v);
    this.city = new City(c);
    this.isFestival = f;
}

function Venue(v) {
    this.venue = v;
}

function City(c) {
    this.city = c;
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
        concertData[i] = concertData[i].trim();

        var date;
        var dateRange = concertData[i].substring(0, 11);
        var artist;
        var venue = "";
        var city;
        var isFestival = false;

        if (dateRange.indexOf("–") > -1) { // is festival
            substringIndex = 11;
            date = concertData[i].substring(0, substringIndex);
            venue = concertData[i].split("mit");
            venue = venue[0].substring(substringIndex, venue[0].length)
            artist = concertData[i].substring(date.length + venue.length, concertData[i].length).replace("mit ", "");
            isFestival = true;
        } else { // is single concert
            substringIndex = 5;
            date = concertData[i].substring(0, substringIndex);
            artist = concertData[i].substring(substringIndex + 1, concertData[i].length).split(",")[0];
            var location = concertData[i].substring(substringIndex + 1, concertData[i].length).split(",")[1].split(" ");

            for (var j = 1; j < location.length - 1; j++) {
                venue += " " + location[j];
            }
            city = location[location.length - 1];
        }

        concerts.push(new Concert(date, artist, venue, city, isFestival));
        venue = "";
    };

    renderConcerts(concertNode);
}

function renderConcerts(element) {
    for (var i = 0; i < concerts.length; i++) {
        element.append("<p>" + concerts[i].date + ": " + concerts[i].artist + ", " + concerts[i].venue.venue + ", " + concerts[i].city.city + "</p>");
    };
}

$(document).ready(function(){
    concertNode = $("#concerts");
    loadConcertData($("#data"));

    // concertNode.html("");
    // $.get("http://mainstream.radiox.ch/konzerte", function(data){
    //     loadConcertData($(data));
    // });

});
