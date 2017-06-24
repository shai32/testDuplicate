import React from 'react';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';

export default () =>
  <Box full align="center" justify="center">
    <Headline strong>404</Headline>
    <Heading>Oops...</Heading>
    <Paragraph size="large" align="center">
      It seems that you are in the wrong route. Please check your URL and
      try again.
    </Paragraph>
  </Box>;
