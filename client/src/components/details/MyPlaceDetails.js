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
      comment: "",  
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
      // .get(`${process.env.REACT_APP_URL}/api/search/all`)
      .get(`http://localhost:3010/api/search/place/${placeId}`)

      .then(apiData => {
        this.setState({
          place: apiData.data
        });
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const comment = this.state.comment;
    const commentId = this.state.place.comments
      .filter(comment => comment.authorId[0]._id.includes(this.state.userId))

    
    this.service
      .update(comment, commentId)
      .then(response => {
        this.setState({
          comment: "",
        });
      })
      .catch(error => {
        this.setState({
          comment: "",
        });
      });
  };

  handleDelete = () => {
    const commentId = this.state.place.comments
      .filter(comment => comment.authorId[0]._id.includes(this.state.userId));
    const placeId = this.state.placeId;
    
    this.service
      .delete(placeId, commentId)
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { place, userId, placeId } = this.state;
    console.log(placeId)

    return (
      <div>
        
        {place && (
          <div>
            {place.comments
              .filter(comment => comment.authorId[0]._id.includes(userId))
              .map(comment => {
                return (
                  <div key={comment._id}>
                    {!this.state.displayEdit && (
                      <div>
                        <p>Comment: {comment.text}</p>{" "}
                        <button onClick={() => this.showEdit()}>Editar</button>
                        <a
                          href={
                            "https://www.google.com/maps/search/" +
                            place.address
                          }
                          target="_blank"
                        >
                          Busca en Google
                        </a>
                        <button onClick={() => this.handleDelete()}>Eliminar</button>
                      </div>
                    )}
                    {this.state.displayEdit && (
                      <div>
                        <form onSubmit={this.handleFormSubmit}>
                          <fieldset>
                            <label>Tip:</label>
                            <input
                              type="text"
                              name="comment"
                              value={this.state.comment}
                              placeholder={comment.text}
                              onChange={e => this.handleChange(e)}
                            />
                          </fieldset>
                          <input type="submit" value="Update" />
                        </form>
                        
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
}
