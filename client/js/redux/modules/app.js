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
      stats: {
        project_average: [],
        regional_average: [],
      },
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

  fetch(`/api/stats?cost_code_id=${costCode.id}&project_id=${project.id}`)
    .then(response => response.json())
    .then(json => dispatch(actions.fetchStatsDataResolve({ stats: json })))
    .catch(error => console.log('error fetching cost codes'));
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
