import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { getTagsByParams } from 'src/store/tag/actions';
import useVisibility from 'src/hooks/useVisibility';

import Button from 'src/components/atoms/Button';
import Modal from 'src/components/molecules/Modal';
import Checkbox from 'src/components/molecules/Checkbox';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import Loader from 'src/components/atoms/Loader';

import { FilterTagsTypes, IFilter } from 'src/components/organisms/FilterTags/types';
import FilterIcon from 'src/assets/img/icons/filter.svg';
import { TagsTypes } from 'src/store/tag/types';
import { pageSize } from 'src/components/organisms/FilterTags/consts';
import 'src/components/organisms/FilterTags/index.scss';

function FilterTags(props: FilterTagsTypes.IProps) {
  const {
    handleTags, alphabet,
    getTags, companyId, tags,
  } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [curChar, setCurChar] = useState<string>('all');
  const convertToTagsToFilters = (tags: TagsTypes.IRenderProps[] | undefined) => {
    if (!Array.isArray(tags)) return [];
    return tags.map(item => ({ id: item.id, isChecked: false, value: item.name }));
  };
  const [filters, setFilters] = useState<IFilter[]>(convertToTagsToFilters(tags?.data));
  const [total, setTotal] = useState<number>(0);
  const [curPage, setCurPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTags, setActiveTags] = useState<Map<number, string>>(new Map<number, string>());

  const onCloseModalClick = () => setShowModal(false);

  const defaultQueryParams: TagsTypes.IQueryParams = {
    companyId,
    pageSize,
    page: 1,
  };

  useEffect(
    () => {
      setTotal(0);
      setCurPage(0);
      setLoading(false);
      setActiveTags(new Map<number, string>());
      setShowModal(false);
    },
    [companyId],
  );

  const handleCheckedFilters = (state: boolean, id: string, title: string) => {
    const newActiveTags = new Map(activeTags);
    if (newActiveTags.has(+id)) {
      newActiveTags.delete(+id);
    } else {
      newActiveTags.set(+id, title);
    }
    setActiveTags(newActiveTags);
  };

  const onResetButtonClick = () => {
    setActiveTags(new Map<number, string>());
  };

  const onSearchButtonClick = () => {
    handleTags && handleTags(Array.from(activeTags).map(([id, name]) => ({ id, name })));
    setShowModal(false);
  };

  const lastItem = useVisibility(
    (visible) => {
      if (visible  && filters.length < total && !loading) {
        setLoading(true);
        if (curChar === 'all') {
          getTags && getTags({ ...defaultQueryParams, page: curPage + 1 });
        } else {
          getTags && getTags({ ...defaultQueryParams, page: curPage + 1, keyword: curChar });
        }
        setCurPage(prevState => prevState + 1);
      }
    },
    [total, filters, loading],
  );

  useEffect(
    () => {
      if (!tags) return;
      setTotal(tags.total || 0);
      setLoading(tags.loading);
      setFilters(prevState => [...prevState, ...convertToTagsToFilters(tags.data)]);
    },
    [tags],
  );

  const onLetterClick = (letter: string) => {
    setCurChar(letter);
  };

  useEffect(
    () => {
      if (!showModal || (typeof companyId !== 'number')) return;
      setFilters([]);
      if (curChar === 'all') {
        getTags && getTags(
          {
            companyId,
            pageSize,
            page: 1,
          });
        setCurPage(1);
      } else {
        getTags && getTags(
          {
            companyId,
            pageSize,
            page: 1,
            keyword: curChar,
          });
        setCurPage(1);
      }
    },
    [curChar, showModal, companyId, pageSize],
  );

  return (
    <>
      <Button
        variant="text"
        type="black-icon"
        className="filter-tags__button p-16"
        onClick={() => setShowModal(true)}
      >
        <Image
          alt="filter button image"
          className="button__image mr-10"
          src={FilterIcon}
        />
        Тэги
      </Button>
      {showModal && (
        <Modal width={712} onCloseClick={onCloseModalClick}>
          <div className="filter-tags-modal d-flex flex-column py-24 px-32">
            <Typography variant="h1" className="mb-32 align-self-start">Фильтрация по тэгам</Typography>
            <div className="filter-tags__active mb-24">
              {Array.from(activeTags.values()).map((value, index) => (
                <Typography
                  key={`filter-tags-active-${index}`}
                  variant="text"
                  className="mr-20 mb-4"
                >
                  {value}
                </Typography>
              ))}
            </div>
            <div className="filter-tags__alphabet d-flex flex-wrap">
              <Button
                key="all"
                type="link"
                variant="subtext"
                className={classNames(
                  'alphabet__char mr-24 mb-16',
                  { 'alphabet__char--active' : 'all' === curChar },
                )}
                onClick={() => onLetterClick('all')}
              >
                Все
              </Button>
              {alphabet.map((item, index) => (
                <Button
                  key={index}
                  type="link"
                  variant="subtext"
                  className={classNames(
                    'alphabet__char mr-24 mb-16',
                    { 'alphabet__char--active' : item === curChar },
                  )}
                  onClick={() => onLetterClick(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
            <div
              className={classNames(
                'flex-grow-1 overflow_auto',
                { 'd-flex align-items-center justify-content-center': filters.length < 1 },
              )}
            >
              {filters.length > 0 && (
                <div className="filter-tags__content d-flex flex-wrap align-content-start">
                  {filters.map((filterTag, index) => (
                    <Checkbox
                      labelRef={index === filters.length - 1 ? lastItem : null}
                      key={`${filterTag.id}-${filterTag.value}`}
                      id={`${filterTag.id}`}
                      titleVariant="text"
                      isClicked={filterTag.id ? activeTags.has(filterTag.id) : false}
                      title={`#${filterTag.value}`}
                      setClicked={handleCheckedFilters}
                    />
                  ))}
                </div>
              )}
              {loading && <Loader />}
            </div>
            <div className="d-flex mt-32 align-self-end ">
              <Button
                type="link-black"
                variant="textmed"
                className="mr-64"
                onClick={onResetButtonClick}
              >
                Сброс
              </Button>
              <Button
                variant="textmed"
                className="filter-tags-modal__submit-button ml-8"
                onClick={onSearchButtonClick}
              >
                Применить
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  tags: state.tagReducer.tagsByParams,
});

const mapDispatchToProps = {
  getTags: getTagsByParams,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(FilterTags);
