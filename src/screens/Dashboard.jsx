import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

const Dashboard = ({ tasks }, { intl }) => {
  let listNode;
  tasks = [
    {
      name: 'task',
      percentComplete: 12
    }
  ];
  if (tasks.length === 0) {
    listNode = (
      <Box direction="row" responsive={false} pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}>
        <Spinning /><span>Loading...</span>
      </Box>
    );
  } else {
    const tasksNode = (tasks || []).map((task, index) =>
      <ListItem key={index} justify="between">
        <Label><Anchor path={`/tasks/${task.id}`} label={task.name} /></Label>
        <Box direction="row" responsive={false} pad={{ between: 'small' }}>
          <Value value={task.percentComplete} units="%" align="start" size="small" />
          <Meter value={task.percentComplete} />
        </Box>
      </ListItem>
    );

    listNode = (
      <List>
        {tasksNode}
      </List>
    );
  }

  return (
    <Article primary>
      <Header direction="row" justify="between" size="large" pad={{ horizontal: 'medium', between: 'small' }}>
        <NavControl name={getMessage(intl, 'Tasks')} />
      </Header>
      <Box pad={{ horizontal: 'medium' }}>
        <Paragraph size="large">
          The backend here is using websocket.
        </Paragraph>
      </Box>
      {listNode}
    </Article>
  );
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

Dashboard.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.tasks });

export default connect(select)(Dashboard);
