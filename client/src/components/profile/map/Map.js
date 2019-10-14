import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

import { mapStyle } from "./MapStyle";

const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)"
    }}
  >
    {text}
  </div>
);


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
      <div
        className="container"
      >

        <div style={{ height: "70vh", width: "90%" }}>
          <GoogleMapReact
            google={this.props.google}
            center={center}
            defaultZoom={zoom}
            options={mapOptions}
            // onClick={this.onClick}
            yesIWantToUseGoogleMapApiInternals={true}
          >
            {places.map(place => {
              return (
                <Marker
                  key={`${place._id}`}
                  lat={`${place.location.coordinates[1]}`}
                  lng={`${place.location.coordinates[0]}`}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default ProfileMap;
