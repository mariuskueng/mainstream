// App Mainstream
var MAINSTREAM = {

    // globals
    urlCityHash: "",
    concertNode: null,
    cityTypoLookUp: {
        "el lokal" : "zürich",
        "luzeern": "luzern",
        "gurten": "bern"
    },
    currentDate: null,
    monthNumbers: [
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
    ],

    cities: {
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
        "zürich" : [],
        "riehen": [],
        "belfort": [],
        "zofingen": [],
        "wetzikon": [],
        "colmar": [],
        "wil": [],
        "muri": [],
        "pully": [],
        "orpund": [],
        "eggersriet": [],
        "begnins": [],
        "mulhouse": []
    },

    // collections
    concerts: [],
    venues: [],

    // methods
    init: function(data){
        console.log("init MAINSTREAM");
        MAINSTREAM.setCurrentDate();

        MAINSTREAM.loadConcertData(data);
        MAINSTREAM.renderCities();
        MAINSTREAM.setLastModifiedText(data.results.konzerte[data.results.konzerte.length - 1].data);

        if (MAINSTREAM.urlCityHash) {
            MAINSTREAM.renderFromCityHash();
        } else {
            MAINSTREAM.renderConcerts(MAINSTREAM.getConcertsCityQuery("alle"));
        }

        // Render the date picker
        var $input = $('.datepicker').pickadate({
            min:true,
            max:MAINSTREAM.concerts[MAINSTREAM.concerts.length - 1].date
        });
        var picker = $input.pickadate('picker');
        var pickedDate;
        picker.on('close', function(){
            pickedDate = new Date(picker.component.item.select.pick);
            concertsOnDate = [];
            for (var i = 0; i < MAINSTREAM.concerts.length; i++) {
                if (pickedDate - MAINSTREAM.concerts[i].date === 0) {
                    concertsOnDate.push(MAINSTREAM.concerts[i]);
                }
            }
            MAINSTREAM.renderConcerts(concertsOnDate);
        });
    },

    setCurrentDate: function (){
        // reset time to check todays concerts
        this.currentDate = new Date();
        // remove Minutes & Seconds (concerts only have a date)
        this.currentDate = this.currentDate.setHours(0);
        this.currentDate = new Date(this.currentDate).setMinutes(0);
        this.currentDate = new Date(this.currentDate).setSeconds(0);
        this.currentDate = new Date(this.currentDate).setMilliseconds(0);
        this.currentDate = new Date(this.currentDate);
    },

    loadConcertData: function(data) {
        var concertData = "";

        // convert all text to a string and omit the last 3 lines
        for (var i = 0; i < data.results.konzerte.length - 3; i++) {
            concertData += "\n" + data.results.konzerte[i].data;
        }

        // separate each line into array item
        concertData = concertData.split("\n");

        //parse the data
        MAINSTREAM.parseConcertData(concertData);
    },

    parseConcertData: function(concertData) {
        var substringIndex = 0;

        for (var i = 0; i < concertData.length; i++) {

            // remove whitespaces
            concertData[i] = concertData[i].trim();

            // if it's empty skip to the next
            if (!concertData[i]) continue;

            var date;
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
                venue = concertData[i].split("mit");
                venue = venue[0].substring(substringIndex, venue[0].length).trim();
                artist = concertData[i].substring(date.length + venue.length + 1, concertData[i].length).replace("mit ", "");
                city = concertData[i];
                isFestival = true;

            } else { // is single concert
                substringIndex = 5;
                date = concertData[i].substring(0, substringIndex);
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

            var concert = new Concert(date, artist, venue, city, isFestival);

            // Only store the concert if it's not in the past
            // TODO: check the date at the beginning of the loop and pass all the stuff down here
            if (concert.date >= MAINSTREAM.currentDate || concert.endDate >= MAINSTREAM.currentDate) {
                if (MAINSTREAM.cities[concert.city.city]) {
                    MAINSTREAM.cities[concert.city.city].push(concert);
                }
                MAINSTREAM.concerts.push(concert);
            }

            // reset the venue name
            venue = "";
        }
    },

    renderConcerts: function(list) {
        var element = $("#concerts");
        var lastDate = null;
        element.empty();
        for (var i = 0; i < list.length; i++) {
            if (list[i].getDate() != lastDate) {
                element.append("<p class='date-separator'>" + list[i].getDate() + "</p>");
            }
            if (list[i].isFestival) {
                element.append("<p>"+ list[i].getDate() + "<strong>" + list[i].artist + "</strong>, " + list[i].venue.venue + ", " + list[i].city.city + "</p>");
            } else {
                element.append("<p><strong>" + list[i].artist + "</strong>, " + list[i].venue.venue + ", " + list[i].city.city + "</p>");
            }
            lastDate = list[i].getDate();
        }
    },

    renderCities: function() {
        // sort the city by name
        var sortedCities = [];
        for(var key in MAINSTREAM.cities) {
            if (MAINSTREAM.cities[key].length) { // only show cities which have concerts
                sortedCities[sortedCities.length] = key;
            }
        }
        sortedCities.sort();

        // render cities
        for (var i = 0; i < sortedCities.length; i++) {
            $('#cities ul').append("<li><a href=#"+sortedCities[i]+">"+sortedCities[i]+"</a></li>");
            $('.city-select').append("<option value='"+sortedCities[i]+"' >"+sortedCities[i]+"</option>");
        }

        // init jQuery events
        $('#cities li a').on('click', function(){
            var city = $(this).text();
            MAINSTREAM.renderConcerts(MAINSTREAM.getConcertsCityQuery(city));
            MAINSTREAM.setActiveCity(city);
        });

        $('.city-select').on('change', function() {
            var city = $(this).val();
            MAINSTREAM.renderConcerts(MAINSTREAM.getConcertsCityQuery(city));
            MAINSTREAM.setActiveCity(city);
        });
    },

    getConcertsCityQuery: function(city) {
        // filter concerts by city or show all
        if(city === "alle") {
            return MAINSTREAM.concerts;
        } else {
            return MAINSTREAM.cities[city];
        }
    },

    setActiveCity: function(city) {
        // show the current city as active
        var cities = $('#cities li a');
        cities.removeClass("selected");

        for (var i = 0; i < cities.length; i++) {
            if (city === $(cities[i]).text()) {
                $(cities[i]).addClass("selected");
            }
        }
        $(".city-select").val(city);
        if (city === "alle") {
            $("#content>h2").text("Alle Konzerte");
        }  else {
            $("#content>h2").text("Konzerte in " + city.charAt(0).toUpperCase() + city.slice(1));
        }

    },

    setLastModifiedText: function(text) {
      if (text) {
        text = text.trim().replace("»", "");
        $(".last-modified").text("Daten zuletzt " + text);
      }
    },

    renderFromCityHash: function() {
        // if the page url has a #cityname the concerts are directly filtered by the given city
        var city = decodeURIComponent(MAINSTREAM.urlCityHash);
        MAINSTREAM.renderConcerts(MAINSTREAM.getConcertsCityQuery(city));
        MAINSTREAM.setActiveCity(city);
    }

};

// Concert class
function Concert(d, a, v, c, f) {
    this.uuid = "";
    this.date = d;
    this.endDate = null;
    this.artist = a;
    this.venue = new Venue(v);
    this.city = new City(c);
    this.isFestival = f;

    var year = MAINSTREAM.currentDate.getFullYear();
    var concertMonth = parseInt(this.date.split(".")[1]);

    if (concertMonth < MAINSTREAM.currentDate.getMonth()) {
        year = year + 1;
    }

    if (!this.isFestival) {
        this.date = new Date(year, parseInt(d.split(".")[1]) - 1, parseInt(d.split(".")[0]));
    } else {
        var startDay = this.date.split('.')[0];
        var endDay = this.date.split("– ")[1].split(".")[0];
        var month = parseInt(this.date.split("– ")[1].split(".")[1]) - 1;

        this.date = new Date(year, month, startDay);
        this.endDate = new Date(year, month, endDay);
    }
    this.uuid = this.date.getFullYear() + "-" + this.date.getMonth() + "-" + this.date.getDate() + "-" + this.venue.venue.trim();
}

Concert.prototype.render = function() {
    return "";
};

Concert.prototype.getDate = function() {
    if (this.isFestival) {
        return ("0" + this.date.getDate()).slice(-2) + ". – " + ("0" + this.endDate.getDate()).slice(-2) + "." + MAINSTREAM.monthNumbers[this.date.getMonth()] + ".";
    }
    return ("0" + this.date.getDate()).slice(-2) + "." + MAINSTREAM.monthNumbers[this.date.getMonth()] + ".";
};

// Venue class
function Venue(v) {
    this.venue = v;

    if ($.inArray(this.venue, MAINSTREAM.venues) === -1) {
        MAINSTREAM.venues.push(this.venue);
    }
}

// City class
function City(c) {
    this.concertText = c;
    this.city = null;

    for (var city in MAINSTREAM.cities) {
        if (this.concertText.indexOf(city) > 1) {
            this.city = city;
        }
    }

    if (this.city === null) {
        for (city in MAINSTREAM.cityTypoLookUp) {
            if (this.concertText.indexOf(city) > 1) {
                this.city = MAINSTREAM.cityTypoLookUp[city];
            }
        }

    }
}

$(document).ready(function(){
    $("#concerts").empty();
    $.ajax({
      url:"https://www.kimonolabs.com/api/9pcb6qu6?apikey=94174d4d6c775c2eb6154db4ab889563",
      crossDomain: true,
      dataType: "jsonp",
      success: function (response) {
        MAINSTREAM.init(response);
      },
      error: function (xhr, status) {
        alert(xhr, status);
      }
    });
    MAINSTREAM.urlCityHash = document.location.hash.split("#")[1];
});
