import QueryString from 'querystring';
import { API } from 'src/constants/server';
import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { EmploymentTypes, IEmploymentBodyParams } from 'src/store/employment/types';
import { InvitationTypes } from 'src/store/invitation/types';

const getEmploymentUrl = `${API}employees/`;
const getEmploymentByCompanyIdUrl = `${API}companies/`;

export const getEmployees = (params: IEmploymentBodyParams, token: string) => {
  const queryParams = {
    ...(params.page ? { page: params.page } : {}),
    ...(params.page_size ? { page_size: params.page_size } : {}),
    ...(params.branch_id ? { branch_id : params.branch_id } : {}),
    ...(params.branch_ids ? { branch_ids: params.branch_ids } : {}),
    ...(params.company_id ? { company_id : params.company_id } : {}),
    ...(params.group_ids ? { group_ids : params.group_ids } : {}),
    ...(params.order_field ? { order_field : params.order_field } : {}),
    ...(params.keyword ? { keyword : params.keyword } : {}),
    ...(params.last_login_time_from ? { last_login_time_from : params.last_login_time_from } : {}),
    ...(params.last_login_time_to ? { last_login_time_to : params.last_login_time_to } : {}),
    ...(params.not_group_id ? { not_group_id : params.not_group_id } : {}),
    ...(params.without_groups ? { without_groups : params.without_groups } : {}),
    ...(params.with_blocked ? { with_blocked : params.with_blocked } : {}),
    ...(params.is_active ? { is_active : params.is_active === 'active' } : {}),
  };
  return stdApiGET({ token, url: `${getEmploymentUrl}?${QueryString.stringify(queryParams)}` });
};

export const getEmploymentByCompanyId = (companyId: number, token: string) => (
  stdApiGET({ token, url: `${getEmploymentByCompanyIdUrl}${companyId}/my_employment` })
);

export const getEmployeesExcel = (companyId: string, token: string) => (
  stdApiGET({ token, url: `${getEmploymentUrl}download_employees?company_id=${companyId}` })
);
export const updateEmployee = (employeeData: EmploymentTypes.IUpdateEmployeeBodyProps, token: string) => {
  const requestBody = {
    company_id: employeeData.companyId,
    employee_ids: employeeData.employeeIds,
    branch_id: employeeData.branchId,
    group_ids: employeeData.groupIds,
    is_blocked: employeeData.isBlocked,
    role: employeeData.role,
  };
  return (
    stdApiPUT({ token, data: requestBody, url: `${getEmploymentUrl}` })
  );
};

export const deleteEmployees = (employeeIds: number[], token: string) => (
  stdApiDELETE({
    token,
    data: { employment_ids: employeeIds },
    url: `${getEmploymentUrl}`,
  })
);

export const addOrRemoveEmployeesGroups = (employeeData: EmploymentTypes.IUpdateEmployeeBodyProps, operation: 'add' | 'delete', token: string) => {
  const requestBody = {
    employee_ids: employeeData.employeeIds,
    group_ids: employeeData.groupIds,
  };
  return (
    stdApiPUT({ token, data: requestBody, url: `${getEmploymentUrl}${operation}_group` })
  );
};

export const sendPasswordsToEmployees = (employeeIds: number[], companyId: number, token: string) => (
  stdApiPOST({
    token,
    data: { employment_ids: employeeIds },
    url: `${getEmploymentUrl}send_password?company_id=${companyId}`,
  })
);

export const removeEmployeesFromExcel = (companyId: number, employees: InvitationTypes.IInvitationExcelResponseProps[], token: string) => (
  stdApiDELETE({
    token,
    data: employees,
    url: `${getEmploymentUrl}from_excel?company_id=${companyId}`,
  })
);
