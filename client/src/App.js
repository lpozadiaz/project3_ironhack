import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import Search from "./components/search/Search";
import Map from "./components/map/Map";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      latitude: null,
      longitude: null
    };
    this.service = new AuthService();

    this.fetchUser();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };

  fetchUser() {
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        });
      });
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <Redirect to="/home" />

          <div>
            <Navbar
              userInSession={this.state.loggedInUser}
              logout={this.logout}
            />
            <Search />
            <Switch>
              <Route
                exact
                path="/map/:latitude/:longitude"
                render={(props) => <Map {...props}/>}
              />
            </Switch>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Redirect to="/login" />

          <div className="App">
            <Navbar
              userInSession={this.state.loggedInUser}
              logout={this.logout}
            />
            <Switch>
              <Route
                exact
                path="/signup"
                render={() => <Signup getUser={this.getUser} />}
              />
              <Route
                exact
                path="/login"
                render={() => <Login getUser={this.getUser} />}
              />
            </Switch>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default App;
