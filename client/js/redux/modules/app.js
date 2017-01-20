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
      tab: 'projectSelect',
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
    transition: {
      middleware: [],
      reducer: (state, { payload }) => {
        console.log(state);
        return state.set('tab', payload)
      },
    },
  },
});

const fetchProjects = () => async (dispatch, getState) => {
  const fetch = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ projects: [{ id: 1, name: 'Fake Project' }] });
    }, 3000);
  });

  fetch.then(
    payload => dispatch(actions.fetchProjectResolve(payload))
  ).catch(
    error => console.log('error')
  );
}

export default {
  actions: { fetchProjects, ...actions },
  ...module,
};
