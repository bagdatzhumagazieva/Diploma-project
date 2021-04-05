import React from 'react';
import Typography from 'src/components/atoms/Typography';
import UserActivityTasks from 'src/components/molecules/UserActivityTasks';
import { UserTaskStatuses } from 'src/components/atoms/Cards/CardTask/consts';
import { TabActivityTypes } from 'src/pages/GamePages/Profile/types';

function TabActivity(props: TabActivityTypes.IProps) {
  const { companyId } = props;

  return (
    <>
      <Typography variant="h1" classNames="mb-16">Задания</Typography>
      <UserActivityTasks
        statusOptions={UserTaskStatuses}
        companyId={companyId}
        classNames="profile__user-activity-tasks"
      />
    </>
  );
}

export default TabActivity;
