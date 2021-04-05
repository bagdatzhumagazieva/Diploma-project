import React from 'react';
import { CardTypes } from 'src/store/card/types';

export declare namespace QuestionsTypes {
  export interface IProps {
  }
}

export declare namespace SingleTypes {
  export interface IProps {
    title: string;
    isChecked?: boolean;
    correctAnswerId?: number;
    instruction?: string;
    selectedVal?: number;
    options: IAnswerOption[];
    appendix?: string;
    handleClickedAnswer?(id: number | string): void;
  }
}

export declare namespace MultipleTypes {
  export interface IProps {
    title: string;
    isChecked?: boolean;
    correctAnswerIds?: number[];
    options: IAnswerOption[];
    initValues?: number[];
    appendix?: string;
    instruction?: string;
    handleSelectedAnswers?(ids: (number | string)[]): void;
  }
}

export declare namespace OpenTypes {
  export interface IProps {
    initialValue?: string;
    title: string;
    isChecked?: boolean;
    instruction?: string;
    appendix?: string;
    isCorrect?: boolean;
    className?: string;
    onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  }
}

export declare namespace RadioImageTypes {
  export interface IProps {
    title: string;
    isChecked?: boolean;
    correctAnswerId?: number;
    instruction?: string;
    appendix?: string;
    className?: string;
    images: IImage[];
    selectedImage: number | string;
    handleClickedAnswer?(id: number | string): void;
  }

  export interface IImage {
    id: number | string;
    src: string;
    text: string;
  }
}

export declare namespace PhotoMarkTypes {
  export interface IProps {
    title: string;
    isChecked?: boolean;
    instruction?: string;
    appendix?: string;
    className?: string;
    isStatistic?: boolean;
    initValues?: CardTypes.ICardQuestionMarkPointPosition[];
    image: IPhotoTagImage;
    marksCount: number;
    correctMarkPoints?: CardTypes.ICardQuestionMarkPoint[];
    handleSelectedAnswers?(marks: CardTypes.ICardQuestionMarkPointPosition[]): void;
  }

  export interface IPhotoTagImage {
    id: number | string;
    imageUrl: string;
  }
}

export declare namespace CloudTypes {
  export interface IProps {
    title: string;
    instruction?: string;
    appendix?: string;
    isChecked?: boolean;
    initValues?: number[];
    className?: string;
    options: IAnswerOption[];
    handleSelectedAnswers?(ids: number[]): void;
    isCorrect?: boolean;
  }
}

export interface IAnswerOption {
  id: number | string;
  text: string;
}

export interface ICheckedOption {
  id: number | string;
  state: boolean;
  text: string;
}
