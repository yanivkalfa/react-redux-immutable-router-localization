import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './configs/configureStore';
import Root from './containers/Root/';
import { setStore } from './utils/store';


const store = configureStore(undefined, [ routerMiddleware(browserHistory) ]);
setStore(store);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing')
});

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
