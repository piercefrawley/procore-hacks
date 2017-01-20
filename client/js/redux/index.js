import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import appModule from './modules/app';

const rootReducer = combineReducers({
  routing,
  app: appModule.reducer,
});

export default rootReducer;
