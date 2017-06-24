// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Logo from 'grommet/components/icons/Grommet';

class NavControl extends Component {
  render() {
    const { name } = this.props;
    const active = true;
    let result;
    const title = <Title>{name || 'Grommet Sample'}</Title>;
    if (!active) {
      result = (
        <Button>
          <Box direction="row" responsive={false} pad={{ between: 'small' }}>
            <Logo />
            {title}
          </Box>
        </Button>
      );
    } else {
      result = title;
    }
    return result;
  }
}

NavControl.propTypes = {
  name: PropTypes.string
};

const select = state => ({
  nav: state.nav
});

export default connect(select)(NavControl);
