import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { mapPropsToAttributes } from 'src/core/components';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

import Image from 'src/components/atoms/Image';
import CardInputSearcher from 'src/components/atoms/Cards/CardInputSearcher';

import { addSlash } from 'src/core/components/router';
import { RouterPaths } from 'src/core/enum';
import searchActions from 'src/store/search/actions';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { SearcherTypes } from 'src/components/molecules/InputSearcher/types';
import SearchIcon from 'src/assets/img/icons/search.svg';
import { LOCAL_STORAGE } from 'src/core/store/values';
import 'src/components/molecules/InputSearcher/index.scss';

function InputSearcher(props: SearcherTypes.IProps) {
  const { searchGlobal, searchedEntities } = props;
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [inputActive, setInputActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const attributes = mapPropsToAttributes<SearcherTypes.IProps>(
    props, 'searcher', 'pos_relative',
    { 'searcher--focus': inputFocus },
    { 'searcher--active': inputActive },
    );

  const handleInputFocus = (inputActive: boolean) => () => setInputFocus(inputActive);

  const getEntityType = (type: string) => {
    return type === 'EXERCISE' ? 'Задания' : type === 'COURSE' ? 'Курсы' : 'Игроки';
  };

  const getEntityLink = (type: string, id: number) => {
    const path = type === 'EXERCISE' ? `${RouterPaths.TASKS_FEED}/${id}` :
      type === 'COURSE' ? `${RouterPaths.COURSE}/${id}` : RouterPaths.RATING;
    return addSlash(path);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchGlobal && searchGlobal(+companyId, value);
    value.length > 0 ? setInputActive(true) : setInputActive(false);
  };

  useOutsideClick(inputRef, () => {
    if (inputActive) setInputActive(false);
  });

  return (
    <div {...attributes} ref={inputRef}>
      <div className="searcher__input-wrapper d-flex align-items-center fill_w fill_h">
        <Image alt="searcher icon" src={SearchIcon} classNames="searcher__icon mr-12"/>
        <input
          placeholder="Поиск"
          className="searcher__input fill_w"
          onFocus={handleInputFocus(true)}
          onBlur={handleInputFocus(false)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
        />
      </div>
      <div className="searcher__result mt-8 pt-8 pos_absolute fill_w">
        {searchedEntities?.entities && searchedEntities.entities.length === 0 ?
          <CardInputSearcher title="Ничего не найдено" link=""/> :
          searchedEntities?.entities.map((card, i) => (
          <CardInputSearcher
            key={i}
            classNames="stories_card-input-searcher"
            type={getEntityType(card.entityType)}
            link={getEntityLink(card.entityType, card.entityId)}
            title={card.name || ''}
            imgSrc={card.imageThumbnailUrl || ''}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  searchedEntities: state.searchReducer.searchedGlobal.data,
});

const mapDispatchToProps = {
  searchGlobal: searchActions.searchGlobal,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(InputSearcher);
