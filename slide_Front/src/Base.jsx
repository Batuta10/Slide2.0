import React, { Component } from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
// CSS
import './estilao.css';
// Pages
import NoMatch from './Views/NoMatch';
import Slide from './Views/Page/Slide';
import LeftNav from './Views/Page/Components/LeftNav';
import TopBar from './Views/Page/Components/TopBar';
import ListIMG from './Views/Page/ListIMG';

const openNav = () => {
  document.querySelector('#mySidenav').style.width = '250px';
  document.querySelector('#main').style.marginLeft = '250px';
  document.querySelector('.navbar').style.left = '250px';
};
const closeNav = () => {
  document.querySelector('#mySidenav').style.width = '0';
  document.querySelector('#main').style.marginLeft = '0';
  document.querySelector('.navbar').style.left = '0';
};

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [], loading: 'Carregando...' };
    this.getPhoto = this.getPhoto.bind(this);
  }

  componentDidMount() {
    this.getPhoto();
  }

  getPhoto() {
    superagent.get('http://10.17.2.16:3002/listFoto').end((err, res) => {
      if (err) console.log(err);
      const state = { images: JSON.parse(res.text) };

      if (!JSON.parse(res.text).length) {
        state.loading = 'Não há imagens no servidor!';
      }
      this.setState(state);
    });
  }

  renderRoute() {
    const { page } = this.props;
    switch (page) {
      case 'Home':
        return <Slide imgs={this.state.images} />;
      case 'List':
        return <ListIMG imgs={this.state.images} getPhoto={this.getPhoto} />;
      default:
        return <NoMatch />;
    }
  }

  render() {
    return (
      <div>
        <TopBar openNav={openNav} />
        <LeftNav closeNav={closeNav} />
        <div id="main">
          {this.state.images.length ? this.renderRoute() : this.state.loading}
        </div>
      </div>
    );
  }
}
// PropTypes
Base.defaultProps = {
  page: 'NoMatch',
};

Base.propTypes = {
  page: PropTypes.string,
};

export default Base;
