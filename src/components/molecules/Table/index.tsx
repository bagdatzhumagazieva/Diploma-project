import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Checkbox from 'src/components/molecules/Checkbox';
import Loader from 'src/components/atoms/Loader';
import RadioButton from 'src/components/atoms/RadioButton';
import Typography from 'src/components/atoms/Typography';
import MiniArrow from 'src/components/atoms/Svg/Table/MiniArrow';
import EmptyDataContainer from 'src/components/atoms/EmptyDataContainer';
import { CheckboxStateTypes } from 'src/components/molecules/Checkbox/types';
import { SortDirection, TableTypes } from './types';
import './index.scss';

export type TableWithCheckboxes<T extends {}> = T & {
  isChecked?: boolean;
};

function Table<T>(props: TableTypes.IProps<TableWithCheckboxes<T>>) {
  const {
    checkbox, radio, loading, headerData, bodyData, wrapperClassName,
    onCheckboxChange, onRadioChange, onSort: onPropsSort, lastItemRef, emptyDataDescription,
  } = props;
  const [sortData, setSortData] = useState<T[]>([]);
  const [activeSort, setActiveSort] = useState<TableTypes.IActiveSort>({ sortDirection: SortDirection.Default });
  const [headerCheckboxState, setHeaderCheckboxState] = useState<CheckboxStateTypes>(CheckboxStateTypes.Unchecked);

  useEffect(
    () => {
      setSortData(bodyData);
      setHeaderCheckboxState(bodyData.some(
        (n: TableWithCheckboxes<T>) => n.isChecked) ? CheckboxStateTypes.Indeterminate : CheckboxStateTypes.Unchecked,
      );
      if (bodyData && bodyData.length && bodyData.every((n: TableWithCheckboxes<T>) => n.isChecked)) {
        setHeaderCheckboxState(CheckboxStateTypes.Checked);
      }
    },
    [bodyData],
  );

  const onClickSort = (sortCallBack: any, index: number) => () => {
    const { sortDirection, index: sortIndex } = activeSort;

    const sortRows = (sortedData: T[], sortedIndex: number | undefined, sortedDirection: SortDirection) => {
      setSortData(sortedData);
      setActiveSort({
        sortDirection: sortedDirection,
        index: sortedIndex,
      });
    };

    if (sortIndex === index) {
      if (sortDirection === SortDirection.Default) {
        sortRows(bodyData.slice().sort(sortCallBack), index, SortDirection.Ascend);
      }
      if (sortDirection === SortDirection.Ascend) {
        sortRows(sortData.reverse(), index, SortDirection.Descend);
      }
      if (sortDirection === SortDirection.Descend) {
        sortRows(bodyData, undefined, SortDirection.Default);
      }
    } else {
      sortRows(bodyData.slice().sort(sortCallBack), index, SortDirection.Ascend);
    }
  };

  const onSort = (column: string, index: number) => () => {
    const { sortDirection, value } = activeSort;

    const sortRows = (column: string, sortedDirection: SortDirection, index?: number) => {
      setActiveSort(
        {
          index,
          sortDirection: sortedDirection,
          value: column,
        });
      onPropsSort && onPropsSort(column, sortedDirection);
    };

    if (value === column) {
      if (activeSort.sortDirection === SortDirection.Default) {
        sortRows(column, SortDirection.Ascend, index);
      }
      if (sortDirection === SortDirection.Ascend) {
        sortRows(column, SortDirection.Descend, index);
      }
      if (sortDirection === SortDirection.Descend) {
        sortRows(column, SortDirection.Default, undefined);
      }
    } else {
      sortRows(column, SortDirection.Ascend, index);
    }
  };

  const onCheckboxSelected = (index: number) => (state: boolean) => {
    const updatedDate = sortData.map((n: TableWithCheckboxes<T>, i) => ({
      ...n, isChecked: i === index ? state : n.isChecked,
    }));
    onCheckboxChange && onCheckboxChange(updatedDate);
  };

  const onRadioSelect = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDate = sortData.map((n: TableWithCheckboxes<T>, i) => ({
      ...n, isChecked: i === index,
    }));
    if (onRadioChange) {
      onRadioChange(updatedDate);
    }
  };

  const onCheckBoxAllSelected = (state: boolean) => {
    const updatedDate = sortData.map(n => ({ ...n, isChecked: state }));
    setHeaderCheckboxState(state ? CheckboxStateTypes.Checked : CheckboxStateTypes.Unchecked);
    onCheckboxChange && onCheckboxChange(updatedDate);
  };

  if (loading) {
    return <div className={classNames('empty-data-container d-flex justify-content-center align-items-center flex-column', wrapperClassName)}>
      <Loader size={40} />
    </div>;
  }

  return (
    <div className={classNames('table-wrapper' , wrapperClassName)}>
      <table className={classNames([
        'table',
        props.classNames,
      ])}>
        <colgroup>
          {(checkbox || radio) && <col style={{ width: '56px', minWidth: '56px' }}/>}
          {headerData.map((n: TableTypes.IHeaderData) => (
            <col key={n.key} style={{ width: n.width, minWidth: n.width, textAlign: n.textAlign }}/>
          ))}
        </colgroup>
        <thead className="table__header">
          <tr className="header__row">
            {checkbox && (
              <th className="header__cell header--checkbox">
                <Checkbox
                  indeterminate={CheckboxStateTypes.Indeterminate === headerCheckboxState}
                  isClicked={CheckboxStateTypes.Checked === headerCheckboxState}
                  setClicked={onCheckBoxAllSelected}
                />
              </th>
            )}
            {radio && (
              <th className="header__cell header--radio" />
            )}
            {headerData.map((n: TableTypes.IHeaderData, i: number) => (
              <th
                key={i}
                style={{ ...n.fixed || {}, textAlign: n.textAlign }}
                className={classNames([
                  `header__cell header--${n.key}`,
                  { 'header__cell--active': i === activeSort.index },
                  { 'header__cell--fixed': n.fixed },
                  { [`header__cell--fixed--${n.fixed && n.fixed.final}`]: n.fixed && n.fixed.final },
                ])}
                onClick={
                  n.localSort
                    ? onClickSort(n.localSort , i)
                    : (n.sort ? onSort(n.key, i) : undefined)}
              >
                <div className="d-flex align-items-center">
                  <Typography variant="subtextmed">{n.name}</Typography>
                  {(n.localSort || n.sort) && (
                    <div
                      className="d-flex flex-column ml-8"
                    >
                      <MiniArrow
                        active={i === activeSort.index && activeSort.sortDirection === SortDirection.Ascend}
                        direction="up"
                      />
                      <MiniArrow
                        className="mt-4"
                        active={i === activeSort.index && activeSort.sortDirection === SortDirection.Descend}
                        direction="down"
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__content">
          {sortData.map((n: TableWithCheckboxes<T>, i: number) =>
            <tr
              key={i}
              className="content__row"
              ref={sortData.length - 1 === i ? lastItemRef : null}
            >
              {checkbox && (
                <td
                  className={classNames(
                    'content__cell', 'content__cell--checkbox',
                    { 'content__cell--selected': n.isChecked },
                  )}
                >
                  <Checkbox
                    isClicked={n.isChecked || false}
                    setClicked={onCheckboxSelected(i)}
                  />
                </td>
              )}
              {radio && (
                <td
                  className={classNames(
                    'content__cell', 'content__cell--radio',
                    { 'content__cell--selected': n.isChecked },
                  )}
                >
                  <RadioButton
                    name="content__radio"
                    value={`content__radio--${i}`}
                    isChecked={!!n.isChecked}
                    setClicked={onRadioSelect(i)}
                  />
                </td>
              )}
              {headerData.map((j: TableTypes.IHeaderData, i: number) => {
                const headerColFixed = headerData[i] && headerData[i].fixed;
                const headerColFixedFinal = headerColFixed && headerColFixed.final;
                return (
                  <td
                    key={i}
                    style={{
                      ...headerData[i].fixed || {},
                      textAlign: headerData[i].textAlign,
                      width: headerData[i].width,
                      minWidth: headerData[i].width,
                      maxWidth: headerData[i].width,
                    }}
                    className={classNames(['content__cell',
                      { 'content__cell--active': i === activeSort.index },
                      { 'content__cell--selected': n.isChecked },
                      { 'content__cell--fixed content__cell--fixed': headerData[i].fixed },
                      { [`content__cell--fixed content__cell--fixed--${headerColFixedFinal}`]: headerColFixedFinal },
                    ])}
                  >
                    {j.render && j.render(n)}
                  </td>
                );
              })}
            </tr>,
          )}
        </tbody>
      </table>
      {(!bodyData || bodyData.length === 0) &&
        <EmptyDataContainer
          description={emptyDataDescription || 'Нет данных'}
          className="mt-4"
        />
      }
    </div>
  );
}

export default Table;
