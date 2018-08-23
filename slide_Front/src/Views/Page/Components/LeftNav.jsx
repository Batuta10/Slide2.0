import React, { Component } from 'react';

class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <a className="closebtn" onClick={this.props.closeNav}>
                    &times;
                </a>
                <a href="/">Slide</a>
                <a href="/list">Lista</a>
            </div>
        );
    }
}

export default LeftNav;
