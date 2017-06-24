import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';

import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createMemoryHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import hapiMiddleware from './hapiMiddleware';
import rootReducer from '../reducers';

export function createAppStore(preLoadedState) {
  const history = createBrowserHistory();
  const middleWares = applyMiddleware(thunkMiddleware, hapiMiddleware, routerMiddleware(history));
  const store = createStore(rootReducer, preLoadedState, composeWithDevTools(middleWares));
  return { store, history };
}

export function createMockStore(preLoadedState) {
  let actions = [];

  function actionsTrackerMiddleware() {
    return next => action => {
      actions.push(action);
      return next(action);
    };
  }

  //https://github.com/ReactTraining/history/blob/master/modules/createMemoryHistory.js
  const history = createMemoryHistory();

  const middleWares = applyMiddleware(
    thunkMiddleware,
    hapiMiddleware,
    routerMiddleware(history),
    actionsTrackerMiddleware
  );

  const store = createStore(rootReducer, preLoadedState, middleWares);

  store.getActions = () => actions;
  store.clearActions = () => {
    actions = [];
  };
  store.getHistoryEntries = () => history.entries;

  return { store, history };
}
