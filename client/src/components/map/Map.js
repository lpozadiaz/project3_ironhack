import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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

    console.log(places);

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        {this.state.places.map(place => {
          return <div>{place.name} {place.address} {place.location.coordinates[0]} {place.location.coordinates[1]}</div>;
        })}
        {this.state.latitude && this.state.longitude && (
          <GoogleMapReact center={center} defaultZoom={zoom}>
            {places.map(place => {
              return (
                <div>
                  <AnyReactComponent text="My Marker" />
                </div>
              );
            })}
          </GoogleMapReact>
        )}
      </div>
    );
  }
}

export default Map;
