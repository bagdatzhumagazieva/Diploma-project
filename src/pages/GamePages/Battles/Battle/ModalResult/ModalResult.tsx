import React, { useEffect, useState } from 'react';
import Typography from 'src/components/atoms/Typography';
import AvatarImage from 'src/components/atoms/AvatarImage';
import Image from 'src/components/atoms/Image';

import { BattleModalTypes, IOption } from 'src/pages/GamePages/Battles/Battle/ModalResult/types';

import { ReactComponent as BattleIcon } from 'src/assets/img/icons/battle.svg';
import { ReactComponent as Coin } from 'src/assets/img/icons/coin.svg';

import { getTime } from 'src/utils/format';
import { ROLES_OPTIONS } from 'src/core/store/values';
import { BattleTypes } from 'src/pages/GamePages/Battles/Battle/ModalResult/mock';
import 'src/pages/GamePages/Battles/Battle/ModalResult/index.scss';

function ModalResult(props: BattleModalTypes.IProps) {

  const { type, firstEmployeeName, firstUserRole, secondEmployeeName, secondUserRole, donePercent,
          time, avatar1, avatar2 } = props;
  const [data, setData] = useState<IOption>();

  useEffect(() => {
    if (type === 'win') {
      setData({ ...BattleTypes[0], time, grade: donePercent });
    } else if (type === 'lose') {
      setData({ ...BattleTypes[1], time, grade: donePercent });
    } else {
      setData({ ...BattleTypes[2], time, grade: donePercent });
    }
  },        [type]);

  return (
    <div className="px-32 py-24">
      <Typography variant="h1" color="black">
        {data?.title || '-'}
      </Typography>
      <div className="d-flex justify-content-around pt-40 pb-32 px-40">
        <div className="d-flex flex-column align-items-center">
          <AvatarImage src={avatar1} className="mb-8" />
          <Typography variant="subtext" color="main_50" className="mb-4">
            {firstEmployeeName || ''}
          </Typography>
          <Typography variant="xsmall" color="grey_additional_2">
            {ROLES_OPTIONS.find(e => e.value === firstUserRole)?.name || ''}
          </Typography>
        </div>
        <BattleIcon width="36px" height="36px" className="mt-20"/>
        <div className="d-flex flex-column align-items-center">
          <AvatarImage src={avatar2} className="mb-8" />
          <Typography variant="subtext" color="main_50" className="mb-4">
            {secondEmployeeName || ''}
          </Typography>
          <Typography variant="xsmall" color="grey_additional_2">
            {ROLES_OPTIONS.find(e => e.value === secondUserRole)?.name || ''}
          </Typography>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Typography variant="h1" color="main_50">
          {data?.coins || ''}
        </Typography>
        {data && data.coins && <Coin width="14px" height="14px" className="pl-4"/>}
      </div>
      <div className="d-flex justify-content-center">
        <Image alt="battle" src={data && data.image}/>
      </div>
      <Typography variant="textmed" color="black" className="mt-24">
        {data?.description || '-'}
      </Typography>
      <div className="d-flex flex-column mt-16">
        {data && data.time && (
          <div>
            <div className="mb-11">
              <Typography variant="subtext" color="grey_additional_2">
                Время:&nbsp;
                <Typography variant="text" color="main_50">
                  {getTime(data.time)}
                </Typography>
              </Typography>
            </div>
            <div>
              <Typography variant="subtext" color="grey_additional_2">
                Оценка:&nbsp;
                <Typography variant="text" color="main_50">
                  {data.grade} %
                </Typography>
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalResult;
