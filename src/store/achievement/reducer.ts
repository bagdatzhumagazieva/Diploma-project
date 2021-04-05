import { combineReducers } from 'redux';
import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import { AchievementTypes, GET_ACHIEVEMENTS, GET_ACHIEVEMENTS_COUNT } from 'src/store/achievement/types';

const parseAchievementData = (raw: AchievementTypes.IResponseProps): AchievementTypes.IRenderProps => ({
  id: raw.id,
  uuid: raw.uuid,
  name: raw.name || '',
  image: raw.image_url || '',
  imageThumbnail: raw.image_thumbnail_url || '',
  description: raw.description || '',
  rewardAmount: raw.reward_amount || 0,
});

const parseActivitiesCount =
  (raw: AchievementTypes.IResponseAchievementCountProps): AchievementTypes.IRenderAchievementCountProps =>
    ({
      coursesCount: raw.courses_count,
      spentTime: raw.spent_time,
      certificatesCount: raw.certificates_count,
    });

const achievements = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ achievements: AchievementTypes.IResponseProps[] }>>,
): ILoadTypes<AchievementTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_ACHIEVEMENTS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ACHIEVEMENTS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ACHIEVEMENTS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { total, achievements, next_page } = action.data;
      const parsed = achievements.map(item => parseAchievementData(item));
      return {
        total,
        data: parsed,
        loading: false,
        nextPage: next_page,
      };
    default:
      return state;
  }
};

const achievementsCount = (
  state = { data: null, loading: false },
  action: ActionType<AchievementTypes.IResponseAchievementCountProps>,
): ILoadTypes<AchievementTypes.IRenderAchievementCountProps | null> => {
  switch (action.type) {
    case GET_ACHIEVEMENTS_COUNT.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ACHIEVEMENTS_COUNT.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ACHIEVEMENTS_COUNT.success:
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
    achievements,
    achievementsCount,
  },
);

export default achievementReducer;
