import React from 'react';
import { CardTypes } from 'src/store/card/types';
import { QuizTypes } from 'src/pages/GamePages/Course/Quiz/types';

export namespace BattleQuizTypes {
  export interface IProps {
    attemptQuestion?: CardTypes.IRenderQuestion;
    className?: string;
    currentQuizNumber: number;
    totalQuizNumber: number;
    questionResponse: QuizTypes.IQuestionResponse;
    buttonLoading?: boolean;
    buttonDisabled?: boolean;

    handleOpenQuestionChange?(event: React.ChangeEvent<HTMLInputElement>): void;
    handleSelectedIds?(ids: number[]): void;
    handlePhotoMarkPoints?(points: CardTypes.ICardQuestionMarkPointPosition[]): void;
    onClickNext?(timeIsUp?: boolean): void;
  }
}
