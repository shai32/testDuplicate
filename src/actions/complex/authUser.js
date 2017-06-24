import { push } from 'react-router-redux';
import { authUser } from '../async';
import { setSession } from '../base';

export default function(loginParameters) {
  return async dispatch => {
    try {
      await dispatch(authUser(loginParameters));
      dispatch(push('/dashboard'));
    } catch (e) {
      // TODO handle error in middleware
      // TODO if error code 401, logout, else show error message
      console.error('Auth User Error');
      console.error(e);
      dispatch(setSession(null));
    }
  };
}
