import { createModule, middleware } from 'redux-modules';
import { fromJS, List } from 'immutable';

import { PropTypes } from 'react';
const  { shape, string, number } = PropTypes;

const { actions, ...module } = createModule({
  name: 'app',
  initialState: fromJS({
    collections: {
      projects: [],
      costCodes: [],
    },
    session: {
      tab: 'project',
      errors: [],
      loading: false,
      project: {},
      costCode: {},
    },
  }),
  selector: ({ app }) => {
    const { collections, session } = app.toJS();
    return ({
      app: { ...collections, ...session },
    });
  },
  transformations: {
    init: {
      middleware: [],
      reducer: (state, { payload }) => state,
    },
    fetchProjectResolve: {
      middleware: [],
      reducer: (state, { payload: { projects } }) =>
        state.setIn(['collections', 'projects'], projects),
    },
    fetchCostCodesResolve: {
      middleware: [],
      reducer: (state, { payload: { costCode } }) =>
        state.setIn(['collections', 'costCodes'], costCode),
    },
    fetchStatsDataResolve: {
      middleware: [],
      reducer: (state, { payload: { stats } }) =>
      state
        .setIn(['collections', 'stats'], stats)
        .setIn(['session', 'loading'], false),
    },
    onChangeProject: {
      middleware: [],
      reducer: (state, { payload }) =>
        state
          .setIn(['session', 'project'], payload)
          .setIn(['session', 'tab'], 'costCode'),
    },
    onChangeCostCode: {
      middleware: [],
      reducer: (state, { payload }) =>
        state
          .setIn(['session', 'costCode'], payload)
          .setIn(['session', 'tab'], 'detail'),
    },
    setLoading: {
      middleware: [],
      reducer: (state, { payload }) => {
        return state.setIn(['session', 'loading'], payload)
      },
    }
  },
});

const fetchStatsData = () => async (dispatch, getState) => {
  const { app } = getState();
  const { session: { project, costCode } } = app.toJS();

  dispatch(actions.setLoading(true));

  const fetch = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        stats: [
          { "date": "2016-1-1", "price": 1012.20 },
          { "date": "2016-2-5", "price": 3006.10 },
          { "date": "2016-3-2", "price": 2002.30 },
          { "date": "2016-4-2", "price": 1403.20 },
          { "date": "2016-5-2", "price": 2702.10 },
          { "date": "2016-6-2", "price": 2305.40 },
          { "date": "2016-7-2", "price": 3202.90 },
          { "date": "2016-8-2", "price": 2009.50 },
          { "date": "2016-9-2", "price": 2003.30 },
          { "date": "2016-10-2", "price": 2008.30 },
          { "date": "2016-11-2", "price": 2002.10 },
          { "date": "2016-12-2", "price": 2043.20 },
        ]
      });
    }, 1000);
  });

  fetch.then(
    payload => dispatch(actions.fetchStatsDataResolve(payload))
  ).catch(
    error => console.log('error fetching stats')
  );
}

const fetchProjects = () => async (dispatch, getState) => {
  const fetch = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ projects: [{ id: 1, name: 'Fake Project' }] });
    }, 1000);
  });

  fetch.then(
    payload => dispatch(actions.fetchProjectResolve(payload))
  ).catch(
    error => console.log('error fetching projects')
  );
}

const fetchCostCodes = () => async (dispatch, getState) => {
  const fetch = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ costCode: [{ id: 1, name: 'Fake Cost Code' }] });
    }, 1000);
  });

  fetch.then(
    payload => dispatch(actions.fetchCostCodesResolve(payload))
  ).catch(
    error => console.log('error fetching cost codes')
  );
}

export default {
  actions: { fetchCostCodes, fetchProjects, fetchStatsData, ...actions },
  ...module,
};
