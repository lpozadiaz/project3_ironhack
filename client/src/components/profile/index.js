import React, { Component } from "react";
import ProfileMap from "./map/Map";
import List from "./list/List";
import axios from "axios";

export default class ProfileIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      places: null,
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.id;

    fetch(`/profile/${userId}`)
      .then(response => {
        this.setState({
          userId: userId
        });
      })
      .catch(err => {
        this.setState({
          userId: null
        });
      });

    this.getInfo();
  }

  getInfo = () => {
    const userId = this.props.match.params.id;
    axios
      // .get(`${process.env.REACT_APP_URL}/api/search/${userId}`)
      .get(`http://localhost:3010/api/search/${userId}`)

      .then(apiData => {
        this.setState({
          places: apiData.data.markers
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.userId && this.state.places && (
          <div>
            <ProfileMap places={this.state.places} />
            <List places={this.state.places} />
          </div>
        )}
      </div>
    );
  }
}
