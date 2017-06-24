import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

const About = ({ intl }) =>
  <Article primary>
    <Header direction="row" justify="between" size="large" pad={{ horizontal: 'medium', between: 'small' }}>
      <NavControl />
    </Header>
    <Box pad="medium">
      <Heading tag="h3" strong>
        Running Tasks
      </Heading>
      <Paragraph size="large">
        The backend here is using request polling (5 second interval).
        See
        {' '}
        <Anchor path="/dashboard" label={getMessage(intl, 'Tasks')} />
        {' '}
        page for an example
        of websocket communication.
      </Paragraph>
    </Box>
  </Article>;

About.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

About.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(About);
