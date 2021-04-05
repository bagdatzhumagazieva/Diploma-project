import React from 'react';
import { getTime } from 'src/utils/format';
import BattleUserResult from 'src/components/molecules/BattleResults/BattleUserResult';
import Typography from 'src/components/atoms/Typography';
import { ReactComponent as BattleIcon } from 'src/assets/img/icons/battle.svg';
import { BattleResultsTypes } from 'src/components/molecules/BattleResults/types';
import 'src/components/molecules/BattleResults/index.scss';

function BattleResults(props: BattleResultsTypes.IProps) {

  const { questionNumber, firstUserResult, secondUserResult, curQuestionPos, usersData,
          donePercent, time, avatar1, avatar2 } = props;

  return (
    <div className="battle-results__card">
      <div className="d-flex w-100 justify-content-between">
        <BattleUserResult
          curPosition={curQuestionPos}
          userResult={firstUserResult}
          avatar={avatar1}
          count={questionNumber}
          name={usersData?.firstEmployeeName || ''}
          position={usersData?.firstUserRole || ''}
        />
        <BattleIcon width="36px" height="36px" className="mt-20"/>
        <BattleUserResult
          avatar={avatar2}
          curPosition={curQuestionPos}
          userResult={secondUserResult}
          count={questionNumber}
          name={usersData?.secondEmployeeName || ''}
          position={usersData?.secondUserRole || ''}
        />
      </div>
      <div className="d-flex flex-column mt-32">
        <Typography variant="subtext" color="grey_additional_2">
          Время:&nbsp;
          <Typography variant="text" color="main_50">
            {getTime(time)}
          </Typography>
        </Typography>
        <Typography variant="subtext" color="grey_additional_2">
          Оценка:&nbsp;
          <Typography variant="text" color="main_50">
            {donePercent}%
          </Typography>
        </Typography>
      </div>
    </div>
  );
}

export default BattleResults;
