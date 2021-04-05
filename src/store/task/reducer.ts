import { combineReducers } from 'redux';
import {
  parseAggregatorTaskData,
  parseAggregatorDetailTask,
  parseTaskStatistics,
  parseTaskStatisticByGroups,
  parseAdminTasks,
  parseMyTasksCount,
} from 'src/store/task/parsers';
import { ActionType, ILoadTypes, IPaginationResponseTypes, ResponseCodes } from 'src/core/store/types';
import { IRenderBody, IResponseBody } from 'src/core/components/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import {
  CREATE_TASK, DELETE_TASK, UPDATE_TASK, GET_TASKS_BY_AGGREGATOR,
  CREATE_ATTEMPT_TASK, GET_DETAIL_TASK_AGGREGATOR, GET_MY_TASKS,
  GET_TASK_STATISTICS, GET_TASK_STATISTICS_GROUPS, GET_STATISTICS_BY_GROUP,
  GET_USER_RESULT, GET_ADMIN_TASKS, TaskTypes, TaskAggregatorTypes, TaskAggregatorAdminTypes,
  TaskAggregatorGroupTypes, TaskStatisticsByGroups, CreateAttemptTask, MyTasks,
} from 'src/store/task/types';

const createdTaskState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case CREATE_TASK.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_TASK.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_TASK.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, data } = action.data;

      const responseStatus: IRenderBody<any> = {
        data,
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? 'Задание создано успешно'
          : (description || 'Error'),
      };

      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const updatedTaskState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case UPDATE_TASK.started:
      return {
        data: null,
        loading: true,
      };
    case UPDATE_TASK.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPDATE_TASK.success:
      return {
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};

const deletedTask = (
  state = { data: null, loading: false },
  action: ActionType<any>,
): ILoadTypes<any | null> => {
  switch (action.type) {
    case DELETE_TASK.started:
      return {
        data: null,
        loading: true,
      };
    case DELETE_TASK.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case DELETE_TASK.success:
      return {
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};

const detailTask = (
  state = { data: null, loading: false },
  action: ActionType<TaskAggregatorTypes.IResponseDetailProps>,
): ILoadTypes<TaskAggregatorTypes.IRenderDetailProps | null> => {
  switch (action.type) {
    case GET_DETAIL_TASK_AGGREGATOR.started:
      return {
        data: null,
        loading: true,
      };
    case GET_DETAIL_TASK_AGGREGATOR.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_DETAIL_TASK_AGGREGATOR.clear:
    case GET_DETAIL_TASK_AGGREGATOR.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = action.data && parseAggregatorDetailTask(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const tasksByAggregator = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ exercises: TaskAggregatorTypes.IResponseProps[] }>>,
): ILoadTypes<TaskAggregatorTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_TASKS_BY_AGGREGATOR.started:
      return {
        data: null,
        loading: true,
      };
    case GET_TASKS_BY_AGGREGATOR.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_TASKS_BY_AGGREGATOR.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { exercises, total } = action.data;
      const parsed = Array.isArray(exercises) ?
        exercises.map((n: TaskAggregatorTypes.IResponseProps) => parseAggregatorTaskData(n)) : [];
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const createdAttemptState = (
  state = { data: null, loading: false },
  action: ActionType<CreateAttemptTask.IResponseProps>,
): ILoadTypes<CreateAttemptTask.IRenderProps | null> => {
  switch (action.type) {
    case CREATE_ATTEMPT_TASK.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_ATTEMPT_TASK.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_ATTEMPT_TASK.success:
      const parsed = {
        rewardAmount: action.data.reward_amount,
        questions: action.data?.questions?.map(e => ({
          createdAt: e.created_at,
          updatedAt: e.updated_at,
          id: e.id,
          uuid: e.uuid,
          cardId: e.card_id,
          type: e.type,
          answerText: e.answer_text,
          answerIds: e.answer_ids,
          markPoints: e.mark_points,
          isCorrect: e.is_correct,
          correctAnswerIds: e.correct_answer_ids,
          correctMarkPoints: e.correct_mark_points,
          correctAnswerText: e.correct_answer_text,
        })),
      };
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const myTasksTotal = (
  state = { data: null, loading: false },
  action: ActionType<MyTasks.IResponseProps>,
): ILoadTypes<MyTasks.IRenderProps | null> => {
  switch (action.type) {
    case GET_MY_TASKS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_MY_TASKS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_MY_TASKS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseMyTasksCount(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const taskStatistics = (
  state = { data: null, loading: false },
  action: ActionType<TaskAggregatorAdminTypes.IResponseProps>,
): ILoadTypes<TaskAggregatorAdminTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_TASK_STATISTICS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_TASK_STATISTICS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_TASK_STATISTICS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = action.data && parseTaskStatistics(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const taskGroups = (
  state = { data: null, loading: false },
  action: ActionType<TaskAggregatorGroupTypes.IResponseProps[]>,
): ILoadTypes<TaskAggregatorGroupTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_TASK_STATISTICS_GROUPS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_TASK_STATISTICS_GROUPS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_TASK_STATISTICS_GROUPS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = action.data && action.data.map(e => ({
        id: e.entity_id,
        uuid: e.entity_uuid,
        companyId: e.company_id,
        name: e.name,
        groupType: e.group_type,
      }));
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const userResult = (
  state = { data: null, loading: false },
  action: ActionType<TaskAggregatorTypes.IResponseDetailProps>,
): ILoadTypes<TaskAggregatorTypes.IRenderDetailProps | null> => {
  switch (action.type) {
    case GET_USER_RESULT.started:
      return {
        data: null,
        loading: true,
      };
    case GET_USER_RESULT.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_USER_RESULT.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = action.data && parseAggregatorDetailTask(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const groupStatistics = (
  state = { data: null, loading: false },
  action: ActionType<TaskStatisticsByGroups.IResponse>,
): ILoadTypes<TaskStatisticsByGroups.IRender | null> => {
  switch (action.type) {
    case GET_STATISTICS_BY_GROUP.started:
      return {
        data: null,
        loading: true,
      };
    case GET_STATISTICS_BY_GROUP.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_STATISTICS_BY_GROUP.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = action.data && parseTaskStatisticByGroups(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const tasksAdmin = (
  state = { data: null, loading: false },
  action: ActionType<TaskTypes.IResponseAdmin>,
): ILoadTypes<TaskTypes.IRenderAdmin | null> => {
  switch (action.type) {
    case GET_ADMIN_TASKS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ADMIN_TASKS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ADMIN_TASKS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = action.data && parseAdminTasks(
        { total: action.data.total, exercises: action.data.exercises });
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const taskReducer = combineReducers({
  createdTaskState,
  deletedTask,
  updatedTaskState,
  tasksByAggregator,
  createdAttemptState,
  detailTask,
  myTasksTotal,
  taskStatistics,
  taskGroups,
  userResult,
  groupStatistics,
  tasksAdmin,
});

export default taskReducer;
