import React, { Component } from "react";
import axios from "axios";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeId: null,
      place: null
    };
  }

  componentDidMount() {
    const placeId = this.props.match.params.placeId;

    fetch(`/place/${placeId}/`)
      .then(response => {
        this.setState({
          placeId
        });
      })
      .catch(err => {
        this.setState({
          placeId: null
        });
      });

    this.getPlace(placeId);
  }

  getPlace = placeId => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/search/place/${placeId}`)
      // .get(`http://localhost:3010/api/search/place/${placeId}`)

      .then(apiData => {
        this.setState({
          place: apiData.data
        });
      });
  };

  render() {
    const { place } = this.state;

    return (
      <div className="container">
        {place && (
          <React.Fragment>
            <h5>{place.address.split(",").slice(0, 1)}</h5>
            <p>{place.address.split(",").slice(1).join(",")}</p>

            {place.comments.map(comment => {
              return (
                <React.Fragment>
                  <a className="google"
                    href={"https://www.google.com/maps/search/" + place.address}
                    target="_blank"
                  >
                    Busca en Google
                  </a>
                  <h6>Recomendaciones</h6>
                  <div className="detail-comment" key={comment._id}>
                    <p>
                      {comment.authorId[0].username}
                      <span>{comment.text}</span>
                    </p>
                  </div>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        )}
      </div>
    );
  }
}
