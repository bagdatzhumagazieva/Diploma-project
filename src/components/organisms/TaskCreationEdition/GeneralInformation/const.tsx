import { TaskGeneralInformationTypes } from 'src/components/organisms/TaskCreationEdition/GeneralInformation/types';
import { EXERCISE_TYPES } from 'src/components/molecules/Cards/CardMicroLearning/consts';

export const TASKS_TYPE = [
  {
    name: 'Статья',
    value: EXERCISE_TYPES.LONGREAD,
  },
  {
    name: 'Аудио',
    value: EXERCISE_TYPES.AUDIO_PODCAST,
  },
  {
    name: 'Видео',
    value: EXERCISE_TYPES.VIDEO,
  },
  {
    name: 'Опрос',
    value: EXERCISE_TYPES.POLL,
  },
  {
    name: 'Тест',
    value: EXERCISE_TYPES.TEST,
  },
];

export const DEFAULT_ERROR_MES: TaskGeneralInformationTypes.IDataErrorMessages = {
  rewardAmount: '',
  name: '',
  picture: '',
};
