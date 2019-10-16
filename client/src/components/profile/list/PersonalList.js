import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PersonalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: this.props.places,
      displayAll: true,
      displaySee: false,
      displaySleep: false,
      displayEat: false,
      city: this.props.city,
      userId: this.props.userId
    };
  }

  selectCity(e) {
    if (e.target.value !== "") {
      let newPlaces = this.state.places;
      let searchCity = e.target.value;
      let filterPlaces = newPlaces.filter(place =>
        place.address.toLowerCase().includes(searchCity.toLowerCase())
      );
      this.setState({ places: filterPlaces });
    } else {
      this.setState({ places: this.props.places });
    }
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

  render() {
    const eat = "eat";
    const sleep = "sleep";
    const see = "see";
    const { city, userId } = this.state;

    return (
      <div>
        <div>
          {/* <-- Whatsapp --> */}
          <a
            href={
              "whatsapp://send?text=Visita%20mis%20recomendaciones%20https://tipafriend.herokuapp.com/profile/list/" +
              city +
              "/" +
              userId
            }
            target="_blank"
          >
            Whatsapp
          </a>
          {/* <-- Facebook --> */}
          <a
            href={
              "http://www.facebook.com/sharer.php?u=https://tipafriend.herokuapp.com/profile/list/" +
              city +
              "/" +
              userId
            }
            target="_blank"
          >
            Facebook
          </a>

          {/* <!-- Twitter --> */}
          <a
            href={
              "https://twitter.com/share?url=https://tipafriend.herokuapp.com/profile/list/" +
              city +
              "/" +
              userId
            }
            target="_blank"
          >
            Twitter
          </a>
          {/* <!-- Email --> */}
          <a
            href={
              "mailto:?Subject=Visita%20mis%20recomendaciones%20&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://tipafriend.herokuapp.com/profile/list/" +
              city +
              "/" +
              userId
            }
          >
            Email
          </a>
        </div>

        <input
          type="search"
          defaultValue={this.state.city}
          placeholder={this.state.city}
          onChange={e => this.selectCity(e)}
        />
        <button onClick={() => this.showAll()}>Todo</button>
        <button onClick={() => this.showEat()}>Comer</button>
        <button onClick={() => this.showSleep()}>Dormir</button>
        <button onClick={() => this.showSee()}>Visitar</button>

        {this.state.displayAll &&
          this.state.places.map(place => {
            return (
              <div key={place._id}>
                <Link to={'/myprofile/'+userId+'/'+place._id}>{place.address}</Link>
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
                  <Link to={'/myprofile/'+userId+'/'+place._id}>{place.address}</Link>
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
                  <Link to={'/myprofile/'+userId+'/'+place._id}>{place.address}</Link>
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
                  <Link to={'/myprofile/'+userId+'/'+place._id}>{place.address}</Link>
                  {place.comments.map(comment => {
                    return <p key={comment._id}>Comment: {comment.text}</p>;
                  })}
                </div>
              );
            })}
      </div>
    );
  }
}
