import React, { Component } from "react";
import ProfileMap from "./map/Map";
import PersonalList from "./list/PersonalList";
import axios from "axios";

export default class PersonalIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      places: null,
      displayMap: true,
      displayList: false,
      city: null,
      list: null,
    };
  }

  showMap() {
    this.setState({
      ...this.state,
      displayMap: true,
      displayList: false
    });
  }

  showList() {
    this.setState({
      ...this.state,
      displayMap: false,
      displayList: true
    });
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
    const city = this.props.match.params.city;
    const list = this.props.match.params.list

    fetch(`/profile/${list}/${city}/${userId}`)
      .then(response => {
        this.setState({
          userId: userId,
          city: city,
          list: list
        });
      })
      .catch(err => {
        this.setState({
          userId: null,
          city: null
        });
      });

    if (list){
      this.showList();
    }

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
        <button onClick={() => this.showMap()}>Mapa</button>
        <button onClick={() => this.showList()}>Lista</button>
        {this.state.userId && this.state.places && (
          <div>
            {this.state.displayMap && <ProfileMap places={this.state.places}/>}
            {this.state.displayList && <PersonalList places={this.state.places} city={this.state.city} userId={this.state.userId}/>}
          </div>
        )}
      </div>
    );
  }
}