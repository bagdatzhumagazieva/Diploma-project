import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { BattleStatus, BattleUserStatus, RouterPaths } from 'src/core/enum';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Pagination from 'src/components/atoms/Pagination';
import Typography from 'src/components/atoms/Typography';
import ModalLoading from 'src/components/atoms/ModalLoading';
import useNotification from 'src/components/molecules/Notification/useNotification';
import CardProfile from 'src/components/molecules/Cards/CardProfile';
import Input from 'src/components/molecules/Input';
import Table from 'src/components/molecules/Table';
import ModalBattleAccept from 'src/components/molecules/ModalBattleAccept';
import Modal from 'src/components/molecules/Modal';
import Layout from 'src/components/organisms/Layout';
import ModalUserBattle from 'src/components/molecules/ModalUserBattle';

import useDebounce from 'src/hooks/useDebounce';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import AppContext from 'src/components/AppContext';
import { changeBattleStatus, createBattle, getBattlesAggregator } from 'src/store/battles/action';
import { BattlesTypes } from 'src/pages/GamePages/Battles/types';
import { HeaderTableEndData, HeaderTableStartData, pageSize, parseBattles } from 'src/pages/GamePages/Battles/consts';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import IconPlus from 'src/assets/img/icons/plus.svg';
import { SortDirection, TableTypes } from 'src/components/molecules/Table/types';
import { BattleAggregatorTypes } from 'src/store/battles/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import 'src/pages/GamePages/Battles/index.scss';

function Battles(props: BattlesTypes.IProps) {
  const { profile, employment, getBattlesAggregator, battlesAggregator, changeBattleStatus,
    battlesAggregatorLoading, history, createBattle, createdBattleError } = props;

  const [currentBattle, setCurrentBattle] = useState<BattlesTypes.IBattleAction>();
  const [actionModal, setActionModal] = useState< { battle: BattlesTypes.IBattle, isIncome: boolean }>();
  const [searchName, setSearchName] = useState('');
  const { companyId: compId } = useContext(AppContext);
  const companyId = compId || 0;
  const [battles, setBattles] = useState<BattlesTypes.IBattle[]>([]);
  const [bodyParams, setBodyParams] = useState<BattleAggregatorTypes.IQueryProps>(
    { companyId, page_size: pageSize, page: 1, sortByDate: true, desc: true });
  const [loader, setLoader] = useState<boolean>(false);
  const debounceSearchValue = useDebounce(searchName, 500);
  const notification = useNotification();

  useEffect(() => {
    getBattlesAggregator && getBattlesAggregator({ ...bodyParams, companyId: compId || 0 });
  },        [compId]);

  useEffect(() => {
    if (battlesAggregator) {
      setBattles(parseBattles(battlesAggregator.participants));
    }
  },        [battlesAggregator]);

  useEffect(
    () => {
      setBodyParams((prevState) => {
        const newFilterData =  { ...prevState, keyword: debounceSearchValue };
        getBattlesAggregator && getBattlesAggregator(newFilterData);
        return newFilterData;
      });
    },
    [debounceSearchValue],
  );

  useEffect(() => {
    if (createdBattleError) {
      notification.add({
        ...DEFAULT_NOTIFICATION_DATA,
        type: NotificationType.Danger,
        description: createdBattleError,
      });
    }
  },        [createdBattleError]);

  const onActionClick = (battle: BattlesTypes.IBattle, isIncome: boolean) => {
    setActionModal({ battle, isIncome });
  };

  const headerTableData: TableTypes.IHeaderData[] = [
    ...HeaderTableStartData,
    {
      key: 'sortByRivalName',
      name: 'Имя, Роль соперника',
      width: '254px',
      render: (n: BattlesTypes.IBattle) => (
        <div
          className="d-flex align-items-center"
        >
          <div className="battle-table__image-wrapper">
            <Image
              src={n.imageThumbnailUrl || ''}
              alt={n.userFullName || ''}
            />
          </div>
          <div className="d-flex flex-column ml-8">
            <Typography
              variant="subtext"
              color="main_50"
              className="battle-table__user-name mb-2 cursor-pointer"
              onClick={() => setCurrentBattle({
                id: n.rivalEmploymentId,
                action: getBattleModalStatus(n)})}
            >
              {n.rivalUserFullName}
            </Typography>
            <Typography variant="xsmall" className="mt-4" color="grey_additional_2">
              {!n.isCreator ? 'Автор вызова' : 'Приглашенный'}
            </Typography>
          </div>
        </div>
      ),
    },
    ...HeaderTableEndData(onActionClick),
  ];

  const getBattleModalStatus = (n: BattlesTypes.IBattle):
    { title: string, onCLick?(): void } => {
    if (n.battleStatus === BattleStatus.NEW && n.isCreator) {
      return {
        title: 'Отозвать приглашение',
        onCLick:() => onCLickAction(n.isCreator ? BattleStatus.REVOKED : BattleStatus.CANCELED, n.battleId),
      };
    }
    if ((n.battleStatus === BattleStatus.NEW && !n.isCreator)
      || n.battleStatus === BattleStatus.PENDING && !n.finishedDateTime) {
      return { title: 'Принять Баттл', onCLick:() => onCLickAction(BattleStatus.PENDING, n.battleId) };
    }
    return { title: 'Пригласить на Баттл', onCLick:() => inviteBattle(n, n.rivalUserId, n.rubrics.map(r => r.id)) };
  };

  const inviteBattle = (battle: BattlesTypes.IBattle, userId: number, categoryIds: number[]) => {
    setCurrentBattle(undefined);
    setLoader(true);
    createBattle && createBattle({ userId, categoryIds }, companyId, {
      onSuccess: (res: any) => {
        setLoader(false);
        if (!res.data.id) return;
        const newBattle: BattlesTypes.IBattle = {
          ...battle,
          battleId: res.data.id,
          battleStatus: BattleStatus.NEW,
          isCreator: true,
          status: BattleUserStatus.PENDING,
        };
        setBattles([newBattle, ...battles]);
        notification.add({
          ...DEFAULT_NOTIFICATION_DATA,
          description: 'Вы успешно создали баттл!',
        });
      },
      onError: () => {
        setLoader(false);
      },
    });
  };

  const onCLickAction = (status: BattleStatus, battleId: number) => {
    const newStatus = (status === BattleStatus.REVOKED) ? 'REVOKED' : (status === BattleStatus.CANCELED) ? 'CANCELED' : 'PENDING';
    setActionModal(undefined);
    setCurrentBattle(undefined);
    setLoader(true);
    changeBattleStatus && changeBattleStatus(battleId, companyId, newStatus, {
      onSuccess: () => {
        setLoader(false);
        if (status === BattleStatus.PENDING) {
          history.push(`/${RouterPaths.BATTLE}/${battleId}`);
        } else {
          setBodyParams({ companyId, page_size: pageSize, page: 1 });
          setBattles(battles.map(e => e.battleId === battleId ? { ...e, battleStatus: status } : e));
        }
      },
      onError: () => {
        setLoader(false);
      },
    });
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    const newBodyParams = {
      companyId, page_size: pageSize, page: 1,
      [label]: (sortDirection !== SortDirection.Default) ? true : undefined,
      desc: sortDirection === SortDirection.Descend,
    };
    setBodyParams(newBodyParams);
    getBattlesAggregator && getBattlesAggregator(newBodyParams);
  };

  const onPageClick = (page: number) => {
    const newBody = {
      companyId, page, page_size: pageSize, sortByDate: true, desc: true,
    };
    setBodyParams(newBody);
    getBattlesAggregator && getBattlesAggregator(newBody);
  };

  return (
    <Layout className="battles-page">
      <CardProfile
        userName={profile?.fullName || '-'}
        userImage={profile?.avatarThumbnailUrl || ''}
        // TODO: add curPoint, linkShop when shop will be ready
        curPoints={employment?.rewardAvailable || 0}
        linkShop={''}
        status={''}
        branch={employment?.branch?.name || ''}
        points={employment?.rewardAmount || 0}
        groups={employment?.groups?.map(e => e.name || '') || []}
        companyName={employment?.companyName || ''}
        className="pt-48 pb-64 grid"
      />
      <div className="battles-page__main-content color_grey_background__bg flex-grow-1 pt-42 pb-48">
        <div className="grid">
          <div>
            <Typography variant="headline">Баттлы</Typography>
            <Typography
              variant="text"
              className="ml-8"
            >
              ({battlesAggregator?.total || 0})
            </Typography>
          </div>
          <div className="d-flex justify-content-between align-items-end mt-16">
            <Input
              type="text"
              placeholder="ФИО"
              label="Поиск оппонента"
              classNames="battles-page__search-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
              value={bodyParams.keyword}
            />
            <Button
              className="battles-page__add-button d-flex align-items-center py-14 px-24"
              variant="textmed"
              to={`/${RouterPaths.BATTLE_INVITATION}`}
            >
              <Image
                src={IconPlus}
                alt="add button"
                className="mr-8"
              />
              Пригласить на баттл
            </Button>
          </div>
          <Table
            headerData={headerTableData}
            bodyData={battles}
            onSort={onSort}
            loading={battlesAggregatorLoading}
            wrapperClassName="battle-table mt-16"
          />
          <Pagination
            page={bodyParams.page}
            onGetPage={onPageClick}
            pageSize={pageSize}
            total={battlesAggregator?.total || pageSize}
            className="mt-16"
          />
        </div>
      </div>
      {currentBattle !== undefined && (
        <Modal
          width={976}
          onCloseClick={() => setCurrentBattle(undefined)}
          closeColor="#7A7B82"
        >
          <ModalUserBattle
            id={currentBattle.id}
            companyId={companyId}
            buttonAction={currentBattle.action}
          />
        </Modal>
      )}
      {actionModal !== undefined && !actionModal.isIncome && (
        <Modal
          title="Отозвать приглашение"
          saveLabel="Ok"
          cancelLabel="Отмена"
          onCloseClick={() => setActionModal(undefined)}
          onSaveClick={() => onCLickAction(actionModal?.battle.isCreator
             ? BattleStatus.REVOKED : BattleStatus.CANCELED, actionModal?.battle.battleId)}
        >
          <Typography variant="text" className="px-32">
            Вы уверены что хотите отозвать приглашение на Баттл?
          </Typography>
        </Modal>
      )}
      {actionModal !== undefined && actionModal.isIncome && (
        <Modal
          title="Вас вызвали на Баттл!"
          withSaveBtnArrow
          width={712}
          saveLabel="Принять"
          cancelLabel="Вернуться назад"
          onCloseClick={() => setActionModal(undefined)}
          onSaveClick={() => onCLickAction(BattleStatus.PENDING, actionModal?.battle.battleId)}
        >
          <ModalBattleAccept
            userAvatar={actionModal.battle.userAvatar}
            rivalUserAvatar={actionModal.battle.rivalUserAvatar}
            userFullName={actionModal.battle.userFullName}
            rivalUserFullName={actionModal.battle.rivalUserFullName}
            userRole={actionModal.battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
            rivalUserRole={!actionModal.battle.isCreator ? 'Автор вызова' : 'Приглашенный'}
          />
        </Modal>
      )}
      {loader && <ModalLoading />}
    </Layout>
  );
}

export const mapStateToProps = (state: any) => ({
  profile: state.profileReducer.profile.data,
  employment: state.employmentReducer.employment.data,
  battlesAggregator: state.battlesReducer.battlesAggregator.data,
  battlesAggregatorLoading: state.battlesReducer.battlesAggregator.loading,
  createdBattleError: state.battlesReducer.createdBattleState.errorMessage,
});

const mapDispatchToProps = {
  getBattlesAggregator,
  changeBattleStatus,
  createBattle,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withNotificationProvider(Battles)));
