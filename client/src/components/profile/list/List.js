import React, { Component } from "react";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: this.props.places
    };
  }

  render() {
    return (
      <div>
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
