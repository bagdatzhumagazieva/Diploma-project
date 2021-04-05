import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import useDebounce from 'src/hooks/useDebounce';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

import { createTag } from 'src/store/tag/actions';

import Typography from 'src/components/atoms/Typography';
import Loader from 'src/components/atoms/Loader';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import { SearchChipsTypes } from 'src/components/molecules/SeacrhChips/types';
import 'src/components/molecules/SeacrhChips/index.scss';

function SearchChips(props: SearchChipsTypes.IProps) {
  const {
    onSearchValueChange, results = [], className, setSelectedIds, createTag,
    lastItemRef, loading, initialValues, disabled, companyId,
  } = props;
  const inputId = 'search-chips';
  const ref = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState<string>('');
  const setArrayValuesToMap = (values: SearchChipsTypes.IData[]) => new Map(values.map(n => [n.id, n.name]));

  useEffect(
    () => {
      initialValues && setSelectedValues(setArrayValuesToMap(initialValues));
    },
    [initialValues],
  );

  const [selectedValues, setSelectedValues] =
    useState<Map<number, string>>(setArrayValuesToMap(initialValues || []));

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useOutsideClick(ref, () => {
    if (searchValue.length > 0) setSearchValue('');
  });

  const onChipsContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const element = document.getElementById(inputId) as HTMLInputElement;
    if (element) {
      element.focus();
      element.setSelectionRange(element.value.length, element.value.length);
    }
  };

  const onResultClick = (id: number, value: string) => {
    const newValues  = new Map(selectedValues);
    newValues.set(id, value);
    setSearchValue('');
    setSelectedValues(newValues);
    setSelectedIds && setSelectedIds(Array.from(newValues).map(([id, name]) => ({ id, name })));
    const element = document.getElementById(inputId) as HTMLInputElement;
    if (element) {
      element.focus();
      element.setSelectionRange(element.value.length, element.value.length);
    }
  };

  const onDeleteClick = (id: number) => {
    const newValues  = new Map(selectedValues);
    newValues.delete(id);
    setSelectedValues(newValues);
    setSelectedIds && setSelectedIds(Array.from(newValues).map(([id, name]) => ({ id, name })));
  };

  const onCreateButtonClick = () => {
    createTag && createTag(companyId, debouncedSearchValue, {
      onSuccess: (response: any) => {
        const { data } = response?.createdTagState;
        onResultClick(data?.id, data?.name);
      },
    });
  };

  const ifDataExistInResult = () => {
    return Array.isArray(results) && results.length > 0 && results.some(item => item.name === debouncedSearchValue);
  };

  useEffect(
    () => {
      debouncedSearchValue.length > 0 && onSearchValueChange && onSearchValueChange(debouncedSearchValue);
    },
    [debouncedSearchValue],
  );

  return (
    <div
      ref={ref}
      className={classNames(
        'search-chips pos_relative', className,
        { 'search-chips--disable': disabled },
      )}
    >
      <div
        className="search-chips__content d-flex align-items-center flex-wrap px-16"
        onClick={onChipsContentClick}
      >
        {Array.from(selectedValues.entries()).map(key => (
          <div
            key={`search-chips-result-${key[0]}`}
            className={classNames(
              'search-chips__cur-values mr-8 d-flex align-items-center px-8',
            )}
          >
            <Typography
              variant="xsmall"
              className="mr-8"
            >
              {key[1]}
            </Typography>
            <CancelIcon
              className="cur-values__delete cursor-pointer"
              color="#7A7B82"
              onClick={() => onDeleteClick(key[0])}
            />
          </div>
        ))}
        <input
          id={inputId}
          value={searchValue}
          type="text"
          className="search-chips__input"
          size={searchValue.length + 5}
          onChange={onSearchChange}
        />
      </div>
      {debouncedSearchValue.length > 0 && (
        <div className="search-chips__results pos_absolute fill_w mt-8 py-8 d-flex flex-column cursor-pointer">
          {!ifDataExistInResult() && createTag && (
            <div
              className={classNames('results__item py-8 px-16')}
              onClick={onCreateButtonClick}
            >
              <Typography
                variant="text"
              >
                Добавить тег - "{debouncedSearchValue}"
              </Typography>
            </div>
          )}
          <div>
            {results.length > 0 && results.map((item, index) => (
              <div
                className={classNames(
                  'results__item py-8 px-16 cursor-pointer',
                  { 'results__item--disable' : selectedValues.has(item.id) },
                )}
                key={`search-chips-${item.id}`}
                ref={index === results.length - 1 ? lastItemRef : null}
                onClick={() => onResultClick(item.id, item.name)}
              >
                <Typography
                  variant="text"
                >
                  #{item.name}
                </Typography>
              </div>
            ))}
          </div>
          {results.length < 1 && !loading && (
            <Typography
              variant="text"
              className="results__item py-8 px-16"
            >
              Нет результатов
            </Typography>
          )}
          {loading && <Loader className="py-4" />}
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  createTag,
};

export default connect<any>(
  null,
  mapDispatchToProps,
)(SearchChips);
