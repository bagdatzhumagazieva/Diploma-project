import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import invitationActions from 'src/store/invitation/actions';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import DropZone from 'src/components/molecules/DropZone';
import EmployeesInvitationExcel from 'src/components/molecules/EmployeeInvitation/EmployeeInvitationExcel';

import ExcelIcon from 'src/assets/img/icons/excel.png';
import { ModalEmployeeRemovalExcelTypes } from 'src/components/organisms/ModalEmployeeRemoval/ModalEmployeeRemovalExcel/types';
import { excelFileExtensions } from 'src/components/molecules/DropZone/types';
import 'src/components/organisms/ModalInvitation/index.scss';

function ModalEmployeeRemovalExcel(props: ModalEmployeeRemovalExcelTypes.IProps) {
  const { onUploadExcelInvitation, onRemoveExcelEmployees, onDiscard } = props;
  const { data, loading, errorMessage } = props.excelInvitationListState || {};

  const [employees, setEmployees] = useState<ModalEmployeeRemovalExcelTypes.IEmployeeExcelDataObjectsArray>();
  const [isRemoveConfirmModalOpen, setRemoveConfirmModalOpen] = useState<boolean>();

  useEffect(
    () => {
      data && setEmployees(data);
    },
    [data],
  );

  const onFileSuccessfullyUpload = (file: File) => {
    onUploadExcelInvitation && onUploadExcelInvitation(file);
  };

  const onDeleteEmployee = (employeeId: string) => {
    const newEmployees = Object.assign({}, employees);
    delete newEmployees[employeeId];
    setEmployees(newEmployees);
  };

  const onRemoveEmployeesClick = () => {
    setRemoveConfirmModalOpen(true);
  };

  const onRemoveEmployees = () => {
    employees && onRemoveExcelEmployees && onRemoveExcelEmployees(employees);
  };

  return (
    <div className="modal-invitation__excel">
      <div className="mt-24">
        {!employees && (
          <Typography
            variant="subtext"
            className="mb-24 px-24"
          >
            Для корректной загрузки файла вы можете
            <Button
              variant="subtext"
              type="link"
              className="mx-4"
            >
              <a href={`${process.env.PUBLIC_URL}/invitations_template.xlsx`} download className="text-primary">
                скачать образец
              </a>
            </Button>
            файла.
          </Typography>
        )}
        {employees ?
          <EmployeesInvitationExcel
            employees={employees}
            onDeleteEmployee={onDeleteEmployee}
          /> :
          <DropZone
            correctFormatsDesc="xls или xlsx"
            className="modal-invitation__excel__drop-zone"
            desc="*Требования и ограничения по загрузке файла*"
            multipleFileUploadError="Только 1 таблица может быть загружена за один раз"
            correctFileExtensions={excelFileExtensions}
            icon={ExcelIcon}
            error={errorMessage}
            loading={loading}
            onFileSuccessfullyUpload={onFileSuccessfullyUpload}
          />
        }
      </div>
      {employees && (
        <div className="modal-invitation__excel__footer d-flex align-items-center">
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
              type="main-red"
              variant="textmed"
              className="ml-24 modal-invitation__excel__send-btn"
              onClick={onRemoveEmployeesClick}
            >
              Удалить
            </Button>
          </div>
        </div>
      )}
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
              Вы действительно хотите удалить выбранных пользователей ({employees && Object.keys(employees).length})?
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

const mapStateToProps = (state: any) => ({
  excelInvitationListState: state.invitationReducer.excelInvitationListState,
});

const mapDispatchToProps = {
  onUploadExcelInvitation: invitationActions.uploadExcelInvitation,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(ModalEmployeeRemovalExcel);
