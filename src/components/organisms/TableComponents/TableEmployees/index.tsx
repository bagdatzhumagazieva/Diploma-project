import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { getRole } from 'src/utils/values';
import { LOCAL_STORAGE } from 'src/core/store/values';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import EmployeeOptions from 'src/components/molecules/EmployeeOptions';
import Table, { TableWithCheckboxes } from 'src/components/molecules/Table';
import Modal from 'src/components/molecules/Modal';
import ModalEmployeeUpdate from 'src/components/molecules/ModalEmployeeUpdate';
import Select from 'src/components/molecules/Select';
import TreeSelect from 'src/components/molecules/TreeSelect';

import employmentActions from 'src/store/employment/actions';
import { EmploymentTypes } from 'src/store/employment/types';
import { IOption } from 'src/components/molecules/Select/types';
import { TableEmployeesTypes } from 'src/components/organisms/TableComponents/TableEmployees/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { SortDirection, TableTypes } from 'src/components/molecules/Table/types';
import { EmployeesTableHeaderData } from 'src/pages/AdminPages/Branch/const';
import 'src/components/organisms/TableComponents/TableEmployees/index.scss';
import { SYSTEM_USERS } from './mock';

function TableEmployees(props: TableEmployeesTypes.IProps) {
  const {
    employeesLoading,
    branches,
    groups,
    updateEmployeesActiveness,
    changeEmployeesBranch,
    deleteEmployees,
    addOrRemoveEmployeesGroups,
    sendPasswordsToEmployees,
    onSort: onPropsSort,
    updateEmployee,
    lastItemRef,
    hideOptions,
    handleSelectedEmployees,
    emptyDataDescription,
  } = props;

  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const [employees, setEmployees] = useState<EmploymentTypes.IRenderProps[]>();
  const selectedEmployees = employees && employees.filter(
    (n: TableWithCheckboxes<EmploymentTypes.IRenderProps>) => n.isChecked,
  );
  const [selectedEmployee, setSelectedEmployee] = useState<EmploymentTypes.IRenderProps>();
  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>();
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>();

  const [isActivenessModalOpen, setActivenessModal] = useState<boolean>(false);
  const [isTransferEmployeeModalOpen, setTransferEmployeeModal] = useState<boolean>(false);
  const [isDeleteEmployeeModalOpen, setDeleteEmployeeModal] = useState<boolean>(false);
  const [isGroupEmployeesModalOpen, setGroupEmployeesModal] = useState<boolean>(false);
  const [isSendPasswordToEmployeesModalOpen, setSendPasswordToEmployeesModal] = useState<boolean>(false);
  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState<boolean>(false);

  useEffect(
    () => {
      setEmployees(SYSTEM_USERS);
    },
    [],
  );

  useEffect(
    () => {
      branches && setSelectedBranch(branches.selectedTreeOption);
    },
    [branches],
  );

  const onEmployeeOptionsClick = (employee: EmploymentTypes.IRenderProps, callback: () => void) => () => {
    setSelectedEmployee(employee);
    callback();
  };

  const options = [
    {
      name: 'Активировать/Блокировать', callback: () => { setActivenessModal(true); setSelectedEmployee(undefined); },
    },
    {
      name: 'Перевести в филиал', callback: () => { setTransferEmployeeModal(true); setSelectedEmployee(undefined); },
    },
    {
      name: 'Группирование', callback: () => { setGroupEmployeesModal(true); setSelectedEmployee(undefined); },
    },
    {
      name: 'Отправить логин и пароль',
      callback: () => {
        setSendPasswordToEmployeesModal(true);
        setSelectedEmployee(undefined);
      },
    },
  ];

  const onChangeEmployeeActiveness = (activenessState: boolean) => () => {
    updateEmployeesActiveness && selectedBranch && updateEmployeesActiveness({
      employeeIds: (selectedEmployee && [selectedEmployee.id])
        || (selectedEmployees && selectedEmployees.map(n => n.id)),
      isBlocked: activenessState,
    });
    setActivenessModal(false);
  };

  const onChangeEmployeeBranch = () => {
    changeEmployeesBranch && selectedBranch && changeEmployeesBranch({
      employeeIds: (selectedEmployee && [selectedEmployee.id])
        || (selectedEmployees && selectedEmployees.map(n => n.id)),
      branchId: +selectedBranch.value,
    });
    setTransferEmployeeModal(false);
  };

  const onAddOrRemoveEmployeesGroups = (operation: 'add' | 'delete') => () => {
    addOrRemoveEmployeesGroups && selectedGroups && addOrRemoveEmployeesGroups(
      {
        employeeIds: (selectedEmployee && [selectedEmployee.id])
          || (selectedEmployees && selectedEmployees.map(n => n.id)),
        groupIds: selectedGroups.map(n => +n.value),
      },
      operation,
    );
    setGroupEmployeesModal(false);
    setSelectedGroups(undefined);
  };

  const onSendPasswordsToEmployees = () => {
    sendPasswordsToEmployees && sendPasswordsToEmployees(
      (selectedEmployee && [selectedEmployee.id]) || (selectedEmployees && selectedEmployees.map(n => n.id)) || [],
      companyId,
    );
    setSendPasswordToEmployeesModal(false);
  };

  const onDeleteEmployee = () => {
    deleteEmployees && selectedEmployee && deleteEmployees([selectedEmployee.id]);
    setDeleteEmployeeModal(false);
  };

  const onEmployeesSelect = (data: EmploymentTypes.IRenderProps[]) => {
    handleSelectedEmployees && handleSelectedEmployees(data);
    setEmployees(data);
  };

  const onGroupSelect = (data: IOption[]) => {
    setSelectedGroups(data.filter(n => n.checkboxChecked));
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    onPropsSort && onPropsSort(label, sortDirection);
  };

  const onUserNameClick = (id: number) => {
    if (!employees) return;
    setUserInfoModalOpen(true);
    const employee = employees.find(item => item.id === id);
    setSelectedEmployee(employee);
  };

  const modalUserInfoClose = () => {
    setSelectedEmployee(undefined);
    setUserInfoModalOpen(false);
  };

  const modalUserInfoSave = (employee: EmploymentTypes.IUpdateEmployeeBodyProps) => {
    updateEmployee && updateEmployee(employee);
    setSelectedEmployee(undefined);
    setUserInfoModalOpen(false);
  };

  const roleNameColumn = {
    key: 'role_name',
    name: 'Имя, Роль',
    sort: true,
    render: (n: any) => (
      <div
        className="d-flex align-items-center"
      >
        <Image
          src={n.avatarThumbnailUrl}
          alt={n.name}
          className="employees-table__user-img"
        />
        <div className="d-flex flex-column ml-8">
          <Typography
            variant="subtext"
            color="main_50"
            onClick={() => !hideOptions && onUserNameClick(n.id)}
            className="mb-8 cursor-pointer"
          >
            {n.fullName || n.email || n.phone || '-'}
          </Typography>
          <Typography
            color="grey_additional_2"
            variant="xsmall"
            className="mt-6"
          >
            {getRole(n.role).name}
          </Typography>
        </div>
      </div>
    ),
  };

  const getLastOption = (id: number) => {
    const index = employees?.findIndex(e => e.id === id);
    return employees && index ?
      (index % 7 === 6 || index % 7 === 5 || index === employees.length - 1 || index === employees.length - 2) : false;
  };

  const headerData: TableTypes.IHeaderData[] = !hideOptions ? [
    { ...roleNameColumn },
    ...EmployeesTableHeaderData,
    {
      key: 'option',
      name: '',
      width: '48px',
      textAlign: 'center',
      render: (n: any) => (
        <EmployeeOptions
          isLast={getLastOption(n.id)}
          onUpdateActiveClick={(onEmployeeOptionsClick(n, () => setActivenessModal(true)))}
          onTransferBranchClick={onEmployeeOptionsClick(n, () => setTransferEmployeeModal(true))}
          onDeleteEmployeeClick={onEmployeeOptionsClick(n, () => setDeleteEmployeeModal(true))}
          onGroupClick={onEmployeeOptionsClick(n, () => setGroupEmployeesModal(true))}
          onSendPasswordClick={onEmployeeOptionsClick(n, () => setSendPasswordToEmployeesModal(true))}
        />
      ),
    },
  ] : [
    { ...roleNameColumn },
    ...EmployeesTableHeaderData,
  ];
  console.log(employees)

  return (
    <div>
      {employees && (
        <Table
          checkbox
          lastItemRef={lastItemRef}
          loading={employeesLoading}
          wrapperClassName="employees-table mt-16"
          onCheckboxChange={onEmployeesSelect}
          onSort={onSort}
          headerData={[...headerData]}
          bodyData={employees.map(n => ({ ...n }))}
          emptyDataDescription={emptyDataDescription}
        />
      )}
      {isActivenessModalOpen && (
        <Modal
          width={648}
          right={32}
          title="Блокирование/Разблокированиие"
          cancelLabel="Отмена"
          deleteLabel="Заблокировать"
          saveLabel="Разблокировать"
          onCloseClick={() => setActivenessModal(false)}
          onDeleteClick={onChangeEmployeeActiveness(true)}
          onSaveClick={onChangeEmployeeActiveness(false)}
        >
          <div className="employee-modal">
            <Typography variant="text">
              Вы действительно хотите блокировать/разблокировать
              {selectedEmployee
                ? ' данного пользователя?'
                : ` выбранных пользователей (${selectedEmployees && selectedEmployees.length})?`
              }
            </Typography>
          </div>
        </Modal>
      )}
      {isTransferEmployeeModalOpen && (
        <Modal
          width={422}
          right={32}
          title="Смена филиала"
          cancelLabel="Отмена"
          saveLabel="Перевести"
          onCloseClick={() => setTransferEmployeeModal(false)}
          onSaveClick={onChangeEmployeeBranch}
        >
          <div className="employee-modal">
            <Typography variant="text">
              Выберите из списка филиал, в который вы переводите
              {selectedEmployee
                ? ' выбранного пользователя.'
                : ` выбранных пользователей (${selectedEmployees && selectedEmployees.length}).`
              }
            </Typography>
            <Typography variant="subtext" className="mt-28 mb-4">
              Филиал
            </Typography>
            {branches && selectedBranch && (
              <TreeSelect
                staticWidth
                treeOptions={branches.branchesOptions}
                selectedTreeOption={selectedBranch}
                setSelectedOption={option => setSelectedBranch(option)}
                classNames="mb-24"
              />
            )}
          </div>
        </Modal>
      )}
      {isDeleteEmployeeModalOpen && (
        <Modal
          width={422}
          right={32}
          title="Удаление пользователей"
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          onCloseClick={() => setDeleteEmployeeModal(false)}
          onDeleteClick={onDeleteEmployee}
        >
          <div className="employee-modal">
            <Typography variant="text">
              Вы действительно хотите удалить
              {selectedEmployee
                ? ' выбранного пользователя?'
                : ` выбранных пользователей (${selectedEmployees && selectedEmployees.length})?`
              }
            </Typography>
          </div>
        </Modal>
      )}
      {isGroupEmployeesModalOpen && (
        <Modal
          width={648}
          right={32}
          title="Группирование"
          cancelLabel="Отмена"
          deleteLabel="Исключить"
          saveLabel="Добавить"
          onCloseClick={() => setGroupEmployeesModal(false)}
          onSaveClick={onAddOrRemoveEmployeesGroups('add')}
          onDeleteClick={onAddOrRemoveEmployeesGroups('delete')}
        >
          <div className="employee-modal">
            <Typography variant="text">
              Выберите из списка группы, для добавления или исключения
              {selectedEmployee
                ? ' выбранного пользователя.'
                : ` выбранных пользователей (${selectedEmployees && selectedEmployees.length}).`
              }
            </Typography>
            <Typography variant="subtext" className="mt-28 mb-4">
              Группы
            </Typography>
            {groups && groups.groupsOptions && (
              <Select
                staticWidth
                withCheckbox
                options={groups.groupsOptions}
                selectedOption={groups.groupsOptions[0]}
                customTitle={(selectedGroups && selectedGroups.length) ? `${selectedGroups.length} групп` : 'Выберите группы'}
                onCheckboxChanges={onGroupSelect}
                classNames="mb-24"
              />
            )}
          </div>
        </Modal>
      )}
      {isSendPasswordToEmployeesModalOpen && (
        <Modal
          width={422}
          right={32}
          title="Отправка логина и пароля"
          cancelLabel="Отмена"
          saveLabel="Отправить"
          onCloseClick={() => setSendPasswordToEmployeesModal(false)}
          onSaveClick={onSendPasswordsToEmployees}
        >
          <div className="employee-modal">
            <Typography variant="text">
              Вы действительно хотите отправить логин и пароль
              {selectedEmployee
                ? ' пользователю?'
                : ` выбранным пользователям (${selectedEmployees && selectedEmployees.length}).`
              }
            </Typography>
            <Typography variant="text mt-24">
              {selectedEmployee
                ? 'Данный пользователь получит логин и пароль на свою почту'
                : 'Данные пользователи получат логин и пароль на свои почты'
              }
            </Typography>
          </div>
        </Modal>
      )}
      {isUserInfoModalOpen && (
        <Modal
          width={648}
          title="Информация о пользователе"
          onCloseClick={modalUserInfoClose}
        >
          {selectedEmployee && groups && (
            <ModalEmployeeUpdate
              companyId={companyId}
              branches={branches}
              groupsOptions={groups.groupsOptions as IOption[]}
              employee={selectedEmployee}
              setUpdatedData={modalUserInfoSave}
              handleCancelClick={modalUserInfoClose}
            />
          )}

        </Modal>
      )}
      {!hideOptions && selectedEmployees && selectedEmployees.length > 0 && (
        <div
          className="d-flex table__drawer justify-content-between align-items-center"
        >
          <Typography variant="text">
            Выбрано пользователей: {selectedEmployees.length}
          </Typography>
          <div className="d-flex">
            {options.map((n, i) => (
              <Button
                key={i}
                type="plain"
                className="table__drawer__btn"
                variant="subtextmed"
                onClick={() => n.callback && n.callback()}
              >
                {n.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  updateEmployeesActiveness: employmentActions.updateEmployeesActiveness,
  changeEmployeesBranch: employmentActions.changeEmployeesBranch,
  deleteEmployees: employmentActions.deleteEmployees,
  addOrRemoveEmployeesGroups: employmentActions.addOrRemoveEmployeesGroups,
  sendPasswordsToEmployees: employmentActions.sendPasswordsToEmployees,
  updateEmployee: employmentActions.updateEmployee,
};

export default connect<any>(
  null,
  mapDispatchToProps,
)(TableEmployees);
