import {
  AttemptBattleTypes, BattleAggregatorTypes,
  BattleEmployeesTypes,
  BattlesEmployeeTypes,
  BattleTestTypes,
} from 'src/store/battles/types';

export const parseEmployeeBattles = (raw: BattlesEmployeeTypes.IResponseProps): BattlesEmployeeTypes.IRenderProps => ({
  employmentId: raw.employee.employment_id,
  firstName: raw.employee.first_name,
  lastName: raw.employee.last_name,
  role: raw.employee.role,
  username: raw.employee.username,
  email: raw.employee.email,
  avatarUrl: raw.employee.avatar_url,
  branchName: raw.employee.branch_name,
  avatarThumbnailUrl: raw.employee.avatar_thumbnail_url,
  rewardAvailable: raw.employee.reward_available,
  rewardAmount: raw.employee.reward_amount,
  groups: raw.employee.groups.map(e => ({
    id: e.entity_id,
    uuid: e.entity_uuid,
    name: e.name,
    groupType: e.group_type,
    createdAt: e.created_at,
    updatedAt: e.updated_at,
  })),
  finishedEntities: raw.employee.finished_entities.map(f => ({
    id: f.entity_id,
    name: f.name,
    uuid: f.entity_uuid,
    type: f.entity_type,
    imageThumbnailUrl: f.image_thumbnail_url,
    imageUrl: f.image_url,
  })),
  battlesStat: {
    winCount: raw.employee.battles_stat.win_count,
    loseCount: raw.employee.battles_stat.lose_count,
    total: raw.employee.battles_stat.total,
  },
  commonBattlesStat: {
    winCount: raw.employee.common_battles_stat.win_count,
    loseCount: raw.employee.common_battles_stat.lose_count,
    total: raw.employee.common_battles_stat.total,
  },
  me: {
    role: raw.me.role,
    firstName: raw.me.first_name,
    lastName: raw.me.last_name,
    username: raw.me.username,
    email: raw.me.email,
    avatarUrl: raw.me.avatar_url,
    avatarThumbnailUrl: raw.me.avatar_thumbnail_url,
    rewardAvailable: raw.me.reward_available,
    rewardAmount: raw.me.reward_amount,
  },
});

export const parseBattleTest = (raw: BattleTestTypes.IResponseProps): BattleTestTypes.IRenderProps => ({
  cards: raw.cards?.map(e => ({
    answerOptions: e.answer_options.map(a => ({
      createdAt: a.created_at,
      id: a.id,
      imageThumbnailUrl: a.image_thumbnail_url,
      imageUrl: a.image_url,
      questionId: a.question_id,
      text: a.text,
      uuid: a.uuid,
    })),
    cardId: e.card_id,
    cardName: e.card_name,
    content: e.content,
    createdAt: e.created_at,
    description: e.description,
    id: e.id,
    imageThumbnailUrl: e.image_thumbnail_url,
    isActive: e.is_active,
    markPointsNumber: e.mark_points_number,
    minutesToFinish: e.minutes_to_finish,
    questionText: e.question_text,
    questionType: e.question_type,
    timeLimit: e.time_limit,
    updatedAt: e.updated_at,
    uuid: e.uuid,
    isShuffled: e.is_shuffled,
  })),
  me: {
    userId: raw.me.user_id,
    employmentId: raw.me.employment_id,
    type: raw.me.type,
    status: raw.me.status,
    rewardAmount: raw.me.reward_amount,
    spentTimeSeconds: raw.me.spent_time_seconds,
    donePercent: raw.me.done_percent,
    employment: {
      avatarThumbnailUrl: raw.me.employment.avatar_thumbnail_url,
      avatarUrl: raw.me.employment.avatar_url,
      firstName: raw.me.employment.first_name,
      lastName: raw.me.employment.last_name,
      rewardAmount: raw.me.employment.reward_amount,
      rewardAvailable: raw.me.employment.reward_available,
      role: raw.me.employment.role,
      totalActivityPercent: raw.me.employment.total_activity_percent,
      type: raw.me.employment.type,
    },
  },
  participant: {
    userId: raw.participant.user_id,
    employmentId: raw.participant.employment_id,
    type: raw.participant.type,
    status: raw.participant.status,
    rewardAmount: raw.participant.reward_amount,
    spentTimeSeconds: raw.participant.spent_time_seconds,
    donePercent: raw.participant.done_percent,
    employment: {
      avatarThumbnailUrl: raw.participant.employment.avatar_thumbnail_url,
      avatarUrl: raw.participant.employment.avatar_url,
      firstName: raw.participant.employment.first_name,
      lastName: raw.participant.employment.last_name,
      rewardAmount: raw.participant.employment.reward_amount,
      rewardAvailable: raw.participant.employment.reward_available,
      role: raw.participant.employment.role,
      totalActivityPercent: raw.participant.employment.total_activity_percent,
      type: raw.participant.employment.type,
    },
  },
}
);

export const parseAttemptBattle = (e: AttemptBattleTypes.IResponseProps[]): AttemptBattleTypes.IRenderProps[] => (
  e.map(raw => ({
    donePercent: raw.done_percent,
    employmentId: raw.employment_id,
    id: raw.id,
    rewardAmount: raw.reward_amount,
    spentTimeSeconds: raw.spent_time_seconds,
    status: raw.status,
    type: raw.type,
    userId: raw.user_id,
    uuid: raw.uuid,
    questions: raw.questions?.map(q => ({
      answerIds: q.answer_ids,
      answerText: q.answer_text,
      cardId: q.card_id,
      correctAnswerIds: q.correct_answer_ids,
      correctAnswerText: q.correct_answer_text,
      correctMarkPoints: q.correct_mark_points,
      id: q.id,
      isCorrect: q.is_correct,
      markPoints: q.mark_points,
      type: q.type,
      uuid: q.uuid,
    })),
  }))
);

export const parseBattleEmployees = (raw: BattleEmployeesTypes.IResponseProps[]): BattleEmployeesTypes.IRenderProps[] => (
  raw.map(e => ({
    employmentId: e.employment_id,
    userId: e.user_id,
    firstName: e.first_name,
    lastName: e.last_name,
    username: e.username,
    email: e.email,
    branchName: e.branch_name,
    avatarUrl: e.avatar_url,
    avatarThumbnailUrl: e.avatar_thumbnail_url,
    rewardAvailable: e.reward_available,
    rewardAmount: e.reward_amount,
    groups: e.groups.map(g => ({
      id: g.entity_id,
      uuid: g.entity_uuid,
      name: g.name,
      groupType: g.group_type,
    })),
    battlesStat: {
      winCount: e.battles_stat.win_count,
      loseCount: e.battles_stat.lose_count,
      total: e.battles_stat.total,
    },
  }))
);

export const parseBattlesAggregator = (raw: BattleAggregatorTypes.IResponseProps): BattleAggregatorTypes.IRenderProps => ({
  total: raw.total,
  participants: raw.participants.map(p => ({
    id: p.entity_id,
    uuid: p.entity_uuid,
    userId: p.user_id,
    employmentId: p.employment_id,
    startedBattleDatetime: p.started_battle_datetime,
    finishedBattleDatetime: p.finished_battle_datetime,
    battleId: p.battle_id,
    companyId: p.company_id,
    battleUuid: p.battle_uuid,
    battleStatus: p.battle_status,
    status: p.status,
    createdAt: p.created_at,
    expiresAt: p.expires_at,
    isCreator: p.is_creator,
    rewardAmount: p.reward_amount,
    categories: p.categories.map(c => ({
      categoryId: c.category_id,
      categoryName: c.category_name,
    })),
    employment: {
      employmentId: p.employment.employment_id,
      userId: p.employment.user_id,
      firstName: p.employment.first_name,
      lastName: p.employment.last_name,
      username: p.employment.username,
      email: p.employment.email,
      avatarUrl: p.employment.avatar_url,
      avatarThumbnailUrl: p.employment.avatar_thumbnail_url,
      rewardAvailable: p.employment.reward_available,
      rewardAmount: p.employment.reward_amount,
    },
    rivalEmployment: {
      employmentId: p.rival_employment.employment_id,
      userId: p.rival_employment.user_id,
      firstName: p.rival_employment.first_name,
      lastName: p.rival_employment.last_name,
      username: p.rival_employment.username,
      email: p.rival_employment.email,
      avatarUrl: p.rival_employment.avatar_url,
      avatarThumbnailUrl: p.rival_employment.avatar_thumbnail_url,
      rewardAvailable: p.rival_employment.reward_available,
      rewardAmount: p.rival_employment.reward_amount,
    },
  })),
});

export const parseBattle = (p: BattleAggregatorTypes.IResponseBattle): BattleAggregatorTypes.IRenderBattle => ({
  id: p.entity_id,
  uuid: p.entity_uuid,
  userId: p.user_id,
  employmentId: p.employment_id,
  battleId: p.battle_id,
  battleUuid: p.battle_uuid,
  battleStatus: p.battle_status,
  status: p.status,
  createdAt: p.created_at,
  startedBattleDatetime: p.started_battle_datetime,
  finishedBattleDatetime: p.finished_battle_datetime,
  expiresAt: p.expires_at,
  companyId: p.company_id,
  isCreator: p.is_creator,
  rewardAmount: p.reward_amount,
  categories: p.categories.map(c => ({
    categoryId: c.category_id,
    categoryName: c.category_name,
  })),
  employment: {
    employmentId: p.employment.employment_id,
    userId: p.employment.user_id,
    firstName: p.employment.first_name,
    lastName: p.employment.last_name,
    username: p.employment.username,
    email: p.employment.email,
    avatarUrl: p.employment.avatar_url,
    avatarThumbnailUrl: p.employment.avatar_thumbnail_url,
    rewardAvailable: p.employment.reward_available,
    rewardAmount: p.employment.reward_amount,
  },
  rivalEmployment: {
    employmentId: p.rival_employment.employment_id,
    userId: p.rival_employment.user_id,
    firstName: p.rival_employment.first_name,
    lastName: p.rival_employment.last_name,
    username: p.rival_employment.username,
    email: p.rival_employment.email,
    avatarUrl: p.rival_employment.avatar_url,
    avatarThumbnailUrl: p.rival_employment.avatar_thumbnail_url,
    rewardAvailable: p.rival_employment.reward_available,
    rewardAmount: p.rival_employment.reward_amount,
  },
});