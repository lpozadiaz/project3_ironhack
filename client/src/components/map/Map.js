import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
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
      borderRadius: "100%",
      transform: "translate(-50%, -50%)"
    }}
  >
    {text}
  </div>
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      zoom: 11,
      places: []
    };
  }

  componentDidMount() {
    const latitude = this.props.match.params.latitude;
    const longitude = this.props.match.params.longitude;

    fetch(`/map/${latitude}/${longitude}`)
      .then(response => {
        this.setState({
          latitude: latitude,
          longitude: longitude
        });
      })
      .catch(err => {
        this.setState({
          latitude: null,
          longitude: null
        });
      });

    this.getAll();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.latitude !== prevProps.match.params.latitude &&
      this.props.match.params.longitude !== prevProps.match.params.longitude
    ) {
      this.setState({
        latitude: this.props.match.params.latitude,
        longitude: this.props.match.params.longitude
      });
    }
  }

  getAll = () => {
    axios
      .get(`http://localhost:3010/api/search/all`)

      .then(apiData => {
        this.setState({
          places: apiData.data
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
      <div style={{ height: "70vh", width: "90%" }}>
        {this.state.latitude && this.state.longitude && (
          <GoogleMapReact
            google={this.props.google}
            center={center}
            defaultZoom={zoom}
            options={mapOptions}
            onClick={this.onMapClicked}
            yesIWantToUseGoogleMapApiInternals
          >
            {places.map(place => {
              return (
                <Marker
                  key={`${place._id}`}
                  lat={`${place.location.coordinates[1]}`}
                  lng={`${place.location.coordinates[0]}`}
                  text={`${place.name}`}
                />
              );
            })}
          </GoogleMapReact>
        )}
      </div>
    );
  }
}

export default Map;
