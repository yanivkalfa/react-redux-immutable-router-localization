import Home from '../containers/Home/';
import Admin from '../containers/Admin/';
import { getStoreState } from './../utils/store';
import { getUsername } from './../redux/account/selectors';

export default {
  path: '/',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/home')
  },
  childRoutes: [
    {
      path: 'home',
      component: Home
    },
    {
      path: 'Admin',
      component: Admin,
      onEnter: (nextState, replaceState) => {
        const state = getStoreState();
        const username = getUsername(state);
        if ( !username ) {
          return replaceState('/home');
        }
        return true;
      }
    }
  ]
};
