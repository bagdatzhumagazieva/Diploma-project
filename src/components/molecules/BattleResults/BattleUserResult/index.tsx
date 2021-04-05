import React from 'react';
import classNames from 'classnames';
import AvatarImage from 'src/components/atoms/AvatarImage';
import Typography from 'src/components/atoms/Typography';
import { BattleUserResultProps } from 'src/components/molecules/BattleResults/BattleUserResult/types';
import 'src/components/molecules/BattleResults/BattleUserResult/index.scss';
import { ROLES_OPTIONS } from 'src/core/store/values';

function BattleUserResult(props: BattleUserResultProps) {
  const { name, position, count, userResult, curPosition = 0, avatar } = props;
  return (
    <div className="d-flex flex-column align-items-center">
      <AvatarImage src={avatar} className="mb-8" />
      <Typography variant="subtext" color="main_50" className="mb-4">
          {name}
      </Typography>
      <Typography variant="xsmall" color="grey_additional_2">
          {ROLES_OPTIONS.find(e => e.value === position)?.name || ''}
      </Typography>
        {[...Array(count)].map((item, index) => (
          <div className={classNames([
            'battle-results__questions',
            { 'question-correct': userResult.length && userResult[index]?.isCorrect && index < curPosition },
            { 'question-incorrect': userResult.length && userResult[index] !== undefined &&
                !userResult[index]?.isCorrect && index < curPosition },
          ])}>
            {index + 1}
          </div>
        ))}
    </div>
  );
}

export default BattleUserResult;
