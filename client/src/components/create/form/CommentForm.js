import React, { Component } from "react";
import AddService from "./AddService";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
    this.service = new AddService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const comment = this.state.comment;

    this.service
      .comment(comment)
      .then(response => {
        this.setState({
          comment: "",
        });

      })
      .catch(error => {
        this.setState({
          comment: "",
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
      <div>
        <form
          onSubmit={this.handleFormSubmit}
        >
        
          <fieldset>
            <label>Tip:</label>
            <input
              type="text"
              name="comment"
              value={this.state.comment}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}
