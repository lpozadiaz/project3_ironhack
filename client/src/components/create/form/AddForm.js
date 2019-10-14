import React, { Component } from "react";
import AddService from "./AddService";

export default class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      address: this.props.address,
      comment: "",
      placeCreated: null
    };
    this.service = new AddService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    const address = this.state.address;
    const comment = this.state.comment;

    this.service
      .create(address, latitude, longitude, comment)
      .then(response => {
        this.setState({
          comment: "",
          placeCreated: true
        });
      })
      .catch(error => {
        this.setState({
          comment: "",
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.state.placeCreated) {
      return <div>¡Place created!</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <fieldset>
              <label>Tip:</label>
              <input
                type="text"
                name="comment"
                value={this.state.comment}
                onChange={e => this.handleChange(e)}
              />
            </fieldset>
            <input type="submit" value="Create" />
          </form>
        </div>
      );
    }
  }
}