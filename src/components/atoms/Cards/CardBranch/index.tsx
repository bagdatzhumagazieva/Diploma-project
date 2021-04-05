import React from 'react';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';

import { addAdminSlash } from 'src/routers/AdminRouters';
import { CardBranchTypes, PercentageColor } from 'src/components/atoms/Cards/CardBranch/types';
import 'src/components/atoms/Cards/CardBranch/index.scss';

export const getColorForPercentage = (percentage: number, opacity = 1) => {
  let color = PercentageColor.Green;
  const percent = percentage / 100;

  if (percent >= 0 && percent < 0.25) {
    color = PercentageColor.Red;
  } else if (percent >= 0.25 && percent < 0.5) {
    color = PercentageColor.Yellow;
  } else if (percent >= 0.5 && percent < 0.75) {
    color = PercentageColor.Orange;
  } else if (percent >= 0.75 && percent < 1) {
    color = PercentageColor.Green;
  }

  return `rgba(${color}, ${opacity})`;
};

function CardBranch(props: CardBranchTypes.IProps) {
  const { name, usersCount, percent, branchId, isRootBranch } = props;

  return (
    <Button
      type="plain"
      className="card-branch"
      to={addAdminSlash(`company/${isRootBranch ? 'main' :branchId}`)}
    >
      <Typography
        variant="subtextmed"
        className="d-block card-branch__name"
      >
        {name}
      </Typography>
      <Typography
        variant="xsmall"
        className="d-block mt-4 color_grey_additional_2"
      >
        {usersCount} пользователя
      </Typography>
      <Typography
        variant="xsmall"
        className="card-branch__percent"
        style={{
          background: getColorForPercentage(percent, .2),
          color: getColorForPercentage(percent),
        }}
      >
        {percent} %
      </Typography>
    </Button>
  );
}

export default CardBranch;
