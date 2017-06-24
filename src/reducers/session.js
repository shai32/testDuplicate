import immutable from 'seamless-immutable';
import isEmpty from 'lodash/isEmpty';
import { SET_TOKEN, SET_SESSION } from '../actions/types';

const empty = immutable({});
const initial = localStorage.getItem('session') || empty;

function setSession(session) {
  if (isEmpty(session)) {
    localStorage.removeItem('session');
    return empty;
  } else {
    localStorage.setItem('session', session);
    return session;
  }
}
export default function(state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TOKEN:
      return setSession(isEmpty(payload) ? null : state.merge({ token: payload }));
    case SET_SESSION:
      return setSession(isEmpty(payload) ? null : immutable(payload));
    default:
      return state;
  }
}
