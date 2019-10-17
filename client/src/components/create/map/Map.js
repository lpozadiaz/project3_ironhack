import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { mapStyle } from "./MapStyle";

class AddMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      zoom: 15,
      places: []
    };
  }

  render() {
    const { latitude, longitude, zoom } = this.state;

    const center = {
      lat: +latitude,
      lng: +longitude
    };

    const mapOptions = {
      styles: mapStyle
    };

    return (
      <div className="map map-reduce">
        <GoogleMapReact
          google={this.props.google}
          center={center}
          zoom={zoom}
          options={mapOptions}
          yesIWantToUseGoogleMapApiInternals={true}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default AddMap;
