import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { CardTypes } from 'src/store/card/types';

export declare namespace CourseCompleteTypes {
  export interface ICardCompleteBody {
    userId: number;
    employmentId: number;
    cardId: number;
  }

  export interface ITestCompleteBody {
    userId: number;
    employmentId: number;
    companyId: number;
  }

  export interface IQuestionCompleteBody {
    cardId?: number;
    type?: VerificationQuestions;
    answerText?: string;
    answerIds?: number[];
    markPoints?: CardTypes.ICardQuestionMarkPointPosition[];
  }

  export interface IResponseAttemptQuestion {
    attempt_question: {
      id: number;
    };
    question: CardTypes.IResponseQuestion;
  }

  export interface IRenderAttemptQuestion {
    id: number;
    question: CardTypes.IRenderQuestion;
  }

  export interface IRenderCompleteAttempt {
    id: number;
    cardIds: number[];
  }
}

export const START_CARD_COMPLETE = {
  started: 'START_CARD_COMPLETE_START',
  success: 'START_CARD_COMPLETE_SUCCESS',
  failed: 'START_CARD_COMPLETE_FAILED',
};

export const FINISH_CARD_COMPLETE = {
  started: 'FINISH_CARD_COMPLETE_START',
  success: 'FINISH_CARD_COMPLETE_SUCCESS',
  failed: 'FINISH_CARD_COMPLETE_FAILED',
};

export const START_MODULE_TEST_COMPLETE = {
  started: 'START_MODULE_TEST_COMPLETE_START',
  success: 'START_MODULE_TEST_COMPLETE_SUCCESS',
  failed: 'START_MODULE_TEST_COMPLETE_FAILED',
};

export const ANSWER_TO_TEST_QUESTION = {
  started: 'ANSWER_TO_TEST_QUESTION_START',
  success: 'ANSWER_TO_TEST_QUESTION_SUCCESS',
  failed: 'ANSWER_TO_TEST_QUESTION_FAILED',
};

export const GET_MODULE_TEST_COMPLETE_RESULT = {
  started: 'GET_MODULE_TEST_COMPLETE_RESULT_START',
  success: 'GET_MODULE_TEST_COMPLETE_RESULT_SUCCESS',
  failed: 'GET_MODULE_TEST_COMPLETE_RESULT_FAILED',
};

export const ATTEMPT_TO_TEST_QUESTION = {
  started: 'ATTEMPT_TO_TEST_QUESTION_START',
  success: 'ATTEMPT_TO_TEST_QUESTION_SUCCESS',
  failed: 'ATTEMPT_TO_TEST_QUESTION_FAILED',
};

export const START_COURSE_TEST_COMPLETE = {
  started: 'START_COURSE_TEST_COMPLETE_START',
  success: 'START_COURSE_TEST_COMPLETE_SUCCESS',
  failed: 'START_COURSE_TEST_COMPLETE_FAILED',
};

export const GET_COURSE_TEST_COMPLETE_RESULT = {
  started: 'GET_COURSE_TEST_COMPLETE_RESULT_START',
  success: 'GET_COURSE_TEST_COMPLETE_RESULT_SUCCESS',
  failed: 'GET_COURSE_TEST_COMPLETE_RESULT_FAILED',
};

export const GET_TEST_ATTEMPT_QUESTION = {
  started: 'GET_TEST_ATTEMPT_QUESTION_START',
  success: 'GET_TEST_ATTEMPT_QUESTION_SUCCESS',
  failed: 'GET_TEST_ATTEMPT_QUESTION_FAILED',
};
