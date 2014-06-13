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
Concert.prototype.render = function(){
    return "";
};

function Venue(v) {
    this.venue = v;

    if ($.inArray(this.venue, venues) === -1) {
        venues.push(this.venue);
    }
}

function City(c) {
    this.city = c;

    if ($.inArray(this.city, cities) === -1) {
        cities.push(this.city);
    }
}

function loadConcertData(data) {
    // get all contents as node objects
    var concertData = data.find("#content p");

    // concertData = concertData.pop(concertData.lastIndexOf);
    var concertDataText = "";

    // convert content to string
    for (var i = 0; i < concertData.length - 3; i++) {
        if (i > 0) {
            concertDataText += "<br>\n";
        }
        concertDataText += concertData[i].innerHTML;
    };

    // remove html line breaks
    var re = new RegExp("<br>", 'g');
    concertDataText = concertDataText.replace(re, '');

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
    data.remove();
    // renderConcerts(concertNode, concerts);
    renderCities();
}

function renderConcerts(element, list) {
    element.empty();
    for (var i = 0; i < list.length; i++) {
        element.append("<p>" + list[i].date + ": " + list[i].artist + ", " + list[i].venue.venue + ", " + list[i].city.city + "</p>");
    };
}

function renderCities() {
    cities.sort();
    for (var i = 0; i < cities.length; i++) {
        $('#cities').append("<a href=#"+cities[i]+" class='city-filter'>"+cities[i]+"</a>");
    }

    $('.city-filter').on('click', function(){
        var city = $(this).text();
        renderConcerts($("#concerts"), getConcertsCityQuery(city));
    })
}

function getConcertsCityQuery(city) {
    var query = [];
    for (var i = 0; i < concerts.length; i++) {
        if (concerts[i].city.city === city) {
            query.push(concerts[i]);
        }
    }
    return query;
}

$(document).ready(function(){
    concertNode = $("#concerts");
    loadConcertData($("#data"));

    // concertNode.html("");
    // $.get("http://mainstream.radiox.ch/konzerte", function(data){
    //     loadConcertData($(data));
    // });

});
