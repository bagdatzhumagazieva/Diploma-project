import {
  TaskAggregatorAdminTypes,
  TaskAggregatorTypes,
  TaskStatisticsByGroups,
  TaskTypes,
  MyTasks,
} from 'src/store/task/types';

export const parseAggregatorTaskData = (raw: TaskAggregatorTypes.IResponseProps): TaskAggregatorTypes.IRenderProps => ({
  id: raw.entity_id,
  name: raw.name,
  type: raw.type,
  description: raw.description || '',
  image: raw.image_url || '',
  imageThumbnail: raw.image_thumbnail_url || '',
  rating: raw.rating || 0,
  commentsAmount: raw.comments_amount || 0,
  groupIds: raw.group_ids || [],
  isFavorite: raw.is_favorite || false,
  isFinished: raw.is_finished || false,
  tagIds: raw.tag_ids || [],
  rewardAmount: raw.reward_amount || 0,
  minutesToFinish: raw.minutes_to_finish || 0,
  publishDateTime: raw.publish_datetime || '',
});

export const parseTaskStatisticByGroups = (data: TaskStatisticsByGroups.IResponse): TaskStatisticsByGroups.IRender => ({
  totalAmount: data.total_amount,
  groupAmounts: data.group_amounts.map(e => ({
    groupId: e.group_id,
    totalAmount: e.total_amount,
    finishedAmount: e.finished_amount,
    groupName: e.group_name,
  })),
  rating: data.exercise.rating,
  finishedAmount: data.finished_amount,
});

export const parseAggregatorDetailTask = (data: TaskAggregatorTypes.IResponseDetailProps):
    TaskAggregatorTypes.IRenderDetailProps => ({
      id: data.id,
      uuid: data.uuid,
      groupIds: data.group_ids,
      name: data.name,
      cardIds: data.card_ids,
      companyId: data.company_id,
      imageUrl: data.image_url,
      imageThumbnailUrl: data.image_thumbnail_url,
      tagIds: data.tag_ids,
      publishDatetime: data.publish_datetime,
      status: data.status,
      type: data.type,
      rewardAmount: data.reward_amount,
      minutesToFinish: data.minutes_to_finish,
      description: data.description,
      rating: data.rating,
      commentsAmount: data.comments_amount,
      isFavorite: data.is_favorite,
      isActive: data.is_active,
      isFinished: data.is_finished,
      mainCardContent: data?.main_card?.content,
      mainCardDescription: data?.main_card?.description,
      mainCardInstruction: data?.main_card?.question?.description,
      mainCardId: data.main_card?.id,
      userID: data.complete_attempt?.user_id,
      userRating: data.user_rating,
      tags: data.tags.map(e => ({
        id: e.tag_id,
        name: e.tag_name,
      })),
      pollResults: data.poll_results?.map((e => ({
        cardId: e.card_id,
        answerIds: e.answer_ids,
        answerText: e.answer_text,
        answerOrderIds: e.answer_order_ids,
        markPoints: e.mark_points,
      }))) || [],
      completeAttempt: data.complete_attempt?.questions.map(e => ({
        createdAt: e.created_at,
        updatedAt: e.updated_at,
        id: e.id,
        uuid: e.uuid,
        cardId: e.card_id,
        type: e.type,
        answerText: e.answer_text,
        answerIds: e.answer_ids,
        markPoints: e.mark_points,
        isCorrect: e.is_correct,
        correctAnswerIds: e.correct_answer_ids,
        correctMarkPoints: e.correct_mark_points,
        correctAnswerText: e.correct_answer_text,
      })),
      questions: data?.questions?.map(e => ({
        id: e.id,
        uuid: e.uuid,
        cardId: e.card_id,
        questionText: e.question_text,
        questionType: e.question_type,
        description: e.description,
        content: e.content,
        markPointsNumber: e.mark_points_number,
        cardName: e.card_name,
        minutesToFinish: e.minutes_to_finish,
        imageThumbnailUrl: e.image_thumbnail_url,
        answerOptions: e.answer_options.map(n => ({
          id: n.id,
          uuid: n.uuid,
          questionId: n.question_id,
          imageUrl: n.image_url,
          imageThumbnailUrl: n.image_thumbnail_url,
          text: n.text,
        })),
      })),
    });

export const parseTaskStatistics = (e: TaskAggregatorAdminTypes.IResponseProps): TaskAggregatorAdminTypes.IRenderProps => ({
  statistics: e.statistics?.map(n => ({
    cardId: n.card_id,
    answerIds: n.answer_ids,
    answerTexts: n.answer_texts,
    markPoints: n.mark_points,
    answerOrderIds: n.answer_order_ids,
    card: n.card ? {
      id: n.card.entity_id,
      uuid: n.card.entity_uuid,
      name: n.card.name,
      description: n.card.description,
      content: n.card.content,
      questionContent: n.card.question_content,
      question: {
        id: n.card.question.entity_id,
        uuid: n.card.question.entity_uuid,
        cardId: n.card.question.card_id,
        questionText: n.card.question.question_text,
        questionType: n.card.question.question_type,
        description: n.card.question.description,
        content: n.card.question.content,
        createdAt: n.card.question.created_at,
        updatedAt: n.card.question.updated_at,
        markPointsNumber: n.card.question.mark_points_number,
        answerOptions: n.card.question.answer_options?.map(p => ({
          id: p.entity_id,
          uuid: p.entity_uuid,
          questionId: p.question_id,
          imageUrl: p.image_url,
          imageThumbnailUrl: p.image_thumbnail_url,
          text: p.text,
        }) || []),
      },
    } : null,
  })),
  users: e.users?.map(n => ({
    userId: n.user_id,
    firstName: n.first_name,
    lastName: n.last_name,
    avatarThumbnail: n.avatar_thumbnail,
  })),
});

export const parseAdminTasks = (data: TaskTypes.IResponseAdmin): TaskTypes.IRenderAdmin => ({
  total: data.total,
  exercises: data.exercises.map(e => ({
    id: e?.entity_id,
    uuid: e?.entity_uuid,
    name: e?.name,
    description: e?.description,
    imageUrl: e?.image_url,
    imageThumbnailUrl: e?.image_thumbnail_url,
    rewardAmount: e?.reward_amount,
    rating: e?.rating,
    type: e?.type,
    groupIds: e?.group_ids,
    groups: e?.groups.map(n => ({
      id: n.entity_id,
      name: n.name,
    })),
    minutesToFinish: e?.minutes_to_finish,
    publishDatetime: e?.publish_datetime,
    createdAt: e?.created_at,
    updatedAt: e?.updated_at,
    status: e?.status,
    activityPercent: e?.activity_percent,
  })),
});


export const parseMyTasksCount = (raw: MyTasks.IResponseProps): MyTasks.IRenderProps => ({
  totalNotFinished: raw.total_not_finished,
});