import { CommentTypes } from 'src/store/comment/types';
import { ProfileTypes } from 'src/store/profile/types';

export const parseCommentData = (raw: CommentTypes.IResponse): CommentTypes.IRender => ({
  id: raw.entity_id,
  uuid: raw.comment_entity_uuid,
  userId: raw.user_id,
  employmentId: raw.employment_id,
  type: raw.comment_entity_type, // COURSE OR EXERCISE
  text: raw.text,
  parentId: raw.parent_id,
  rootId: raw.root_id,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  subComments: raw.sub_comments ? raw.sub_comments.map(item => parseCommentData(item)) : [],
  rootCommentsCnt: raw.root_comments_number,
  employee: {
    fullName: [raw.employee?.first_name || 'Alisher', raw.employee?.last_name || 'Khassen'].join(' '),
    username: raw.employee ? (raw.employee.username || '') : 'alohadancer',
    userId: raw.employee ? (raw.employee.user_id || 0) : 0,
    avatarThumbnailUrl: raw.employee ? (raw.employee.avatar_thumbnail_url || '') : '',
  },
});

export const parseCreatedCommentData = (raw: CommentTypes.ICreatedResponse, profile?: ProfileTypes.IRenderProps): CommentTypes.IRender => ({
  id: raw.id,
  uuid: raw.uuid,
  userId: raw.user_id,
  employmentId: raw.employment_id,
  type: raw.entity_type, // COURSE OR EXERCISE
  text: raw.text,
  parentId: raw.parent_comment_id,
  rootId: raw.root_id,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  subComments: [],
  rootCommentsCnt: 0,
  employee: {
    fullName: profile?.fullName || '' ,
    username: profile?.login || '',
    userId: profile?.id || 0,
    avatarThumbnailUrl: profile?.avatarUrl || '',
  },
});
