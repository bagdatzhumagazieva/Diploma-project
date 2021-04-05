import React, { useState } from 'react';
import { generateId } from 'src/utils/generation';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Tabs from 'src/components/molecules/Tabs';
import EmployeesInvitationList from 'src/components/molecules/EmployeeInvitation/EmployeesInvitationList';

import { MANUAL_INVITATION_TABS } from 'src/components/organisms/ModalInvitation/consts';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { EmployeesMultipleInvitationTypes } from 'src/components/molecules/EmployeeInvitation/EmployeeInvitationMultiple/types';
import { ModalInvitationManualTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationManual/types';
import 'src/components/organisms/ModalInvitation/index.scss';

function ModalInvitationManual(props: ModalInvitationManualTypes.IProps) {
  const { branches, groups, onSendInvitations, onDiscard } = props;
  const [manualInvitationType, setManualInvitationType] = useState<string>(MANUAL_INVITATION_TABS[0].id);

  const newEmployee = () => {
    const id = generateId();
    return {
      [id]: {
        id,
        groups: groups || [],
        selectedBranch: {} as ITreeOption,
        errors: {
          email: 'Введите email',
          branch: 'Вы не выбрали филиал',
          phone: 'Введите номер телефона',
        },
      },
    };
  };

  const [employees, setEmployees] = useState<ModalInvitationManualTypes.IEmployeeDataObjectsArray>(newEmployee);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const onEmployeesDataChange = (employee: ModalInvitationManualTypes.IEmployeeData) => {
    setEmployees({
      ...employees,
      [employee.id]: employee,
    });
  };

  const onCreateNewEmployee = () => {
    const newOne = newEmployee();
    setEmployees({
      ...employees,
      ...newOne,
    });
  };

  const onAddMultipleEmployees = (data: EmployeesMultipleInvitationTypes.IMultipleEmployeesParams) => {
    let newEmployees = Object.assign({}, employees);
    data.inputs && data.inputs.forEach((input: string) => {
      const id = generateId();
      newEmployees = {
        ...newEmployees,
        [id]: {
          id,
          mail: manualInvitationType === MANUAL_INVITATION_TABS[0].id ? input : undefined,
          phone : manualInvitationType === MANUAL_INVITATION_TABS[1].id ? input : undefined,
          groups: data.groups || groups || [],
          selectedBranch: data.selectedBranch || {} as ITreeOption,
          errors: { email: '', branch: '', phone: '' },
        },
      };
    });
    setEmployees(newEmployees);
  };

  const onDeleteEmployee = (employee: ModalInvitationManualTypes.IEmployeeData) => {
    const newEmployees = Object.assign({}, employees);
    delete newEmployees[employee.id];
    setEmployees(newEmployees);
  };

  const onSendInvitationsClick = () => {
    if (hasErrors) {
      setShowErrors(true);
    } else {
      onSendInvitations && onSendInvitations(employees);
    }
  };

  const onManualInvitationTypeChange = (id: string) => {
    setEmployees(newEmployee);
    setManualInvitationType(id);
  };

  const hasErrors = Object.keys(employees).some(n => (
    employees[n].errors.branch ||
    ((manualInvitationType === MANUAL_INVITATION_TABS[0].id) ? employees[n].errors.email : employees[n].errors.phone)
  ));

  return (
    <div className="modal-invitation__manual">
      <Tabs
        hideLine
        tabOptions={MANUAL_INVITATION_TABS}
        activeId={manualInvitationType}
        setActiveTabId={onManualInvitationTypeChange}
        className="modal-invitation__manual-tabs mt-24"
      >
        <EmployeesInvitationList
          key={MANUAL_INVITATION_TABS[0].id}
          type="mail"
          employees={employees || {}}
          branches={branches}
          groups={groups}
          onCreateNewEmployee={onCreateNewEmployee}
          onDeleteEmployee={onDeleteEmployee}
          onEmployeeDataChange={onEmployeesDataChange}
          onAddMultipleEmployees={onAddMultipleEmployees}
          showErrors={showErrors}
        />
        <EmployeesInvitationList
          key={MANUAL_INVITATION_TABS[1].id}
          type="phone"
          employees={employees || {}}
          branches={branches}
          groups={groups}
          onCreateNewEmployee={onCreateNewEmployee}
          onDeleteEmployee={onDeleteEmployee}
          onEmployeeDataChange={onEmployeesDataChange}
          onAddMultipleEmployees={onAddMultipleEmployees}
          showErrors={showErrors}
        />
      </Tabs>
      <div className="modal-invitation__manual__footer d-flex align-items-center">
        <Typography
          variant="text"
        >
          Всего пользователей: {Object.keys(employees).length}
        </Typography>
        <div className="d-flex align-items-center ml-auto">
          <Button
            type="link"
            variant="textmed"
            className="mr-16"
            onClick={onDiscard}
          >
            Отмена
          </Button>
          <Button
            variant="textmed"
            hint={hasErrors ? 'Вы ввели данные неправильно' : undefined}
            className="ml-24 modal-invitation__send-btn"
            onClick={onSendInvitationsClick}
          >
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalInvitationManual;
