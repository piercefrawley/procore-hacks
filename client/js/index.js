import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { fromJS } from 'immutable';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
<<<<<<< HEAD
import { Base, DetailPage, Chart } from './components';
import rootReducer from './reducers';
=======
import { Base, DetailPage, ProjectSelect } from './components';
import rootReducer from './redux';
>>>>>>> 1d825d1261f620dbde3acfa0409829a07ecc4f4a

const initialState = {};
const emptyMiddleware = () => next => action => next(action);

let logger = emptyMiddleware;
logger = createLogger({
  stateTransformer: object => fromJS(object).toJS(),
  actionTransformer: object => fromJS(object).toJS(),
  collapsed: true,
  logErrors: false,
});

const store = createStore(
  rootReducer,
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
          <Route path="select" component={ProjectSelect}/>
          <Route path="detail" component={DetailPage}/>
          <Route path="chart" component={Chart}/>
        </Route>
      </Router>
    </Provider>,
    document.querySelector('#root')
  )
});
