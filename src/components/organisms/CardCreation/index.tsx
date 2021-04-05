import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import useNotification from 'src/components/molecules/Notification/useNotification';
import CardCreationContext from 'src/components/organisms/CardCreation/CardCreationContext';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { findCategoryPath } from 'src/utils/helpers';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import { IRenderBody } from 'src/core/components/types';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import { getCategories, clearCategoriesState } from 'src/store/category/actions';
import cardActions from 'src/store/card/actions';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Stepper from 'src/components/atoms/Stepper';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import CardContent from 'src/components/organisms/CardCreation/CardContent';
import CardVerificationQuestion from 'src/components/organisms/CardCreation/CardVerificationQuestion';
import CardGeneralInformation from 'src/components/organisms/CardCreation/CardGeneralInformation';

import { CardCreationSteps } from 'src/components/organisms/CardCreation/consts';
import { CardCreationTypes } from 'src/components/organisms/CardCreation/types';
import { GeneralInformationInitVal } from 'src/components/organisms/CardCreation/CardGeneralInformation/const';
import { CardGeneralInformationTypes } from 'src/components/organisms/CardCreation/CardGeneralInformation/types';
import CardPreview from 'src/components/organisms/CardCreation/CardPreview';
import { ContentInitVal } from 'src/components/organisms/CardCreation/CardContent/const';
import { CardVerificationQuestionTypes } from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';
import { CardContentTypes } from 'src/components/organisms/CardCreation/CardContent/types';
import {
  markSize,
  VerificationQuestions,
  VerificationQuestionsInitVal,
  VerificationQuestionsTypes,
} from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { IOption } from 'src/components/molecules/Select/types';
import { CardTypes } from 'src/store/card/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import IconDelete from 'src/assets/img/icons/delete.svg';
import { ReactComponent as CancelIcon } from 'src/assets/img/icons/think-close.svg';
import 'src/components/organisms/CardCreation/index.scss';

function CardCreation(props: CardCreationTypes.IProps) {
  const {
    type, categories, createdCardState, deletedCardState,
    updatedCardState, getCategories, createCard, updateCard,
    deleteCard, generalInformation: propsGeneralInformation, clearCategoriesState,
    content: propsContent, verificationQuestions: propsVerificationQuestions,
    selectedQuestionType: propsSelectedQuestionType, isModal, handleCreationFinished,
    handleModalCloseClick, cardId, isQuizCard, questionId,
  } = props;

  const notification = useNotification();
  const history = useHistory();

  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isDeleteCardModalOpen, setDeleteCardModal] = useState<boolean>(false);
  const [generalInformation, setGeneralInformation] = useState(GeneralInformationInitVal);
  const [content, setContent] = useState(ContentInitVal);
  const [selectedQuestionType, setSelectedQuestionType] = useState(VerificationQuestionsTypes[0]);

  useEffect(
    () => {
      propsGeneralInformation && setGeneralInformation(propsGeneralInformation);
    },
    [propsGeneralInformation],
  );

  useEffect(
    () => {
      propsContent && setContent(propsContent);
    },
    [propsContent],
  );

  useEffect(
    () => {
      propsSelectedQuestionType && setSelectedQuestionType(propsSelectedQuestionType);
    },
    [propsSelectedQuestionType],
  );

  const [verificationQuestions, setVerificationQuestions] =
    useState<CardVerificationQuestionTypes.IVerificationQuestionsTypes>(VerificationQuestionsInitVal);

  useEffect(
    () => {
      propsVerificationQuestions && setVerificationQuestions(propsVerificationQuestions);
    },
    [propsVerificationQuestions],
  );

  useEffect(
    () => {
      getCategories && getCategories(companyId, 1, 100);
      return () => {
        clearCategoriesState && clearCategoriesState();
      };
    },
    [],
  );

  useEffect(
    () => {
      const redirectToCardsPage = (cardState: IRenderBody) => {
        if (cardState.responseType === NotificationType.Success) {
          history.push(addAdminSlash(AdminRouterPaths.KNOWLEDGE_BASE));
        }
      };

      if (createdCardState) {
        notification.addStateNotification(createdCardState);
        if (isModal) {
          handleCreationFinished && handleCreationFinished(createdCardState);
        } else {
          redirectToCardsPage(createdCardState);
        }
      }
      if (deletedCardState) {
        notification.addStateNotification(deletedCardState);
        redirectToCardsPage(deletedCardState);
      }
      if (updatedCardState) {
        if (isModal) {
          handleCreationFinished && handleCreationFinished(updatedCardState);
        } else {
          redirectToCardsPage(updatedCardState);
        }
        notification.addStateNotification(updatedCardState);
      }
    },
    [createdCardState, deletedCardState, updatedCardState],
  );

  const categoryPath = categories
    && generalInformation.category
    && findCategoryPath(categories, +generalInformation.category.value);

  const onGeneralInfoStepCompleted = (info: CardGeneralInformationTypes.IGeneralInformation) => {
    setGeneralInformation(info);
    setCurrentStep(currentStep + 1);
  };

  const onContentStepCompleted = (content: CardContentTypes.IContent) => {
    setContent(content);
    setCurrentStep(currentStep + 1);
  };

  const onQuestionStepCompleted = (
    verificationQuestions: CardVerificationQuestionTypes.IVerificationQuestionsTypes,
    type: IOption,
  ) => {
    setVerificationQuestions(verificationQuestions);
    setSelectedQuestionType(type);
    setCurrentStep(currentStep + 1);
  };

  const onStepBack = () => setCurrentStep(currentStep - 1);

  const onPreviewStepCompleted = () => {
    let cardQuestion: CardTypes.ICardQuestion = {} as CardTypes.ICardQuestion;
    const {
      openQuestion,
      oneOfList,
      imagesFromList,
      fewFromList,
      sequenceFromList,
      questionPhotoTag,
    } = verificationQuestions;

    if (selectedQuestionType.value === VerificationQuestions.OpenQuestion) {
      cardQuestion = {
        question_text: openQuestion.question,
        description: openQuestion.instruction || '',
        content: openQuestion.appendix || '',
        time_limit: +openQuestion.timeToAnswer,
        answer_text: openQuestion.answer,
        question_type: VerificationQuestions.OpenQuestion,
        question_id: openQuestion.id,
      };
    } else if (selectedQuestionType.value === VerificationQuestions.OneOfList) {
      cardQuestion = {
        question_text: oneOfList.question,
        description: oneOfList.instruction || '',
        content: oneOfList.appendix || '',
        time_limit: oneOfList.timeToAnswer,
        is_shuffled: oneOfList.answerOptions.isShuffled,
        answer_options: oneOfList.answerOptions.options.map(n => ({
          is_correct: n.id === oneOfList.answerOptions.selectedOption,
          text: n.label,
          answer_id: +n.id,
        })),
        question_type: VerificationQuestions.OneOfList,
        question_id: oneOfList.id,
      };
    } else if (selectedQuestionType.value === VerificationQuestions.ImageFromList) {
      cardQuestion = {
        question_text: imagesFromList.question,
        description: imagesFromList.instruction || '',
        content: imagesFromList.appendix || '',
        time_limit: imagesFromList.timeToAnswer,
        answer_options: Object.values(imagesFromList.images.imagesList).map(n => ({
          is_correct: n.uuid === imagesFromList.images.selectedImage,
          image_url: n.url,
          image_thumbnail_url: n.thumbnail,
          text: n.name,
          answer_id: +n.id,
        })),
        question_type: VerificationQuestions.ImageFromList,
        question_id: imagesFromList.id,
      };
    } else if (selectedQuestionType.value === VerificationQuestions.FewFromList) {
      cardQuestion = {
        question_text: fewFromList.question,
        description: fewFromList.instruction || '',
        content: fewFromList.appendix || '',
        time_limit: fewFromList.timeToAnswer,
        is_shuffled: fewFromList.answerOptions.isShuffled,
        answer_options: fewFromList.answerOptions.options.map(n => ({
          is_correct: fewFromList.answerOptions.selectedOptions
            ? fewFromList.answerOptions.selectedOptions.includes(n.id)
            : false,
          text: n.label,
          answer_id: +n.id,
        })),
        question_type: VerificationQuestions.FewFromList,
        question_id: fewFromList.id,
      };
    } else if (selectedQuestionType.value === VerificationQuestions.QuestionPhotoTag) {
      const webHeight = questionPhotoTag.photoTag?.imageNatureWidth && questionPhotoTag.photoTag.imageNatureHeight &&
        (questionPhotoTag.photoTag?.imageNatureHeight * 600) / questionPhotoTag.photoTag?.imageNatureWidth;
      const getMobilePositionA = (x: number, y: number) => {
        return (
          questionPhotoTag.photoTag?.imageNatureWidth && questionPhotoTag.photoTag?.imageNatureHeight && webHeight ?
          {
            x: (x * questionPhotoTag.photoTag?.imageNatureWidth) / 600,
            y: (y * questionPhotoTag.photoTag.imageNatureHeight) / webHeight,
          } : { x, y }
        );
      };
      const getMobilePositionB = (x: number, y: number) => {
        return (
          questionPhotoTag.photoTag?.imageNatureWidth && questionPhotoTag.photoTag?.imageNatureHeight && webHeight ?
          {
            x: getMobilePositionA(x, y).x + 0.08 * questionPhotoTag.photoTag?.imageNatureWidth,
            y: getMobilePositionA(x, y).y,
          } : { x, y }
        );
      };
      const getMobilePositionC = (x: number, y: number) => {
        return (
          questionPhotoTag.photoTag?.imageNatureWidth && questionPhotoTag.photoTag?.imageNatureHeight && webHeight ?
          {
            x: getMobilePositionA(x, y).x,
            y: getMobilePositionA(x, y).y + 0.08 * questionPhotoTag.photoTag?.imageNatureWidth,
          } : { x, y }
        );
      };
      const getMobilePositionD = (x: number, y: number) => {
        return (
          questionPhotoTag.photoTag?.imageNatureWidth && questionPhotoTag.photoTag?.imageNatureHeight && webHeight ?
          {
            x: getMobilePositionA(x, y).x + 0.08 * questionPhotoTag.photoTag?.imageNatureWidth,
            y: getMobilePositionA(x, y).y + 0.08 * questionPhotoTag.photoTag?.imageNatureWidth,
          } : { x, y }
        );
      };
      cardQuestion = {
        question_text: questionPhotoTag.question,
        description: questionPhotoTag.instruction || '',
        content: questionPhotoTag.appendix || '',
        time_limit: questionPhotoTag.timeToAnswer,
        answer_options: [{
          is_correct: true,
          image_url: questionPhotoTag.photoTag?.image.url,
          image_thumbnail_url: questionPhotoTag.photoTag?.image.thumbnail,
          text: questionPhotoTag.photoTag?.image.name || '',
          answer_id: questionPhotoTag.photoTag?.image.id,
        }],
        mark_points: {
          data: questionPhotoTag.photoTag ? questionPhotoTag.photoTag.marks.map(n => ({
            a: { x: n.x, y: n.y },
            b: { x: n.x + markSize, y: n.y },
            c: { x: n.x, y: n.y + markSize },
            d: { x: n.x + markSize, y: n.y + markSize },
          })) : {} as CardTypes.ICardQuestionMarkPoint[],
        },
        mark_points_mobile: {
          data: questionPhotoTag.photoTag ? questionPhotoTag.photoTag.marks.map(n => ({
            a: getMobilePositionA(n.x, n.y),
            b: getMobilePositionB(n.x, n.y),
            c: getMobilePositionC(n.x, n.y),
            d: getMobilePositionD(n.x, n.y),
          })) : {} as CardTypes.ICardQuestionMarkPoint[],
        },
        question_type: VerificationQuestions.QuestionPhotoTag,
        question_id: questionPhotoTag.id,
      };
    } else if (selectedQuestionType.value === VerificationQuestions.SequenceFromList) {
      cardQuestion = {
        question_text: sequenceFromList.question,
        description: sequenceFromList.instruction || '',
        content: sequenceFromList.appendix || '',
        time_limit: sequenceFromList.timeToAnswer,
        answer_options: [
          ...sequenceFromList.sequenceAnswerOptions.correct.map((n, i) => ({
            is_correct: true,
            text: n.text,
            answer_id: +n.id,
            order_number: i,
          })),
          ...sequenceFromList.sequenceAnswerOptions.inCorrect.map(n => ({
            is_correct: false,
            text: n.text,
            answer_id: +n.id,
          })),
        ],
        answer_order: Array(sequenceFromList.sequenceAnswerOptions.correct.length).fill(null).map((_, i) => i),
        question_type: VerificationQuestions.SequenceFromList,
        question_id: sequenceFromList.id,
      };
    }

    const createCardBodyParams: CardTypes.ICardBodyParams = {
      name: generalInformation.title,
      category_id: generalInformation.category ? +generalInformation.category.value : undefined,
      is_knowledge: generalInformation.isIncludedInBase,
      tag_names: generalInformation.tags.map(n => n.name),
      description: content.description,
      content: content.article,
      minutes_to_finish: content.timeToStudy,
      question: { ...cardQuestion, question_id: questionId },
      image_url: generalInformation.imageUrl || undefined,
      image_thumbnail_url: generalInformation.imageThumbnailUrl || undefined,
    };

    if (type === 'create') {
      createCard && createCard(createCardBodyParams);
    } else if (type === 'edit') {
      updateCard && cardId && updateCard(+cardId, createCardBodyParams);
    }
  };

  const onDeleteCard = () => deleteCard && cardId && deleteCard(+cardId);

  const getStep = (step: number) => {
    if (step === 0) {
      return (
        <CardGeneralInformation
          isQuizCard={isQuizCard}
          generalInformation={generalInformation}
          onGeneralInfoStepCompleted={onGeneralInfoStepCompleted}
        />
      );
    }
    if (step === 1) {
      return (
        <CardContent
          content={content}
          onBackClick={onStepBack}
          onContentStepCompleted={onContentStepCompleted}
        />
      );
    }
    if (step === 2) {
      return (
        <CardCreationContext.Provider value={{
          isIncludedInBase: generalInformation.isIncludedInBase,
          isQuizCard: isQuizCard || false,
        }}>
          <CardVerificationQuestion
            selectedType={selectedQuestionType}
            verificationQuestions={verificationQuestions}
            onBackClick={onStepBack}
            onQuestionStepCompleted={onQuestionStepCompleted}
          />
        </CardCreationContext.Provider>
      );
    }
    return (
      <CardPreview
        type={type}
        generalInformation={generalInformation}
        content={content}
        categoryPath={categoryPath}
        onBackClick={onStepBack}
        onPreviewStepCompleted={onPreviewStepCompleted}
      />
    );
  };

  return (
    <div className="card-creation pos_relative">
      {isModal && <CancelIcon onClick={handleModalCloseClick} className="card-creation__cancel-icon pos_absolute cursor-pointer" />}
      <div className="d-flex align-items-center mb-32">
        <Typography variant="headline">
          {type === 'create' ? 'Создание карточки' : 'Редактирование карточки'}
        </Typography>
        {type === 'edit' && !isModal && (
          <Button
            variant="textmed"
            type="black-icon"
            className="py-14 px-24 ml-auto"
            onClick={() => setDeleteCardModal(true)}
          >
            <Image
              alt="delete icon"
              className="mr-8"
              src={IconDelete}
            />
            Удалить
          </Button>
        )}
      </div>
      <div className="d-flex">
        <Stepper
          isStepsNumbered
          className="card-creation__stepper"
          steps={CardCreationSteps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
        <div className="card-creation__content">
          {getStep(currentStep)}
        </div>
      </div>
      {isDeleteCardModalOpen && (
        <Modal
          title="Удаление карточки"
          deleteLabel="Удалить"
          cancelLabel="Отмена"
          onCloseClick={() => setDeleteCardModal(false)}
          onDeleteClick={onDeleteCard}
        >
          <div className="mx-32">
            <Typography
              variant="text"
              className="mb-24 d-block"
            >
              Вы действительно хотите удалить данную карточку?
            </Typography>
            <Typography variant="text">
              Данная карточка была задействована в других ресурсах данного сервиса.
            </Typography>
          </div>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  categories: state.categoryReducer.categories.data,
  createdCardState: state.cardReducer.createdCardState.data,
  deletedCardState: state.cardReducer.deletedCardState.data,
  updatedCardState: state.cardReducer.updatedCardState.data,
});

const mapDispatchToProps = {
  getCategories,
  clearCategoriesState,
  createCard: cardActions.createCard,
  updateCard: cardActions.updateCard,
  deleteCard: cardActions.deleteCard,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(CardCreation));
