import React from 'react';
import { IOption } from 'src/components/molecules/Select/types';
import { TASKS_TYPE } from 'src/components/organisms/TaskCreationEdition/GeneralInformation/const';
import { DEFAULT_TASK_VALUE } from 'src/components/organisms/TaskCreationEdition/consts';
import { EXERCISE_TYPES } from 'src/components/molecules/Cards/CardMicroLearning/consts';
import { TaskTypes } from 'src/store/task/types';

const TaskCreationContext = React.createContext({
  step: 0, setStep: (step: number) => {},
  publication: TASKS_TYPE[0], setPublication: (publication: IOption) => {},
  taskData: DEFAULT_TASK_VALUE, setTaskData: (taskData: TaskTypes.IBodyProps) => {},
},
);

export const isTestPollType = (publication: IOption) => {
  return (publication.value === EXERCISE_TYPES.TEST || publication.value === EXERCISE_TYPES.POLL);
};

export default TaskCreationContext;
