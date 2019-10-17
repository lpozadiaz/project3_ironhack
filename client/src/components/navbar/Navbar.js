import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    this.props.logout();
    window.location="/home";
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-style">
          <Link to="/home">
            <img
              src="https://res.cloudinary.com/dctu91qjy/image/upload/v1571309273/tripTip/logo_color_yrmwds.png"
              alt="Logo"
            ></img>
          </Link>
          <ul>
            <li>
              <Link to="/place/add">Añade una recomendación</Link>
            </li>
            <li>|</li>
            <li>
              <a onClick={this.handleLogout}>Logout</a>
            </li>
            <li>|</li>
            <li>
              <Link to={"/myprofile/" + this.state.loggedInUser._id}>
                Visita tu perfil, {this.state.loggedInUser.username}
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <div>
          <nav className="nav-style">
            <Link to="/home">
              <img
                src="https://res.cloudinary.com/dctu91qjy/image/upload/v1571309273/tripTip/logo_color_yrmwds.png"
                alt="Logo"
              ></img>
            </Link>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>|</li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>|</li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Navbar;
