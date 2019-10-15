import React, { Component } from "react";

export default class Marker extends Component {
  render() {
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dctu91qjy/image/upload/v1571165713/tripTip/pin_qgyhxw.png"
          style={{
            width: "32px",
            transform: "translate(-50%, -90%)"
          }}
        ></img>
      </div>
    );
  }
}
