import React from 'react';
import { generateId } from 'src/utils/generation';
import Image from 'src/components/atoms/Image';
import IconOpenQuestion from 'src/assets/img/icons/open-question.svg';
import IconRadioCheck from 'src/assets/img/icons/radio-check.svg';
import IconImage from 'src/assets/img/icons/image.svg';
import IconCheckbox from 'src/assets/img/icons/checkbox.svg';
import IconCamera from 'src/assets/img/icons/camera.svg';
import IconDots from 'src/assets/img/icons/dots-horizontal.svg';
import { IOption } from 'src/components/molecules/Select/types';
import {
  FewFromListTypes,
  ImageFromListTypes,
  OneOfListTypes,
  OpenQuestionsTypes,
  QuestionPhotoTagTypes,
  SequenceFromListTypes,
} from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';

export enum VerificationQuestions {
  OpenQuestion = 'OPEN',
  OneOfList = 'RADIO',
  ImageFromList = 'RADIO_IMAGE',
  FewFromList = 'MULTIPLE',
  QuestionPhotoTag = 'PHOTO_MARK',
  SequenceFromList = 'CLOUD',
}

export const VerificationQuestionsTypes: IOption[] = [
  {
    icon: <Image
      alt="open question icon"
      src={IconOpenQuestion}
    />,
    value: VerificationQuestions.OpenQuestion,
    name: 'Открытый вопрос',
  },
  {
    icon: <Image
      alt="one of list icon"
      src={IconRadioCheck}
    />,
    value: VerificationQuestions.OneOfList,
    name: 'Один из списка',
  },
  {
    icon: <Image
      alt="image from list icon"
      src={IconImage}
    />,
    value: VerificationQuestions.ImageFromList,
    name: 'Изображение из списка',
  },
  {
    icon: <Image
      alt="few from list icon"
      src={IconCheckbox}
    />,
    value: VerificationQuestions.FewFromList,
    name: 'Несколько из списка',
  },
  {
    icon: <Image
      alt="photo tag"
      src={IconCamera}
    />,
    value: VerificationQuestions.QuestionPhotoTag,
    name: 'Фотометка',
  },
  {
    icon: <Image
      alt="sequence icon"
      src={IconDots}
    />,
    value: VerificationQuestions.SequenceFromList,
    name: 'Последовательность из списка',
  },
];

export const OpenQuestionInitVal: OpenQuestionsTypes.IOpenQuestion = {
  question: '',
  instruction: '',
  answer: '',
  timeToAnswer: 0,
};

export const OneOfListInitVal: OneOfListTypes.IOneOfList = {
  question: '',
  timeToAnswer: 0,
  answerOptions: {
    options: [],
    selectedOption: '',
  },
};

export const FewFromListInitVal: FewFromListTypes.IFewFromList = {
  question: '',
  timeToAnswer: 0,
  answerOptions: {
    options: [],
    selectedOptions: [],
  },
};

export const ImagesFromListInitVal: ImageFromListTypes.IImageFromList = {
  question: '',
  instruction: '',
  timeToAnswer: 0,
  images: { imagesList: {} },
};

export const QuestionPhotoTagInitVal: QuestionPhotoTagTypes.IQuestionPhotoTag = {
  question: '',
  timeToAnswer: 0,
};

export const SequenceFromListInitVal: SequenceFromListTypes.ISequenceFromList = {
  question: '',
  timeToAnswer: 0,
  sequenceAnswerOptions: {
    correct: [],
    inCorrect: [],
  },
};

const id = generateId();
export const VerificationQuestionsInitVal = {
  openQuestion: OpenQuestionInitVal,
  oneOfList: {
    ...OneOfListInitVal,
    answerOptions: {
      options: [{ id, label: '' }],
      selectedOption: id,
    },
  },
  fewFromList: {
    ...FewFromListInitVal,
    answerOptions: {
      options: [{ id, label: '' }],
      selectedOptions: [id],
    },
  },
  imagesFromList: ImagesFromListInitVal,
  questionPhotoTag: QuestionPhotoTagInitVal,
  sequenceFromList: SequenceFromListInitVal,
};

const frameSize = 600;
export const markSize = 48;
const centerOfFrame = frameSize / 2 - markSize / 2;
export const defaultMarkPosition = { x: centerOfFrame, y: centerOfFrame };
