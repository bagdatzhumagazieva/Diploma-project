import React, { useState } from 'react';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import EmployeeSearchByEmail from 'src/components/molecules/EmployeeSearchByEmail';
import { ModalEmployeeRemovalManualTypes } from 'src/components/organisms/ModalEmployeeRemoval/ModalEmployeeRemovalManual/types';
import 'src/components/organisms/ModalEmployeeRemoval/ModalEmployeeRemovalManual/index.scss';

function ModalEmployeeRemovalManual(props: ModalEmployeeRemovalManualTypes.IProps) {
  const { onDiscard, onRemoveEmployees: propsOnRemoveEmployees } = props;

  const [employeeIds, setEmployeeIds] = useState<number[]>();
  const [isEmailsValid, setEmailsValid] = useState<boolean>();
  const [isRemoveConfirmModalOpen, setRemoveConfirmModalOpen] = useState<boolean>();

  const onEmployeesChange = (employeeIds: number[], isValid: boolean) => {
    setEmployeeIds(employeeIds);
    setEmailsValid(isValid);
  };

  const onRemoveEmployeesClick = () => {
    setRemoveConfirmModalOpen(true);
  };

  const onRemoveEmployees = () => {
    setRemoveConfirmModalOpen(false);
    propsOnRemoveEmployees && employeeIds && propsOnRemoveEmployees(employeeIds);
  };

  return (
    <div className="modal-removal--manual">
      <EmployeeSearchByEmail
        onEmployeesChange={onEmployeesChange}
        className="mb-24"
      />
      <div className="modal-removal--manual__footer d-flex align-items-center">
        <Typography
          variant="text"
        >
          Всего пользователей: {employeeIds && employeeIds.length}
        </Typography>
        <div className="d-flex align-items-center ml-auto">
          <Button
            type="link"
            color="blacker"
            variant="textmed"
            className="mr-16"
            onClick={onDiscard}
          >
            Отмена
          </Button>
          <Button
            variant="textmed"
            disabled={!isEmailsValid}
            type="main-red"
            hint={isEmailsValid ? 'Вы ввели данные неправильно' : undefined}
            className="ml-24 modal-removal__remove-btn"
            onClick={onRemoveEmployeesClick}
          >
            Удалить
          </Button>
        </div>
      </div>
      {isRemoveConfirmModalOpen && (
        <Modal
          title="Подтверждение удаления"
          deleteLabel="Удалить"
          cancelLabel="Отмена"
          onCloseClick={() => setRemoveConfirmModalOpen(false)}
          onDeleteClick={onRemoveEmployees}
        >
          <div className="mx-32">
            <Typography
              variant="text"
              className="mb-24 d-block"
            >
              Вы действительно хотите удалить выбранных пользователей ({employeeIds && employeeIds.length})?
            </Typography>
            <Typography
              variant="text"
              className="mb-24"
            >
              Все данные будут стерты.
            </Typography>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ModalEmployeeRemovalManual;
