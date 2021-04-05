import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import AvatarImage from 'src/components/atoms/AvatarImage';
import Button from 'src/components/atoms/Button';
import Loader from 'src/components/atoms/Loader';
import Typography from 'src/components/atoms/Typography';
import CardProfile from 'src/components/molecules/Cards/CardProfile';
import { getEmploymentBattles } from 'src/store/battles/action';
import { ReactComponent as BattleIcon } from 'src/assets/img/icons/battle.svg';
import { ModalUserBattleTypes } from 'src/components/molecules/ModalUserBattle/types';
import { ROLES_OPTIONS } from 'src/core/store/values';
import 'src/components/molecules/ModalUserBattle/index.scss';

function ModalUserBattle(props: ModalUserBattleTypes.IProps) {

  const { id, companyId, getEmploymentBattles, battleData, battleDataLoading, buttonAction } = props;

  useEffect(() => {
    getEmploymentBattles && getEmploymentBattles(companyId, id);
  },        []);

  return (
    <div className="modal-user-battle">
      <CardProfile
        status={''}
        userImage={battleData?.avatarThumbnailUrl || ''}
        userName={`${battleData?.firstName || ''} ${battleData?.lastName || ''}`}
        groups={battleData?.groups?.map(e => e.name) || []}
        branch={battleData?.branchName || ''}
        curPoints={battleData?.rewardAvailable || 0}
        points={battleData?.rewardAmount || 0}
        companyName={''}
        className="modal-user-battle__card-profile px-24 pt-24 pb-48"
      />
      {battleDataLoading ? <Loader size={50} className="m-24"/> :
        battleData && (
          <div className="p-24 color_grey_background__bg d-flex flex-column">
            <div className="d-flex">
              <div>
                <div className="modal-user-battle__block p-24">
                  <Typography variant="h2" className="mb-16">Результаты поединков</Typography>
                  <div className="mb-8">
                    <Typography variant="subtext" className="mr-4">Побед:</Typography>
                    <Typography variant="text" color="main_50">
                      {`${battleData?.battlesStat.winCount || 0} из ${battleData?.battlesStat.total || 0}`}
                    </Typography>
                  </div>
                  <div className="mb-8">
                    <Typography variant="subtext" className="mr-4">Поражений:</Typography>
                    <Typography variant="text" color="main_50">
                      {battleData?.battlesStat.loseCount || 0}
                    </Typography>
                  </div>
                </div>
                <div className="modal-user-battle__block p-24 mt-24">
                  <Typography variant="h2" className="mb-16">Баттлы с пользователем</Typography>
                  <div className="mb-8">
                    <Typography variant="subtext" className="mr-4">Всего поединков:</Typography>
                    <Typography variant="text" color="main_50">
                      {battleData?.commonBattlesStat.total || 0}
                    </Typography>
                  </div>
                  <div className="mb-8">
                    <Typography variant="subtext" className="mr-4">Поражений:</Typography>
                    <Typography variant="text" color="main_50">
                      {battleData?.commonBattlesStat.loseCount || 0}
                    </Typography>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="modal-user-battle__user-info d-flex flex-column align-items-center">
                      <AvatarImage src={battleData?.me.avatarThumbnailUrl} className="mb-8"/>
                      <Typography variant="subtext" className="user-info__name mb-4">
                        {`${battleData?.me.firstName} ${battleData?.me.lastName}`}
                      </Typography>
                      <Typography
                        variant="xsmall"
                        color="grey_additional_2"
                        className="text-overflow"
                      >
                        {ROLES_OPTIONS.find(e => e.value === battleData?.me.role)?.name || ''}
                      </Typography>
                    </div>
                    <BattleIcon width={36} height={36}/>
                    <div className="modal-user-battle__user-info d-flex flex-column align-items-center">
                      <AvatarImage src={battleData.avatarThumbnailUrl} className="mb-8"/>
                      <Typography variant="subtext" className="user-info__name mb-4">
                        {`${battleData?.firstName} ${battleData?.lastName}`}
                      </Typography>
                      <Typography
                        variant="xsmall"
                        color="grey_additional_2"
                        className="text-overflow"
                      >
                        {ROLES_OPTIONS.find(e => e.value === battleData?.role)?.name || ''}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-user-battle__block modal-user-battle__block--passed p-24 ml-24">
                <Typography variant="h2">Пройденные курсы и игры</Typography>
                {battleData?.finishedEntities.map(e => (
                  <div className="modal-user-battle__passed-courses-games mt-16">
                    <div className="d-flex">
                      <AvatarImage src={e.imageThumbnailUrl || ''} size={36} className="mr-16"/>
                      <div className="d-flex flex-column">
                        <Button
                          type="link-underlined"
                          className="passed-courses-games__name mb-8"
                        >
                          {`${e.name.substring(0, 70)}...`}
                        </Button>
                        <Typography
                          variant="xsmall"
                          color="grey_additional_2"
                        >
                          {e.type}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="textmed"
              onClick={buttonAction?.onCLick}
              className="py-16 px-52 mt-24 align-self-end"
            >
              {buttonAction?.title || ''}
            </Button>
          </div>
        )
      }
    </div>
  );
}

export const mapStateToProps = (state: any) => ({
  battleData: state.battlesReducer.employeeBattles.data,
  battleDataLoading: state.battlesReducer.employeeBattles.loading,
});

const mapDispatchToProps = {
  getEmploymentBattles,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(ModalUserBattle);
