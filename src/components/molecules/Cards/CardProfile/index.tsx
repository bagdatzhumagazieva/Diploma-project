import React from 'react';
import { mapPropsToAttributes } from 'src/core/components';
import { numberToStringWithSpaces } from 'src/utils/format';

import AvatarImage from 'src/components/atoms/AvatarImage';
import Button from 'src/components/atoms/Button';
import Hint from 'src/components/atoms/Hint';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';

import { CardProfileTypes } from 'src/components/molecules/Cards/CardProfile/types';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import 'src/components/molecules/Cards/CardProfile/index.scss';

function CardProfile(props: CardProfileTypes.IProps) {
  const {
    userImage, userName, groups, curPoints, points,
    linkShop, branch, status, companyName, showVerticalLine,
  } = props;
  const attributes = mapPropsToAttributes<CardProfileTypes.IProps>(
    props, 'card-profile',
  );

  const getGroups = (start: number, end?: number) => groups.slice(start, end || groups.length);

  const getGroupsHint = (groups: string[]):JSX.Element => (
    <div className="group__hint d-flex flex-wrap">
      {groups.map((group, index: number) => (
        <Typography
          key={index}
          variant="xsmallmed"
          color="main_50"
          className="hint__item mx-4 mb-8"
        >
          {group}
        </Typography>
      ))}
    </div>
  );

  return (
    <div {...attributes}>
      <div className="card-profile__content d-flex">
        <div className="content__left d-flex mr-44">
          <AvatarImage src={userImage} size={72} className="mr-16" />
          <div className="d-flex flex-column">
            <Typography variant="tag" color="grey_additional_2">{status}</Typography>
            <Typography variant="h1 mb-20">{userName}</Typography>
            <div className="card-profile__group d-flex align-items-center mb-16">
              <Typography variant="subtext" className="mr-8">Филиал:</Typography>
              <Typography
                variant="xsmallmed"
                color="main_50"
                className="group__item mr-8"
              >
                {branch || companyName || '-'}
              </Typography>
            </div>
            <div className="card-profile__group d-flex align-items-center">
              <Typography variant="subtext" className="mr-8">Группы:</Typography>
              {getGroups(0, 3).map((group, index: number) => (
                <Typography
                  key={index}
                  variant="xsmallmed"
                  color="main_50"
                  className="group__item mr-8"
                >
                  {group}
                </Typography>
              ))}
              {groups && groups.length > 3 && (
                <Hint
                  className="card-profile__group-tooltip"
                  hint={getGroupsHint(getGroups(3))}
                  showOnClick
                  placement="right-end"
                >
                  <div className="card-profile__dots ml-12 d-flex align-items-center">
                    <div className="dots__item mr-4" />
                    <div className="dots__item mr-4" />
                    <div className="dots__item" />
                  </div>
                </Hint>
              )}
            </div>
          </div>
        </div>
        {showVerticalLine && <div className="card_profile__vertical-line mr-44"/>}
        <div className="content__right d-flex">
          <div className="card-profile__cur-points">
            <div className="d-flex align-items-center">
              <Image alt="coin icon" src={CoinIcon} classNames="cur-points__image mr-8"/>
              <div className="d-flex flex-column">
                <Typography variant="subtext" color="grey_additional_2">Монет доступно</Typography>
                <Typography variant="h1" color="main">{numberToStringWithSpaces(curPoints)}</Typography>
              </div>
            </div>
            {linkShop && (
              <Button
                disabled
                to={linkShop}
                type="link"
                color="main_55"
                variant="textmed"
                className="mt-16"
              >
                Перейти в магазин
              </Button>
            )}
          </div>
          <div className="card-profile__all-points d-flex flex-column ml-40">
            <Typography variant="subtext" color="grey_additional_2">Всего заработано</Typography>
            <Typography variant="h1">{numberToStringWithSpaces(points)}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
