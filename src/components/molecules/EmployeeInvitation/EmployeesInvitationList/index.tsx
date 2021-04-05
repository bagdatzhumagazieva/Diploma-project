import React, { useState } from 'react';

import Button from 'src/components/atoms/Button';
import IconPlus from 'src/components/atoms/Svg/Plus';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import EmployeeInvitation from 'src/components/molecules/EmployeeInvitation/index';
import EmployeesMultipleInvitation from 'src/components/molecules/EmployeeInvitation/EmployeeInvitationMultiple';

import { INVITATION_COLUMNS } from 'src/components/molecules/EmployeeInvitation/EmployeesInvitationList/consts';
import { EmployeesInvitationListTypes } from 'src/components/molecules/EmployeeInvitation/EmployeesInvitationList/types';
import { EmployeesMultipleInvitationTypes } from 'src/components/molecules/EmployeeInvitation/EmployeeInvitationMultiple/types';
import 'src/components/molecules/EmployeeInvitation/EmployeesInvitationList/index.scss';

function EmployeesInvitationList(props: EmployeesInvitationListTypes.IProps) {
  const {
    employees,
    type,
    branches,
    groups,
    onEmployeeDataChange,
    onDeleteEmployee,
    onCreateNewEmployee,
    showErrors,
    onAddMultipleEmployees: propsOnAddMultipleEmployees,
  } = props;

  const [isMultipleInvitationModalOpen, setMultipleInvitationModalOpen] = useState<boolean>(false);

  const onAddMultipleEmployees = (data: EmployeesMultipleInvitationTypes.IMultipleEmployeesParams) => {
    propsOnAddMultipleEmployees && propsOnAddMultipleEmployees(data);
    setMultipleInvitationModalOpen(false);
  };

  return (
    <div className="employee-invitations-list">
      <div className="employee-invitations-list__header d-flex">
        {INVITATION_COLUMNS.map(n => (
          <div
            key={n.id}
            className="header__column"
          >
            <Typography
              color="grey_additional_2"
              variant="subtextmed"
            >
              {n.title}
            </Typography>
          </div>
        ))}
      </div>
      <div
        className="employee-invitations-list__group"
      >
        {Object.keys(employees).map((n: string) => {
          const emp = employees[n];
          return (
            <EmployeeInvitation
              key={emp.id}
              type={type}
              employee={emp}
              groups={groups}
              branches={branches}
              onEmployeeDataChange={onEmployeeDataChange}
              onDeleteEmployee={onDeleteEmployee}
              showErrors={showErrors}
            />
          );
        })}
      </div>
      <div className="d-flex align-items-center employee-invitations-list__actions">
        <Button
          variant="subtext"
          type="link"
          className="d-flex align-items-center"
          onClick={onCreateNewEmployee}
        >
          <IconPlus className="employee-invite-btn mr-8" />
          Добавить нового
        </Button>
        <Typography variant="subtext" className="mx-16">или</Typography>
        <Button
          type="link"
          variant="subtext"
          onClick={() => setMultipleInvitationModalOpen(true)}
        >
          Добавить несколько за раз
        </Button>
      </div>
      {isMultipleInvitationModalOpen && (
        <Modal
          width={912}
          onCloseClick={() => setMultipleInvitationModalOpen(false)}
        >
          <EmployeesMultipleInvitation
            type={type}
            groups={groups}
            branches={branches}
            onAddMultipleEmployees={onAddMultipleEmployees}
            onDiscardClick={() => setMultipleInvitationModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default EmployeesInvitationList;
