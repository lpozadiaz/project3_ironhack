import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { mapStyle } from "./MapStyle";
import SearchBar from "../search/SearchBar";
import { Link } from "react-router-dom";

const getInfoWindowString = place => `
  <div
    style={{
      width: "200px",
      height: "200px"
    }}
  >
    <div style="font-size: 16px;">${place.address}</div>
  </div>`;

class SearchMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      zoom: 11,
      places: null,
      city: null,
      country: null,
      displayMap: true,
      displayList: false,
      displayAll: true,
      displaySee: false,
      displaySleep: false,
      displayEat: false
    };
  }

  showMap() {
    this.setState({
      ...this.state,
      displayMap: true,
      displayList: false
    });
  }

  showList() {
    this.setState({
      ...this.state,
      displayMap: false,
      displayList: true
    });
  }

  showAll() {
    this.setState({
      ...this.state,
      displayAll: true,
      displaySee: false,
      displaySleep: false,
      displayEat: false
    });
  }

  showSee() {
    this.setState({
      ...this.state,
      displayAll: false,
      displaySee: true,
      displaySleep: false,
      displayEat: false
    });
  }

  showSleep() {
    this.setState({
      ...this.state,
      displayAll: false,
      displaySee: false,
      displaySleep: true,
      displayEat: false
    });
  }

  showEat() {
    this.setState({
      ...this.state,
      displayAll: false,
      displaySee: false,
      displaySleep: false,
      displayEat: true
    });
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

      this.getAll();
    }
  }

  getAll = () => {
    axios
      // .get(`${process.env.REACT_APP_URL}/api/search/all`)
      .get(`http://localhost:3010/api/search/all`)

      .then(apiData => {
        this.setState({
          places: apiData.data.filter(place =>
            place.address.toLowerCase().includes(this.state.city.toLowerCase())
          )
        });
      });
  };

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
          icon:
            "https://res.cloudinary.com/dctu91qjy/image/upload/v1571213592/tripTip/pin_1_bhxwkr.png",
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

  // onClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event);

  render() {
    const eat = "eat";
    const sleep = "sleep";
    const see = "see";

    const { latitude, longitude, zoom, places, city, country } = this.state;

    const center = {
      lat: +latitude,
      lng: +longitude
    };

    const mapOptions = {
      styles: mapStyle
    };

    return (
      <div className="container">
        <SearchBar />
        {/* <-- Whatsapp --> */}
        <a
          href={
            "whatsapp://send?text=Visita%20mis%20recomendaciones%20https://tipafriend.herokuapp.com/map/" +
            latitude +
            "/" +
            longitude +
            "/" +
            city +
            "/" +
            country
          }
          target="_blank"
        >
          Whatsapp
        </a>
        {/* <-- Facebook --> */}
        <a
          href={
            "http://www.facebook.com/sharer.php?u=https://tipafriend.herokuapp.com/map/" +
            latitude +
            "/" +
            longitude +
            "/" +
            city +
            "/" +
            country
          }
          target="_blank"
        >
          Facebook
        </a>

        {/* <!-- Twitter --> */}
        <a
          href={
            "https://twitter.com/share?url=https://tipafriend.herokuapp.com/map/" +
            latitude +
            "/" +
            longitude +
            "/" +
            city +
            "/" +
            country
          }
          target="_blank"
        >
          Twitter
        </a>
        {/* <!-- Email --> */}
        <a
          href={
            "mailto:?Subject=Visita%20mis%20recomendaciones%20&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://tipafriend.herokuapp.com/map/" +
            latitude +
            "/" +
            longitude +
            "/" +
            city +
            "/" +
            country
          }
        >
          Email
        </a>

        <button onClick={() => this.showMap()}>Mapa</button>
        <button onClick={() => this.showList()}>Lista</button>

        {this.state.displayMap && (
          <div style={{ height: "70vh", width: "90%" }}>
            {places && (
              <GoogleMapReact
                zoom={zoom}
                center={center}
                options={mapOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                  this.handleApiLoaded(map, maps, places)
                }
              />
            )}
          </div>
        )}

        {this.state.displayList && (
          <div style={{ height: "70vh", width: "90%" }}>
            <div>
              <button onClick={() => this.showAll()}>Todo</button>
              <button onClick={() => this.showEat()}>Comer</button>
              <button onClick={() => this.showSleep()}>Dormir</button>
              <button onClick={() => this.showSee()}>Visitar</button>
            </div>
            
            {this.state.displayAll &&
              this.state.places.map(place => {
                return (
                  <div key={place._id}>
                    <Link to={"/place/" + place._id}>{place.address}</Link>
                    {place.comments.map(comment => {
                      return <p key={comment._id}>Comment: {comment.text}</p>;
                    })}
                  </div>
                );
              })}

            {this.state.displayEat &&
              this.state.places
                .filter(place =>
                  place.type.toLowerCase().includes(eat.toLowerCase())
                )
                .map(place => {
                  return (
                    <div key={place._id}>
                      <Link to={"/place/" + place._id}>{place.address}</Link>
                      {place.comments.map(comment => {
                        return <p key={comment._id}>Comment: {comment.text}</p>;
                      })}
                    </div>
                  );
                })}

            {this.state.displaySleep &&
              this.state.places
                .filter(place =>
                  place.type.toLowerCase().includes(sleep.toLowerCase())
                )
                .map(place => {
                  return (
                    <div key={place._id}>
                      <Link to={"/place/" + place._id}>{place.address}</Link>
                      {place.comments.map(comment => {
                        return <p key={comment._id}>Comment: {comment.text}</p>;
                      })}
                    </div>
                  );
                })}

            {this.state.displaySee &&
              this.state.places
                .filter(place =>
                  place.type.toLowerCase().includes(see.toLowerCase())
                )
                .map(place => {
                  return (
                    <div key={place._id}>
                      <Link to={"/place/" + place._id}>{place.address}</Link>
                      {place.comments.map(comment => {
                        return <p key={comment._id}>Comment: {comment.text}</p>;
                      })}
                    </div>
                  );
                })}
          </div>
        )}
      </div>
    );
  }
}

export default SearchMap;
