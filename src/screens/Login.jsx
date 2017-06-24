import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authUser } from '../actions';
import LoginForm from 'grommet/components/LoginForm';
import Anchor from 'grommet/components/Anchor';
import Logo from 'grommet/components/icons/Grommet';
import Box from 'grommet/components/Box';
import GrommetApp from 'grommet/components/App';

const Login = ({ authUser }) =>
  <GrommetApp centered={false}>
    <Box full={true} style={{ flexDirection: 'row' }}>
      <Box colorIndex="grey-4" align="center" justify="center" flex="grow" direction="row">
        <Box colorIndex="light-2" pad="medium" margin="medium">
          <LoginForm
            colorIndex="light-2"
            title="Grommet Sample"
            secondaryText="Sample secondary text"
            logo={<Logo className="logo" colorIndex="brand" />}
            forgotPassword={<Anchor href="#" label="Forgot password?" />}
            onSubmit={authUser}
            rememberMe={true}
          />
        </Box>
      </Box>
    </Box>
  </GrommetApp>;

Login.propTypes = {
  authUser: PropTypes.func
};

export default connect(null, { authUser })(Login);
