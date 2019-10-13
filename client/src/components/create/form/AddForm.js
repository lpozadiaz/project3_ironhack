import React, { Component } from "react";
import AddService from "./AddService";

export default class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      address: this.props.address,
      placeCreated: null
    };
    this.service = new AddService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    const address = this.state.address;

    this.service
      .create(address, latitude, longitude)
      .then(response => {
        this.setState({
          placeCreated: true
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  };

  render() {
    if (this.state.placeCreated) {
      return (<div>¡Place created!</div>);
    } else {
      return (
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <input type="submit" value="Create" />
          </form>
        </div>
      );
    }
  }
}
