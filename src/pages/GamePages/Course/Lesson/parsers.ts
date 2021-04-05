import { CardViewTypes } from 'src/components/organisms/CardView/types';
import { CourseDetailTypes } from 'src/store/course/types';
import { getCardStatus } from 'src/store/course/parsers';

export const parseCardViewData = (card: CourseDetailTypes.ICardDetailRender): CardViewTypes.ICard => ({
  category: null,
  categoryId: null,
  id: card.id,
  description: card.description,
  content: card.content,
  isKnowledge: card.isKnowledge,
  isFavourite: card.isFavorite,
  minutesToFinish: card.minutesToFinish,
  name: card.name,
  tags: card.tags,
  uuid: card.uuid,
  imageUrl: card.imageUrl,
  date: card.createdAt,
});

export const parseCardListItem = (raw: CourseDetailTypes.ICardDetailRender): CourseDetailTypes.ICardListItem => ({
  id: `${raw.id}`,
  name: raw.name,
  status: getCardStatus(raw.isFinished || false, raw.isCurrent || false),
});
