import React, { Component } from "react";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: this.props.places
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

  selectType(e) {
    if (e.target.value !== "") {
      let newPlaces = this.state.places;
      let searchType = e.target.value;
      let filterPlaces = newPlaces.filter(place =>
        place.type.toLowerCase().includes(searchType.toLowerCase())
      );
      this.setState({ places: filterPlaces });
    } else {
      this.setState({ places: this.props.places });
    }
  }

  render() {
    return (
      <div>
        <input
          type="search"
          defaultValue=""
          onChange={e => this.selectCity(e)}
        />
        <input
          type="search"
          defaultValue=""
          onChange={e => this.selectType(e)}
        />
        {this.state.places.map(place => {
          return (
            <div key={place._id}>
              <p>{place.address}</p>
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
