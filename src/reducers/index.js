import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import session from './session';
import localeData from './localeData';

export default combineReducers({
  router,
  form,
  session,
  localeData
});
