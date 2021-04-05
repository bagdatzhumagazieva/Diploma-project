import { combineReducers } from 'redux';
import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import { ActivitiesTypes, GET_ACTIVITIES, GET_ACTIVITIES_COUNT } from 'src/store/activities/types';

const parseActivitiesData = (raw: ActivitiesTypes.IResponseProps): ActivitiesTypes.IRenderProps => ({
  id: raw.entity_id,
  uuid: raw.entity_uuid,
  type: raw.type || 'COURSE',
  isFinished: raw.is_finished,
  name: raw.name || '',
  date: raw.created_at,
  image: raw.image_url || '',
  imageThumbnail: raw.image_thumbnail_url || '',
  description: raw.description || '',
  rewardAmount: raw.reward_amount || 0,
  progress: raw.progress || 0,
});

const parseActivitiesCount =
  (raw: ActivitiesTypes.IResponseActivitiesCountProps): ActivitiesTypes.IRenderActivitiesCountProps =>
    ({
      pendingCount: raw.pending_count,
      currentCount: raw.current_count,
      finishedCount: raw.finished_count,
    });

const activities = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ entities: ActivitiesTypes.IResponseProps[] }>>,
): ILoadTypes<ActivitiesTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_ACTIVITIES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ACTIVITIES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ACTIVITIES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { total, entities } = action.data;
      const parsed = entities.map(item => parseActivitiesData(item));
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const activitiesCount = (
  state = { data: null, loading: false },
  action: ActionType<ActivitiesTypes.IResponseActivitiesCountProps>,
): ILoadTypes<ActivitiesTypes.IRenderActivitiesCountProps | null> => {
  switch (action.type) {
    case GET_ACTIVITIES_COUNT.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ACTIVITIES_COUNT.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ACTIVITIES_COUNT.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseActivitiesCount(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const achievementReducer = combineReducers(
  {
    activities,
    activitiesCount,
  },
);

export default achievementReducer;
