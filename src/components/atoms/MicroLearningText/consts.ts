import { EXERCISE_TYPES } from 'src/components/molecules/Cards/CardMicroLearning/consts';

export const getMicroLearningTitle = (type: string): string => {
  switch (type) {
    case EXERCISE_TYPES.LONGREAD: return 'Статья';
    case EXERCISE_TYPES.AUDIO_PODCAST: return 'Аудиоподкаст';
    case EXERCISE_TYPES.POLL: return 'Опрос';
    case EXERCISE_TYPES.TEST: return 'Тест';
    default: return 'Видео';
  }
};
