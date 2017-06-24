import immutable from 'seamless-immutable';
import { SET_LOCAL_DATA } from '../actions/types';

const initial = immutable({ lang: 'en', locale: 'en-US', message: {} });

export default function(state = initial, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOCAL_DATA:
      return immutable(payload);
    default:
      return state;
  }
}
