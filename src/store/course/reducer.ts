import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import {
  CourseDetailTypes, CourseTypes, GET_AVAILABLE_COURSES,
  GET_CARD_LIST, GET_COURSE, GET_COURSE_DETAIL, GET_ALL_COURSES,
  GET_COURSE_MODULE, GET_COURSE_STATISTICS, GET_COURSES_BY_ADMIN,
  GET_USER_COURSES, ProgressStatus, GET_COURSE_BY_ADMIN, CourseCountTypes,
  GET_COURSE_COUNT,
} from 'src/store/course/types';
import { combineReducers } from 'redux';
import {
  parseCourseAggregatorData, parseCourseData, parseCourseStatisticsData,
  parseDetailCardData, parseDetailModuleData, parseCourseCount,
} from 'src/store/course/parsers';
import { DEFAULT_CARD_LIST_WITH_MODULE_DATA, getModuleStatus } from 'src/store/course/consts';

const course = (
  state = { data: null, loading: true },
  action: ActionType<CourseTypes.IResponseProps>,
): ILoadTypes<CourseTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_COURSE.started:
    case GET_COURSE.clear:
      return {
        data: null,
        loading: true,
      };
    case GET_COURSE.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COURSE.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseCourseData(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const allCourses = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ courses: CourseDetailTypes.IResponseProps[] }>>,
): ILoadTypes<CourseDetailTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_ALL_COURSES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ALL_COURSES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ALL_COURSES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { courses, total } = action.data;
      const parsedCourses = courses.map(item => parseCourseAggregatorData(item));
      return {
        total,
        data: parsedCourses,
        loading: false,
      };
    default:
      return state;
  }
};

const userCourses = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ courses: CourseDetailTypes.IResponseProps[] }>>,
): ILoadTypes<CourseDetailTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_USER_COURSES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_USER_COURSES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_USER_COURSES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { courses, total } = action.data;
      const parsedCourses = courses.map(item => parseCourseAggregatorData(item));
      return {
        total,
        data: parsedCourses,
        loading: false,
      };
    default:
      return state;
  }
};

const availableCourses = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ courses: CourseDetailTypes.IResponseProps[] }>>,
): ILoadTypes<CourseDetailTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_AVAILABLE_COURSES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_AVAILABLE_COURSES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_AVAILABLE_COURSES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { courses, total } = action.data;
      const parsedCourses = courses.map(item => parseCourseAggregatorData(item));
      return {
        total,
        data: parsedCourses,
        loading: false,
      };
    default:
      return state;
  }
};

const courseDetail = (
  state = { data: null, loading: true },
  action: ActionType<CourseDetailTypes.IResponseProps>,
): ILoadTypes<CourseDetailTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_COURSE_DETAIL.clear:
      return {
        data: null,
        loading: false,
      };
    case GET_COURSE_DETAIL.started:
      return {
        data: null,
        loading: true,
      };
    case GET_COURSE_DETAIL.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COURSE_DETAIL.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseCourseAggregatorData(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const courseStatistics = (
  state = { data: null, loading: false },
  action: ActionType<CourseTypes.IStatisticsResponse>,
): ILoadTypes<CourseTypes.IStatisticsRender | null> => {
  switch (action.type) {
    case GET_COURSE_STATISTICS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_COURSE_STATISTICS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COURSE_STATISTICS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }

      return {
        data: parseCourseStatisticsData(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const courseModule = (
  state = { data: null, loading: false },
  action: ActionType<CourseDetailTypes.IModuleResponse>,
): ILoadTypes<CourseDetailTypes.IModuleDetailRender | null> => {
  switch (action.type) {
    case GET_COURSE_MODULE.started:
      return {
        data: null,
        loading: true,
      };
    case GET_COURSE_MODULE.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COURSE_MODULE.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }

      return {
        data: parseDetailModuleData(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const moduleCardList = (
  state = { data: DEFAULT_CARD_LIST_WITH_MODULE_DATA , loading: true },
  action: ActionType<CourseDetailTypes.IModuleResponse>,
): ILoadTypes<CourseDetailTypes.ICardListWithModuleData | null> => {
  switch (action.type) {
    case GET_CARD_LIST.started:
      return {
        data: DEFAULT_CARD_LIST_WITH_MODULE_DATA,
        loading: true,
      };
    case GET_CARD_LIST.failed:
      return {
        data: DEFAULT_CARD_LIST_WITH_MODULE_DATA,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_CARD_LIST.success:
      if (!action.data) {
        return {
          data: DEFAULT_CARD_LIST_WITH_MODULE_DATA,
          loading: false,
        };
      }
      const { cards, status, name = '' } = action.data;

      return {
        data: {
          module: {
            name,
            isFinished: !!action.is_finished,
            testStatus: Array.isArray(cards) && cards.length > 0 ?
              getModuleStatus(cards.map(item => !!item.is_finished), status) : ProgressStatus.NOT_STARTED,
          },
          cardList: Array.isArray(cards) ? cards.map(item => parseDetailCardData(item)) : [],
        },
        loading: false,
      };
    default:
      return state;
  }
};

const coursesByAdmin = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ courses: CourseDetailTypes.IResponseProps[] }>>,
): ILoadTypes<CourseDetailTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_COURSES_BY_ADMIN.started:
      return {
        data: null,
        loading: true,
      };
    case GET_COURSES_BY_ADMIN.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COURSES_BY_ADMIN.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { courses, total } = action.data;
      const parsedCourses = courses.map(item => parseCourseAggregatorData(item));
      return {
        total,
        data: parsedCourses,
        loading: false,
      };
    default:
      return state;
  }
};

const courseByAdmin = (
  state = { data: null, loading: true },
  action: ActionType<CourseDetailTypes.IResponseProps>,
): ILoadTypes<CourseDetailTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_COURSE_BY_ADMIN.clear:
      return {
        data: null,
        loading: false,
      };
    case GET_COURSE_BY_ADMIN.started:
      return {
        data: null,
        loading: true,
      };
    case GET_COURSE_BY_ADMIN.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COURSE_BY_ADMIN.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseCourseAggregatorData(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const coursesCount = (
  state = { data: null, loading: true },
  action: ActionType<CourseCountTypes.IResponseProps>,
): ILoadTypes<CourseCountTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_COURSE_COUNT.started:
      return {
        data: null,
        loading: true,
      };
    case GET_COURSE_COUNT.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COURSE_COUNT.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseCourseCount(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const courseReducer = combineReducers(
  {
    course,
    courseDetail,
    allCourses,
    userCourses,
    availableCourses,
    courseStatistics,
    courseModule,
    moduleCardList,
    coursesByAdmin,
    courseByAdmin,
    coursesCount,
  });

export default courseReducer;
