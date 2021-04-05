import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useOutsideClick } from 'src/hooks/useOutsideClick';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import { CardCategoryTypes } from 'src/components/molecules/Cards/CardCategory/types';
import FolderIcon from 'src/assets/img/icons/folder.svg';
import './index.scss';

function CardCategory(props: CardCategoryTypes.IProps) {
  const {
    title, totalCards, active, onClick,
    showArrow, onChangeClick, onDeleteClick,
    lastItemRef,
  } = props;
  const [isShowOptions, setShowOptions] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useOutsideClick(optionsRef, () => {
    if (isShowOptions) setShowOptions(false);
  });

  return (
    <div
      ref={lastItemRef}
      className={classNames(
        'card-category px-24 py-16 d-flex align-items-center justify-content-between pos_relative',
        { 'card-category--active' : active },
      )}
      onClick={onClick}
    >
      <div className="d-flex flex-column">
        <Typography variant="subtext" className="d-flex align-items-center">
          <Image alt="" src={FolderIcon} className="card-category__image mr-8" />
          {title}
        </Typography>
        <Typography variant="xxsmall" className="ml-24 mt-4">
          {totalCards} карточки
        </Typography>
      </div>
      <div className="card-category__options pos_relative">
          <div
            className={classNames('options__dots d-flex flex-column', { 'options__dots--active' : isShowOptions })}
            onClick={() => setShowOptions(prevState => !prevState)}
          >
            <div className="dots__item mr-4" />
            <div className="dots__item mr-4" />
            <div className="dots__item" />
          </div>
          {isShowOptions && (
            <div ref={optionsRef} className="options__select py-8 d-flex flex-column pos_absolute">
              <Typography
                variant="text"
                className="select__item px-16 py-8"
                onClick={onChangeClick}
              >
                Изменить
              </Typography>
              <Typography
                variant="text"
                className="select__item px-16 py-8"
                onClick={onDeleteClick}
              >
                Удалить
              </Typography>
            </div>
          )}
      </div>
      {showArrow && (
        <FilterArrow
          isPosAbsolute
          color="#B0BAC9"
          direction="right"
          className="card-category__arrow pos_absolute"
        />
      )}
    </div>
  );
}

export default CardCategory;
