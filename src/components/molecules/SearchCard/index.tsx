import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import useDebounce from 'src/hooks/useDebounce';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import Loader from 'src/components/atoms/Loader';

import { SearchCardTypes } from 'src/components/molecules/SearchCard/types';
import { DEFAULT_CARD_VALUES } from 'src/components/molecules/SearchCard/consts';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';
import { ReactComponent as SearchIcon  } from 'src/assets/img/icons/search.svg';
import 'src/components/molecules/SearchCard/index.scss';

function SearchCard(props: SearchCardTypes.IProps) {
  const {
    options, getSearchedKeyword, getSelectedCard,
    lastItemCardRef, loading = false, title = 'Выберите объект',
  } = props;
  const [selectedCard, setSelectedCard] = useState<ICard>(DEFAULT_CARD_VALUES);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const ref = useRef<HTMLDivElement>(null);

  const onSearchCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowOptions(prevState => !prevState);
  };

  const onOptionClick = (event: React.MouseEvent<HTMLDivElement>, item: ICard)  => {
    setShowOptions(false);
    setSelectedCard(item);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(
    () => {
      getSearchedKeyword && getSearchedKeyword(debouncedSearchValue);
    },
    [debouncedSearchValue],
  );

  useEffect(
    () => {
      if (!selectedCard.id) return;
      getSelectedCard && getSelectedCard(selectedCard);
    },
    [selectedCard],
  );

  useOutsideClick(ref, () => {
    if (showOptions) setShowOptions(false);
  });

  return (
    <div
      ref={ref}
      className="search-card pos_relative"
    >
      <div className="d-flex align-items-center px-16 py-12" onClick={onSearchCardClick}>
        <Image
          alt="card image"
          src={selectedCard.imageThumbnailUrl || ''}
          className="search-card__image mr-16"
        />
        <Typography variant="text text-overflow">{selectedCard.name || title}</Typography>
      </div>
      {showOptions && (
        <div className="search-card__content pt-16 pb-8 mt-8">
          <Input
            type="text"
            classNames="search-card__input px-16 mb-8"
            placeholder="Название"
            icon={<SearchIcon />}
            onChange={onInputChange}
          />
          <div className="search-card__options">
            {options.length > 0 ? options.map((item, index) => (
              <div
                key={item.id || ''}
                className={classNames(
                  'options__item py-8 px-16 d-flex align-items-center cursor-pointer',
                  { 'options__item--active': item.id === selectedCard.id },
                )}
                onClick={e => onOptionClick(e, item)}
                ref={index === options.length - 1 ? lastItemCardRef : null}
              >
                <Image
                  alt="card image"
                  src={item.imageThumbnailUrl || ''}
                  className="item__image mr-16"
                />
                <Typography
                  variant="text"
                  className="text-overflow"
                >
                  {item.name || 'Название отсутствует'}
                </Typography>
              </div>
            )) : (
              <Typography variant="text" className="py-8 px-16">Ничего не найдено</Typography>
            )}
            {loading && (
             <Loader />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchCard;
