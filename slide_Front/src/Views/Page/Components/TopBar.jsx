import React, { Component } from 'react';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="navbar">
        <a onClick={this.props.openNav}>
&#9776; Menu
        </a>
      </div>
    );
  }
}

export default TopBar;
