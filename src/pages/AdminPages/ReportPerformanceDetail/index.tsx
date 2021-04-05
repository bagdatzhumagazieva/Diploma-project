import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import statisticsActions from 'src/store/statistics/actions';

import Layout from 'src/components/organisms/Layout';
import { ReportPerformanceDetailTypes } from './types';
import { useParams } from 'react-router';
import ReportCard from 'src/components/atoms/ReportCard';
import Loader from 'src/components/atoms/Loader';
import TreeSelect from 'src/components/molecules/TreeSelect';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { BranchesTypes } from 'src/store/branch/types';
import { parseBranchesToTreeSelect } from 'src/utils/parse';
import branchActions from 'src/store/branch/actions';
import groupActions from 'src/store/group/actions';
import './index.scss';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import { IOption } from 'src/components/molecules/Select/types';
import Table from 'src/components/molecules/Table';
import { PerformanceEmployeesTableHeaderData } from 'src/pages/AdminPages/ReportPerformanceDetail/const';
import Input from 'src/components/molecules/Input';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import { IPerformanceEmployee } from 'src/store/statistics/types';
import Breadcrumb from 'src/components/atoms/BreadCrumb';

function ReportPerformanceDetail(props: ReportPerformanceDetailTypes.IProps) {
  const { id, type } = useParams<{ id: string, type: string }>();

  const {
    getPerformanceDetail,
    performanceDetail,
    performanceDetailLoading,
    company,
    branches,
    groups,
    getBranches,
    getGroups,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>();
  const [selectedGroup, setSelectedGroup] = useState<IOption>();
  const [employees, setEmployees] = useState<IPerformanceEmployee[]>([]);

  useEffect(
    () => {
      const branchId = selectedBranch
        ? selectedBranch.value === 'main'
          ? undefined
          : +selectedBranch.value
        : undefined;
      const groupId = selectedGroup ? +selectedGroup.value : undefined;
      if (type === 'COURSE' || type === 'GAME' || type === null && id) {
        getPerformanceDetail({ companyId, type, branchId, groupId, entityId: +id });
      }
    },
    [getPerformanceDetail, companyId, selectedBranch, selectedGroup, type, id],
  );

  const branchesTreeSelect: ITreeOption[] = [
    {
      name: company?.name || '',
      value: company?.id ? 'main' : '0',
      children: branches
          ? branches.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n))
          : undefined,
    },
  ];

  const groupOptions: IOption[] = groups ? groups.map(n => ({ name: n.name || '', value: `${n.id}` })) : [];

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (performanceDetail?.result) {
      const filteredEmployees = performanceDetail?.result.filter(
        emp => (emp.firstName + emp.lastName).toLowerCase().includes(event.target.value.toLowerCase(),
        ));
      setEmployees(filteredEmployees);
    }
  };

  useEffect(
    () => {
      const groupParams  = { companyId };
      getBranches && getBranches(companyId);
      getGroups && getGroups(groupParams);
    },
    [companyId, getBranches, getGroups],
  );

  useEffect(
    () => {
      if (performanceDetail && performanceDetail.result) {
        setEmployees(performanceDetail.result);
      }
    },
    [performanceDetail],
  );

  return (
    <Layout isAdminRouting childrenClassName="py-48 color_grey__bg">
      <div className="grid">
        <Breadcrumb
          items={[
            { label: 'Отчеты и статистика', link: '/admin/reports' },
            { label: 'Отчет по успеваемости', link: '/admin/reports/performance' },
            { label: performanceDetail?.entity?.name },
          ]}
          itemsLoading={performanceDetailLoading}
          className="mb-32"
        />
        <div className="d-flex">
          <div className="d-flex flex-column">
            <Typography
              variant="subtext"
              className="mb-4 d-block"
            >
              Филиал
            </Typography>
            <TreeSelect
              staticWidth
              isPositionFixed
              placeholder="Выберите филиал"
              treeOptions={branchesTreeSelect}
              selectedTreeOption={selectedBranch}
              setSelectedOption={setSelectedBranch}
              className="performance-detail__branch"
            />
            <Typography
              variant="subtext"
              className="mb-4 mt-auto d-block"
            >
              Группа
            </Typography>
            <Select
              staticWidth
              options={groupOptions}
              setSelectedOption={setSelectedGroup}
              selectedOption={selectedGroup}
              placeholder="Выбор группы"
              className="performance-detail__groups"
            />
          </div>
          {performanceDetailLoading ?
            <Loader size={40} className="my-48" /> :
            <div className="grid">
              {performanceDetail && (
                <ReportCard
                  reportType="performance"
                  appearance="wide"
                  id={performanceDetail.entity.entityId}
                  createdAt={performanceDetail.entity.createdAt}
                  type={performanceDetail.entity.entityType}
                  imageThumbnail={performanceDetail.entity.imageThumbnail}
                  minutesToFinish={performanceDetail.entity.minutesToFinish}
                  name={performanceDetail.entity.name}
                  numberOfViews={performanceDetail.entity.numberOfViews}
                  percentAvg={performanceDetail.entity.percentAvg}
                />
              )}
            </div>
          }
        </div>
      </div>
      <div className="grid mt-48">
        <Typography
          variant="subtext"
          className="mb-4"
        >
          Поиск пользователя
        </Typography>
        <div className="d-flex align-items-center">
          <Input
            type="text"
            placeholder="Имя Фамилия"
            classNames="performance-employees-search"
            onChange={onInputChange}
            icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
          />
        </div>

        <Table
          loading={performanceDetailLoading}
          wrapperClassName="performance-employees-table mt-16"
          headerData={PerformanceEmployeesTableHeaderData}
          bodyData={employees}
          emptyDataDescription="Список пользователей пуст."
        />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  performanceDetail: state.statisticsReducer.performanceDetail.data,
  performanceDetailLoading: state.statisticsReducer.performanceDetail.loading,
  company: state.companyReducer.company.data,
  groups: state.groupReducer.groups.data,
  branches: state.branchReducer.branches.data,
});

const mapDispatchToProps = {
  getPerformanceDetail: statisticsActions.getPerformanceDetail,
  getBranches: branchActions.getBranches,
  getGroups: groupActions.getGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportPerformanceDetail);
