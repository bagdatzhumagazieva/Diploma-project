export declare namespace StatisticsCountTypes {
  export interface IResponseProps {
    groups: {
      total: number,
      groups_results: {
        entity_id: number,
        name: string,
        total: number,
      }[],
    };
    cards: {
      total: number,
      knowledge_cards_total: number,
      exercises_total: number,
      courses_total: number,
      games_total: number,
    };
    employees: {
      total: number,
      total_active: number,
      total_blocked: number,
    };
  }

  export interface IRenderProps {
    groups: {
      total: number,
      groupsResults: {
        entityId: number,
        name: string,
        total: number,
      }[],
    };
    cards: {
      total: number,
      knowledgeCardsTotal: number,
      exercisesTotal: number,
      coursesTotal: number,
      gamesTotal: number,
    };
    employees: {
      total: number,
      totalActive: number,
      totalBlocked: number,
    };
  }
}

export declare namespace StatisticsLearningActivityTypes {
  export interface IResponseProps {
    activities: {
      range_end: string,
      range_start: string,
      results: {
        battles: number,
        courses: number,
        exercises: number,
        games: number,
      },
    }[];
  }

  export interface IRenderProps {
    activities: {
      rangeEnd: string,
      rangeStart: string,
      results: {
        battles: number,
        courses: number,
        exercises: number,
        games: number,
      },
    }[];
  }
}

export declare namespace StatisticsPerformanceTypes {
  export interface IRequestProps {
    companyId: number;
    type: 'COURSE' | 'GAME' | null;
    keyword: string;
  }

  export interface IResponseProps {
    entities: {
      created_at: string;
      description: string;
      entity_id: number;
      entity_type: 'GAME' | 'COURSE';
      image_thumbnail_url: string;
      minutes_to_finish: number;
      name: string;
      number_of_views: number;
      percent_avg: number;
    }[];
  }

  export interface IRenderProps {
    entities: {
      createdAt: string;
      description: string;
      id: number;
      type: 'GAME' | 'COURSE';
      imageThumbnail: string;
      minutesToFinish: number;
      name: string;
      numberOfViews: number;
      percentAvg: number;
    }[];
  }
}

export declare namespace StatisticsPerformanceDownloadTypes {
  export interface IRequestProps {
    companyId: number;
    entityId: number;
    type: 'COURSE' | 'GAME';
  }
}

export declare namespace StatisticsPerformanceDetailTypes {
  export interface IRequestProps {
    companyId: number;
    type: 'COURSE' | 'GAME' | null;
    entityId: number;
    branchId?: number;
    groupId?: number;
  }

  export interface IResponseProps {
    entity: {
      company_id: number;
      created_at: string;
      entity_id: number;
      entity_type: 'GAME' | 'COURSE';
      entity_uuid: string;
      minutes_to_finish: number;
      name: string;
      number_of_views: number;
      percent_avg: number;
      reward_amount: number;
      status: string;
      template_id: number;
      image_thumbnail_url: string;
    };
    result: {
      avatar_thumbnail_url: string;
      branch_name: string;
      final_exam: number;
      first_name: string
      groups: {
        group_type: string;
        name: string;
      }[]
      last_name: string
      progress: number
      reward_amount: number
      role: string;
    }[];
  }

  export interface IRenderProps {
    entity: {
      companyId: number;
      createdAt: string;
      entityId: number;
      entityType: 'GAME' | 'COURSE';
      entityUuid: string;
      minutesToFinish: number;
      name: string;
      numberOfViews: number;
      percentAvg: number;
      rewardAmount: number;
      status: string;
      templateId: number;
      imageThumbnail: string;
    };
    result: IPerformanceEmployee[];
  }
}

export interface IPerformanceEmployee {
  avatarThumbnail: string;
  branchName: string;
  finalExam: number;
  firstName: string;
  groups: {
    groupType: string;
    name: string;
  }[];
  lastName: string;
  progress: number;
  rewardAmount: number;
  role: string;
}

export declare namespace StatisticsErrorReportTypes {
  export interface IRequestProps {
    companyId: number;
    type: 'COURSE' | 'GAME' | null;
    keyword: string;
  }

  export interface IResponseProps {
    entities: {
      reward_amount: number,
      status: string,
      created_at: string;
      entity_id: number;
      entity_type: 'GAME' | 'COURSE';
      image_thumbnail_url: string;
      minutes_to_finish: number;
      name: string;
      number_of_views: number;
      percent_avg: number;
    }[];
  }

  export interface IRenderProps {
    entities: {
      createdAt: string;
      id: number;
      type: 'GAME' | 'COURSE';
      imageThumbnail: string;
      minutesToFinish: number;
      name: string;
      numberOfViews: number;
      percentAvg: number;
    }[];
  }
}

export declare namespace StatisticsReportErrorDetailTypes {
  export interface IRequestProps {
    companyId: number;
    type: 'COURSE' | 'GAME' | null;
    entityId: number;
    branchId?: number;
    groupId?: number;
  }

  export interface IResponseProps {
    entity?: {
      company_id: number;
      created_at: string;
      entity_id: number;
      entity_type: 'GAME' | 'COURSE';
      entity_uuid: string;
      minutes_to_finish: number;
      name: string;
      number_of_views: number;
      percent_avg: number;
      reward_amount: number;
      status: string;
      template_id: number;
      image_thumbnail_url: string;
    };
    result?: IErrorEntityResponse[];
  }

  export interface IRenderProps {
    entity?: {
      companyId: number;
      createdAt: string;
      entityId: number;
      entityType: 'GAME' | 'COURSE';
      entityUuid: string;
      minutesToFinish: number;
      name: string;
      numberOfViews: number;
      percentAvg: number;
      rewardAmount: number;
      status: string;
      templateId: number;
      imageThumbnail: string;
    };
    result?: IErrorEntityRender[];
  }

  export interface IErrorEntityResponse {
    entity_id: number;
    name: string;
    category_name: string;
    question: IErrorQuestionResponse;
    question_content: string;
    total_not_correct: number;
    error_percentage: number;
  }

  export interface IErrorEntityRender {
    entityId: number;
    name: string;
    categoryName: string;
    question: IErrorQuestionRender;
    questionContent: string;
    totalNotCorrect: number;
    errorPercentage: number;
  }

  export interface IErrorQuestionResponse {
    entity_id: number;
    question_text: string;
    question_type: string;
    description: string;
    appendix?: string;
    content: string;
    created_at: string;
    mark_points_number: number;
    answer_options?: {
      entity_id: number;
      question_id: number;
      image_url: string;
      image_thumbnail_url: string;
      text: string;
    }[];
  }

  export interface IErrorQuestionRender {
    entityId: number;
    questionText: string;
    questionType: string;
    description: string;
    appendix?: string;
    content: string;
    createdAt: string;
    markPointsNumber: number;
    answerOptions?: {
      entityId: number;
      questionId: number;
      imageUrl: string;
      imageThumbnailUrl: string;
      text: string;
    }[];
  }
}

export declare namespace StatisticsErrorReportDownloadTypes {
  export interface IRequestProps {
    companyId: number;
    entityId: number;
    type: 'COURSE' | 'GAME';
  }
}

export declare namespace StatisticsZealReportTypes {
  export interface IRequestProps {
    companyId: number;
    keyword: string;
    branchId?: number;
    groupId?: number;
    startDate?: string;
    endDate?: string;
  }

  export interface IResponseProps {
    results: {
      first_name: string;
      last_name: string;
      cards_count: number;
      email: string;
      finished_orders: number;
      groups: {
        name: string;
      }[];
      reward_available: number;
      role: string;
      spent_time: number;
      username: string;
      avatar_thumbnail_url: string;
      branch_name: string;
    }[];
  }

  export interface IRenderProps {
    results: {
      firstName: string;
      lastName: string;
      cardsCount: number;
      email: string;
      finishedOrders: number
      groups: {
        name: string;
      }[];
      rewardAvailable: number;
      role: string;
      spentTime: number;
      username: string;
      avatarThumbnail: string;
      branchName: string;
    }[];
  }
}

export declare namespace StatisticsZealReportDownloadTypes {
  export interface IRequestProps extends StatisticsZealReportTypes.IRequestProps {}
}

export const GET_DATA_COUNT = {
  started: 'GET_DATA_COUNT_START',
  success: 'GET_DATA_COUNT_SUCCESS',
  failed: 'GET_DATA_COUNT_FAILED',
};

export const GET_LEARNING_ACTIVITY = {
  started: 'GET_LEARNING_ACTIVITY_START',
  success: 'GET_LEARNING_ACTIVITY_SUCCESS',
  failed: 'GET_LEARNING_ACTIVITY_FAILED',
};

export const GET_PERFORMANCE = {
  started: 'GET_PERFORMANCE_START',
  success: 'GET_PERFORMANCE_SUCCESS',
  failed: 'GET_PERFORMANCE_FAILED',
};

export const DOWNLOAD_PERFORMANCE = {
  started: 'DOWNLOAD_PERFORMANCE_START',
  success: 'DOWNLOAD_PERFORMANCE_SUCCESS',
  failed: 'DOWNLOAD_PERFORMANCE_FAILED',
};

export const GET_PERFORMANCE_DETAIL = {
  started: 'GET_PERFORMANCE_DETAIL_START',
  success: 'GET_PERFORMANCE_DETAIL_SUCCESS',
  failed: 'GET_PERFORMANCE_DETAIL_FAILED',
};

export const GET_ERROR_REPORTS = {
  started: 'GET_ERROR_REPORTS_START',
  success: 'GET_ERROR_REPORTS_SUCCESS',
  failed: 'GET_ERROR_REPORTS_FAILED',
};

export const DOWNLOAD_ERROR_REPORT = {
  started: 'DOWNLOAD_ERROR_REPORT_START',
  success: 'DOWNLOAD_ERROR_REPORT_SUCCESS',
  failed: 'DOWNLOAD_ERROR_REPORT_FAILED',
};

export const GET_REPORT_ERROR_DETAIL = {
  started: 'GET_REPORT_ERROR_DETAIL_START',
  success: 'GET_REPORT_ERROR_DETAIL_SUCCESS',
  failed: 'GET_REPORT_ERROR_DETAIL_FAILED',
};

export const GET_ZEAL_REPORTS = {
  started: 'GET_ZEAL_REPORTS_START',
  success: 'GET_ZEAL_REPORTS_SUCCESS',
  failed: 'GET_ZEAL_REPORTS_FAILED',
};

export const DOWNLOAD_ZEAL_REPORT = {
  started: 'DOWNLOAD_ZEAL_REPORT_START',
  success: 'DOWNLOAD_ZEAL_REPORT_SUCCESS',
  failed: 'DOWNLOAD_ZEAL_REPORT_FAILED',
};
