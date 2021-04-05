import React, { useState } from 'react';
import { connect } from 'react-redux';

import Typography from 'src/components/atoms/Typography';
import Tabs from 'src/components/molecules/Tabs';
import TaskResultEmployees from 'src/components/organisms/TaskDetail/TaskDetailResult/TaskResultEmployees';
import TaskResultGenInfo from 'src/components/organisms/TaskDetail/TaskDetailResult/GeneralInformation';
import taskActions from 'src/store/task/actions';
import { TASK_RESULT_TABS } from 'src/components/organisms/TaskDetail/TaskDetailResult/const';
import { TaskDetailResultTypes } from 'src/components/organisms/TaskDetail/TaskDetailResult/types';
import 'src/components/organisms/TaskDetail/TaskDetailResult/index.scss';

function TaskDetailResult(props: TaskDetailResultTypes.IProps) {
  const { usersData, selectedGroups,
    setSelectedGroups, companyId, taskId } = props;
  const [activeTab, setActiveTab] = useState<string>(TASK_RESULT_TABS[0].id);
  const handleActiveTab = (id: string) => setActiveTab(id);

  const tabs = [
    <TaskResultGenInfo
      taskId={taskId}
      companyId={companyId}
      selectedGroups={selectedGroups}
      setSelectedGroups={setSelectedGroups}
    />,
    <TaskResultEmployees
      taskId={taskId}
      companyId={companyId}
      usersData={usersData}
    />,
  ];

  return (
    <div className="task-result">
      {usersData?.length ? (
        <div className="p-64">
          <div className="d-flex justify-content-between mb-16">
            <Typography variant="h1">{usersData?.length && `${usersData.length} ответа`}</Typography>
          </div>
          <Tabs
            key={activeTab}
            tabOptions={TASK_RESULT_TABS}
            activeId={activeTab}
            setActiveTabId={handleActiveTab}
          >
            {tabs.map((item, index) => (
              <div key={TASK_RESULT_TABS[index].id}>
                {item}
              </div>
            ))}
          </Tabs>
        </div>
      ) : (
        <div className="d-flex justify-content-around p-64">
          <Typography variant="text" color="grey_additional_2" className="p-16">
            Еще никто не прошел данную задачу.
          </Typography>
        </div>
        )
      }
    </div>
  );
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
  onGetTaskStatistics: taskActions.getTaskStatistics,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(TaskDetailResult);
