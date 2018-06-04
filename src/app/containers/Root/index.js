import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, createRoutes } from 'react-router';
import routes from '../../configs/routes';

export default class Root extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={createRoutes(routes)} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
