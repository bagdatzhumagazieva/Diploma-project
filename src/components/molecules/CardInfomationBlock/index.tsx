import React from 'react';
import classNames from 'classnames';

import Image from 'src/components/atoms/Image';
import { ReactComponent as MenuIcon } from 'src/assets/img/icons/menu.svg';
import Typography from 'src/components/atoms/Typography';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';

import { ReactComponent as EditIcon } from 'src/assets/img/icons/edit.svg';
import { CardInformationBlockTypes } from 'src/components/molecules/CardInfomationBlock/types';
import 'src/components/organisms/CourseCreationEdition/Content/index.scss';

function CardInformationBlock(props: CardInformationBlockTypes.IProps) {
  const {
    className, name, onDeleteClick, imageThumbnailUrl,
    id, disabled, onEditClick, index,
  } = props;

  return (
    <div className={classNames('card d-flex align-items-center py-16 pl-16 pr-64 pos_relative', className)}>
      <MenuIcon className={classNames('card__menu-icon mr-16', { handle: !disabled })} />
      <Image alt="card icon" src={imageThumbnailUrl} className="card__image mr-16" />
      <Typography variant="subtext" className="card__title">{name}</Typography>
      {!disabled && (
        <>
          <EditIcon
            className="card__icon card__icon--edit cursor-pointer pos_absolute"
            onClick={() => onEditClick && onEditClick(id, index)}
          />
          <CancelIcon
            color="#7A7B82"
            className="card__icon cursor-pointer pos_absolute"
            onClick={() => onDeleteClick && onDeleteClick(id)}
          />
        </>
      )}
    </div>
  );
}

export default CardInformationBlock;
