import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import useDebounce from 'src/hooks/useDebounce';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import Input from 'src/components/molecules/Input';
import Typography from 'src/components/atoms/Typography';
import Pagination from 'src/components/atoms/Pagination';
import TableEmployees from 'src/components/organisms/TableComponents/TableEmployees/index';

// import employmentActions from 'src/store/employment/actions';
import { IRenderBody } from 'src/core/components/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { SortDirection } from 'src/components/molecules/Table/types';
import { TableEmployeesWithPaginationTypes } from 'src/components/organisms/TableComponents/TableEmployees/types';
import { IEmploymentBodyParams } from 'src/store/employment/types';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';

function TableEmployeesWithPagination(props: TableEmployeesWithPaginationTypes.IProps) {
  const {
    className, branches, groups, branchId,
    groupId, companyId, changedEmployeeBranch,
    deletedEmployee, updatedEmployeeActiveness,
    addOrRemoveEmployeesGroupsState: addOrRemoveState,
    sentPasswordsToEmployeesState: sentPasswordState,
    getEmployees, employeesCount, clearChangedEmployeesState,
    updatedEmployee, actionButtons,
  } = props;

  const { data: employees, loading: employeesLoading } = props.employees || {};

  const employeesPerPage = 20;
  const [employeesSearchValue, setEmployeesSearchValue] = useState<string>('');

  const notification = useNotification();
  const debouncedSearchValue = useDebounce(employeesSearchValue, 500);
  const defaultParams = {
    page: 1,
    page_size: employeesPerPage,
    company_id: companyId,
    keyword: '',
    branch_id: branchId ? +branchId : undefined,
    group_ids: groupId ? [+groupId] : undefined,
  };
  const [bodyParams, setBodyParams] = useState<IEmploymentBodyParams>(defaultParams);

  useEffect(
    () => {
      updatedEmployee && addNotification(updatedEmployee);
      updatedEmployeeActiveness && addNotification(updatedEmployeeActiveness);
      changedEmployeeBranch && addNotification(changedEmployeeBranch);
      deletedEmployee && !deletedEmployee.fromRemovalModal && addNotification(deletedEmployee);
      addOrRemoveState && addNotification(addOrRemoveState);
      sentPasswordState && addNotification(sentPasswordState);
      if (
        (changedEmployeeBranch && (changedEmployeeBranch.responseType === NotificationType.Success)) ||
        (deletedEmployee && (deletedEmployee.responseType === NotificationType.Success)) ||
        (updatedEmployeeActiveness && (updatedEmployeeActiveness.responseType === NotificationType.Success)) ||
        (addOrRemoveState && (addOrRemoveState.responseType === NotificationType.Success)) ||
        (sentPasswordState && (sentPasswordState.responseType === NotificationType.Success)) ||
        (updatedEmployee && (updatedEmployee.responseType === NotificationType.Success))
      ) {
        const newBodyParams = { ...bodyParams, page: 1 };
        setBodyParams(newBodyParams);
        getEmployeesByBranch(newBodyParams);
      }
    },
    [changedEmployeeBranch, deletedEmployee, updatedEmployeeActiveness,
      addOrRemoveState, sentPasswordState, updatedEmployee],
  );

  useEffect(
    () => {
      const newBodyParams = { ...bodyParams, keyword: debouncedSearchValue };
      setBodyParams(newBodyParams);
      getEmployeesByBranch(newBodyParams);
    },
    [debouncedSearchValue],
  );

  const addNotification = (notificationBody: IRenderBody) => {
    notification.addStateNotification(notificationBody);
    clearChangedEmployeesState && clearChangedEmployeesState();
  };

  const onGetPage = (page: number) => {
    const newBodyParams = { ...bodyParams, page };
    setBodyParams(newBodyParams);
    getEmployeesByBranch(newBodyParams);
  };

  const getEmployeesByBranch = (bodyParams: IEmploymentBodyParams) => {
    getEmployees && getEmployees(bodyParams);
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    const newBodyParams = {
      ...bodyParams,
      order_field: (sortDirection !== SortDirection.Default) ? `${label}_${sortDirection}` : undefined,
    };
    setBodyParams(newBodyParams);
    getEmployeesByBranch(newBodyParams);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeesSearchValue(event.target.value);
  };

  return (
    <div className={classNames('pos_relative grid', className)}>
      <div className="d-flex align-items-center mb-24">
        <Typography variant="h1">
          Пользователи
        </Typography>
      </div>
      <div className="d-flex align-items-end justify-content-between">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Поиск пользователя
            </Typography>
            <Input
              type="text"
              placeholder="Имя Фамилия"
              classNames="employees-search-input"
              value={employeesSearchValue}
              onChange={onInputChange}
              icon={<SearchIcon className="ml-16" style={{ minWidth: '20px' }} width="20px" height="20px"/>}
            />
          </div>
        </div>
        {actionButtons}
      </div>
      <TableEmployees
        employeesLoading={employeesLoading}
        onSort={onSort}
        employees={employees || []}
        branches={branches}
        groups={groups}
        emptyDataDescription="Список пользователей пуст."
      />
      <Pagination
        total={employeesCount || employeesPerPage}
        pageSize={employeesPerPage}
        onGetPage={onGetPage}
        className="mt-16"
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  employees: state.employmentReducer.employees,
  groupOptions: state.groupReducer.groups.data,
  changedEmployeeBranch: state.employmentReducer.changedEmployeeBranchState.data,
  deletedEmployee: state.employmentReducer.removedEmployeesState.data,
  updatedEmployeeActiveness: state.employmentReducer.updatedEmployeeActiveness.data,
  updatedEmployee: state.employmentReducer.updatedEmployeeState.data,
  addOrRemoveEmployeesGroupsState: state.employmentReducer.addOrRemoveEmployeesGroupsState.data,
  sentPasswordsToEmployeesState: state.employmentReducer.sentPasswordsToEmployeesState.data,
});

const mapDispatchToProps = {
  // getEmployees: employmentActions.getEmployees,
  // clearChangedEmployeesState: employmentActions.clearChangedEmployeesState,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(TableEmployeesWithPagination));
