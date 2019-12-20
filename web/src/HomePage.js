import React from "react";
import * as Setting from "./Setting";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }

}

export default HomePage;
