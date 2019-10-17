import React, { Component } from "react";
import AuthService from "./AuthService";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: ""};
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;


    this.service
      .signup(username, password, email)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          email: "",
        });

        this.props.getUser(response.user);
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          email: "",
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <h3 className="signup">Por favor, introduce tus datos para registrarte</h3>

        <form onSubmit={this.handleFormSubmit} content-type="multipart/forma-data">
          <fieldset>
            <label>Nombre de usuario:</label>
            <input className="input-city"
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <fieldset>
            <label>Contraseña:</label>
            <input className="input-city"
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <fieldset>
            <label>Email:</label>
            <input className="input-city"
              type="text"
              name="email"
              value={this.state.email}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <input className="button-form" type="submit" value="Sign up" />
        </form>

        <h1>{this.state.error ? "Error" : ""}</h1>
      </div>
    );
  }
}

export default Signup;
