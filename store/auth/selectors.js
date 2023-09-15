import { createSelector } from 'reselect';

const userStateSelector = state => state.activeUser;

export const activeUserSelector = () =>
  createSelector(userStateSelector, state => state.user);