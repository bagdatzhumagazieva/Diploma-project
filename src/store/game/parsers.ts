import { GameAdminTypes, GameTypes, GameWebTypes } from 'src/store/game/types';
import { Status } from 'src/store/course/types';

const convertTestDataToUnderScore = (params: GameTypes.ITest, index: number) => ({
  name: params.name,
  description: params.description,
  card_ids: Array.isArray(params.cards) ? params.cards.map(item => item.id) : [],
  order_index: index,
});

const convertLevelDataToUnderscore = (params: GameTypes.ILevel, index: number) => ({
  name: params.name,
  description: params.description,
  // todo delete this field
  reward_amount: 0,
  order_index: index,
  tests: params.tests.map((test, index) => convertTestDataToUnderScore(test, index)),
});

export const convertGameDataToUnderscore = (bodyParams: GameTypes.Game, companyId: number) => ({
  name: bodyParams.name,
  description: bodyParams.description,
  company_id: companyId,
  game_template_id: bodyParams.templateId || -1,
  reward_amount: bodyParams.rewardAmount,
  group_ids: bodyParams.groupIds,
  tag_ids: bodyParams.tagIds,
  image_url: bodyParams.imageUrl,
  image_thumbnail_url: bodyParams.imageThumbnailUrl,
  certificate_earn_min_percent: bodyParams.certificateEarnMinPercent,
  certificate_image_url: bodyParams.certificateImageUrl,
  certificate_image_thumbnail_url: bodyParams.certificateImageThumbnailUrl,
  certificate_expiration_days: bodyParams.certificateExpirationDays,
  status: bodyParams.status || Status.DRAFT,
  is_modifiers_enabled: bodyParams.isModifiersEnabled,
  levels: bodyParams.levels?.map((level, index) => convertLevelDataToUnderscore(level, index)),
});

export const convertGameUpdateDataToUnderscore = (bodyParams: GameTypes.GameUpdate, companyId: number) => ({
  name: bodyParams.name,
  description: bodyParams.description,
  company_id: companyId,
  game_template_id: bodyParams.templateId || -1,
  reward_amount: bodyParams.rewardAmount,
  group_ids: bodyParams.groupIds,
  tag_ids: bodyParams.tagIds,
  image_url: bodyParams.imageUrl,
  image_thumbnail_url: bodyParams.imageThumbnailUrl,
  certificate_earn_min_percent: bodyParams.certificateEarnMinPercent,
  certificate_image_url: bodyParams.certificateImageUrl,
  certificate_image_thumbnail_url: bodyParams.certificateImageThumbnailUrl,
  certificate_expiration_days: bodyParams.certificateExpirationDays,
  status: bodyParams.status || Status.DRAFT,
  is_modifiers_enabled: bodyParams.isModifiersEnabled,
  levels: bodyParams.levels?.map((level, index) => convertLevelDataToUnderscore(level, index)),
});

const parseTestData = (data?: any): GameTypes.ITest => ({
  id: data.id || '',
  name: data?.name || '',
  description: data?.description || '',
  cardIds: data?.card_ids || [],
});

const parseLevelData = (data: any): GameTypes.ILevel => ({
  id: data.id || '',
  name: data?.name || '',
  description: data?.description || '',
  tests: Array.isArray(data.tests) ? data.tests.map((test: any) => parseTestData(test)) : [],
});

export const parseGameData = (data: any): GameTypes.Game => ({
  id: data?.id,
  name: data?.name || '',
  description: data?.description || '',
  templateId: data?.game_template_id || -1,
  rewardAmount: data?.reward_amount || 0,
  groupIds: data?.group_ids || [],
  tagIds: data?.tag_ids || [],
  imageUrl: data?.image_url || '',
  imageThumbnailUrl: data?.image_thumbnail_url || '',
  certificateEarnMinPercent: data?.certificate_earn_min_percent || '',
  certificateImageUrl: data?.certificate_image_url || '',
  certificateImageThumbnailUrl: data?.certificate_image_thumbnail_url || '',
  certificateExpirationDays: data?.certificate_expiration_days || 0,
  status: data?.status || Status.DRAFT,
  isModifiersEnabled: data?.is_modifiers_enabled || false,
  levels: Array.isArray(data.levels) ? data.levels.map((level: any) => parseLevelData(level)) : [],
});

export const parseAdminGames = (data: GameAdminTypes.IResponseProps): GameAdminTypes.IRenderProps => ({
  total: data.total,
  games: data.games.map((raw: GameAdminTypes.IResponseGame) => ({
    certificateEarnMinPercent: raw.certificate_earn_min_percent,
    certificateExpirationDate: raw.certificate_expiration_date,
    certificateImageThumbnailUrl: raw.certificate_image_thumbnail_url,
    certificateImageUrl: raw.certificate_image_url,
    commentsAmount: raw.comments_amount,
    createdAt: raw.created_at,
    description: raw.description,
    id: raw.entity_id,
    uuid: raw.entity_uuid,
    groupIds: raw.group_ids,
    groups: raw.groups.map(e => ({
      value: `${e.entity_id}`,
      name: e.name,
    })),
    imageThumbnailUrl: raw.image_thumbnail_url,
    imageUrl: raw.image_url,
    isModifiersEnabled: raw.is_modifiers_enabled,
    name: raw.name,
    rating: raw.rating,
    rewardAmount: raw.reward_amount,
    status: raw.status,
    tagIds: raw.tag_ids,
    template: raw.template,
    templateId: raw.template_id,
    updatedAt: raw.updated_at,
    numberOfViews: raw.number_of_views,
    minutesToFinish: raw.minutes_to_finish,
    levels: raw.levels.map(n => ({
      id: n.entity_id,
      uuid: n.entity_uuid,
      name: n.name,
      rewardAmount: n.reward_amount,
      description: n.description,
    })),
    topPlayers: raw.top_players.map(n => ({
      employmentId: n.employment_id,
      userId: n.user_id,
      firstName: n.first_name,
      lastName: n.last_name,
      username: n.username,
      email: n.email,
      avatarUrl: n.avatar_url,
      avatarThumbnailUrl: n.avatar_thumbnail_url,
      rewardAvailable: n.reward_available,
      rewardAmount: n.reward_amount,
    })),
  })),
});

export const parseWebGames = (raw: GameWebTypes.IResponseProps): GameWebTypes.IRenderProps => ({
  total: raw.total,
  games: raw.games.map(g => ({
    id:  g.entity_id,
    uuid: g.entity_uuid,
    name: g.name,
    description: g.description,
    imageUrl: g.image_url,
    imageThumbnailUrl: g.image_thumbnail_url,
    templateId: g.template_id,
    rewardAmount: g.reward_amount,
    groupIds: g.group_ids,
    rating: g.rating,
    commentsAmount: g.comments_amount,
    tagIds: g.tag_ids,
    createdAt: g.created_at,
    updatedAt: g.updated_at,
    status: g.status,
    certificateImageThumbnailUrl: g.certificate_image_thumbnail_url,
    certificateImageUrl: g.certificate_image_url,
    certificateExpirationDate: g.certificate_expiration_date,
    certificateEarnMinPercent: g.certificate_earn_min_percent,
    isModifiersEnabled: g.is_modifiers_enabled,
    tags: g.tags.map(t => ({
      tagId: t.tag_id,
      tagName: t.tag_name,
    })),
    progress: g.progress,
    isFavorite: g.is_favorite,
    numberOfViews: g.number_of_views,
    minutesToFinish: g.minutes_to_finish,
    isFinished: g.is_finished,
    hasCertificate: g.has_certificate,
    levelsData: {
      finishedLevelsCount: g.levels_data.finished_levels_count,
      total: g.levels_data.total,
    }
  })),
  tags: raw.tags.map(t => ({
    tagId: t.tag_id,
    tagName: t.tag_name,
    total: t.total,
  })),
});
