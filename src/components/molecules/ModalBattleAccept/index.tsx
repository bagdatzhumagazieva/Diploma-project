import React from 'react';
import AvatarImage from 'src/components/atoms/AvatarImage';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import { ReactComponent as BattleIcon } from 'src/assets/img/icons/battle.svg';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import { ModalBattleAcceptTypes } from 'src/components/molecules/ModalBattleAccept/types';
import 'src/components/molecules/ModalBattleAccept/index.scss';

function ModalBattleAccept(props: ModalBattleAcceptTypes.IProps) {

  const { userFullName, rivalUserFullName, rivalUserRole, userRole, unShowInfo,
          userAvatar, rivalUserAvatar } = props;

  return (
    <div className="d-flex flex-column modal-battle px-32">
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-between align-items-center modal-battle__user-battles">
          <div className="modal-battle__user-info d-flex flex-column align-items-center text-center">
            <AvatarImage src={userAvatar} className="mb-8"/>
            <Typography variant="subtext" className="user-info__name mb-4">
              {userFullName}
            </Typography>
            <Typography
              variant="xsmall"
              color="grey_additional_2"
              className="text-overflow"
            >
              {userRole}
            </Typography>
          </div>
          <BattleIcon width={36} height={36}/>
          <div className="modal-battle__user-info d-flex flex-column align-items-center text-center">
            <AvatarImage src={rivalUserAvatar} className="mb-8"/>
            <Typography variant="subtext" className="user-info__name mb-4">
              {rivalUserFullName}
            </Typography>
            <Typography
              variant="xsmall"
              color="grey_additional_2"
              className="text-overflow fill_w"
            >
              {rivalUserRole}
            </Typography>
          </div>
        </div>
      </div>
      {!unShowInfo && (
        <>
          <Typography variant="text" className="mt-40">
            Вызов имеет ограниченное время действия (72 часа). Если вы не примете вызов,
            то приглашение автоматически исчезнет!
          </Typography>
          <div className="d-flex flex-column mt-32">
            <div className="d-flex align-items-center">
              <div className="dots__item" />
              <Typography variant="text" className="ml-8">
                В случае вашей победы, вы получаете:
              </Typography>
              <Typography variant="subtext" color="main_50" className="ml-8">
                +100
                <Image alt="coin icon" className="coin-image ml-4" src={CoinIcon} />
              </Typography>
            </div>
            <div className="d-flex align-items-center mt-24">
              <div className="dots__item" />
              <Typography variant="text" className="ml-8">
                В случае поражения, вы теряете:
              </Typography>
              <Typography variant="subtext" color="main_50" className="ml-8">
                -10
                <Image alt="coin icon" className="coin-image ml-4" src={CoinIcon} />
              </Typography>
            </div>
            <div className="d-flex align-items-center mt-24">
              <div className="dots__item" />
              <Typography variant="text" className="ml-8">
                Количество вопросов:
              </Typography>
              <Typography variant="subtext" color="main_50" className="ml-8">10</Typography>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ModalBattleAccept;
