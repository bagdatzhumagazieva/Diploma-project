import React, { useRef, useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

import CardTotalAmountBranches from 'src/components/atoms/Cards/CardTotalAmountBranches';
import Pagination from 'src/components/atoms/Pagination';
import Typography from 'src/components/atoms/Typography';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import Table from 'src/components/molecules/Table';
import TreeSelect from 'src/components/molecules/TreeSelect';
import Select from 'src/components/molecules/Select';
import Layout from 'src/components/organisms/Layout';
import AppContext from 'src/components/AppContext';

import employmentActions from 'src/store/employment/actions';
import branchActions from 'src/store/branch/actions';
import groupActions from 'src/store/group/actions';

import { RatingTypes } from 'src/pages/GamePages/Rating/types';
import {
  TABLE_HEADER, DEF_EMPLOYEE_PARAMS,
  parseEmployeeDataToTableData, parseBranchesToScore,
} from 'src/pages/GamePages/Rating/const';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IBranch as IBranchScore } from 'src/components/atoms/Cards/CardTotalAmountBranches/types';
import { IOption } from 'src/components/molecules/Select/types';
import { IEmploymentBodyParams } from 'src/store/employment/types';
import { ReactComponent as CupIcon } from 'src/assets/img/icons/cup.svg';
import { SortDirection } from 'src/components/molecules/Table/types';
import { parseBranchesToTreeSelect } from 'src/utils/parse';
import 'src/pages/GamePages/Rating/index.scss';

function RatingPage(props: RatingTypes.IProps) {
  const {
    branches, getBranches, getEmployees, employeesLoading,
    getGroups, groups, employees, totalEmployees: propsTotalEmployees = 0,
  } = props;
  const { companyId } = useContext(AppContext);
  const ref = useRef<HTMLDivElement>(null);
  const [clickedFilter, setClickedFilter] = useState<string | undefined>(undefined);
  const [selectedBranchTree, setSelectedBranchTree] = useState<ITreeOption>();
  const [selectedGroup, setSelectedGroup] = useState<IOption | undefined | null>();
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [bodyParams, setBodyParams] = useState<IEmploymentBodyParams>(
    { ...DEF_EMPLOYEE_PARAMS, company_id: companyId });

  useOutsideClick(ref, () => {
    if (clickedFilter) setClickedFilter(undefined);
  });
  const pageSize = 6;

  const branchesTreeSelect: ITreeOption[] = branches  ?
    branches.map(branch => parseBranchesToTreeSelect(branch)) : [];

  const branchesScore: IBranchScore[] = branches  ?
    branches.map(branch => parseBranchesToScore(branch)) : [];

  const groupsOptions: IOption[] = groups ?
    groups.map(item => ({ name: item.name || '', value: `${item.id}` })) : [];

  const onAllClick = () => {
    setSelectedGroup(undefined);
    setSelectedBranchTree(undefined);
  };

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      setSelectedGroup(undefined);
      setSelectedBranchTree(undefined);
      getBranches && getBranches(companyId);
      const data = {
        companyId,
        page: 1,
        pageSize: 100,
      };
      getGroups && getGroups(data);
      setBodyParams({ ...DEF_EMPLOYEE_PARAMS, company_id: companyId });
    },
    [companyId],
  );

  useEffect(
    () => {
      if (propsTotalEmployees === totalEmployees) return;
      setTotalEmployees(propsTotalEmployees);
    },
    [propsTotalEmployees, totalEmployees],
  );

  useEffect(
    () => {
      window.scrollTo(0, 0);
      getEmployees && getEmployees(bodyParams);
    },
    [bodyParams],
  );

  useEffect(
    () => {
      let oldBodyParams = { ...bodyParams, page: 1 };
      if ((selectedBranchTree && !oldBodyParams.branch_id) ||
        (selectedBranchTree && oldBodyParams.branch_id !== +selectedBranchTree.value)) {
        oldBodyParams = {
          ...oldBodyParams,
          branch_id: (+selectedBranchTree?.value),
        };
      }

      if (!selectedBranchTree) {
        oldBodyParams = {
          ...bodyParams,
          page: 1,
        };
        delete oldBodyParams.branch_id;
      }

      if ((selectedGroup?.value && !oldBodyParams.group_ids) ||
        (oldBodyParams.group_ids && oldBodyParams.group_ids.length <= 1 && selectedGroup &&
          +selectedGroup?.value !== oldBodyParams.group_ids[0])
      ) {
        oldBodyParams = {
          ...oldBodyParams,
          group_ids: [+selectedGroup?.value],
        };
      }

      if (!selectedGroup) {
        oldBodyParams = {
          ...oldBodyParams,
          page: 1,
        };
        delete oldBodyParams.group_ids;
      }

      setBodyParams({ ...oldBodyParams });
    },
    [selectedGroup, selectedBranchTree],
  );

  const customTree: ITreeOption = { value: 'reset', name: 'Очистить', disabled: !selectedBranchTree };
  const onPaginationPageClick = (page: number) => setBodyParams({ ...bodyParams, page });

  const onTableSort = (label: string, sortDirection: SortDirection) => {
    setBodyParams(
      {
        ...bodyParams,
        page: 1,
        order_field: (sortDirection !== SortDirection.Default) ? `${label}_${sortDirection}` : undefined,
      });
  };

  const getTableBodyData = () => {
    if (!Array.isArray(employees)) return [];
    return employees.map((employee, index) => parseEmployeeDataToTableData(employee, index, bodyParams, pageSize));
  };

  return (
    <Layout className="rating-page">
      <Typography
        variant="headline"
        className="d-flex align-items-center py-48 grid"
      >
        Рейтинг
        <CupIcon className="ml-16" />
      </Typography>
      <div className="rating-page__filter-group px-24 fill_w">
        <div className="grid d-flex align-items-center">
          <Typography
            variant="textmed"
            className={classNames(
              'filter-group__all px-32 d-flex align-items-center cursor-pointer',
              { 'filter-group__all--active' : !selectedGroup && !selectedBranchTree },
            )}
            onClick={onAllClick}
          >
            Общий
          </Typography>
          <div
            className={classNames(
              { 'filter__tree-select-container--active' : selectedBranchTree && selectedBranchTree?.value !== 'reset' },
            )}
          >
            <TreeSelect
              selectedTreeOption={selectedBranchTree}
              setSelectedOption={setSelectedBranchTree}
              treeOptions={branchesTreeSelect}
              titleVariant="textmed"
              placeholder="По филиалу"
              customTree={customTree}
              className="filter__tree-select"
              onCustomTreeOptionClick={() => setSelectedBranchTree(undefined)}
            />
          </div>
          <div
            className={classNames(
              'groups-select', 'd-flex align-items-center', 'groups-select--top',
              { 'groups-select--active': selectedGroup && selectedGroup?.value !== 'reset' },
            )}
          >
            <Select
              options={groupsOptions}
              customOption={{ value: 'reset', name: 'Очистить', disabled: !selectedGroup }}
              selectedOption={selectedGroup}
              setSelectedOption={setSelectedGroup}
              onCustomOptionClick={() => setSelectedGroup(undefined)}
              customTitle={!selectedGroup ? 'По группам' : selectedGroup.name }
              curVariant="textmed"
            />
          </div>
        </div>
      </div>
      <div className="rating-page__content py-48 px-24 fill_w"
      >
        <div className="grid d-flex justify-content-between">
          <div className="rating-page__table-block">
            <Table<RatingTypes.IRatingTableBody>
              headerData={TABLE_HEADER}
              loading={employeesLoading}
              bodyData={getTableBodyData()}
              wrapperClassName="rating-page__table"
              onSort={onTableSort}
              emptyDataDescription="Список пользователей пуст."
            />
            <Pagination
              pageSize={pageSize}
              total={totalEmployees || pageSize}
              className="mt-16"
              onGetPage={onPaginationPageClick}
            />
          </div>
          <CardTotalAmountBranches
            classNames="rating-page__card-total-amount-branches align-self-start"
            branches={branchesScore}
          />
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  employees: state.employmentReducer.employees.data,
  totalEmployees: state.employmentReducer.employees.total,
  employeesLoading: state.employmentReducer.employees.loading,
  branches: state.branchReducer.branches.data,
  groups: state.groupReducer.groups.data,
});

const mapDispatchToProps = {
  getEmployees: employmentActions.getEmployees,
  getBranches: branchActions.getBranches,
  getGroups: groupActions.getGroups,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(RatingPage));
