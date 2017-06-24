import { push } from 'react-router-redux';
import { registerOrganization } from '../async';

export default function(params) {
  return async dispatch => {
    await dispatch(registerOrganization(params));
    dispatch(push('/registerEmailSent'));
  };
}
