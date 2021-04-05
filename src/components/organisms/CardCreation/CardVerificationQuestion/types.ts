import { AnswerOptionsTypes } from 'src/components/atoms/AnswerOptions/types';
import { IOption } from 'src/components/molecules/Select/types';
import { MediaTypes } from 'src/store/media/types';
import { PhotoTagTypes } from 'src/components/molecules/PhotoTag/types';
import { SequenceChipsTypes } from 'src/components/molecules/SequenceChips/types';

export namespace CardVerificationQuestionTypes {
  export interface IProps {
    verificationQuestions: IVerificationQuestionsTypes;
    selectedType: IOption;
    onBackClick?(): void;
    onQuestionStepCompleted(verificationQuestions: IVerificationQuestionsTypes, type: IOption): void;
  }

  export interface IVerificationQuestionsTypes {
    openQuestion: OpenQuestionsTypes.IOpenQuestion;
    oneOfList: OneOfListTypes.IOneOfList;
    fewFromList: FewFromListTypes.IFewFromList;
    imagesFromList: ImageFromListTypes.IImageFromList;
    questionPhotoTag: QuestionPhotoTagTypes.IQuestionPhotoTag;
    sequenceFromList: SequenceFromListTypes.ISequenceFromList;
  }
}

export namespace OpenQuestionsTypes {
  export interface IProps {
    errors: IOpenQuestionErrors;
    openQuestion: IOpenQuestion;
    onErrorsChange(errors: IOpenQuestionErrors): void;
    onOpenQuestionQuestionChange(openQuestion: IOpenQuestion): void;
  }

  export interface IOpenQuestion {
    question: string;
    answer: string;
    timeToAnswer: number;
    instruction?: string;
    appendix?: string;
    id?: number;
  }

  export interface IOpenQuestionErrors {
    question: string;
    answer: string;
    timeToAnswer: string;
  }
}

export namespace OneOfListTypes {
  export interface IProps {
    errors: IOneOfListErrors;
    list: IOneOfList;
    onErrorsChange(errors: IOneOfListErrors): void;
    onListChange(answerOptions: IOneOfList): void;
    onNewOptionAdd(isDefaultOtherOptions?: boolean): void;
    onOptionDelete(id: string): void;
  }

  export interface IOneOfList {
    question: string;
    instruction?: string;
    appendix?: string;
    timeToAnswer: number;
    answerOptions: {
      options: AnswerOptionsTypes.IAnswerOption[];
      selectedOption?: string;
      isShuffled?: boolean;
    };
    id?: number;
  }

  export interface IOneOfListErrors {
    question: string;
    timeToAnswer: string;
    answerOptions: string;
  }
}

export namespace ImageFromListTypes {
  export interface IProps {
    errors: IImageFromListErrors;
    imagesFromList: IImageFromList;
    onErrorsChange(errors: IImageFromListErrors): void;
    onImagesFromListChange(imagesFromList: IImageFromList): void;
    onNewImageAdd(image: MediaTypes.IRenderProps): void;
    onImageDelete(id: string): void;
  }

  export interface IImageFromList {
    question: string;
    instruction?: string;
    timeToAnswer: number;
    appendix?: string;
    images: {
      imagesList: IImageFromListImagesArray,
      selectedImage?: string;
    };
    id?: number;
  }

  export interface IImageFromListImagesArray {
    [id: string]: MediaTypes.IRenderProps;
  }

  export interface IImageFromListErrors {
    question: string;
    timeToAnswer: string;
    images: string;
  }
}

export namespace FewFromListTypes {
  export interface IProps {
    errors: IFewFromListErrors;
    list: IFewFromList;
    onErrorsChange(errors: IFewFromListErrors): void;
    onListChange(answerOptions: IFewFromList): void;
    onNewOptionAdd(isDefaultOtherOptions?: boolean): void;
    onOptionDelete(id: string): void;
  }

  export interface IFewFromList {
    question: string;
    instruction?: string;
    appendix?: string;
    timeToAnswer: number;
    answerOptions: {
      options: AnswerOptionsTypes.IAnswerOption[];
      selectedOptions?: string[]
      isShuffled?: boolean;
    };
    id?: number;
  }

  export interface IFewFromListErrors {
    question: string;
    timeToAnswer: string;
    answerOptions: string;
  }
}

export namespace QuestionPhotoTagTypes {
  export interface IProps {
    errors: IImageFromListErrors;
    questionPhotoTag: IQuestionPhotoTag;
    onErrorsChange(errors: IImageFromListErrors): void;
    onQuestionPhotoTagChange(questionPhotoTag: IQuestionPhotoTag): void;
    onNewPhotoTagImageAdd(image: MediaTypes.IRenderProps): void;
    onPhotoTagImageDelete(): void;
    onChangeImageDimension(height: number, width: number): void;
  }

  export interface IQuestionPhotoTag {
    question: string;
    instruction?: string;
    timeToAnswer: number;
    appendix?: string;
    photoTag?: {
      image: MediaTypes.IRenderProps,
      imageNatureHeight: number;
      imageNatureWidth: number;
      marks: PhotoTagTypes.IMark[];
    };
    id?: number;
  }

  export interface IImageFromListErrors {
    question: string;
    timeToAnswer: string;
    photoTag: string;
  }
}

export namespace SequenceFromListTypes {
  export interface IProps {
    errors: ISequenceFromListErrors;
    sequence: ISequenceFromList;
    onErrorsChange(errors: ISequenceFromListErrors): void;
    onSequenceChange(sequence: ISequenceFromList): void;
  }

  export interface ISequenceFromList {
    question: string;
    instruction?: string;
    appendix?: string;
    timeToAnswer: number;
    sequenceAnswerOptions: {
      correct: SequenceChipsTypes.ISequence[];
      inCorrect: SequenceChipsTypes.ISequence[];
    };
    id?: number;
  }

  export interface ISequenceFromListErrors {
    question: string;
    timeToAnswer: string;
    correctSequence: string;
    inCorrectSequence: string;
  }
}
