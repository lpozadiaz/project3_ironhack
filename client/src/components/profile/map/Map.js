import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { mapStyle } from "./MapStyle";
import Marker from "../../elements/Marker";

const getInfoWindowString = place => (`
  <div
    style={{
      width: "200px",
      height: "200px"
    }}
  >
    <div style="font-size: 16px;">${place.address}</div>
  </div>`
);

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api

class ProfileMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 40,
      longitude: -3.7,
      zoom: 0,
      places: this.props.places
    };
  }

  // onClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event);

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

  render() {
    const { latitude, longitude, zoom, places } = this.state;

    const center = {
      lat: +latitude,
      lng: +longitude
    };

    const mapOptions = {
      styles: mapStyle
    };

    return (
      // <div
      //   className="container"
      // >
      //   <div style={{ height: "70vh", width: "90%" }}>
      //     <GoogleMapReact
      //       google={this.props.google}
      //       center={center}
      //       defaultZoom={zoom}
      //       options={mapOptions}
      //       // onClick={this.onClick}
      //       yesIWantToUseGoogleMapApiInternals={true}
      //       onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
      //     >
      //       {places.map(place => {
      //         return (
      //           <Marker
      //             key={`${place._id}`}
      //             lat={`${place.location.coordinates[1]}`}
      //             lng={`${place.location.coordinates[0]}`}
      //           />
      //         );
      //       })}
      //     </GoogleMapReact>
      //   </div>
      // </div>
      <div style={{ height: "70vh", width: "90%" }}>
        {places && (
          <GoogleMapReact
            defaultZoom={10}
            defaultCenter={center}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              this.handleApiLoaded(map, maps, places)
            }
          />
        )}
      </div>
    );
  }
}

export default ProfileMap;
