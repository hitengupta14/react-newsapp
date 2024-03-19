import React, { Component } from "react";

class Spinner extends Component {
  render() {
    return (
      <div>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </div>
    );
  }
}

export default Spinner;
