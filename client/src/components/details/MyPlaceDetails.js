import React, { Component } from "react";
import axios from "axios";
import AddService from "../create/form/AddService";

export default class MyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeId: null,
      place: null,
      userId: null,
      displayEdit: false,
      comment: ""
    };
    this.service = new AddService();
  }

  showEdit() {
    this.setState({ displayEdit: !this.state.displayEdit });
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
      .get(`${process.env.REACT_APP_URL}/api/search/place/${placeId}`)
      // .get(`http://localhost:3010/api/search/place/${placeId}`)

      .then(apiData => {
        this.setState({
          place: apiData.data
        });
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const comment = this.state.comment;
    const commentId = this.state.place.comments.filter(comment =>
      comment.authorId[0]._id.includes(this.state.userId)
    );

    this.service
      .update(comment, commentId)
      .then(response => {
        this.setState({
          comment: ""
        });
        window.location = "/home";
      })
      .catch(error => {
        this.setState({
          comment: ""
        });
      });
  };

  handleDelete = () => {
    const commentId = this.state.place.comments.filter(comment =>
      comment.authorId[0]._id.includes(this.state.userId)
    );
    const placeId = this.state.placeId;

    this.service.delete(placeId, commentId);

    window.location = "/home";
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { place, userId, placeId } = this.state;

    return (
      <div className="container">
        {place && (
          <React.Fragment>
            <h5>{place.address.split(",").slice(0, 1)}</h5>
            <p>
              {place.address
                .split(",")
                .slice(1)
                .join(",")}
            </p>
            {place.comments
              .filter(comment => comment.authorId[0]._id.includes(userId))
              .map(comment => {
                return (
                  <div className="personal-details" key={comment._id}>
                    {!this.state.displayEdit && (
                      <React.Fragment>
                        <a
                          className="google"
                          href={
                            "https://www.google.com/maps/search/" +
                            place.address
                          }
                          target="_blank"
                        >
                          {" "}
                          Busca en Google
                        </a>

                        <div className="detail-comment">
                          {" "}
                          <p>
                            Recomendación: <span>{comment.text}</span>
                          </p>
                        </div>
                        <button
                          className="button-form"
                          onClick={() => this.showEdit()}
                        >
                          Editar
                        </button>

                        <button
                          className="button-form"
                          onClick={() => this.handleDelete()}
                        >
                          Eliminar
                        </button>
                      </React.Fragment>
                    )}
                    {this.state.displayEdit && (
                      <div>
                        <form onSubmit={this.handleFormSubmit}>
                          <fieldset>
                            <label>Recomendación:</label>
                            <input className="input-add"
                              type="text"
                              name="comment"
                              value={this.state.comment}
                              placeholder={comment.text}
                              onChange={e => this.handleChange(e)}
                            />
                          </fieldset>
                          <input className="button-form" type="submit" value="Actualizar" />
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
          </React.Fragment>
        )}
      </div>
    );
  }
}
