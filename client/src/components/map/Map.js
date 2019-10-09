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

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      latitude: nextProps["latitude"],
      longitude: nextProps["longitude"]
      
    });console.log(this.state.latitude)
  }

  render() {
    const {
      latitude,
      longitude,
      zoom
    } = this.state;

    const center = {latitude, longitude}

    console.log(latitude)

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <Search></Search>

        <GoogleMapReact
          defaultCenter={center}
          defaultZoom={zoom}
        >
          
          <AnyReactComponent text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
