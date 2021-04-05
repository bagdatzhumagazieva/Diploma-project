import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { DEFAULT_DATE_FORMAT, LOCAL_STORAGE } from 'src/core/store/values';
import statisticsActions from 'src/store/statistics/actions';
import useDebounce from 'src/hooks/useDebounce';

import Layout from 'src/components/organisms/Layout';
import Typography from 'src/components/atoms/Typography';
import { ReportZealPageTypes } from './types';
import './index.scss';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Input from 'src/components/molecules/Input';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import TreeSelect from 'src/components/molecules/TreeSelect';
import Select from 'src/components/molecules/Select';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { BranchesTypes } from 'src/store/branch/types';
import { parseBranchesToTreeSelect } from 'src/utils/parse';
import { IOption } from 'src/components/molecules/Select/types';
import Button from 'src/components/atoms/Button';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import groupActions from 'src/store/group/actions';
import branchActions from 'src/store/branch/actions';
import DateRangePicker from 'src/components/molecules/DateRangePicker';
import { ReportZealEmployeesTableHeaderData } from './const';
import Table from 'src/components/molecules/Table';
import Image from 'src/components/atoms/Image';
import IconExcel from 'src/assets/img/icons/excel.png';

function ReportZeal(props: ReportZealPageTypes.IProps) {
  const {
    getZealReports,
    zealReports,
    zealReportsLoading,
    company,
    downloadedZealReportLoading,
    branches,
    groups,
    getBranches,
    getGroups,
    downloadZealReport,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword, 500);
  const [isFiltersShown, setFiltersVisibility] = useState<boolean>(true);

  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>();
  const [selectedGroup, setSelectedGroup] = useState<IOption>();
  const [dateRange, setDateRange] = useState<any>();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onResetFiltersClick = () => {
    setSelectedBranch(undefined);
    setSelectedGroup(undefined);
    setKeyword('');
  };

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

  const onDownloadClick = () => {
    if (downloadZealReport) {
      const branchId = selectedBranch
        ? selectedBranch.value === 'main'
          ? undefined
          : +selectedBranch.value
        : undefined;
      const groupId = selectedGroup ? +selectedGroup.value : undefined;
      const startDate = dateRange?.start?.format(DEFAULT_DATE_FORMAT);
      const endDate = dateRange?.end?.format(DEFAULT_DATE_FORMAT);

      downloadZealReport({ companyId, branchId, groupId, startDate, endDate, keyword: debouncedKeyword });
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
      const branchId = selectedBranch
        ? selectedBranch.value === 'main'
          ? undefined
          : +selectedBranch.value
        : undefined;
      const groupId = selectedGroup ? +selectedGroup.value : undefined;
      const startDate = dateRange?.start?.format(DEFAULT_DATE_FORMAT);
      const endDate = dateRange?.end?.format(DEFAULT_DATE_FORMAT);

      getZealReports({ companyId, branchId, groupId, startDate, endDate, keyword: debouncedKeyword });
    },
    [getZealReports, companyId, debouncedKeyword, selectedBranch, selectedGroup, dateRange],
  );

  useEffect(
    () => {
      const groupParams  = { companyId: companyId ? +companyId : 0 };
      getBranches && getBranches(companyId ? +companyId : 0);
      getGroups && getGroups(groupParams);
    },
    [companyId, getBranches, getGroups],
  );

  return (
    <Layout isAdminRouting childrenClassName="py-48 color_grey__bg">
      <div className="grid mb-24">
        <Breadcrumb
          items={[
            { label: 'Отчеты и статистика', link: '/admin/reports' },
            { label: 'Отчет по усердию' },
          ]}
        />
        <Typography variant="headline" className="mt-32">
          Отчет по усердию
        </Typography>

        <div className="d-flex align-items-end justify-content-between">
          <div className="d-flex mt-24 fill_w">
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
                classNames="report-zeal__search"
                value={keyword}
                onChange={onInputChange}
                icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
              />
            </div>
            <Button
              type="link"
              variant="subtext"
              className="d-flex align-items-center ml-5 mt-3"
              onClick={() => setFiltersVisibility(!isFiltersShown)}
            >
              <FilterArrow active className="mr-8" direction={isFiltersShown ? 'up' : 'down'}/>
              Фильтры
            </Button>
            <Button
              type="link"
              variant="subtext"
              className="ml-5 mt-3"
              onClick={onResetFiltersClick}
            >
              Очистить фильтры
            </Button>
            <Button
              className="button--type-additional report-zeal__download"
              loading={downloadedZealReportLoading}
              onClick={onDownloadClick}
            >
              <Image
                src={IconExcel}
                alt="excel icon"
                className="excel-icon"
              />
              <Typography variant="textmed" className="excel-text">
                Скачать отчет
              </Typography>
            </Button>
          </div>
        </div>

        {isFiltersShown && (
          <div className="d-flex mt-24">
            <div>
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
                className="report-zeal__groups"
              />
            </div>
            <div className="mr-32">
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
                className="report-zeal__branch"
              />
            </div>

            <div className="mr-32">
              <Typography
                variant="subtext"
                className="mb-4 d-block"
              >
                Дата отправки
              </Typography>
              <DateRangePicker date={dateRange} setDate={setDateRange} />
            </div>
          </div>
        )}

        <Table
          loading={zealReportsLoading}
          wrapperClassName="report-zeal__employees mt-16"
          headerData={ReportZealEmployeesTableHeaderData}
          bodyData={zealReports ? zealReports.results : []}
          emptyDataDescription="Список пользователей пуст."
        />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  zealReports: state.statisticsReducer.zealReports.data,
  zealReportsLoading: state.statisticsReducer.zealReports.loading,
  company: state.companyReducer.company.data,
  groups: state.groupReducer.groups.data,
  branches: state.branchReducer.branches.data,
  downloadedZealReportLoading: state.statisticsReducer.downloadedZealReport.loading,
});

const mapDispatchToProps = {
  getZealReports: statisticsActions.getZealReports,
  getGroups: groupActions.getGroups,
  getBranches: branchActions.getBranches,
  downloadZealReport: statisticsActions.downloadZealReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportZeal);
