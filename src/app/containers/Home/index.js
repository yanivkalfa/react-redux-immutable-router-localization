import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { setUsername } from './../../redux/account/actions';
import './assets/styles/styles.scss';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  login() {
    const { username } = this.state;
    const { dispatch } = this.props;

    if ( username ) {
      dispatch(setUsername(username));
      browserHistory.push('/admin');
    }
  }

  render() {
    return (
      <div className="home container-fluid">
        <div className="container">
          <h1>{ gettext('Just a simple React example') }</h1>
          <label>{ gettext('You\'r not logged in.') }</label>
          <div>
            <input
              onChange={ (e) => { this.setState({ username: e.target.value }); }}
              placeholder={ gettext('Enter username') }
            />
          </div>
          <button onClick={ () => { this.login(); }}>
            {gettext('Login')}
          </button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func
};


export default connect()(Home);
