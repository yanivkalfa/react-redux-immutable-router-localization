import { createSelector } from 'reselect';

export const getAccount = state => state.get('account');
export const getUsername = createSelector(
  getAccount,
  account => account.get('username')
);
