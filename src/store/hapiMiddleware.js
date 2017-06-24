import get from 'lodash/get';
import { push } from 'react-router-redux';
import includes from 'lodash/includes';
import { SubmissionError } from 'redux-form';
import { setSession, setToken } from '../actions/base';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function handleResponseHeaders(dispatch, response) {
  const authorization = get(response, 'headers.authorization');
  const sessionString = get(response, 'headers.session');
  const wwwAuthenticate = get(response, 'headers.www-authenticate');

  if (includes(wwwAuthenticate, 'Invalid token')) {
    console.info('Token is expired');
    dispatch(setSession(null));
    dispatch(push('/login'));
  }

  if (sessionString) {
    try {
      dispatch(setSession(JSON.parse(sessionString)));
    } catch (e) {
      console.error('session in headers is not valid');
      console.error(e);
    }
  }

  if (authorization) {
    dispatch(setToken(authorization));
  }
}

export default function({ dispatch }) {
  return next => async action => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    next({ ...action, payload: null });

    const response = await action.payload;
    handleResponseHeaders(dispatch, response);

    const status = get(response, 'status', 500);
    const result = get(response, 'data', response);
    if (status >= 200 && status < 300) {
      return result;
    }

    if (includes([500, 400], status)) {
      console.error(new Error(result));
    } else {
      console.info(result);
    }

    if (status === 403) {
      //TODO show Forbidden page without redirect
    }

    if (result.message === 'ValidationErrors') {
      throw new SubmissionError(result.data);
    }

    throw result;
  };
}
