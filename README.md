# Geo-Mapping Earthquakes

![1-Logo](https://user-images.githubusercontent.com/85002751/214750290-88685959-e4a1-46d3-b67e-539d1221d3ea.png)

The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. They collect massive amounts of data everyday but lack a means of visualising them. 

Earthquake data found [here](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) along with the Mapbox API and Leaflet.js has been utilised to create an interactive map displaying the earthquakes and their details.

## The Map

<img width="947" alt="image" src="https://user-images.githubusercontent.com/85002751/214750959-9ed5fba1-e3fc-4f45-9cfe-21e77ee42004.png">

Once the data has been called, another API call is made to establish the base map layer from Mapbox. Using Leaflet, the earthquakes are then plotted on the map according to their geo-coordinates and magnitude. The features present include:

- Each earthquake point reflects their magnitude by varying in colour and size. Higher magnitude earthquakes appear darker and larger.
- When the marker is clicked, a pop-up of additional information is provided.
- A legend that conveys the magnitude of the earthquakes by colour.
