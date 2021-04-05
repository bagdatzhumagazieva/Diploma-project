import React from 'react';
import classNames from 'classnames';
import { numberToStringWithSpaces } from 'src/utils/format';

import Typography from 'src/components/atoms/Typography';

import { CardTotalAmountBranchesTypes } from 'src/components/atoms/Cards/CardTotalAmountBranches/types';
import 'src/components/atoms/Cards/CardTotalAmountBranches/index.scss';

function CardTotalAmountBranches(props: CardTotalAmountBranchesTypes.IProps) {
  return (
    <div className={classNames(
      'total-amount-branches p-16 color_whiter__bg', props.classNames,
    )}>
      <Typography variant="textmed" className="mb-24">Общий балл филиалов:</Typography>
      {props.branches.map(branch => (
        <div key={branch.name} className="total-amount-branches__item d-flex justify-content-between align-items-center mb-16">
          <Typography variant="subtext">{branch.name}</Typography>
          <Typography variant="subtextmed" color="main_50">{numberToStringWithSpaces(branch.amount)}</Typography>
        </div>
      ))}
    </div>
  );
}

export default CardTotalAmountBranches;
