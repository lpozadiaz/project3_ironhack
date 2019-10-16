import React, { Component } from "react";
import axios from "axios";

export default class MyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeId: null,
      place: null,
      userId: null
    };
  }

  componentDidMount() {
    const placeId = this.props.match.params.placeId;
    const userId = this.props.match.params.userId;
   
    fetch(`/myprofile/${userId}/${placeId}`)
      .then(response => {
        this.setState({
          placeId,
          userId
        });
      })
      .catch(err => {
        this.setState({
          placeId: null,
          userId: null
        });
      });

    this.getPlace(placeId);
  }

  getPlace = placeId => {
    axios
      // .get(`${process.env.REACT_APP_URL}/api/search/all`)
      .get(`http://localhost:3010/api/search/place/${placeId}`)

      .then(apiData => {
        this.setState({
          place: apiData.data
        });
      });
  };

  render() {
    const { place, userId } = this.state;
    

    return (
      <div>
        {place && (
          <div>
            {place.comments.filter(comment =>
              comment.authorId[0]._id.includes(userId)
            ).map(comment => {
              return (
                <div key={comment._id}>
                  <p >
                    Comment: {comment.text} / Autor:{" "}
                    {comment.authorId[0].username}
                  </p>{" "}
                    <a
                    href={
                      "https://www.google.com/maps/search/" +
                      place.address
                    }
                    target="_blank"
                  >
                    Busca en Google
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
