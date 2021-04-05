import {
  StatisticsCountTypes,
  StatisticsLearningActivityTypes,
  StatisticsPerformanceTypes,
  StatisticsPerformanceDetailTypes,
  StatisticsErrorReportTypes,
  StatisticsReportErrorDetailTypes,
  StatisticsZealReportTypes,
} from './types';

export const parseDataCount = (raw: StatisticsCountTypes.IResponseProps): StatisticsCountTypes.IRenderProps => ({
  groups: {
    total: raw.groups.total,
    groupsResults: raw.groups.groups_results.sort((a, b) => b.total - a.total).map(n => ({
      entityId: n.entity_id,
      name: n.name,
      total: n.total,
    })),
  },
  cards: {
    total: raw.cards.total,
    knowledgeCardsTotal: raw.cards.knowledge_cards_total,
    exercisesTotal: raw.cards.exercises_total,
    coursesTotal: raw.cards.courses_total,
    gamesTotal: raw.cards.games_total,
  },
  employees: {
    total: raw.employees.total,
    totalActive: raw.employees.total_active,
    totalBlocked: raw.employees.total_blocked,
  },
});

export const parseLearningActivity = (raw: StatisticsLearningActivityTypes.IResponseProps): StatisticsLearningActivityTypes.IRenderProps => ({
  activities: raw.activities.map(n => ({
    rangeStart: n.range_start,
    rangeEnd: n.range_end,
    results: n.results,
  })),
});

export const parsePerformance = (raw: StatisticsPerformanceTypes.IResponseProps): StatisticsPerformanceTypes.IRenderProps => ({
  entities: raw.entities.map(n => ({
    createdAt: n.created_at,
    description: n.description,
    id: n.entity_id,
    type: n.entity_type,
    imageThumbnail: n.image_thumbnail_url,
    minutesToFinish: n.minutes_to_finish,
    name: n.name,
    numberOfViews: n.number_of_views,
    percentAvg: n.percent_avg,
  })),
});

export const parsePerformanceDetail = (raw: StatisticsPerformanceDetailTypes.IResponseProps): StatisticsPerformanceDetailTypes.IRenderProps => ({
  entity: {
    companyId: raw.entity.company_id,
    createdAt: raw.entity.created_at,
    entityId: raw.entity.entity_id,
    entityType: raw.entity.entity_type,
    entityUuid: raw.entity.entity_uuid,
    minutesToFinish: raw.entity.minutes_to_finish,
    name: raw.entity.name,
    numberOfViews: raw.entity.number_of_views,
    percentAvg: raw.entity.percent_avg,
    rewardAmount: raw.entity.reward_amount,
    status: raw.entity.status,
    templateId: raw.entity.template_id,
    imageThumbnail: raw.entity.image_thumbnail_url,
  },
  result: raw.result.map(n => ({
    avatarThumbnail: n.avatar_thumbnail_url,
    branchName: n.branch_name,
    finalExam: n.final_exam,
    firstName: n.first_name,
    groups: n.groups.map(g => ({
      groupType: g.group_type,
      name: g.name,
    })),
    lastName: n.last_name,
    progress: n.progress,
    rewardAmount: n.reward_amount,
    role: n.role,
  })),
});

export const parseErrorReport = (raw: StatisticsErrorReportTypes.IResponseProps): StatisticsErrorReportTypes.IRenderProps => ({
  entities: raw.entities.map(n => ({
    createdAt: n.created_at,
    id: n.entity_id,
    type: n.entity_type,
    imageThumbnail: n.image_thumbnail_url,
    minutesToFinish: n.minutes_to_finish,
    name: n.name,
    numberOfViews: n.number_of_views,
    percentAvg: n.percent_avg,
  })),
});

export const parseErrorReportDetail = (raw: StatisticsReportErrorDetailTypes.IResponseProps): StatisticsReportErrorDetailTypes.IRenderProps => ({
  entity: raw.entity && {
    companyId: raw.entity.company_id,
    createdAt: raw.entity.created_at,
    entityId: raw.entity.entity_id,
    entityType: raw.entity.entity_type,
    entityUuid: raw.entity.entity_uuid,
    minutesToFinish: raw.entity.minutes_to_finish,
    name: raw.entity.name,
    numberOfViews: raw.entity.number_of_views,
    percentAvg: raw.entity.percent_avg,
    rewardAmount: raw.entity.reward_amount,
    status: raw.entity.status,
    templateId: raw.entity.template_id,
    imageThumbnail: raw.entity.image_thumbnail_url,
  },
  result: raw.result && raw.result.map(n => ({
    entityId: n.entity_id,
    name: n.name,
    categoryName: n.category_name,
    errorPercentage: n.error_percentage,
    question: {
      entityId: n.question.entity_id,
      questionText: n.question.question_text,
      questionType: n.question.question_type,
      description: n.question.description,
      appendix: n.question.appendix,
      content: n.question.content,
      createdAt: n.question.created_at,
      markPointsNumber: n.question.mark_points_number,
      answerOptions: n.question.answer_options && n.question.answer_options.map(m => ({
        entityId: m.entity_id,
        questionId: m.question_id,
        imageUrl: m.image_url,
        imageThumbnailUrl: m.image_thumbnail_url,
        text: m.text,
      })),
    },
    questionContent: n.question_content,
    totalNotCorrect: n.total_not_correct,
  })),
});

export const parseZealReport = (raw: StatisticsZealReportTypes.IResponseProps): StatisticsZealReportTypes.IRenderProps => ({
  results: raw.results && raw.results.map(n => ({
    firstName: n.first_name,
    lastName: n.last_name,
    cardsCount: n.cards_count,
    email: n.email,
    finishedOrders: n.finished_orders,
    groups: n.groups,
    avatarThumbnail: n.avatar_thumbnail_url,
    rewardAvailable: n.reward_available,
    role: n.role,
    spentTime: n.spent_time,
    username: n.username,
    branchName: n.branch_name,
  })),
});
