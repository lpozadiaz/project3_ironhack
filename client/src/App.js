import React, { Component } from "react";
import { Switch, Route} from "react-router-dom";
import AuthService from "./components/auth/AuthService";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import SearchIndex from "./components/main/index";
import SearchMap from "./components/main/map/Map";
import SearchForm from "./components/create/SearchForm";
import ProfileIndex from "./components/profile/index";
import PersonalIndex from "./components/profile/index-personal";
import Details from "./components/details/Details";
import MyDetails from "./components/details/MyPlaceDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
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
          <div className="App">
            <Navbar
              userInSession={this.state.loggedInUser}
              logout={this.logout}
            />
            <Switch>
              <Route exact path="/home" render={() => <SearchIndex />} />
              <Route
                exact
                path="/map/:latitude/:longitude/:city/:country"
                render={props => <SearchMap {...props} />}
              />
              <Route exact path="/place/add" render={() => <SearchForm />} />
              <Route
                exact
                path="/place/:placeId"
                render={props => <Details {...props} />}
              />
              <Route
                exact
                path="/myprofile/:userId/:placeId"
                render={props => <MyDetails {...props} />}
              />
              <Route
                exact
                path="/myprofile/:id"
                render={props => <PersonalIndex {...props} />}
              />
              <Route
                exact
                path="/profile/:list/:city/:id"
                render={props => <ProfileIndex {...props} />}
              />
              <Route
                exact
                path="/profile/:id"
                render={props => <ProfileIndex {...props} />}
              />
            </Switch>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="App">
            <Navbar
              userInSession={this.state.loggedInUser}
              logout={this.logout}
            />
            <Switch>
              <Route exact path="/home" render={() => <SearchIndex />} />
              <Route
                exact
                path="/map/:latitude/:longitude/:city/:country"
                render={props => <SearchMap {...props} />}
              />
                <Route
                  exact
                  path="/profile/:list/:city/:id"
                  render={props => <ProfileIndex {...props} />}
                />
              <Route
                exact
                path="/profile/:id"
                render={props => <ProfileIndex {...props} />}
              />
              <Route
                exact
                path="/place/:placeId"
                render={props => <Details {...props} />}
              />
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
