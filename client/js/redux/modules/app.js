import { createModule, middleware } from 'redux-modules';
import { fromJS, List } from 'immutable';

import { PropTypes } from 'react';
const  { shape, string, number } = PropTypes;

export default createModule({
  name: 'app',
  initialState: fromJS({
    collections: {
      projects: [],
      costCodes: [],
    },
    session: {
      errors: [],
      loading: false,
      project: {},
      costCode: {},
    },
  }),
  selector: state => ({ app: state.app }),
  transformations: {
    init: {
      middleware: [],
      reducer: (state, { payload }) => state,
    },
  },
});
