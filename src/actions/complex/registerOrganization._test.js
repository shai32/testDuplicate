import { createMockStore } from '../../store';
import registerOrganization from './registerOrganization';

describe('register', () => {
  const { store } = createMockStore();
  let session;

  // 'authorization', token
  it('not throwing error', async () =>
    store.dispatch(
      registerOrganization({
        email: 'shai32@gmail.com',
        password: '123456',
        organizationName: 'organmaa',
        domainName: 'asdasdasd'
      })
    ));
});
