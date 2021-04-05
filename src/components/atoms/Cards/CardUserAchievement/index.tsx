import React from 'react';
import { mapPropsToAttributes } from 'src/core/components';
import { numberToStringWithSpaces } from 'src/utils/format';

import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';

import { CardUserAchievementTypes } from 'src/components/atoms/Cards/CardUserAchievement/types';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import 'src/components/atoms/Cards/CardUserAchievement/index.scss';

function CardUserAchievement(props: CardUserAchievementTypes.IProps) {
  const { icon, title, subtitle, coins, lastItemRef } = props;
  const attributes = mapPropsToAttributes<CardUserAchievementTypes.IProps>(
    props, 'card-user-achievement', 'pt-24 pb-16 px-16', 'd-flex flex-column justify-content-between',
  );

  return (
    <div {...attributes} ref={lastItemRef}>
      <div className="d-flex flex-column align-items-center">
        <Image
          alt="achievement icon"
          src={icon}
          classNames="card-user-achievement__image mb-16"
        />
        <Typography variant="h2" classNames="mb-4 text-center">{title}</Typography>
        <Typography variant="subtext" color="grey_additional_2" classNames="mt-2 text-center">{subtitle}</Typography>
      </div>
      <Typography
        variant="h1"
        color="main_50"
        classNames="card-user-achievement__coins text-center"
      >
        +{coins > 9999 ? numberToStringWithSpaces(coins) : coins}
        <Image alt="coin icon" src={CoinIcon} classNames="coins__image ml-4"/>
      </Typography>
    </div>
  );
}

export default CardUserAchievement;
