import { CardTypes } from 'src/store/card/types';

export const parseCardData = (raw: CardTypes.IResponseProps): CardTypes.IRenderProps => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  imageUrl: raw.image_url || '',
  imageUrlThumbnail: raw.image_thumbnail_url || '',
  minutesToFinish: raw.minutes_to_finish || 0,
  content: raw.content || '',
});

export const parseCardDataAggregator = (raw: CardTypes.ICardResponseProps): CardTypes.IRenderProps => ({
  id: raw.entity_id,
  name: raw.name,
  description: raw.description,
  imageUrl: raw.image_url || '',
  imageUrlThumbnail: raw.image_thumbnail_url || '',
  minutesToFinish: raw.minutes_to_finish || 0,
  content: raw.content || '',
});

export const parseFullCardData = (raw: CardTypes.IFullResponseProps): CardTypes.IFullRenderProps => ({
  categoryId: raw.category_id,
  category: raw.category && parseFullCardCategory(raw.category),
  content: raw.content,
  description: raw.description,
  id: raw.id,
  isKnowledge: raw.is_knowledge,
  isFavourite: raw.is_favorite,
  minutesToFinish: raw.minutes_to_finish,
  name: raw.name,
  question: parseQuestionData(raw.question),
  tags: raw.tags,
  uuid: raw.uuid,
  imageUrl: raw.image_url || '',
  imageThumbnailUrl: raw.image_thumbnail_url || '',
});

export const parseQuestionData = (raw: CardTypes.IResponseQuestion): CardTypes.IRenderQuestion => ({
  content: raw?.content || '',
  description: raw?.description || '',
  id: raw?.id || 0,
  isShuffled: raw?.is_shuffled || false,
  questionText: raw?.question_text || '',
  questionType: raw?.question_type || '',
  timeLimit: raw?.time_limit || 0,
  uuid: raw?.uuid || '',
  answerOptions: raw?.answer_options && raw?.answer_options.map(n => parseQuestionAnswerData(n)),
  answerText: raw?.answer_text,
  markPointsCount: raw?.mark_points_number,
  markPoints: raw?.mark_points,
});

export const parseQuestionAnswerData = (raw: CardTypes.IResponseAnswerOptions): CardTypes.IRenderAnswerOptions => ({
  id: raw.id,
  imageUrl: raw.image_url,
  imageUrlThumbnail: raw.image_thumbnail_url,
  questionId: raw.question_id,
  text: raw.text,
  uuid: raw.uuid,
  isCorrect: raw.is_correct,
});

const parseFullCardCategory = (raw: CardTypes.IResponseCategory): CardTypes.IRenderCategory => ({
  id: raw.id,
  uuid: raw.uuid,
  name: raw.name,
  parentCategory: raw.parent_category && parseFullCardCategory(raw.parent_category),
});
