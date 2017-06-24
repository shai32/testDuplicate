import axios from 'axios';
import { createAction } from 'redux-actions';
import httpAdapter from 'axios/lib/adapters/http';
import { AUTH_USER, REGISTER_USER } from './types';

const config = {
  baseURL: process.env.REACT_APP_SERVER,
  timeout: 7000,
  validateStatus() {
    return true;
  }
};

if (process.env.NODE_ENV === 'test') {
  if (process.env.TEST_APP_SERVER) {
    config.baseURL = process.env.TEST_APP_SERVER;
  }
  config.adapter = httpAdapter;
  config.headers = { referer: process.env.REFERER };
}

const app = axios.create(config);
export const authUser = createAction(AUTH_USER, app.post.bind(this, '/auth'));
export const registerOrganization = createAction(REGISTER_USER, app.post.bind(this, '/register'));
