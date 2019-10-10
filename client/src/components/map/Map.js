import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      zoom: 11
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.latitude !== prevProps.match.params.latitude && this.props.match.params.longitude !== prevProps.match.params.longitude) {
      this.setState({
        latitude: this.props.match.params.latitude,
        longitude: this.props.match.params.longitude
      });
    }
}

  render() {
    const { latitude, longitude, zoom } = this.state;

    const center = {
      lat: +latitude,
      lng: +longitude
    };

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        {this.state.latitude && this.state.longitude && (
          <GoogleMapReact center={center} defaultZoom={zoom}>
            <AnyReactComponent text="My Marker" />
          </GoogleMapReact>
        )}
      </div>
    );
  }
}

export default Map;
