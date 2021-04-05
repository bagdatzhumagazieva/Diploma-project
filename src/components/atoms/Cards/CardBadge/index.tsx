import React from 'react';
import classNames from 'classnames';

import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';

import { CardBadgeTypes } from 'src/components/atoms/Cards/CardBadge/types';
import 'src/components/atoms/Cards/CardBadge/index.scss';

function CardBadge(props: CardBadgeTypes.IProps) {
  const { icon, title, className } = props;

  return (
    <div className={classNames('badge d-flex align-items-center', className)}>
      <Image alt="badge icon" src={icon} className="badge__image" />
      <Typography variant="subtext" color="grey_additional_2" className="badge__title">{title}</Typography>
    </div>
  );
}

export default CardBadge;
