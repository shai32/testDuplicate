import { createActions } from 'redux-actions';
import values from 'lodash/values';
import * as types from './types';

const { setSession, setToken, setLocalData } = createActions(...values(types));

export { setSession, setToken, setLocalData };
