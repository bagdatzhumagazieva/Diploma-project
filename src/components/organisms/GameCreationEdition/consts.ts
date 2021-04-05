import { GameCreationEditionTypes } from 'src/components/organisms/GameCreationEdition/types';
import { Status } from 'src/store/course/types';

export const CREATION_STEPS = ['Общая информация', 'Вознаграждения', 'Контент', 'Предпросмотр'];

export const DEFAULT_GAME_DATA: GameCreationEditionTypes.IGame = {
  status: Status.DRAFT,
  isModifiersIncluded: false,
  id: -1,
  name: '',
  description: '',
  imageUrl: '',
  imageThumbnailUrl: '',
  tags: [],
  groupIds: [],
  certificateExpirationDays: 0,
  certificateImageUrl: '',
  certificateImageThumbnailUrl: '',
  rewardAmount: 0,
  certificateEarnMinPercent: 0,
  templateId: -1,
};
