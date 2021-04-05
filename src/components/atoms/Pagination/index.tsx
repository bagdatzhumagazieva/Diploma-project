import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import PageButton from 'src/components/atoms/PageButton';
import More from 'src/components/atoms/Svg/Table/More';

import { PaginationTypes } from 'src/components/atoms/Pagination/types';

function Pagination(props: PaginationTypes.IProps) {
  const { total, onGetPage, pageSize: propsPageSize = 10, className, page } = props;
  const pageSize = Math.ceil(total / propsPageSize);
  const middleNumber = pageSize - 3;

  const [current, setCurrent] = useState<number>(1);
  const [active, setActive] = useState<number>(1);

  useEffect(() => {
    page && setActive(page);
  },        [page]);

  const onClickPage = (page: number) => () => {
    if (pageSize > 6) {
      if ((page + 4) <= pageSize) {
        setCurrent(page);
      } else {
        setCurrent(middleNumber);
      }
    }
    setActive(page);
    onGetPage && onGetPage(page);
  };

  const nextPage = () => {
    if (current <= pageSize - 4) {
      setCurrent(current + 1);
      setActive(active + 1);
      onGetPage && onGetPage(active + 1);
    } else {
      if (active < pageSize) {
        setActive(active + 1);
        onGetPage && onGetPage(active + 1);
      }
    }
  };

  const prevPage = () => {
    if (pageSize > 6 && current > 1) {
      if ((active + 3) > pageSize) {
        setCurrent(middleNumber);
      }else {
        setCurrent(current - 1);
      }
    }
    if (active > 0) {
      setActive(active - 1);
      onGetPage && onGetPage(active - 1);
    }
  };

  const getPage = (i: number) => {
    return current === 1 ? (i + current + 1) : current  < 3 ? (i + current) :
      (i + current - 1);
  };

  return (
    <div
      className={classNames('d-flex align-items-center justify-content-end', className)}
    >
      <PageButton
        disabled={active === 1}
        onClick={prevPage}
        direction="left"
      />
      <PageButton
        className="ml-8"
        active={active === 1}
        onClick={onClickPage(1)}
      >
        1
      </PageButton>
      {current > 3 && <More className="ml-8" />}
      {
        [...Array(pageSize <= 6 ? pageSize - 1 : 4)].map((_, index: number) =>
          <PageButton
            key={index}
            active={active === getPage(index) && active !== 1}
            onClick={onClickPage(getPage(index))}
            className="ml-8"
          >
            {current === 1 ? (index + current + 1) : current  < 3 ? (index + current) :
              (index + current - 1)}
          </PageButton>,
        )
      }
      {(current <= (pageSize - 4) && pageSize > 6) && <More className="ml-8" /> }
      {pageSize > 6 && (
        <PageButton
          className="ml-8"
          active={active === pageSize}
          onClick={onClickPage(pageSize)}
        >
          {pageSize}
        </PageButton>
      )}
      <PageButton
        disabled={active === pageSize}
        onClick={nextPage}
        className="ml-8"
        direction="right"
      />
    </div>
  );
}

export default Pagination;
