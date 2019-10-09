import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Search from "../search/Search";
// import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      zoom: 11,
    };
  }

  componentDidMount () {
    const latitude = this.props.match.params.latitude;
    const longitude = this.props.match.params.longitude;
    this.setState({
      ...this.state,
      latitude,
      longitude
    })
  }

  render() {
    const {
      latitude,
      longitude,
      zoom
    } = this.state;

    const center = {
      "lat": +latitude,
      "lng": +longitude
    };

    console.log(latitude)
    console.log(longitude)
    console.log(center)

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <Search></Search>
        {(this.state.latitude && this.state.longitude) && (
        <GoogleMapReact
          center={center}
          defaultZoom={zoom}
        >
          
          <AnyReactComponent text="My Marker" />
        </GoogleMapReact>)}
      </div>
    );
  }
}

export default Map;
