var urlCityHash = "";
var concerts = [];
var venues = [];
var concertNode;
var cities = {
    "aarau": [],
    "basel": [],
    "bern": [],
    "chiasso": [],
    "chur": [],
    "crans-près-céligny": [],
    "düdingen": [],
    "feldkirch": [],
    "frauenfeld": [],
    "freiburg i. b.": [],
    "fribourg": [],
    "st. gallen": [],
    "genf": [],
    "horgen": [],
    "langenthal": [],
    "lausanne": [],
    "le locle": [],
    "lugano": [],
    "luzern": [],
    "lörrach": [],
    "martigny": [],
    "monthey": [],
    "montreux": [],
    "münchenstein": [],
    "neuchâtel": [],
    "nyon": [],
    "olten": [],
    "pratteln": [],
    "rorschach": [],
    "brugg": [],
    "schaffhausen": [],
    "sion": [],
    "solothurn": [],
    "strasbourg": [],
    "thun": [],
    "vevey": [],
    "winterthur": [],
    "wohlen": [],
    "yverdon": [],
    "zug": [],
    "zürich" : []
};

var monthNumbers = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
];

// Concert class
function Concert(d, a, v, c, f) {
    this.date = d;
    this.endDate = null;
    this.artist = a;
    this.venue = new Venue(v);
    this.city = new City(c);
    this.isFestival = f;

    if (!this.isFestival) {
        this.date = new Date(0, parseInt(d.split(".")[1]) - 1, parseInt(d.split(".")[0]));
    } else {
        var startDay = this.date.split('.')[0];
        var endDay = this.date.split("– ")[1].split(".")[0];
        var month = this.date.split("– ")[1].split(".")[1];
        this.date = new Date(0, month, startDay);
        this.endDate = new Date(0, month, endDay)
    }
}

Concert.prototype.render = function() {
    return "";
};

Concert.prototype.getDate = function() {
    if (this.isFestival) {
        return this.date.getDate() + ". – " + this.endDate.getDate() + "." + monthNumbers[this.date.getMonth()];
    }
    return this.date.getDate() + "." + monthNumbers[this.date.getMonth()];
};

function Venue(v) {
    this.venue = v;

    if ($.inArray(this.venue, venues) === -1) {
        venues.push(this.venue);
    }
}

function City(c) {
    this.concertText = c;
    this.city = null;

    for (var city in cities) {
        if (this.concertText.indexOf(city) > 1) {
            this.city = city;
        }
    }
}

function loadConcertData(data) {
    // separate each line into array item
    var concertData = data.split("\n");

    parseConcertData(concertData);
}

function parseConcertData(concertData) {
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
            venue = venue[0].substring(substringIndex, venue[0].length).trim();
            artist = concertData[i].substring(date.length + venue.length, concertData[i].length).replace("mit ", "");
            city = concertData[i];
            isFestival = true;
        } else { // is single concert
            substringIndex = 5;
            date = concertData[i].substring(0, substringIndex);
            artist = concertData[i].substring(substringIndex + 1, concertData[i].length).split(",")[0];
            var location = concertData[i].substring(substringIndex + 1, concertData[i].length).split(",")[1].split(" ");

            for (var j = 1; j < location.length - 1; j++) {
                venue += " " + location[j];
            }
            city = concertData[i];
        }

        var concert = new Concert(date, artist, venue, city, isFestival);

        if (cities[concert.city.city]) {
            cities[concert.city.city].push(concert);
        }
        concerts.push(concert);

        venue = "";
    }
}

function renderConcerts(list) {
    var element = $("#concerts");
    element.empty();
    for (var i = 0; i < list.length; i++) {
        element.append("<p>" + list[i].getDate() + ": <strong>" + list[i].artist + "</strong>, " + list[i].venue.venue + ", " + list[i].city.city + "</p>");
    };
}

function renderCities() {
    var sortedCities = [];
    for(var key in cities) {
        if (cities[key].length) { // only show cities which have concerts
            sortedCities[sortedCities.length] = key;
        }
    }
    sortedCities.sort();

    for (var i = 0; i < sortedCities.length; i++) {
        $('#cities ul').append("<li><a href=#"+sortedCities[i]+">"+sortedCities[i]+"</a></li>");
    }

    $('#cities li a').on('click', function(){
        var city = $(this).text();
        renderConcerts(getConcertsCityQuery(city));
        setActiveCity(city);
    })
}

function getConcertsCityQuery(city) {
    if(city === "alle") {
        return concerts;
    } else {
        return cities[city];
    }
}

function setActiveCity(city) {
    var cities = $('#cities li a');
    cities.css("font-weight", "lighter");

    for (var i = 0; i < cities.length; i++) {
        if (city === $(cities[i]).text()) {
            $(cities[i]).css("font-weight", "bold");
        }
    };
}

function setLastModifiedText(text) {
    var text = text.trim().replace("»", "");
    $(".last-modified").text("Daten zuletzt " + text);
}

function renderFromCityHash() {
    var city = decodeURIComponent(urlCityHash);
    renderConcerts(getConcertsCityQuery(city));
    setActiveCity(city);
}

function kimonoCallback(data) {
    init(data);
}

function init(data) {
    var concertData = "";
    for (var i = 0; i < data.results.konzerte.length - 3; i++) {
        concertData += data.results.konzerte[i].data.text
    }
    loadConcertData(concertData);
    renderCities();
    setLastModifiedText(data.results.konzerte[data.results.konzerte.length - 1].data.text);

    if (urlCityHash) {
        renderFromCityHash();
    }
}

$(document).ready(function(){
    $("#concerts").empty();
    $.ajax({
        "url":"http://www.kimonolabs.com/api/9pcb6qu6?apikey=94174d4d6c775c2eb6154db4ab889563&callback=kimonoCallback",
        "crossDomain":true,
        "dataType":"jsonp"
    });
    urlCityHash = document.location.hash.split("#")[1];
});
