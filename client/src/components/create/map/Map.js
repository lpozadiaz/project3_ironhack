import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { mapStyle } from "./MapStyle";

class AddMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      zoom: 15
    };
  }

  handleApiLoaded = (map, maps, places) => {
    new maps.Marker({
      position: {
        lat: this.state.latitude,
        lng: this.state.longitude
      },
      icon:
        "https://res.cloudinary.com/dctu91qjy/image/upload/v1571213592/tripTip/pin_1_bhxwkr.png",
      map
    });
  };

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
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        />
      </div>
    );
  }
}

export default AddMap;
