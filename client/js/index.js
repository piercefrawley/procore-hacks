import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { fromJS } from 'immutable';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Base } from './components';

const initialState = {};
const emptyMiddleware = () => next => action => next(action);

let logger = emptyMiddleware;
logger = createLogger({
  stateTransformer: object => fromJS(object).toJS(),
  actionTransformer: object => fromJS(object).toJS(),
  collapsed: true,
  logErrors: false,
});

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    routing: routerReducer,
  }),
  initialState,
  applyMiddleware(logger)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

$(function () {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Base}/>
        </Route>
      </Router>
    </Provider>,
    document.querySelector('#root')
  )
});
