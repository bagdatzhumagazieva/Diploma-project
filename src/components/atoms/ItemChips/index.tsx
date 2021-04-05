import React from 'react';
import classNames from 'classnames';

import Typography from 'src/components/atoms/Typography';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';

import { ItemChipsTypes } from 'src/components/atoms/ItemChips/types';
import 'src/components/atoms/ItemChips/index.scss';

function ItemChips(props: ItemChipsTypes.IProps) {
  const { title, id, className, onDeleteClick } = props;

  return (
    <div className={classNames('item-chips py-4 px-12 d-flex align-items-center', className)}>
      <Typography variant="text">#{title}</Typography>
      <CancelIcon
        className="item-chips__delete-icon ml-12 cursor-pointer"
        color="#7A7B82"
        onClick={() => onDeleteClick && onDeleteClick(id)}
      />
    </div>
  );
}

export default ItemChips;
