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
      type: "See",
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
    const type = this.state.type;

    this.service
      .create(address, latitude, longitude, comment, type)
      .then(response => {
        this.setState({
          comment: "",
          placeCreated: true
        });
        window.location="/home";
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
      return <h4>¡Recomendación creada!</h4>;
    } else {
      return (
        <div className="form-add">
          <form onSubmit={this.handleFormSubmit}>
            <fieldset>
              <label>Categoría:</label>
              <select
                type="text"
                name="type"
                value={this.state.type}
                onChange={e => this.handleChange(e)}
              >
                <option value="Eat">Comer</option>
                <option value="Sleep">Dormir</option>
                <option value="See">Visitar</option>
              </select>
            </fieldset>
            <fieldset>
              <label>Recomendación:</label>
              <input className="input-add"
                type="textarea"
                name="comment"
                value={this.state.comment}
                onChange={e => this.handleChange(e)}
              />
            </fieldset>
            <input className="button-form" type="submit" value="Create" />
          </form>
        </div>
      );
    }
  }
}
