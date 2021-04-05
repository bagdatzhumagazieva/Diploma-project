import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import invitationActions from 'src/store/invitation/actions';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import Table, { TableWithCheckboxes } from 'src/components/molecules/Table';

import { InvitationTypes } from 'src/store/invitation/types';
import { TableInvitationsTypes } from 'src/components/organisms/TableComponents/TableInvitations/types';
import { InvitationsTableHeaderData, InvitationStatus } from 'src/components/organisms/TableComponents/TableInvitations/consts';

function TableInvitations(props: TableInvitationsTypes.IProps) {
  const {
    invitations: propsInvitations,
    invitationsLoading,
    onSort,
    deleteInvitations,
    resendInvitations,
  } = props;

  const [invitations, setInvitations] = useState<InvitationTypes.IRenderProps[]>();
  const [selectedInvitation, setSelectedInvitation] = useState<InvitationTypes.IRenderProps>();
  const selectedInvitations = invitations && invitations.filter(
    (n: TableWithCheckboxes<InvitationTypes.IRenderProps>) => n.isChecked,
  );
  const [isDeleteConfirmModalOpen, setDeleteConfirmModal] = useState<boolean>(false);
  const [isResendConfirmModalOpen, setResendConfirmModal] = useState<boolean>(false);

  useEffect(
    () => {
      propsInvitations && setInvitations(propsInvitations);
    },
    [propsInvitations],
  );

  const onInvitationsSelect = (data: InvitationTypes.IRenderProps[]) => {
    setInvitations(data);
  };

  const isSelectedInvitationsExpired = selectedInvitations && selectedInvitations.every(n =>
    n.status === InvitationStatus.Expired,
  );

  const options = [
    {
      name: 'Удалить', callback: () => { setDeleteConfirmModal(true); setSelectedInvitation(undefined); },
    },
    ...isSelectedInvitationsExpired
      ? [{ name: 'Переотправить', callback: () => { setResendConfirmModal(true); setSelectedInvitation(undefined); } }]
      : [],
  ];

  const onDeleteInvitationClick = (invitation: InvitationTypes.IRenderProps) => () => {
    setDeleteConfirmModal(true);
    setSelectedInvitation(invitation);
  };

  const onResendInvitationClick = (invitation: InvitationTypes.IRenderProps) => () => {
    setResendConfirmModal(true);
    setSelectedInvitation(invitation);
  };

  const onDeleteInvitation = () => {
    setDeleteConfirmModal(false);
    deleteInvitations && deleteInvitations(
      (selectedInvitation && [selectedInvitation.id])
      || (selectedInvitations && selectedInvitations.map(n => n.id)) || [],
    );
  };

  const onResendInvitation = () => {
    setResendConfirmModal(false);
    resendInvitations && resendInvitations(
      (selectedInvitation && [selectedInvitation.id])
      || (selectedInvitations && selectedInvitations.map(n => n.id)) || [],
    );
  };

  return (
    <div>
      {invitations && (
        <Table
          checkbox
          loading={invitationsLoading}
          wrapperClassName="invitations-table mt-16"
          onCheckboxChange={onInvitationsSelect}
          onSort={onSort}
          headerData={[
            ...InvitationsTableHeaderData,
            {
              key: 'option',
              name: '',
              width: '226px',
              render: (n: InvitationTypes.IRenderProps) => (
                <div className="d-flex align-items-center">
                  <Button
                    type="link"
                    variant="subtext"
                    onClick={onDeleteInvitationClick(n)}
                  >
                    Удалить
                  </Button>
                  {n.status === InvitationStatus.Expired && (
                    <Button
                      type="link"
                      variant="subtext"
                      classNames="ml-16"
                      onClick={onResendInvitationClick(n)}
                    >
                      Переотправить
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
          bodyData={invitations.map(n => ({ ...n }))}
        />
      )}
      {isDeleteConfirmModalOpen && (
        <Modal
          width={422}
          title="Удаление приглашения"
          deleteLabel="Удалить"
          cancelLabel="Отмена"
          onCloseClick={() => setDeleteConfirmModal(false)}
          onDeleteClick={onDeleteInvitation}
        >
          <div className="mx-32">
            <Typography
              variant="text"
              className="mb-24 d-block"
            >
              Вы действительно хотите удалить
              {selectedInvitation
                ? ' выбранное приглашение?'
                : ` выбранные приглашения (${selectedInvitations && selectedInvitations.length})?`
              }
            </Typography>
          </div>
        </Modal>
      )}
      {isResendConfirmModalOpen && (
        <Modal
          width={422}
          title="Переотправка приглашения"
          cancelLabel="Отмена"
          saveLabel="Отправить"
          onCloseClick={() => setResendConfirmModal(false)}
          onSaveClick={onResendInvitation}
        >
          <div className="employee-modal">
            <Typography variant="text">
              Вы действительно хотите переотправить
              {selectedInvitation
                ? ' выбранное приглашение?'
                : ` выбранные приглашения (${selectedInvitations && selectedInvitations.length})?`
              }
            </Typography>
          </div>
        </Modal>
      )}
      {selectedInvitations && selectedInvitations.length > 0 && (
        <div
          className="d-flex table__drawer justify-content-between align-items-center"
        >
          <Typography variant="text">
            Выбрано пользователей: {selectedInvitations.length}
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
  deleteInvitations: invitationActions.deleteInvitations,
  resendInvitations: invitationActions.resendInvitations,
};

export default connect<any>(
  null,
  mapDispatchToProps,
)(TableInvitations);
