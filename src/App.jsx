import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import { IntlProvider } from 'react-intl';
import { getCurrentLocale } from 'grommet/utils/Locale';

import { Provider } from 'react-redux';
import { createAppStore } from './store';
import { UserIsAuthenticated } from './authWrapper';

import { setLocale } from './actions';
import Login from './screens/Login';
import Register from './screens/Register';
import RegisterEmailSent from './screens/RegisterEmailSent';
import Dashboard from './screens/Dashboard';
import About from './screens/About';
import NotFound from './screens/NotFound';
import './App.css';

// console.debug(`locale: ${locale}`);
// addLocaleData(en);
// let translations;
// try {
//   translations = require(`./translations/${locale}`);
// } catch (e) {
//   translations = require('./translations/en-US');
// }
// const localeData = getLocaleData(translations, locale);

const { store, history } = createAppStore();
store.dispatch(setLocale(getCurrentLocale()));

const App = ({ localeData }) => {
  console.log('render App');
  console.dir(localeData);
  return (
    localeData &&
    <IntlProvider locale={localeData.locale} messages={localeData.messages}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/registerEmailSent" component={RegisterEmailSent} />
          <Route path="*" component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </IntlProvider>
  );
};

const mapStateToProps = ({ localeData }) => ({ localeData: localeData });
const ConnectedApp = connect(mapStateToProps)(App);

export default () => <Provider store={store}><ConnectedApp /></Provider>;
