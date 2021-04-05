import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import useDebounce from 'src/hooks/useDebounce';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import Typography from 'src/components/atoms/Typography';
import Pagination from 'src/components/atoms/Pagination';
import Button from 'src/components/atoms/Button';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Select from 'src/components/molecules/Select';
import Input from 'src/components/molecules/Input';
import DateRangePicker from 'src/components/molecules/DateRangePicker';

import invitationActions from 'src/store/invitation/actions';
import groupActions from 'src/store/group/actions';
import branchActions from 'src/store/branch/actions';
import { DEFAULT_DATE_FORMAT } from 'src/core/store/values';
import { GroupTypes } from 'src/store/group/types';
import { InvitationTypes } from 'src/store/invitation/types';
import { SortDirection } from 'src/components/molecules/Table/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import TableInvitations from 'src/components/organisms/TableComponents/TableInvitations/index';
import { TableInvitationsWithPaginationTypes } from 'src/components/organisms/TableComponents/TableInvitations/types';
import { IOption } from 'src/components/molecules/Select/types';
import { INVITATION_STATUSES } from 'src/components/organisms/TableComponents/TableInvitations/consts';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import 'src/components/organisms/TableComponents/TableInvitations/index.scss';

function TableInvitationsWithPagination(props: TableInvitationsWithPaginationTypes.IProps) {
  const {
    className,
    companyId,
    deletedInvitationsState,
    resentInvitationsState,
    clearUpdatedInvitationsState,
    getInvitations: propsGetInvitations,
    groups, branches,
    getBranches, getGroups,
  } = props;

  const { data: invitations, total: invitationsTotal, loading: invitationsLoading } = props.invitations || {};

  const invitationsPerPage = 6;
  const [invitationsSearchValue, setInvitationsSearchValue] = useState<string>('');
  const notification = useNotification();
  const debouncedSearchValue = useDebounce(invitationsSearchValue, 500);
  const branchOptions = branches?.map(e => ({ value: `${e.id}`, name: e.name }));

  const [selectedGroups, setSelectedGroups] = useState<IOption[]>([]);
  const [dateRange, setDateRange] = useState<any>();
  const [isResetFilters, setResetFilters] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [bodyParams, setBodyParams] = useState<InvitationTypes.IGetInvitationsBodyParams>({
    page: 1,
    page_size: invitationsPerPage,
    company_id: companyId,
    keyword: '',
  });

  const getInvitations = (body: InvitationTypes.IGetInvitationsBodyParams) => {
    propsGetInvitations && propsGetInvitations(body);
  };

  useEffect(
    () => {
      const newBodyParams = { ...bodyParams, keyword: debouncedSearchValue, page: 1 };
      setBodyParams(newBodyParams);
      getInvitations(newBodyParams);
    },
    [debouncedSearchValue],
  );

  useEffect(
    () => {
      const groupParams  = { companyId: companyId ? +companyId : 0 };
      getBranches && getBranches(companyId ? +companyId : 0);
      getGroups && getGroups(groupParams);
    },
    [companyId, getBranches, getGroups],
  );

  useEffect(
    () => {
      if (deletedInvitationsState) {
        notification.addStateNotification(deletedInvitationsState);
        clearUpdatedInvitationsState && clearUpdatedInvitationsState();
      }
      if (resentInvitationsState) {
        notification.addStateNotification(resentInvitationsState);
        clearUpdatedInvitationsState && clearUpdatedInvitationsState();
      }
      if (
        (deletedInvitationsState && (deletedInvitationsState.responseType === NotificationType.Success)) ||
        (resentInvitationsState && (resentInvitationsState.responseType === NotificationType.Success))
      ) {
        const newBodyParams = { ...bodyParams, page: 1 };
        setBodyParams(newBodyParams);
        getInvitations(newBodyParams);
      }
    },
    [deletedInvitationsState, resentInvitationsState],
  );

  useEffect(
    () => {
      if (groups) {
        const groupsFilterData: IOption[] =
          groups.map((group: GroupTypes.IRenderProps) => (
          {
            id: `${group.id}`,
            value: `group_${group.id}`,
            name: group.name || '',
          }));
        setSelectedGroups(groupsFilterData);
      }
    },
    [groups],
  );

  const onGetPage = (page: number) => {
    const newBodyParams = { ...bodyParams, page };
    setBodyParams(newBodyParams);
    getInvitations(newBodyParams);
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    const newBodyParams = {
      ...bodyParams,
      order_field: (sortDirection !== SortDirection.Default) ? `${label}_${sortDirection}` : undefined,
    };
    setBodyParams(newBodyParams);
    getInvitations(newBodyParams);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvitationsSearchValue(event.target.value);
  };

  const handleSelectBranch = (option: IOption) => {
    setBodyParams({ ...bodyParams, branch_id: +option.value });
    if (!isResetFilters) {
      setResetFilters(true);
    }
    getInvitations({ ...bodyParams, branch_id: +option.value });
  };

  const onDateRangeChange = (dateRange: any) => {
    const newParam = {
      ...bodyParams,
      created_at_time_from: dateRange?.start?.format(DEFAULT_DATE_FORMAT),
      created_at_time_to: dateRange?.end?.format(DEFAULT_DATE_FORMAT),
    };
    getInvitations(newParam);
    setBodyParams(newParam);
    setDateRange(dateRange);
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onSelectGroupsChange = (options: IOption[]) => {
    const newBody = {
      ...bodyParams,
      group_ids: options.filter(n => n.checkboxChecked).map(e => e.id ? +e.id : 0),
    };
    setBodyParams(newBody);
    getInvitations(newBody);
    setResetFilters(!!options.filter(n => n.checkboxChecked).length);
  };

  const onSelectStatus = (option: IOption) => {
    const newBody = {
      ...bodyParams,
      status: option.value,
    };
    setBodyParams(newBody);
    getInvitations(newBody);
    setResetFilters(true);
  };

  const onResetFiltersClick = () => {
    const newParam = {
      page: 1,
      page_size: invitationsPerPage,
      company_id: companyId,
      keyword: '',
    };
    setDateRange(undefined);
    setBodyParams(newParam);
    getInvitations(newParam);
    setResetFilters(false);
  };

  return (
    <div className={classNames('pos_relative', className)}>
      <div className="d-flex align-items-center mb-24">
        <Typography variant="h1">
          Приглашения
        </Typography>
        <Typography
          variant="text"
          className="ml-8"
        >
          ({invitationsTotal})
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
              placeholder="Email / телефон"
              classNames="invitations-search-input"
              value={invitationsSearchValue}
              onChange={onInputChange}
              icon={<SearchIcon className="ml-16" style={{ minWidth: '20px' }} width="20px" height="20px"/>}
            />
          </div>
          <Button
            type="link"
            variant="subtext"
            className="d-flex align-items-center ml-5 mt-3"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FilterArrow active className="mr-8" direction={showFilter ? 'up' : 'down'}/>
            Фильтры
          </Button>
          <Button
            disabled={!isResetFilters}
            type="link"
            variant="subtext"
            className="align-items-center ml-5 mt-3"
            onClick={onResetFiltersClick}
          >
            Очистить фильтры
          </Button>
        </div>
      </div>
      {showFilter && (
        <div className="d-flex mt-24">
          <div className="mr-32">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Дата отправки
            </Typography>
            <DateRangePicker date={dateRange} setDate={onDateRangeChange} />
          </div>
          <div className="mr-32 content-task__filter-status">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Филиал
            </Typography>
            <Select
              staticWidth
              width={216}
              options={branchOptions || []}
              setSelectedOption={handleSelectBranch}
              selectedOption={{} as IOption}
              customTitle="Выберите филиал"
              className="course-filter"
            />
          </div>
          {groups && (
            <div className="mr-32">
              <Typography
                variant="subtext"
                className="mb-4"
              >
                Группы
              </Typography>
              <Select
                staticWidth
                withCheckbox
                width={288}
                options={selectedGroups}
                selectedOption={null}
                onCheckboxChanges={onSelectGroupsChange}
                customTitle="Выберите группы"
                className="course-filter"
              />
            </div>
          )}
          <div className="mr-32 content-task__filter-status">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Статус
            </Typography>
            <Select
              staticWidth
              width={216}
              options={INVITATION_STATUSES}
              setSelectedOption={onSelectStatus}
              selectedOption={{} as IOption}
              customTitle="Выберите статус"
              className="course-filter"
            />
          </div>
        </div>
      )}
      <TableInvitations
        invitationsLoading={invitationsLoading}
        onSort={onSort}
        invitations={invitations || []}
      />
      <div className="mt-16 mb-48 justify-content-end">
        <Pagination
          total={invitationsTotal || invitationsPerPage}
          pageSize={invitationsPerPage}
          onGetPage={onGetPage}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  groups: state.groupReducer.groups.data,
  branches: state.branchReducer.branches.data,
  invitations: state.invitationReducer.invitations,
  deletedInvitationsState: state.invitationReducer.deletedInvitationsState.data,
  resentInvitationsState: state.invitationReducer.resentInvitationsState.data,
});

const mapDispatchToProps = {
  getGroups: groupActions.getGroups,
  getBranches: branchActions.getBranches,
  getInvitations: invitationActions.getInvitations,
  clearUpdatedInvitationsState: invitationActions.clearUpdatedInvitationsState,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(TableInvitationsWithPagination));
