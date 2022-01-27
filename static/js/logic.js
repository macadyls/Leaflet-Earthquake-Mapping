// Store API endpoint
var queryUrl =   "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Initiate GET request
d3.json(queryUrl).then(function(data) {
    earthquakeData = data.features;
    
    var myMap = L.map("map", {
        center: [37, -95],
        zoom: 5
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    for(i = 0; i<earthquakeData.length; i++) {
        // Create a marker for each city
        color = "";
        color = getColor(earthquakeData[i]["properties"]["mag"]);
        // Obtain the coordinates
        // Notice the order of the coordinates
        coordinates = [];
        coordinates[1] = earthquakeData[i]["geometry"]["coordinates"][0];
        coordinates[0] = earthquakeData[i]["geometry"]["coordinates"][1];
        // Obtain earthquake magnitude
        magnitude = "";
        magnitude = earthquakeData[i]["properties"]["mag"];
        // Add to map
        L.circle(coordinates, {
            fillOpactity: 0.8,
            color: color,
            weight: 1,
            fillColor: color,
            radius: magnitude * 50000
        }).bindPopup("<h3>" + earthquakeData[i]["properties"]["place"] +
        "</h3><hr><p>" + new Date(earthquakeData[i]["properties"]["time"]) + "</p>" +
        "<p>" + "Magnitude: " + magnitude + "<p/>").addTo(myMap);
    };

    // Adding legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [1.0, 2.5, 4.0, 5.5, 7.0],
            labels = [];

        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        
        return div;
    };

    legend.addTo(myMap);

});

// Obtain colour according to magnitude
function getColor(mag) {
    switch (true) {
        case (1.0 <= mag && mag <= 2.5):
            return "#0071BC";
          case (2.5 <= mag && mag <= 4.0):
            return "#35BC00";
          case (4.0 <= mag && mag <= 5.5):
            return "#BCBC00";
          case (5.5 <= mag && mag <= 7.0):
            return "#BC3500";
          case (7.0 <= mag && mag <= 15.0):
            return "#BC0000";
          default:
            return "#E2FFAE";  
    }
  }