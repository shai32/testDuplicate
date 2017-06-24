import React from 'react';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';

export default () =>
  <Box full align="center" justify="center">
    <Headline strong>Registration succeed</Headline>
    <Paragraph size="large" align="center">
      Confirmation email was sent to your email, please confirm it.
    </Paragraph>
  </Box>;
