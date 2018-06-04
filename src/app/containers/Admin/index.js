import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUsername } from './../../redux/account/selectors';

import './assets/styles/styles.scss';
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage: 'Welcome: '
    };
  }
  render() {
    const welcomeMessage = gettext('Welcome: ');
    const { username } = this.props;
    return (
      <div className="admin container-fluid">
        <div className="container">
          <div className="Admin">{ welcomeMessage } { username }</div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  username: PropTypes.string
};

const mapStateToProps = state => {
  return {
    username: getUsername(state)
  };
};

export default connect(
  mapStateToProps
)(Admin);
