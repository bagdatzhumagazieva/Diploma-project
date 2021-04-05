import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import { formatPhoneNumber } from 'src/utils/format';

// import branchActions from 'src/store/branch/actions';
// import employmentActions from 'src/store/employment/actions';
// import groupActions from 'src/store/group/actions';
// import invitationActions from 'src/store/invitation/actions';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import ModalInvitation from 'src/components/organisms/ModalInvitation';
import ModalEmployeeRemoval from 'src/components/organisms/ModalEmployeeRemoval';
import TableEmployeesWithPagination from 'src/components/organisms/TableComponents/TableEmployees/TableEmployeesWithPagination';

import { BranchesTypes } from 'src/store/branch/types';
import { InvitationTypes } from 'src/store/invitation/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { CompanyEmployeesTypes } from 'src/components/organisms/CompanyComponents/CompanyEmployees/types';
import { ModalInvitationManualTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationManual/types';
import { ModalInvitationExcelTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationExcel/types';
import { parseBranchesToTreeSelect } from 'src/utils/parse';
import IconDelete from 'src/assets/img/icons/delete.svg';
import IconPlus from 'src/assets/img/icons/plus.svg';
import 'src/components/organisms/CompanyComponents/CompanyEmployees/index.scss';

function CompanyEmployees(props: CompanyEmployeesTypes.IProps) {
  const {
    groups, company, branches, companyId, getGroups,
    removedEmployeesState, createdInvitationsState, removeExcelEmployees,
    createExcelEmployeesInvitations, getBranches, removeEmployees,
    createEmployeesInvitations, clearCreatedInvitationsState,
    clearRemovedEmployeesState,
  } = props;

  const notification = useNotification();
  const [isInvitationModalOpen, setInvitationModal] = useState<boolean>(false);
  const [isRemovalModalOpen, setRemovalModal] = useState<boolean>(false);
  const [isInvitationSuccess, setInvitationSuccess] = useState<boolean>();
  const [isRemovalSuccess, setRemovalSuccess] = useState<boolean>();

  useEffect(
    () => {
      const groupParams = { companyId };
      getBranches && getBranches(companyId);
      getGroups && getGroups(groupParams);
    },
    [companyId, getBranches, getGroups],
  );

  useEffect(
    () => {
      if (createdInvitationsState) {
        createdInvitationsState.responseType === NotificationType.Success && setInvitationSuccess(true);
        if (createdInvitationsState.responseType === NotificationType.Danger) {
          notification.addStateNotification(createdInvitationsState);
          clearCreatedInvitationsState && clearCreatedInvitationsState();
        }
      }
      if (removedEmployeesState) {
        if (removedEmployeesState.responseType === NotificationType.Success && removedEmployeesState.fromRemovalModal) {
          setRemovalSuccess(true);
        }
        if (removedEmployeesState.responseType === NotificationType.Danger) {
          clearRemovedEmployeesState && clearRemovedEmployeesState();
        }
      }
    },
    [createdInvitationsState, removedEmployeesState],
  );

  const branchesTreeSelect: ITreeOption[] = [{
    name: company?.name || '',
    value: company?.id ? 'main' : '0',
    children: branches
      ? branches.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n))
      : undefined,
  }];

  const onSendInvitations = (employees: ModalInvitationManualTypes.IEmployeeDataObjectsArray) => {
    setInvitationModal(false);
    const invitationBody = Object.keys(employees).map((n: string) => {
      const employee = employees[n];
      return ({
        email: employee.mail,
        phone: employee.phone && formatPhoneNumber(employee.phone),
        branch_id: (+employee.selectedBranch.value !== companyId) ? +employee.selectedBranch.value : undefined,
        company_id: companyId,
        group_ids: employee.groups && employee.groups.filter(n => n.checkboxChecked).map(n => +n.value),
      });
    });
    createEmployeesInvitations && createEmployeesInvitations(invitationBody);
  };

  const onSendExcelInvitations = (employees: ModalInvitationExcelTypes.IEmployeeExcelDataObjectsArray) => {
    setInvitationModal(false);
    const invitationBody: InvitationTypes.IInvitationExcelResponseProps[] = Object.keys(employees).map((n: string) => {
      const employee = employees[n];
      return ({
        first_name: employee.firstName,
        last_name: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        branch_name: employee.branchName,
        group_names: employee.groupNames,
      });
    });
    createExcelEmployeesInvitations && createExcelEmployeesInvitations(companyId, invitationBody);
  };

  const onRemoveEmployees = (employeeIds: number[]) => {
    setRemovalModal(false);
    removeEmployees && removeEmployees(employeeIds, true);
  };

  const onRemoveExcelEmployees = (employees: ModalInvitationExcelTypes.IEmployeeExcelDataObjectsArray) => {
    setRemovalModal(false);
    const invitationBody: InvitationTypes.IInvitationExcelResponseProps[] = Object.keys(employees).map((n: string) => {
      const employee = employees[n];
      return ({
        first_name: employee.firstName,
        last_name: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        branch_name: employee.branchName,
        group_names: employee.groupNames,
      });
    });
    removeExcelEmployees && removeExcelEmployees(companyId, invitationBody);
  };

  const onCloseInvitationSuccessModal = () => {
    setInvitationSuccess(false);
    clearCreatedInvitationsState && clearCreatedInvitationsState();
  };

  const onCloseInvitationModal = () => {
    setInvitationModal(false);
    clearCreatedInvitationsState && clearCreatedInvitationsState();
  };

  const onCloseRemovalSuccessModal = () => {
    setRemovalSuccess(false);
    clearRemovedEmployeesState && clearRemovedEmployeesState();
  };

  const onCloseRemovalModal = () => {
    setRemovalModal(false);
    clearRemovedEmployeesState && clearRemovedEmployeesState();
  };

  return (
    <div className="company-employees mt-24">
      <TableEmployeesWithPagination
        companyId={companyId}
        employeesCount={company?.employeesCount || 0}
        branches={{
          branchesOptions: branchesTreeSelect,
          selectedTreeOption: branchesTreeSelect[0],
        }}
        groups={{
          groupsOptions: groups && groups.map(n => ({ name: n.name, value: `${n.id}` } as ITreeOption)),
        }}
        actionButtons={
          <div className="d-flex">
            <Button
              variant="textmed"
              type="black-icon"
              className="d-flex align-items-center py-12 mr-24"
              onClick={() => setRemovalModal(true)}
            >
              <Image
                alt="delete button"
                className="mr-8"
                src={IconDelete}
              />
              Удалить
            </Button>
            {groups &&
              <Button
                className="d-flex align-items-center py-12 px-24"
                variant="textmed"
                onClick={() => setInvitationModal(true)}
              >
                <Image
                  src={IconPlus}
                  alt="add button"
                  className="mr-8"
                />
                Добавить нового
              </Button>
            }
          </div>
        }
      />
      {isInvitationModalOpen && (
        <Modal
          width={976}
          onCloseClick={onCloseInvitationModal}
        >
          <ModalInvitation
            branches={branchesTreeSelect}
            groups={groups ? groups.map(n => ({ name: n.name, value: `${n.id}` } as IOption)) : []}
            onDiscard={onCloseInvitationModal}
            onSendInvitations={onSendInvitations}
            onSendExcelInvitations={onSendExcelInvitations}
          />
        </Modal>
      )}
      {isRemovalModalOpen && (
        <Modal
          width={976}
          onCloseClick={onCloseRemovalModal}
        >
          <ModalEmployeeRemoval
            onDiscard={onCloseRemovalModal}
            onRemoveEmployees={onRemoveEmployees}
            onRemoveExcelEmployees={onRemoveExcelEmployees}
          />
        </Modal>
      )}
      {isInvitationSuccess && (
        <Modal
          width={422}
          top={24}
          right={24}
          withCloseIcon={false}
          onCloseClick={onCloseInvitationSuccessModal}
        >
          <div className="invitation-success-modal">
            <Typography
              variant="h2"
              className="d-block"
            >
              Приглашения успешно отправлены!
            </Typography>
            <Typography
              variant="text"
              className="mt-24"
            >
              {createdInvitationsState && createdInvitationsState.description}
            </Typography>
            <Typography
              variant="text"
              className="mt-16"
            >
              Пользователи принявшие приглашения отображаются на странице “Пользователи”.
            </Typography>
            <Button
              className="invitation-success-modal__close-btn d-flex ml-auto"
              variant="textmed"
              onClick={onCloseInvitationSuccessModal}
            >
              Понятно
            </Button>
          </div>
        </Modal>
      )}
      {isRemovalSuccess && (
        <Modal
          width={422}
          top={24}
          right={24}
          withCloseIcon={false}
          onCloseClick={onCloseRemovalSuccessModal}
        >
          <div className="invitation-success-modal">
            <Typography
              variant="h2"
              className="d-block"
            >
              Пользователи успешно удалены!
            </Typography>
            <Typography
              variant="text"
              className="mt-24"
            >
              {removedEmployeesState && removedEmployeesState.description}
            </Typography>
            <Button
              className="invitation-success-modal__close-btn d-flex ml-auto"
              variant="textmed"
              onClick={onCloseRemovalSuccessModal}
            >
              Понятно
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  // company: state.companyReducer.company.data,
  // groups: state.groupReducer.groups.data,
  // branches: state.branchReducer.branches.data,
  // createdInvitationsState: state.invitationReducer.createdInvitationsState.data,
  // removedEmployeesState: state.employmentReducer.removedEmployeesState.data,
});

const mapDispatchToProps = {
  // getBranches: branchActions.getBranches,
  // getGroups: groupActions.getGroups,
  // createEmployeesInvitations: invitationActions.createEmployeesInvitations,
  // createExcelEmployeesInvitations: invitationActions.createExcelEmployeesInvitations,
  // removeEmployees: employmentActions.deleteEmployees,
  // getEmployeesExcel: employmentActions.getEmployeesExcel,
  // removeExcelEmployees: employmentActions.removeExcelEmployees,
  // clearCreatedInvitationsState: invitationActions.clearCreatedInvitationsState,
  // clearRemovedEmployeesState: employmentActions.clearRemovedEmployeesState,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(CompanyEmployees));
