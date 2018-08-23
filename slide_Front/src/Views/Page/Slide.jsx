import React, { Component } from 'react';

class Slide extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            images: props.imgs,
            i: 0
        };
    }

    // Change Image
    changeImg() {
        document.slide.src = `http://10.17.2.16:3002/getFoto/${this.state.images[this.state.i]}`;

        document.querySelector('#legenda').textContent = this.state.images[this.state.i].split('_')[1].split('.')[0];

        // Check If Index Is Under Max
        if (this.state.i < this.state.images.length - 1) {
            // Add 1 to Index
            this.setState({ i: this.state.i + 1 });
        } else {
            // Reset Back To O
            this.setState({ i: 0 });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Slide</h1>
                    <div>
                        <img name="slide" height="400" alt="" />
                        <p id="legenda" />
                    </div>
                    <button onClick={() => this.changeImg()}>Next</button>
                </div>
            </div>
        );
    }
}

export default Slide;
