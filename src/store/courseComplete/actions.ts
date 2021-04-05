import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from 'src/store/courseComplete/api';
import {
  CourseCompleteTypes, START_CARD_COMPLETE, ANSWER_TO_TEST_QUESTION,
  FINISH_CARD_COMPLETE, START_MODULE_TEST_COMPLETE, GET_MODULE_TEST_COMPLETE_RESULT,
  ATTEMPT_TO_TEST_QUESTION, START_COURSE_TEST_COMPLETE, GET_COURSE_TEST_COMPLETE_RESULT,
  GET_TEST_ATTEMPT_QUESTION,
} from 'src/store/courseComplete/types';
import { parseAttemptQuestionData } from 'src/store/courseComplete/parsers';

export const startCardComplete = (companyId: number, courseId: number, moduleId: number, cardId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: START_CARD_COMPLETE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.startCardComplete(
        companyId, courseId, moduleId, cardId, token || getState().authReducer.login.data.token,
      );
    },
    onSuccess: (response: any) => response.data,
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const finishCardComplete = (courseId: number, moduleId: number, completeId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: FINISH_CARD_COMPLETE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.finishCardComplete(courseId, moduleId, completeId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

// returns card ids and module test complete id
export const startModuleTestComplete = (courseId: number, moduleId: number, bodyParams: CourseCompleteTypes.ITestCompleteBody, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: START_MODULE_TEST_COMPLETE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.startModuleTestComplete(
        courseId, moduleId, bodyParams, token || getState().authReducer.login.data.token,
      );
    },
    onSuccess: (response: any) => response.data,
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const attemptToTestQuestion = (moduleCompleteAttemptId: number, cardId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: ATTEMPT_TO_TEST_QUESTION,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || getState().authReducer.login.data.token;
      return api.attemptToTestQuestion(moduleCompleteAttemptId, cardId, token);
    },
    onSuccess: (response: any) => {
      if (!response || !response.data || !response.data.question || !response.data.attempt_question) return undefined;
      return parseAttemptQuestionData(response.data);
    },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const answerToTestQuestion = (completeAttemptId: number, attemptQuestionId: number, body: CourseCompleteTypes.IQuestionCompleteBody, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: ANSWER_TO_TEST_QUESTION,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.answerToTestQuestion(
        completeAttemptId, attemptQuestionId, body, token || getState().authReducer.login.data.token,
      );
    },
    onSuccess: (response: any) => response.data,
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getModuleTestCompleteResult = (courseId: number, moduleId: number, completeAttemptId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_MODULE_TEST_COMPLETE_RESULT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getModuleTestCompleteResult(
        courseId, moduleId, completeAttemptId, token || getState().authReducer.login.data.token,
      );
    },
    onSuccess: (response: any) => response.data,
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCourseTestCompleteResult = (courseId: number, completeAttemptId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COURSE_TEST_COMPLETE_RESULT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCourseTestCompleteResult(
        courseId, completeAttemptId, token || getState().authReducer.login.data.token,
      );
    },
    onSuccess: (response: any) => response.data,
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getTestAttemptQuestion = (courseId: number, completeAttemptId: number, attemptQuestionId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_TEST_ATTEMPT_QUESTION,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getTestAttemptQuestion(
        courseId, completeAttemptId, attemptQuestionId, token || getState().authReducer.login.data.token,
      );
    },
    onSuccess: (response: any) => response.data,
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const startCourseTestComplete = (courseId: number, bodyParams: CourseCompleteTypes.ITestCompleteBody, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: START_COURSE_TEST_COMPLETE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.startCourseTestComplete(courseId, bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => response.data,
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  startCardComplete,
  finishCardComplete,
  startModuleTestComplete,
  attemptToTestQuestion,
  answerToTestQuestion,
  getModuleTestCompleteResult,
  startCourseTestComplete,
  getCourseTestCompleteResult,
  getTestAttemptQuestion,
};
