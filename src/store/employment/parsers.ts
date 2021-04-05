import { EmploymentTypes } from 'src/store/employment/types';
import { parseBranchesData } from 'src/store/branch/reducer';
import { parseGroupData } from 'src/store/group/reducer';

export const parseEmployeesData = (raw: EmploymentTypes.IResponseProps): EmploymentTypes.IRenderProps => ({
  id: raw.id,
  userId: raw.user_id,
  firstName: raw.first_name,
  middleName: raw.middle_name,
  lastName: raw.last_name,
  companyId: raw.company_id,
  branchId: raw.branch_id,
  groupIds: raw.group_ids,
  uuid: raw.uuid,
  role: raw.role,
  isBlocked: raw.is_blocked,
  branch: raw.branch && parseBranchesData(raw.branch),
  groups: raw.groups && raw.groups.map(n => parseGroupData(n)),
  lastLoginTime: raw.last_login_time,
  activityPercent: Math.min(raw.total_activity_percent || 0, 100),
  birthDate: raw.birth_date,
  phone: raw.phone || '',
  email: raw.email || '',
  gender: raw.gender || '',
  fullName: [raw.first_name, raw.middle_name, raw.last_name].filter(Boolean).join(' '),
  rewardAmount: raw.reward_amount || 0,
  rewardAvailable: raw.reward_available || 0,
  rewardSpent: raw.reward_spent || 0,
  avatarThumbnailUrl: raw.avatar_thumbnail_url || '',
  avatarUrl: raw.avatar_url || '',
  companyName: raw.company?.name || '',
});
