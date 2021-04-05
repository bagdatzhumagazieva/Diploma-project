import { CourseCompleteTypes } from 'src/store/courseComplete/types';
import { CardTypes } from 'src/store/card/types';

export namespace QuizTypes {
  export interface IProps {
    type: 'course' | 'module';
    completeAttemptId?: number;
    cardIds: number[];
    courseId: number;
    curModuleFirstCardId?: number;
    isLastModule?: boolean;
    nextModuleId?: string;
    moduleId?: number;
    loading?: boolean;

    attemptToTestQuestion?(moduleCompleteAttemptId: number, cardId: number, callbacks?: any): void;
    answerToTestQuestion?(
      completeAttemptId: number,
      attemptQuestionId: number,
      body: CourseCompleteTypes.IQuestionCompleteBody,
      callbacks?: any,
    ): void;
    getModuleTestCompleteResult?(courseId: number, moduleId: number, completeAttemptId: number, callbacks?: any): void;
    getCourseTestCompleteResult?(courseId: number, completeAttemptId: number, callbacks?: any): void;
    getTestAttemptQuestion?(courseId: number, completeAttemptId: number, attemptQuestionId: number): void;
    getCertificateById?(certificateId: number, callbacks?: any): void;
  }

  export interface ITestResult {
    status: 'success' | 'fail';
    percent: number;
  }

  export interface IQuestionResponse {
    isCorrect?: boolean;
    answerIds?: number[];
    correctMarkPoints?: CardTypes.ICardQuestionMarkPoint[];
  }

  export interface IModalCourseExamSuccess {
    imageUrl: string;
    onCloseClick(): void;
    courseName: string;
    percent: number;
    userName: string;
  }
}
