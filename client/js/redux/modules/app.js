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
          .setIn(['session', 'tab'], 'project'),
    },
  },
});

const fetchProjects = () => async (dispatch, getState) => {
  const fetch = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ projects: [{ id: 1, name: 'Fake Project' }] });
    }, 1000);
  });

  fetch.then(
    payload => dispatch(actions.fetchProjectResolve(payload))
  ).catch(
    error => console.log('error')
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
    error => console.log('error')
  );
}

export default {
  actions: { fetchCostCodes, fetchProjects, ...actions },
  ...module,
};
