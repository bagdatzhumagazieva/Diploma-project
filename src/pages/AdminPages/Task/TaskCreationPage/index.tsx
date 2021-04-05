import React from 'react';
import Layout from 'src/components/organisms/Layout';
import TaskCreationEditionPage from 'src/components/organisms/TaskCreationEdition';
import { TaskCreationTypes } from 'src/pages/AdminPages/Task/TaskCreationPage/types';
import 'src/pages/AdminPages/Task/TaskCreationPage/index.scss';

function TaskCreationPage(props: TaskCreationTypes.IProps) {
  return (
    <Layout
      isAdminRouting
      className="task-creation"
    >
      <TaskCreationEditionPage type="create" />
    </Layout>
  );
}

export default TaskCreationPage;
