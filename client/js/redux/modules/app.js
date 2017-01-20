import { createModule, middleware } from 'redux-modules';
import { fromJS, List } from 'immutable';
import { PropTypes } from 'react';
import 'whatwg-fetch';

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
        state
          .setIn(['collections', 'projects'], projects)
          .setIn(['session', 'loading'], false),
    },
    fetchCostCodesResolve: {
      middleware: [],
      reducer: (state, { payload: { costCodes } }) =>
        state
          .setIn(['collections', 'costCodes'], costCodes)
          .setIn(['session', 'tab'], 'costCode')
          .setIn(['session', 'loading'], false),
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
        state.setIn(['session', 'project'], payload),
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

const fetchCostCodes = (project_id) => async (dispatch, getState) => {
  dispatch(actions.setLoading(true));

  fetch(`/api/cost_codes?project_id=${project_id}`)
    .then(response => response.json())
    .then(json => dispatch(actions.fetchCostCodesResolve({ costCodes: json })))
    .catch(error => console.log('error fetching cost codes'));
}

const fetchProjects = () => async (dispatch, getState) => {
  dispatch(actions.setLoading(true));

  fetch('/api/projects')
    .then(response => response.json())
    .then(json => dispatch(actions.fetchProjectResolve({ projects: json })))
    .catch(error => console.log('error fetching projects'));
}

export default {
  actions: { fetchCostCodes, fetchProjects, fetchStatsData, ...actions },
  ...module,
};
