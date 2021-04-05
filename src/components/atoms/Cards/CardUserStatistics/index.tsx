import React from 'react';
import { mapPropsToAttributes } from 'src/core/components';

import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';

import { CardUserStatisticsTypes } from 'src/components/atoms/Cards/CardUserStatistics/types';
import 'src/components/atoms/Cards/CardUserStatistics/index.scss';

function CardUserStatistics(props: CardUserStatisticsTypes.IProps) {
  const { icon, value, title } = props;
  const attributes = mapPropsToAttributes<CardUserStatisticsTypes.IProps>(
    props, 'card-user-statistics', 'd-flex',
  );

  return (
    <div {...attributes}>
      <Image
        alt="card user statistics icon"
        className="card-user-statistics__image"
        src={icon}
      />
      <div className="d-flex flex-column ml-12">
        <Typography variant="h1" className="mb-4">{value}</Typography>
        <Typography variant="subtext" >{title}</Typography>
      </div>
    </div>
  );
}

export default CardUserStatistics;
