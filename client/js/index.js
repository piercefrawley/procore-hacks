import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { fromJS } from 'immutable';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Base, DetailPage, ProjectSelect } from './components';
import rootReducer from './redux';

const initialState = {};
const emptyMiddleware = () => next => action => next(action);

let loggerMiddleware = emptyMiddleware;
loggerMiddleware = createLogger({
  stateTransformer: object => fromJS(object).toJS(),
  actionTransformer: object => fromJS(object).toJS(),
  collapsed: true,
  logErrors: false,
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

$(function () {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Base}/>
          <Route path="select" component={ProjectSelect}/>
          <Route path="detail" component={DetailPage}/>
        </Route>
      </Router>
    </Provider>,
    document.querySelector('#root')
  )
});
