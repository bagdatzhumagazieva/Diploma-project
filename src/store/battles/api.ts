import { API } from 'src/constants/server';
import { stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { BattlesEmployeeTypes, BattleEmployeesTypes, BattleAggregatorTypes } from './types';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';
const querystring = require('querystring');

const battleUrl = `${API}battles`;
const battleAggregatorUrl = `${API}aggregator`;

export const getEmploymentBattle = (companyId: number, employeeId: number, token: string) => (
  stdApiGET({ token, url: `${API}search/employment/battles?company_id=${companyId}&employee_id=${employeeId}` })
);

export const createBattle = (data: BattlesEmployeeTypes.IBodyParams, companyId: number, token: string) => {
  const body = {
    category_ids: data.categoryIds,
    user_id: data.userId,
  };
  return (
    stdApiPOST({ token, data: body, url: `${battleUrl}?company_id=${companyId}` })
  );
};

export const getBattleTests = (companyId: number, battleId: number, token: string) => (
  stdApiGET({ token, url: `${battleUrl}/test?company_id=${companyId}&battle_id=${battleId}` })
);

export const createBattleTest = (data: CourseCompleteTypes.IQuestionCompleteBody, battleId: number, companyId: number, token: string) => {
  const body = {
    card_id: data.cardId,
    type: data.type,
    answer_text: data.answerText,
    answer_ids: data.answerIds,
    mark_points: data.markPoints,
  };
  return (
    stdApiPOST({ token, data: body, url: `${battleUrl}/test?company_id=${companyId}&battle_id=${battleId}` })
  );
};

export const getBattleEmployees = (data: BattleEmployeesTypes.IQueryParams, token: string) => {
  const body = {
    company_id: data.companyId,
    ...(data.keyword ? { keyword: data.keyword } : {}),
    ...(data.groupId ? { group_id: data.groupId } : {}),
    ...(data.groupIds ? { group_ids: data.groupIds } : {}),
    ...(data.branchIds ? { branch_ids: data.branchIds } : {}),
    ...(data.branchId ? { branch_id: data.branchId } : {}),
  };
  return (
    stdApiGET({ token, url: `${battleAggregatorUrl}/employees/battle_stat?${querystring.stringify(body)}` })
  );
};

export const getBattleList = (data: BattleAggregatorTypes.IQueryProps, token: string) => {
  const body = {
    company_id: data.companyId,
    ...(data.page ? { page: data.page } : {}),
    ...(data.page_size ? { page_size: data.page_size } : {}),
    ...(data.keyword ? { keyword: data.keyword } : {}),
    ...(data.sortByDate ? { sort_by_date: data.sortByDate } : {}),
    ...(data.desc ? { desc: data.desc } : {}),
    ...(data.sortByRewardAmount ? { sort_by_reward_amount: data.sortByRewardAmount } : {}),
    ...(data.sortByStatus ? { sort_by_status: data.sortByStatus } : {}),
  };
  return (
    stdApiGET({ token, url: `${battleAggregatorUrl}/battles/all?${querystring.stringify(body)}` })
  );
};

export const checkBattleStatus = (battleId: number, companyId: number, token: string) => {
  return (
    stdApiGET({ token, url: `${battleUrl}/check_status?company_id=${companyId}&battle_id=${battleId}` })
  );
};

export const leaveBattle = (battleId: number, companyId: number, token: string) => {
  return (
    stdApiPUT({ token, url: `${battleUrl}/lose?company_id=${companyId}&battle_id=${battleId}` })
  );
};

export const changeBattleStatus = (battleId: number, companyId: number, status: string, token: string) => (
  stdApiPUT({ token, data: { status }, url: `${battleUrl}/${battleId}?company_id=${companyId}` })
);

export const getBattleById = (battleId: number, companyId: number, token: string) => (
  stdApiGET({ token, url: `${battleAggregatorUrl}/battles/${battleId}?company_id=${companyId}` })
);
