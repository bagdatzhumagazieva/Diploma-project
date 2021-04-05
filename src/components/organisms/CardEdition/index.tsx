import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { getCardAsAdmin } from 'src/store/card/actions';
import { getCategories } from 'src/store/category/actions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { findCategoryFromArray } from 'src/utils/helpers';

import Typography from 'src/components/atoms/Typography';
import Preloader from 'src/components/atoms/Preloader';
import CardCreation from 'src/components/organisms/CardCreation';

import {
  VerificationQuestions,
  VerificationQuestionsInitVal,
  VerificationQuestionsTypes,
} from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { CardVerificationQuestionTypes } from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';
import { CardGeneralInformationTypes } from 'src/components/organisms/CardCreation/CardGeneralInformation/types';
import { CardEditionTypes } from 'src/components/organisms/CardEdition/types';
import { CardContentTypes } from 'src/components/organisms/CardCreation/CardContent/types';
import { CardTypes } from 'src/store/card/types';

function CardEdition(props: CardEditionTypes.IProps) {
  const {
    getCardAsAdmin, adminCardState, getCategories, categories,
    cardId, isModal, handleCreationFinished, handleModalCloseClick,
    isQuizCard,
  } = props;
  const { data: adminCard, loading, errorMessage } = adminCardState || {};
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const selectedCategory = categories && adminCard && findCategoryFromArray(categories, +adminCard.categoryId);

  const generalInformation: CardGeneralInformationTypes.IGeneralInformation = {
    title: adminCard?.name || '',
    tags: adminCard?.tags || [],
    isIncludedInBase: adminCard?.isKnowledge || false,
    category: {
      value: selectedCategory ? `${selectedCategory.id}` : '',
      name: selectedCategory ? selectedCategory.name : '',
    },
    imageUrl: adminCard?.imageUrl || '',
    imageThumbnailUrl: adminCard?.imageThumbnailUrl || '',
  };

  const content: CardContentTypes.IContent = {
    description: adminCard?.description || '',
    article: adminCard?.content || '',
    timeToStudy: adminCard?.minutesToFinish || 0,
  };

  const parseQuestion = (rawQuestion: CardTypes.IRenderQuestion) => {
    const verificationQuestions: CardVerificationQuestionTypes.IVerificationQuestionsTypes = {
      ...VerificationQuestionsInitVal,
    };
    if (rawQuestion.questionType === VerificationQuestions.OpenQuestion) {
      verificationQuestions.openQuestion = {
        question: rawQuestion.questionText,
        instruction: rawQuestion.description,
        appendix: rawQuestion.content,
        timeToAnswer: rawQuestion.timeLimit,
        answer: rawQuestion.answerText || '',
        id: rawQuestion.id,
      };
    } else if (rawQuestion.questionType === VerificationQuestions.OneOfList) {
      verificationQuestions.oneOfList = {
        question: rawQuestion.questionText,
        instruction: rawQuestion.description,
        appendix: rawQuestion.content,
        timeToAnswer: rawQuestion.timeLimit,
        answerOptions: {
          options: rawQuestion.answerOptions
            ? rawQuestion.answerOptions.map(n => ({ id: `${n.id}`, label: n.text }))
            : verificationQuestions.oneOfList.answerOptions.options,
          selectedOption: rawQuestion.answerOptions
            ? (`${rawQuestion.answerOptions.find(n => n.isCorrect)?.id}` || '0')
            : verificationQuestions.oneOfList.answerOptions.selectedOption,
          isShuffled: rawQuestion.isShuffled,
        },
        id: rawQuestion.id,
      };
    } else if (rawQuestion.questionType === VerificationQuestions.ImageFromList) {
      verificationQuestions.imagesFromList = {
        question: rawQuestion.questionText,
        instruction: rawQuestion.description,
        appendix: rawQuestion.content,
        timeToAnswer: rawQuestion.timeLimit,
        images: {
          imagesList: rawQuestion.answerOptions
            ? rawQuestion.answerOptions.reduce(
              (obj, item) =>
                Object.assign(
                  obj,
                  {
                    [item.uuid]: {
                      id: item.id,
                      url: item.imageUrl,
                      uuid: item.uuid,
                      thumbnail: item.imageUrlThumbnail,
                      name: item.text,
                    }},
                ),
              {},
            ) : {},
          selectedImage: rawQuestion.answerOptions ? rawQuestion.answerOptions?.find(n => n.isCorrect)?.uuid : '',
        },
        id: rawQuestion.id,
      };
    } else if (rawQuestion.questionType === VerificationQuestions.FewFromList) {
      verificationQuestions.fewFromList = {
        question: rawQuestion.questionText,
        instruction: rawQuestion.description,
        appendix: rawQuestion.content,
        timeToAnswer: rawQuestion.timeLimit,
        answerOptions: {
          options: rawQuestion.answerOptions
            ? rawQuestion.answerOptions.map(n => ({ id: `${n.id}`, label: n.text }))
            : verificationQuestions.fewFromList.answerOptions.options,
          selectedOptions: rawQuestion.answerOptions
            ? rawQuestion.answerOptions.filter(n => n.isCorrect).map(n => `${n.id}`)
            : [],
          isShuffled: rawQuestion.isShuffled,
        },
        id: rawQuestion.id,
      };
    } else if (rawQuestion.questionType === VerificationQuestions.QuestionPhotoTag) {
      const image = rawQuestion.answerOptions && rawQuestion.answerOptions[0];
      verificationQuestions.questionPhotoTag = {
        question: rawQuestion.questionText,
        instruction: rawQuestion.description,
        appendix: rawQuestion.content,
        timeToAnswer: rawQuestion.timeLimit,
        ...image && {
          photoTag: {
            image: {
              url: image.imageUrl || '',
              uuid: image.uuid || '',
              thumbnail: image.imageUrlThumbnail || '',
              name: image.text,
              id: image.id,
              contentType: '',
            },
            marks: rawQuestion.markPoints
              ? rawQuestion.markPoints.data.map((n, i) => ({
                id: `${i}`,
                x: n.a.x,
                y: n.a.y,
              }))
              : [],
            imageNatureHeight: 0,
            imageNatureWidth: 0,
          },
        },
        id: rawQuestion.id,
      };
    } else if (rawQuestion.questionType === VerificationQuestions.SequenceFromList) {
      verificationQuestions.sequenceFromList = {
        question: rawQuestion.questionText,
        instruction: rawQuestion.description,
        appendix: rawQuestion.content,
        timeToAnswer: rawQuestion.timeLimit,
        sequenceAnswerOptions: {
          correct: rawQuestion.answerOptions
            ? rawQuestion.answerOptions.filter(n => n.isCorrect).map(m => ({ id: `${m.id}`, text: m.text }))
            : [],
          inCorrect: rawQuestion.answerOptions
            ? rawQuestion.answerOptions.filter(n => !n.isCorrect).map(m => ({ id: `${m.id}`, text: m.text }))
            : [],
        },
        id: rawQuestion.id,
      };
    }
    return verificationQuestions;
  };

  useEffect(
    () => {
      if (cardId) {
        getCardAsAdmin && getCardAsAdmin(+cardId);
        getCategories && getCategories(companyId);
      }
    },
    [cardId],
  );

  return (
    <Preloader
      loading={loading}
      label="Редактирование карточки"
      className="py-48"
    >
      {errorMessage && (
        <Typography
          variant="text"
          color="red"
          className="text-center my-8"
        >
          {errorMessage}
        </Typography>
      )}
      {generalInformation && adminCard?.question && (
        <CardCreation
          type="edit"
          isQuizCard={isQuizCard}
          isModal={isModal}
          cardId={cardId}
          questionId={adminCard?.question?.id}
          generalInformation={generalInformation}
          content={content}
          verificationQuestions={parseQuestion(adminCard?.question)}
          selectedQuestionType={VerificationQuestionsTypes.find(n => n.value === adminCard?.question.questionType)}
          handleModalCloseClick={handleModalCloseClick}
          handleCreationFinished={handleCreationFinished}
        />
      )}
    </Preloader>
  );
}

const mapStateToProps = (state: any) => ({
  categories: state.categoryReducer.categories.data,
  adminCardState: state.cardReducer.adminCard,
});

const mapDispatchToProps = {
  getCardAsAdmin,
  getCategories,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(CardEdition);
