import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { mapStyle } from "./MapStyle";

const getInfoWindowString = place => `
  <div
    style={{
      width: "200px",
      height: "200px"
    }}
  >
    <div style="font-size: 16px;">${place.address}</div>
  </div>`;

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api

class ProfileMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 40,
      longitude: -3.7,
      places: this.props.places
    };
  }

  handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    places.forEach(place => {
      markers.push(
        new maps.Marker({
          position: {
            lat: place.location.coordinates[1],
            lng: place.location.coordinates[0]
          },
          icon:
            "https://res.cloudinary.com/dctu91qjy/image/upload/v1571213592/tripTip/pin_1_bhxwkr.png",
          map
        })
      );

      infowindows.push(
        new maps.InfoWindow({
          content: getInfoWindowString(place)
        })
      );
    });

    markers.forEach((marker, i) => {
      marker.addListener("click", () => {
        infowindows[i].open(map, marker);
      });
    });
  };

  // onClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event);

  render() {
    const { latitude, longitude, places } = this.state;

    const center = {
      lat: +latitude,
      lng: +longitude
    };

    const mapOptions = {
      styles: mapStyle
    };

    return (
      <div className="container">
        <div style={{ height: "70vh", width: "90%" }}>
          {places && (
            <GoogleMapReact
              defaultZoom={0}
              defaultCenter={center}
              options={mapOptions}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                this.handleApiLoaded(map, maps, places)
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export default ProfileMap;
