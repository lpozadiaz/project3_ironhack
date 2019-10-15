import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { mapStyle } from "./MapStyle";
import SearchBar from "../search/SearchBar";

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

class SearchMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      zoom: 11,
      places: [],
      city: null,
      country: null
    };
  }

  componentDidMount() {
    const latitude = this.props.match.params.latitude;
    const longitude = this.props.match.params.longitude;
    const cityParams = this.props.match.params.city;
    const countryParams = this.props.match.params.country;
    const city = cityParams.split("%20").join(" ");
    const country = countryParams.split("%20").join(" ");

    fetch(`/map/${latitude}/${longitude}/${cityParams}/${countryParams}`)
      .then(response => {
        this.setState({
          latitude: latitude,
          longitude: longitude,
          city: city,
          country: country
        });
      })
      .catch(err => {
        this.setState({
          latitude: null,
          longitude: null,
          city: null,
          country: null
        });
      });

    this.getAll();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.latitude !== prevProps.match.params.latitude &&
      this.props.match.params.longitude !== prevProps.match.params.longitude
    ) {
      const cityParams = this.props.match.params.city;
      const countryParams = this.props.match.params.country;
      const city = cityParams.split("%20").join(" ");
      const country = countryParams.split("%20").join(" ");

      this.setState({
        latitude: this.props.match.params.latitude,
        longitude: this.props.match.params.longitude,
        city: city,
        country: country
      });
    }
  }

  getAll = () => {
    axios
      // .get(`${process.env.REACT_APP_URL}/api/search/all`)
      .get(`http://localhost:3010/api/search/all`)

      .then(apiData => {
        this.setState({
          places: apiData.data
        });
      });
  };

  // onClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event);
  // selectType(e) {
  //   let newPlaces = {...this.state.places};
  //   let searchWord = e.target.value;
  //   let filteredFoods = newFoods.newFoodsArr.filter(food => food.name.toLowerCase().includes(searchWord.toLowerCase()))
  //   newFoods.foods = filteredFoods
  //   this.setState (newFoods)

  // }

  render() {
    const { latitude, longitude, zoom, places, city, country } = this.state;

    const center = {
      lat: +latitude,
      lng: +longitude
    };

    const mapOptions = {
      styles: mapStyle
    };

    console.log(city);
    console.log(country);

    return (
      <div className="container">
        <SearchBar />
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
        {places.map(place => {
          return (
            <div key={place._id}>
              <p>{place.address}</p>
              {place.comments.map(comment => {
                return (
                  <p key={comment._id}>
                    {comment.authorId.map(author => {
                      return <span key={author._id}>{author.username}: </span>;
                    })}{" "}
                    {comment.text}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default SearchMap;
