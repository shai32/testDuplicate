import { connectedRouterRedirect } from 'redux-auth-wrapper/lib/history4/redirect';

// const Loading = () => <div>Loadding</div>;
export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authSelector: state => state.session.userId,
  authenticatingSelector: state => state.session,
  wrapperDisplayName: 'UserIsAuthenticated'
});
