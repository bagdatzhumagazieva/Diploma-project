import React, { useState } from 'react';
import { connect } from 'react-redux';
import invitationActions from 'src/store/invitation/actions';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import ModalEmployeeRemovalExcel from 'src/components/organisms/ModalEmployeeRemoval/ModalEmployeeRemovalExcel';
import ModalEmployeeRemovalManual from 'src/components/organisms/ModalEmployeeRemoval/ModalEmployeeRemovalManual';

import { INVITATION_TABS } from 'src/components/organisms/ModalInvitation/consts';
import { ModalEmployeeRemovalTypes } from 'src/components/organisms/ModalEmployeeRemoval/types';
import 'src/components/organisms/ModalInvitation/index.scss';

function ModalEmployeeRemoval(props: ModalEmployeeRemovalTypes.IProps) {
  const {
    onDiscard,
    onRemoveEmployees,
    onRemoveExcelEmployees,
    clearCreatedInvitationsState,
  } = props;

  const [selectedTab, setSelectedTab] = useState<string>(INVITATION_TABS[0].value);

  const onTabChange = (tab: string) => () => {
    setSelectedTab(tab);
    clearCreatedInvitationsState && clearCreatedInvitationsState();
  };

  return (
    <div className="modal-invitation">
      <div className="modal-invitation__header pt-24 d-flex flex-column">
        <Typography
          variant="h1"
          className="ml-24 mb-24"
        >
          Удаление пользователей
        </Typography>
        <div className="modal-invitation__tabs d-flex align-self-start">
          {INVITATION_TABS.map(tab => (
            <Button
              key={tab.value}
              variant={selectedTab === tab.value ? 'textmed' : 'text'}
              classNames={[
                'tabs__button px-24 py-12',
                { 'tabs__button--active': selectedTab === tab.value },
              ]}
              onClick={onTabChange(tab.value)}
            >
              {tab.title}
            </Button>
          ))}
        </div>
      </div>

      {/* manual tab*/}
      {selectedTab === INVITATION_TABS[0].value && (
        <ModalEmployeeRemovalManual
          onDiscard={onDiscard}
          onRemoveEmployees={onRemoveEmployees}
        />
      )}

      {/* excel tab*/}
      {selectedTab === INVITATION_TABS[1].value && (
        <ModalEmployeeRemovalExcel
          onDiscard={onDiscard}
          onRemoveExcelEmployees={onRemoveExcelEmployees}
        />
      )}
    </div>
  );
}

const mapDispatchToProps = {
  clearCreatedInvitationsState: invitationActions.clearCreatedInvitationsState,
};

export default connect<any>(
  null,
  mapDispatchToProps,
)(ModalEmployeeRemoval);
