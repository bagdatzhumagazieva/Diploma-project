import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from 'src/store/course/api';
import {
  CourseTypes, CREATE_COURSE, UPDATE_COURSE, GET_COURSE_BY_ADMIN,
  GET_COURSE, COURSES_TO_DRAFT, COURSES_TO_PUBLISH,
  GET_USER_COURSES, CourseDetailTypes, GET_AVAILABLE_COURSES,
  GET_COURSE_DETAIL, GET_COURSE_STATISTICS, GET_COURSE_MODULE,
  GET_CARD_LIST, DELETE_COURSE, GET_COURSES_BY_ADMIN, ADD_COURSE_TO_FAVORITE,
  DELETE_COURSE_FROM_FAVORITE, GET_ALL_COURSES, DELETE_COURSES, GET_COURSE_COUNT,
} from 'src/store/course/types';

export const createCourse = (bodyParams: CourseTypes.IRenderProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_COURSE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID);
      return api.createCourse(
        bodyParams, companyId ? +companyId : -1, token || getState().authReducer.login.data.token,
      );
    },
    onSuccess: (response: any) => ({ data: response.code, id: (response.data && response.data.id) || 0 }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateCourse = (courseId: number, bodyParams: CourseTypes.IRenderProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_COURSE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.updateCourse(courseId, bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.code, id: (response.data && response.data.id) || 0 }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteCourse = (courseId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_COURSE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteCourse(courseId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.code }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteCourses = (courseIds: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_COURSES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteCourses(courseIds, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.code }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const coursesToDraft = (courseIds: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: COURSES_TO_DRAFT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.coursesToDraft(courseIds, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.code }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const coursesToPublish = (courseIds: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: COURSES_TO_PUBLISH,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.coursesToPublish(courseIds, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.code }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const addCourseToFavorite = (courseId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: ADD_COURSE_TO_FAVORITE,
    apiCall: () => {
      const data = getState()?.employmentReducer?.employment?.data;
      if (!data) return;
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.addCourseToFavorite(courseId, token || getState().authReducer.login.data.token, data.companyId );
    },
    onSuccess: (response: any) => {},
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteCourseFromFavorite = (courseId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_COURSE_FROM_FAVORITE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteCourseFromFavorite(courseId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => {},
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCourse = (courseId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COURSE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCourse(courseId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getAllCourses = (params: CourseDetailTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ALL_COURSES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      return api.getDetailCourses(companyId, params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getUserCourses = (params: CourseDetailTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_USER_COURSES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      return api.getDetailCourses(companyId, params, token || getState().authReducer.login.data.token, true);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getAvailableCourses = (params: CourseDetailTypes.IQueryProps, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_AVAILABLE_COURSES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      return api.getDetailCourses(companyId, params, token || getState().authReducer.login.data.token, false);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCourseDetail = (companyId: number, courseId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COURSE_DETAIL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getDetailCourseInfo(companyId, courseId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCourseStatistics = (courseId: number, params: CourseTypes.IStatisticsQuery, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COURSE_STATISTICS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCourseStatistics(courseId, params, token  || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCourseModule = (companyId: number, moduleId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COURSE_MODULE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCourseModule(companyId, moduleId, token  || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getModuleCardList = (companyId: number, moduleId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_CARD_LIST,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCourseModule(companyId, moduleId, token  || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCoursesByAdmin = (companyId: number, params: CourseDetailTypes.IAdminQuery, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COURSES_BY_ADMIN,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCoursesByAdmin(companyId, params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCourseByAdmin = (companyId: number, courseId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COURSE_BY_ADMIN,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCourseByAdmin(companyId, courseId, token || getState().authReducer.token.data);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearCourse = () => (dispatch: any) => {
  dispatch({ type: GET_COURSE.clear });
};

export const clearAdminCourse = () => (dispatch: any) => {
  dispatch({ type: GET_COURSE_BY_ADMIN.clear });
};

export const clearCourseDetail = () => (dispatch: any) => {
  dispatch({ type: GET_COURSE_DETAIL.clear });
};

export const getCoursesCount = (companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COURSE_COUNT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCoursesCount(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  coursesToDraft,
  coursesToPublish,
  getAllCourses,
  getUserCourses,
  getAvailableCourses,
  getCourseDetail,
  getCourseStatistics,
  getCourseModule,
  getModuleCardList,
  getCoursesByAdmin,
  addCourseToFavorite,
  deleteCourseFromFavorite,
  clearCourse,
  clearCourseDetail,
  getCoursesCount,
};
