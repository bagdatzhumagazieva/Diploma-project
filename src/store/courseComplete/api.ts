import { stdApiPOST, stdApiPUT, stdApiGET } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';

export const startCardComplete = (companyId: number, courseId: number, moduleId: number, cardId: number, token: string) => (
  stdApiPOST(
    {
      token,
      url: `${API}courses/${courseId}/modules/${moduleId}/card_completes/?company_id=${companyId}`,
      data: {
        card_id: cardId,
      },
    })
);

export const finishCardComplete = (courseId: number, moduleId: number, completeId: number, token: string) => (
  stdApiPUT({ token, url: `${API}courses/${courseId}/modules/${moduleId}/card_completes/${completeId}/finish` })
);

export const startModuleTestComplete = (courseId: number, moduleId: number, body: CourseCompleteTypes.ITestCompleteBody, token: string) => {
  const bodyParams = {
    user_id: body.userId,
    company_id: body.companyId,
    employment_id: body.employmentId,
    is_active: true,
  };

  return (
    stdApiPOST({ token, url: `${API}courses/${courseId}/modules/${moduleId}/complete_attempts/`, data: bodyParams })
  );
};

export const attemptToTestQuestion = (moduleCompleteAttemptId: number, cardId: number, token: string) => {
  const bodyParams = {
    card_id: cardId,
    is_active: true,
  };

  return (
    stdApiPOST(
      {
        token,
        url: `${API}courses/complete_attempts/${moduleCompleteAttemptId}/attempt_questions/`,
        data: bodyParams,
      })
  );
};

export const answerToTestQuestion = (completeAttemptId: number, attemptQuestionId: number, body: CourseCompleteTypes.IQuestionCompleteBody, token: string) => {
  const bodyParams = {
    card_id: body.cardId,
    type: body.type,
    ...(body.answerText ? { answer_text: body.answerText } : {}),
    ...(body.answerIds ? { answer_ids: body.answerIds } : {}),
    ...(body.markPoints && body.markPoints.length > 0 ? { mark_points: body.markPoints } : {}),
    is_active: true,
  };

  return (
    stdApiPOST(
      {
        token,
        url: `${API}courses/complete_attempts/${completeAttemptId}/attempt_questions/${attemptQuestionId}/answer`,
        data: bodyParams,
      })
  );
};

export const getModuleTestCompleteResult = (courseId: number, moduleId: number, completeAttemptId: number, token: string) => (
  stdApiGET({ token, url: `${API}courses/${courseId}/modules/${moduleId}/${completeAttemptId}` })
);

export const getCourseTestCompleteResult = (courseId: number, completeAttemptId: number, token: string) => (
  stdApiGET({ token, url: `${API}courses/${courseId}/${completeAttemptId}` })
);

export const getTestAttemptQuestion = (courseId: number, completeAttemptId: number, attemptQuestionId: number, token: string) => (
  stdApiGET(
    {
      token,
      url: `${API}courses/complete_attempts/${completeAttemptId}/attempt_questions/${attemptQuestionId}`,
    })
);

export const startCourseTestComplete = (courseId: number, body: CourseCompleteTypes.ITestCompleteBody, token: string) => {
  const bodyParams = {
    user_id: body.userId,
    company_id: body.companyId,
    employment_id: body.employmentId,
    is_active: true,
  };

  return (
    stdApiPOST({ token, url: `${API}courses/${courseId}/complete_attempts/`, data: bodyParams })
  );
};
