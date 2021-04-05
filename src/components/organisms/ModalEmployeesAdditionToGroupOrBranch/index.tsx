import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import useVisibility from 'src/hooks/useVisibility';
import useDebounce from 'src/hooks/useDebounce';

import Button from 'src/components/atoms/Button';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Loader from 'src/components/atoms/Loader';
import Typography from 'src/components/atoms/Typography';
import DateRangePicker from 'src/components/molecules/DateRangePicker';
import Input from 'src/components/molecules/Input';
import Modal from 'src/components/molecules/Modal';
import Select from 'src/components/molecules/Select';
import TreeSelect from 'src/components/molecules/TreeSelect';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import employmentActions from 'src/store/employment/actions';
import TableEmployees from 'src/components/organisms/TableComponents/TableEmployees/index';

import { IOption } from 'src/components/molecules/Select/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { SortDirection } from 'src/components/molecules/Table/types';
import { EmploymentTypes, IEmploymentBodyParams } from 'src/store/employment/types';
import { ModalEmployeesAdditionToGroupOrBranchTypes } from 'src/components/organisms/ModalEmployeesAdditionToGroupOrBranch/types';
import 'src/components/organisms/ModalEmployeesAdditionToGroupOrBranch/index.scss';
import { DEFAULT_DATE_FORMAT } from 'src/core/store/values';

function ModalEmployeesAdditionToGroupOrBranch(props: ModalEmployeesAdditionToGroupOrBranchTypes.IProps) {
  // Shorthand for this component className will be "employees-add-to-group-branch"
  const [isShowFilters, setShowFilters] = useState<boolean>(false);
  const {
    branches, groupsOptions, companyId,
    employees, getEmployees, type,
    curGroupId, onSubmitClick, curBranchId,
    addOrRemoveEmployeesGroups, changeEmployeesBranch,
  } = props;
  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>(branches.selectedTreeOption);
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>(groupsOptions);
  const [selectedDateRange, setSelectedDateRange] = useState<any>();
  const [curEmployees, setCurEmployees] = useState<EmploymentTypes.IRenderProps[]>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [orderField, setOrderField] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [employeesSearchValue, setEmployeesSearchValue] = useState<string>('');
  const [groupsCustomOption, setGroupsCustomOption] = useState<IOption>(
    { value: 'no-groups', name: 'Без группы', checkboxChecked: false,
    });
  const [isShowConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const totalEmployees = (employees && employees.total) || 0;
  const activeGroupsAmount = (selectedGroups && selectedGroups.filter(item => item.checkboxChecked).length);
  const debouncedSearchValue = useDebounce(employeesSearchValue, 500);

  const lastItem = useVisibility(
    (visible) => {
      if (!employees) return;
      const page = curPage + 1;
      if (visible && curEmployees.length < totalEmployees && !loading) {
        setLoading(true);
        getEmployees && getEmployees({ ...bodyParams, page, order_field: orderField });
        setCurPage(page);
      }
    },
    [curEmployees, loading],
  );

  const getGroupIds = (groups: IOption[]):number[] | undefined => {
    if (groups.some(item => item.checkboxChecked)) {
      return groups.filter(item => item.checkboxChecked).map(item => +item.value);
    }
    return undefined;
  };

  const bodyParams: IEmploymentBodyParams = {
    page: 1,
    page_size: 6,
    company_id: companyId,
    keyword: debouncedSearchValue,
    branch_id: selectedBranch && (+selectedBranch.value !== companyId) ? +selectedBranch.value : undefined,
    group_ids: !groupsCustomOption.checkboxChecked ? getGroupIds(selectedGroups) : undefined,
    last_login_time_from: selectedDateRange?.start?.format(DEFAULT_DATE_FORMAT) || '',
    last_login_time_to: selectedDateRange?.end?.format(DEFAULT_DATE_FORMAT) || '',
    not_group_id: curGroupId || undefined,
    without_groups: groupsCustomOption.checkboxChecked,
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeesSearchValue(event.target.value);
  };

  const onAddEmployeesToGroupsClick = () => {
    const ids = curEmployees.filter(item => item.isChecked).map(item => item.id);
    if (!curGroupId) return;
    const bodyProps = {
      employeeIds: [...ids],
      groupIds: [curGroupId],
    };
    addOrRemoveEmployeesGroups && addOrRemoveEmployeesGroups(bodyProps, 'add');
    onSubmitClick && onSubmitClick();
  };

  const onAddEmployeesToBranchClick = () => {
    const ids = curEmployees.filter(item => item.isChecked).map(item => item.id);
    if (!curBranchId) return;
    const bodyProps = {
      employeeIds: [...ids],
      branchId: curBranchId,
    };
    changeEmployeesBranch && changeEmployeesBranch(bodyProps);
    onSubmitClick && onSubmitClick();
  };

  const onCustomGroupOptionClick = (option: IOption) => {
    if (option.checkboxChecked) {
      const newSelectedGroups = selectedGroups.map(item => ({ ...item, checkboxChecked: false }));
      setSelectedGroups(newSelectedGroups);
    }
    setGroupsCustomOption({ ...option });
  };

  const onOptionsClick = (options: IOption[]) => {
    setGroupsCustomOption({ ...groupsCustomOption, checkboxChecked: false });
    setSelectedGroups(options);
  };

  useEffect(
    () => {
      setCurEmployees([]);
      setCurPage(1);
      setOrderField(undefined);
      getEmployees && getEmployees({ ...bodyParams });
    },
    [selectedGroups, selectedBranch, selectedDateRange, debouncedSearchValue, groupsCustomOption],
  );

  useEffect(
    () => {
      if (employees && employees.data) setCurEmployees([...curEmployees, ...employees.data]);
    },
    [employees],
  );

  useEffect(
    () => {
      if (loading && curEmployees.length > 0) setLoading(false);
    },
    [curEmployees],
  );

  const onSort = (label: string, sortDirection: SortDirection) => {
    const newBodyParams = {
      ...bodyParams,
      order_field: (sortDirection !== SortDirection.Default) ? `${label}_${sortDirection}` : undefined,
    };
    setOrderField(`${label}_${sortDirection}`);
    setCurEmployees([]);
    getEmployees && getEmployees(newBodyParams);
  };

  return (
    <div
      className={classNames(
        'employees-add-to-group-branch d-flex flex-column',
        { 'employees-add-to-group-branch--filters': isShowFilters },
      )}>
      <div className="employees-add-to-group-branch__header px-24">
        <Typography variant="subtext" className="mb-2">Поиск пользователя</Typography>
        <div className="d-flex">
          <Input
            type="text"
            placeholder="Имя Фамилия"
            classNames="employees-add-to-group-branch__input-searcher mr-32"
            value={employeesSearchValue}
            onChange={onInputChange}
          />
          <Button
            type="link"
            variant="subtext"
            className="d-flex align-items-center"
            onClick={() => setShowFilters(!isShowFilters)}
          >
            <FilterArrow active className="mr-8" direction={isShowFilters ? 'up' : 'down'}/>
            Фильтры
          </Button>
        </div>
        {isShowFilters && (
          <div className="employees-add-to-group-branch__filters mt-24 d-flex justify-content-between">
            <div className="filters__item mb-24">
              <Typography variant="subtext" className="mb-4">Филиал</Typography>
              {branches && (
                <TreeSelect
                  staticWidth
                  isPositionFixed
                  treeOptions={branches.branchesOptions}
                  selectedTreeOption={selectedBranch}
                  setSelectedOption={setSelectedBranch}
                  openedTreeObject={ type === 'branch' && curBranchId && { [curBranchId]: true }}
                />
              )}
            </div>
            <div className="filters__item mb-24">
              <Typography variant="subtext" className="mb-4">Группы</Typography>
              {selectedGroups && (
                <Select
                  staticWidth
                  withCheckbox
                  selectedOption={null}
                  options={selectedGroups}
                  classNames="filters__select"
                  onCheckboxChanges={onOptionsClick}
                  customOption={groupsCustomOption}
                  onCustomOptionClick={onCustomGroupOptionClick}
                  customTitle={activeGroupsAmount ? `${activeGroupsAmount} групп`
                    : groupsCustomOption.checkboxChecked ? 'Без групп' : 'Выберите группы'}
                />
              )}
            </div>
            <div className="filters__item">
              <Typography variant="subtext" className="mb-4">Был(-а) онлайн</Typography>
              <DateRangePicker setDate={setSelectedDateRange} date={selectedDateRange} />
            </div>
          </div>
        )}
        <div className="employees-add-to-group-branch__line my-24" />
      </div>
      <div className="flex-grow-1 d-flex flex-column">
        <div className="employees-add-to-group-branch__content flex-grow-1 d-flex flex-column">
          <Typography variant="subtext" className="ml-24 mb-16">Всего: {totalEmployees}</Typography>
          <div className="employees-add-to-group-branch__table">
            {branches && (
              <TableEmployees
                hideOptions
                onSort={onSort}
                employeesLoading={employees && employees.loading }
                employees={curEmployees || []}
                branches={branches}
                lastItemRef={lastItem}
                handleSelectedEmployees={data => setCurEmployees([...data])}
              />
            )}
            {loading && <Loader className="my-16" label="загружается" />}
          </div>
        </div>
        <div className="employees-add-to-group-branch__bottom d-flex justify-content-between align-items-center px-24">
          <Typography
            variant=""
          >
            Выбрано пользователей: {curEmployees.filter(item => item.isChecked).length}
          </Typography>
          <Button
            className="px-44 py-16"
            variant="textmed"
            onClick={() => setShowConfirmationModal(true)}
            disabled={!curEmployees.some(item => item.isChecked)}
          >
            Добавить
          </Button>
        </div>
      </div>
      {isShowConfirmationModal && (
       <Modal
         width={422}
         title="Добавление пользователей"
         cancelLabel="Отмена"
         saveLabel="Добавить"
         onCloseClick={() => setShowConfirmationModal(false)}
         onSaveClick={type === 'groups' ? onAddEmployeesToGroupsClick : onAddEmployeesToBranchClick}
       >
         <div className="d-flex flex-column px-32">
           <Typography
             variant="text"
             className="mb-32"
           >
             Вы действительно хотите добавить выбраных пользователей
             ({curEmployees.filter(item => item.isChecked).length}) ?
           </Typography>
           <Typography
             variant="text"
           >
             Данные пользователи перейдут из филиала в котором они состоят в этот.
           </Typography>
         </div>
       </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  employees: state.employmentReducer.filteredEmployees,
  addOrRemoveEmployeesGroupsState: state.employmentReducer.addOrRemoveEmployeesGroupsState.data,
});

const mapDispatchToProps = {
  getEmployees: employmentActions.getFilteredEmployees,
  addOrRemoveEmployeesGroups: employmentActions.addOrRemoveEmployeesGroups,
  changeEmployeesBranch: employmentActions.changeEmployeesBranch,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(ModalEmployeesAdditionToGroupOrBranch));
