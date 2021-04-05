import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ScrollToTop from 'src/components/molecules/ScrollToTop';
import Modal from 'src/components/molecules/Modal';
import ModalBattleAccept from 'src/components/molecules/ModalBattleAccept';
import NotFound from 'src/pages/NotFound';
import AuthPage from 'src/pages/AuthPages/Auth';
import AppContext from 'src/components/AppContext';

import { BattleStatus, RouterPaths } from 'src/core/enum';
import { LOCAL_STORAGE } from 'src/core/store/values';
import ADMIN_ROUTERS from 'src/routers/AdminRouters';
import AUTH_ROUTERS from 'src/routers/AuthRouters';
import GAME_ROUTERS from 'src/routers/GameRouters';

// import profileActions from 'src/store/profile/actions';
// import { changeBattleStatus, getBattleById } from 'src/store/battles/action';
import { ProfileTypes } from 'src/store/profile/types';
import { BattleAggregatorTypes } from 'src/store/battles/types';

import { getBattleStatus } from 'src/pages/GamePages/Battles/consts';
import { onMessageListener, requestFirebaseNotificationPermission } from 'src/firebaseInit';
import { sendFirebaseToken } from 'src/store/notifications/api';

interface IProps {
  profile?: ProfileTypes.IRenderProps;
  battle?: BattleAggregatorTypes.IRenderBattle;
  getProfile?(): void;
  changeBattleStatus?(battleId: number, companyId: number, status: string, callback?: any): void;
  getBattleById?(battleId: number, companyId: number, callback?: any): void;
}

function MainRouting(props: IProps) {
  const { getBattleById, battle, changeBattleStatus } = props;

  const [showBattleModal, setShowBattleModal] = useState<BattleStatus>();
  const [acceptedBattleLink, setAcceptedBattleLink] = useState<string>();
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  const localCompanyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID);
  const [companyId, setCompanyId] = useState<number | undefined>(localCompanyId ? +localCompanyId : undefined);
  const value = { companyId, setCompanyId };
  const routers = [
    ...AUTH_ROUTERS,
    ...ADMIN_ROUTERS,
    ...GAME_ROUTERS,
    { component: <NotFound currentColor="orange"/>, path: '*', exact: true },
  ];

  onMessageListener()
    .then((payload: any) => {
      requestFirebaseNotificationPermission()
        .then((firebaseToken) => {
          if ((typeof token === 'string') && (typeof firebaseToken === 'string') && (typeof companyId === 'number')) {
            sendFirebaseToken(firebaseToken, companyId, token)
              .then(response => response.text())
              .catch(error => error);
          }
        })
        .catch((error => error),
        );
      if (payload && payload.data) {
        setTimeout(
          () => {
            getBattleById && getBattleById(payload.data?.entity_id, payload.data?.company_id, {
              onSuccess: (response: any) => {
                setShowBattleModal(getBattleStatus(response.data.battle_status));
              },
            });
          },
          3000);
      }
    })
    .catch(err => err);

  const onAcceptBattle = () => {
    battle && changeBattleStatus && changeBattleStatus(battle.battleId, battle.companyId, 'PENDING', {
      onSuccess: () => {
        setShowBattleModal(undefined);
        setAcceptedBattleLink(`/${RouterPaths.BATTLE}/${battle.battleId}`);
      },
    });
  };

  const passBattle = () => {
    setShowBattleModal(undefined);
    battle && setAcceptedBattleLink(`/${RouterPaths.BATTLE}/${battle.battleId}`);
  };

  return (
    <AppContext.Provider value={value}>
      <Router>
        <ScrollToTop >
          {/*{token && !localCompanyId && profile?.hasPassword && <Redirect to={`/${RouterPaths.COMPANY_CHOICE}` }/>}*/}
          {acceptedBattleLink && <Redirect to={acceptedBattleLink}/>}
          <Switch>
            <Route
              key="auth_page"
              path="/"
              exact={true}
            >
              <AuthPage />
            </Route>
            {routers.map((route: any, index: number) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
              >
                {route.component}
              </Route>
            ))}
          </Switch>
        </ScrollToTop>
      </Router>
      {showBattleModal !== undefined && battle && showBattleModal === BattleStatus.NEW && (
        <Modal
          title="Вас вызвали на Баттл!"
          withSaveBtnArrow
          width={712}
          saveLabel="Принять"
          cancelLabel="Вернуться назад"
          onCloseClick={() => setShowBattleModal(undefined)}
          onSaveClick={onAcceptBattle}
        >
          <ModalBattleAccept
            userFullName={`${battle.employment.firstName || ''} ${battle.employment.lastName || ''}`}
            rivalUserFullName={`${battle.rivalEmployment.firstName || ''} ${battle.rivalEmployment.lastName || ''}`}
            userRole={battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
            rivalUserRole={!battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
          />
        </Modal>
      )}
      {showBattleModal !== undefined && battle && showBattleModal === BattleStatus.PENDING && (
        <Modal
          title="Ваш соперник принял ваш вызов!"
          withSaveBtnArrow
          width={712}
          saveLabel="Пройти"
          cancelLabel="Вернуться назад"
          onCloseClick={() => setShowBattleModal(undefined)}
          onSaveClick={passBattle}
        >
          <ModalBattleAccept
            userFullName={`${battle.employment.firstName || ''} ${battle.employment.lastName || ''}`}
            rivalUserFullName={`${battle.rivalEmployment.firstName || ''} ${battle.rivalEmployment.lastName || ''}`}
            userRole={battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
            rivalUserRole={!battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
          />
        </Modal>
      )}
      {showBattleModal !== undefined && battle && showBattleModal === BattleStatus.REVOKED && (
        <Modal
          width={475}
          title="Ваш соперник отменил ваш вызов!"
          saveLabel="Ок"
          cancelLabel="Отмена"
          onCloseClick={() => setShowBattleModal(undefined)}
          onSaveClick={() => setShowBattleModal(undefined)}
        >
          <ModalBattleAccept
            unShowInfo
            userFullName={`${battle.employment.firstName || ''} ${battle.employment.lastName || ''}`}
            rivalUserFullName={`${battle.rivalEmployment.firstName || ''} ${battle.rivalEmployment.lastName || ''}`}
            userRole={battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
            rivalUserRole={!battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
          />
        </Modal>
      )}
      {showBattleModal !== undefined && battle && showBattleModal === BattleStatus.EXPIRED && (
        <Modal
          width={500}
          title={`Ваш баттл c ${battle.rivalEmployment.firstName || ''} ${battle.rivalEmployment.lastName || ''} уже просрочен!`}
          saveLabel="Ок"
          onSaveClick={() => setShowBattleModal(undefined)}
        >
          <ModalBattleAccept
            unShowInfo
            userFullName={`${battle.employment.firstName || ''} ${battle.employment.lastName || ''}`}
            rivalUserFullName={`${battle.rivalEmployment.firstName || ''} ${battle.rivalEmployment.lastName || ''}`}
            userRole={battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
            rivalUserRole={!battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
          />
        </Modal>
      )}
    </AppContext.Provider>
  );
}

export const mapStateToProps = (state: any) => ({
  profile: state.profileReducer.profile.data,
  battle: state.battlesReducer.battle.data,
});

export const mapDispatchToProps = {
  // getBattleById,
  // changeBattleStatus,
  // getProfile: profileActions.getProfile,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(MainRouting);
