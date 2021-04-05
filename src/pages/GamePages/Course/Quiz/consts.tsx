import React from 'react';
import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import RadioImage from 'src/components/molecules/Questions/RadioImage';
import Multiple from 'src/components/molecules/Questions/Multiple';
import Single from 'src/components/molecules/Questions/Single';
import Cloud from 'src/components/molecules/Questions/Cloud';
import PhotoMark from 'src/components/molecules/Questions/PhotoMark';
import Open from 'src/components/molecules/Questions/Open';
import { CardTypes } from 'src/store/card/types';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';
import { QuizTypes } from 'src/pages/GamePages/Course/Quiz/types';

export const checkIsValid = (
  questionType?: VerificationQuestions,
  answerBody?: CourseCompleteTypes.IQuestionCompleteBody,
  answerOptions?: CardTypes.IRenderAnswerOptions[],
  markPointsCount?: number,
) => {
  if (!questionType || !answerBody || !answerOptions) return false;
  switch (questionType) {
    case VerificationQuestions.OneOfList:
    case VerificationQuestions.ImageFromList:
      return (Array.isArray(answerBody.answerIds) && answerBody.answerIds.length === 1);
    case VerificationQuestions.FewFromList:
      return (Array.isArray(answerBody.answerIds) && answerBody.answerIds.length > 0);
    case VerificationQuestions.SequenceFromList:
      return (Array.isArray(answerOptions) && Array.isArray(answerBody.answerIds)
        && answerOptions.length === answerBody.answerIds.length);
    case VerificationQuestions.OpenQuestion:
      return (!!answerBody.answerText && answerBody.answerText.length > 0);
    default:
      return (!!markPointsCount && Array.isArray(answerBody.markPoints) &&
        markPointsCount === answerBody.markPoints.length);
  }
};

export const getQuestionCard = (
  question: CardTypes.IRenderQuestion,
  handleSelectedIds?: (ids: number[]) => void,
  handlePhotoMarkPoints?: (marks: CardTypes.ICardQuestionMarkPointPosition[]) => void,
  handleOpenQuestionChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isCorrect?: boolean,
  correctAnswerIds?: number[],
  correctMarkPoints?: CardTypes.ICardQuestionMarkPoint[],
): JSX.Element => {
  const { questionType, id, description, content, answerOptions, questionText, markPointsCount } = question;
  switch (questionType) {
    case VerificationQuestions.ImageFromList:
      return (
        <RadioImage
          key={id}
          isChecked={!!correctAnswerIds}
          title={questionText}
          instruction={description}
          appendix={content}
          selectedImage={0}
          images={answerOptions?.map(n =>
                                       ({ id: n.id, src: n.imageUrlThumbnail || '', text: n.text })) || []}
          handleClickedAnswer={(id: number) => handleSelectedIds && handleSelectedIds([id])}
          correctAnswerId={(Array.isArray(correctAnswerIds) &&
            correctAnswerIds.length > 0 && correctAnswerIds[0]) || undefined}
        />
      );
    case VerificationQuestions.FewFromList:
      return (
        <Multiple
          key={id}
          isChecked
          instruction={description}
          appendix={content}
          title={questionText}
          options={answerOptions?.map(n => ({ ...n, text: n.text })) || []}
          handleSelectedAnswers={handleSelectedIds}
          correctAnswerIds={(Array.isArray(correctAnswerIds) &&
            correctAnswerIds.length > 0 && correctAnswerIds) || undefined}
        />
      );
    case VerificationQuestions.OneOfList:
      return (
        <Single
          key={id}
          isChecked
          title={questionText}
          instruction={description}
          appendix={content}
          options={answerOptions?.map(n => ({ ...n, text: n.text })) || []}
          handleClickedAnswer={(id: number) => handleSelectedIds && handleSelectedIds([id])}
          correctAnswerId={(Array.isArray(correctAnswerIds) &&
            correctAnswerIds.length > 0 && correctAnswerIds[0]) || undefined}
        />
      );
    case VerificationQuestions.SequenceFromList:
      return (
        <Cloud
          key={id}
          isChecked
          title={questionText}
          instruction={description}
          appendix={content}
          options={answerOptions?.map(n => ({ ...n, text: n.text })) || []}
          isCorrect={isCorrect}
          handleSelectedAnswers={handleSelectedIds}
        />
      );
    case VerificationQuestions.QuestionPhotoTag:
      return (
        <PhotoMark
          key={id}
          isChecked={!!correctMarkPoints}
          title={questionText}
          instruction={description}
          appendix={content}
          image={{
            id: answerOptions ? answerOptions[0].uuid : '',
            imageUrl: answerOptions ?
              answerOptions[0]?.imageUrl || '' : '',
          }}
          marksCount={markPointsCount || 0}
          correctMarkPoints={correctMarkPoints}
          handleSelectedAnswers={handlePhotoMarkPoints}
        />
      );
    default :
      return (
        <Open
          key={id}
          isChecked
          title={questionText}
          instruction={description}
          appendix={content}
          isCorrect={isCorrect}
          onChange={handleOpenQuestionChange}
        />
      );
  }
};

export const QUESTION_RESPONSE: QuizTypes.IQuestionResponse = {
  isCorrect: undefined,
  answerIds: undefined,
  correctMarkPoints: undefined,
};
