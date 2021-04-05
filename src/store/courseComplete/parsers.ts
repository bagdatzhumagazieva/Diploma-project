import { CourseCompleteTypes } from 'src/store/courseComplete/types';
import { parseQuestionData } from 'src/store/card/parsers';

export const parseAttemptQuestionData = (attemptQuestion: CourseCompleteTypes.IResponseAttemptQuestion): CourseCompleteTypes.IRenderAttemptQuestion => ({
  id: attemptQuestion.attempt_question?.id || 0,
  question: parseQuestionData(attemptQuestion.question),
});
