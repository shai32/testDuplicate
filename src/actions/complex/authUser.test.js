import Nock from 'nock';
import { createMockStore } from '../../store';

import JWT from 'jsonwebtoken';
import Boom from 'boom';
import authUser from './authUser';
import { AUTH_USER, SET_SESSION } from '../types';

const nockApp = Nock(process.env.REACT_APP_SERVER);
const username = 'support@roggly.com';
const password = 1234;

describe('Authorized', () => {
  const { store } = createMockStore();
  let session;

  beforeAll(() => {
    nockApp.post('/auth', { username, password }).reply(
      200,
      { test: 1 },
      {
        session: JSON.stringify({
          id: '8d62695f-4568-4aea-9496-ad4ba0ff97ba',
          userId: '78fc71b6-f725-493b-8d8d-f27536833e58',
          organizationId: '82489562-41ba-4ace-bcbf-d0aca9a01883',
          businessUnitId: '09e331e1-7985-4602-b28e-20fd176a7b9a',
          teamId: null,
          roleId: 'b6faa30b-63ee-4ec5-ad9f-b928f6f9b12a',
          rolePermittedActions: [],
          clientdata: {},
          invalidate: false,
          createdAt: '2017-06-08T09:07:01.232Z',
          updatedAt: '2017-06-08T09:07:01.232Z',
          token: JWT.sign({ sessionId: '8d62695f-4568-4aea-9496-ad4ba0ff97ba' }, 'AUTH_SECRET_KEY')
        })
      }
    );
  });

  // 'authorization', token
  it('not throwing error', async () => store.dispatch(authUser({ username, password })));

  it('dispatch AUTH_USER => SET_SESSION', () => {
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0]).toHaveProperty('type', AUTH_USER);
    expect(actions[1]).toHaveProperty('type', SET_SESSION);
    expect(actions[1]).toHaveProperty('payload');

    session = actions[1].payload;
    expect(session).toHaveProperty('token', expect.any(String));

    const credentials = JWT.decode(session.token);
    expect(credentials).toHaveProperty('sessionId', expect.any(String));

    expect(session).toHaveProperty('id', credentials.sessionId);
    expect(session).toHaveProperty('userId', expect.any(String));
    expect(session).toHaveProperty('organizationId', expect.any(String));
    expect(session).toHaveProperty('businessUnitId', expect.any(String));
    expect(session).toHaveProperty('teamId');
    expect(session).toHaveProperty('roleId', expect.any(String));
    expect(session).toHaveProperty('invalidate', false);
    expect(session).toHaveProperty('rolePermittedActions', expect.any(Array));
    expect(session).toHaveProperty('clientdata', expect.any(Object));
    expect(session).toHaveProperty('createdAt');
    expect(session).toHaveProperty('updatedAt');
  });

  it('state updated with session', () => {
    const state = store.getState();
    expect(session).toMatchObject(state.session);
  });

  it('localStorage updated with session', () => {
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith('session', session);
  });

  it('redirected from root to dashboard', () => {
    const historyEntries = store.getHistoryEntries();
    expect(historyEntries).toHaveLength(2);
    expect(historyEntries[0]).toHaveProperty('pathname', '/');
    expect(historyEntries[1]).toHaveProperty('pathname', '/dashboard');
  });
});

describe('Unauthorized', () => {
  const { store } = createMockStore();

  beforeAll(() => {
    nockApp.post('/auth').replyWithBoom(Boom.unauthorized('invalid credentials'));
  });

  describe('Invalid credentials', () => {
    const { store } = createMockStore();

    it('not throwing error', () => store.dispatch(authUser({})));

    it('dispatch AUTH_USER and SET_SESSION', () => {
      const actions = store.getActions();

      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', AUTH_USER);
      expect(actions[1]).toMatchObject({
        type: SET_SESSION,
        payload: null
      });

      // {
      //   statusCode: 401,
      //     error: 'Unauthorized',
      //   message: 'invalid credentials'
      // }
    });

    it('state session was removed', () => {
      const state = store.getState();
      expect(state.session).toEqual({});
    });

    it('localStorage session was removed', () => {
      expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(localStorage.removeItem).toBeCalledWith('session');
    });

    it('no redirect', () => {
      const historyEntries = store.getHistoryEntries();
      expect(historyEntries).toHaveLength(1);
      expect(historyEntries[0]).toHaveProperty('pathname', '/');
    });
  });
});
