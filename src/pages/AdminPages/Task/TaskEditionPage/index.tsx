import React from 'react';
import { withRouter } from 'react-router';
import Layout from 'src/components/organisms/Layout';
import TaskCreationEditionPage from 'src/components/organisms/TaskCreationEdition';
import { TaskEditionTypes } from 'src/pages/AdminPages/Task/TaskEditionPage/types';
import 'src/pages/AdminPages/Task/TaskCreationPage/index.scss';

function TaskEditionPage(props: TaskEditionTypes.IProps) {
  const { history } = props;
  const taskId = history.location.pathname.split('/').pop() || '';

  return (
    <Layout
      isAdminRouting
      className="task-creation"
    >
      <TaskCreationEditionPage
        type="edit"
        taskId={typeof +taskId === 'number' ? +taskId : undefined  }
      />
    </Layout>
  );
}

export default withRouter(TaskEditionPage);
