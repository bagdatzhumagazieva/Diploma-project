import React, { useCallback } from 'react';
import { numberToStringWithSpaces, parseNumberToStringWithComma } from 'src/utils/format';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import IconCertificate from 'src/components/atoms/IconCertificate';
import Image from 'src/components/atoms/Image';
import Rate from 'src/components/atoms/Rate';
import ProgressBar from 'src/components/atoms/ProgressBar';
import Members from 'src/components/atoms/Svg/Icons/members';
import CardBadge from 'src/components/atoms/Cards/CardBadge';

import ClockIcon from 'src/assets/img/icons/clock.svg';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import { ACTIONS } from 'src/components/organisms/CourseDetail/Actions';
import { GameDetailTypes } from 'src/components/molecules/GameDetail/types';
import { IActionData } from 'src/components/organisms/CourseDetail/types';
import { Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';
import { Status } from 'src/store/course/types';
import 'src/components/molecules/GameDetail/index.scss';

function GameDetail(props: GameDetailTypes.IProps) {
  const {
    imageUrl, cntLevels, name, rewardAmount, status = Status.DRAFT,
    description, passedLevels, leaders, variant,
    cntPassedLevels = 0, minutesToFinish = 0, numberOfViews = 0, rating = 0, progress,
    modeActions, id,
  } = props;
  const background = { backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' };
  const isFinished = cntPassedLevels === cntLevels;

  const onClickModeAction = useCallback(
      (mode: Action) => {
        modeActions && modeActions(mode, id, name);
      },
      [id, name],
  );

  return (
    <div className="game-detail">
      <div className="game-detail__header pos_relative" style={background} />
      <div className="game-detail__content d-flex p-48">
        <div className="game-detail__left">
          <div className="game-detail__image-wrapper mr-24 pos_relative">
            <Image alt="image game" src={imageUrl} className="game-detail__image fill"/>
            {variant === 'web' && isFinished && <IconCertificate className="game-detail__certificate pos_absolute"/>}
          </div>
          {variant === 'admin' && (
            <div className="mt-40">
              {ACTIONS(status === Status.DRAFT).map((e: IActionData, index: number) => (
                <div
                  key={index}
                  className="d-flex cursor-pointer mb-24"
                  onClick={() => onClickModeAction(e.mode)}
                >
                  {e.iconJSX}
                  <Typography variant="subtext" color={e.color} className="ml-4">
                    {e.title}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="game-detail__right d-flex flex-column flex-grow-1">
          <div className="mt-2 mb-12 d-flex align-items-center">
            <Rate />
            <Typography variant="text" className="ml-4 mt-2">{parseNumberToStringWithComma(rating || 0)}</Typography>
          </div>
          <Typography className="game-detail__title mb-8" variant="h1">{name}</Typography>
          <ProgressBar percent={(progress) || 0} label="пройдено" />
          <Typography variant="subtext" className="game-detail__description mt-8 mb-12">{description}</Typography>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div className="game-detail__players d-flex align-items-center mr-20">
                <Members className="mr-4" />
                <Typography
                  variant="subtextmed"
                  color="grey_additional_2"
                  className="ml-2"
                >
                  {numberToStringWithSpaces(numberOfViews)}
                </Typography>
              </div>
              <CardBadge icon={ClockIcon} title={`${minutesToFinish} мин.`} />
            </div>
            <div className="d-flex align-items-center">
              <Typography variant="h2" color="main_50">+{rewardAmount}</Typography>
              <Image alt="coin image" src={CoinIcon} className="game-detail__coin-icon ml-4 mr-40"/>
              <Button disabled={variant !== 'web'} type="rounded" variant="h2">Играть</Button>
            </div>
          </div>

          <div className="d-flex justify-content-start mt-48">
            <div className="game-detail__block d-flex flex-column mr-32">
              <Typography variant="h2" className="mb-24">Пройденные уровни</Typography>
              {passedLevels && passedLevels.map((item, i) => (
                <div key={i} className="game-detail__passed-levels d-flex flex-column align-items-start mb-12">
                  <Typography variant="xxsmall" color="grey_additional_2">{item.levelNum} уровень</Typography>
                  <Button type="link" variant="xsmallmed">{item.title}</Button>
                </div>
              ))}
            </div>
            <div className="game-detail__block d-flex flex-column">
              <Typography variant="h2" className="mb-24">Лидеры</Typography>
              {leaders && leaders.map(item => (
                <div key={item.userName} className="game-detail__leader d-flex mb-16">
                  <div className="leader__image mr-10" style={{ backgroundImage: `url(${item.userImage})` }} />
                  <div className="d-flex flex-column align-items-start">
                    <Typography variant="xxsmall" color="grey_additional_2">{item.rank}</Typography>
                    <Typography variant="xsmallmed">{item.userName}</Typography>
                    <Typography className="leader__coin" variant="xxsmall">{item.coins || 0}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
