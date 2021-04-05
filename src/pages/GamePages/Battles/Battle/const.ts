import { BattleTestTypes } from 'src/store/battles/types';
import { CardTypes } from 'src/store/card/types';
import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';

export const parseBattleQuiz = (raw: BattleTestTypes.IRenderCard): CardTypes.IRenderQuestion => ({
  content: raw.content,
  description: raw.description,
  id: raw.cardId,
  isShuffled: raw.isShuffled,
  questionText: raw.questionText,
  questionType: raw.questionType as VerificationQuestions,
  timeLimit: raw.timeLimit,
  uuid: raw.uuid,
  answerOptions: raw.answerOptions.map(ans => ({
    id: ans.id,
    imageUrl: ans.imageUrl,
    imageUrlThumbnail: ans.imageThumbnailUrl,
    questionId: ans.questionId,
    text: ans.text || '',
    uuid: ans.uuid,
    isCorrect: false,
  })),
  answerText: '',
  // markPoints: { data: ICardQuestionMarkPoint[] },
  markPointsCount: raw.markPointsNumber,
});
