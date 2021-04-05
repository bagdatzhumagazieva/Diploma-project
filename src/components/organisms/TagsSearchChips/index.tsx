import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useVisibility from 'src/hooks/useVisibility';
import { getTagsByParams } from 'src/store/tag/actions';

import SearchChips from 'src/components/molecules/SeacrhChips';
import { SearchChipsTypes } from 'src/components/molecules/SeacrhChips/types';
import { TagsSearchChipsTypes } from 'src/components/organisms/TagsSearchChips/types';

function TagsSearchChips(props: TagsSearchChipsTypes.IProps) {
  const {
    companyId, getSearchedTags, searchedTags, handleSelectedTagsIds,
    searchedTagsTotal = 0, searchedTagsLoading = false, initialTags,
    disabled,
  } = props;
  const [curSearchedTags, setCurSearchTags] = useState<SearchChipsTypes.IData[]>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchValChange = (value: string) => {
    setCurSearchTags([]);
    setCurPage(1);
    setSearchValue(value);
    getSearchedTags && getSearchedTags({ companyId, keyword: value, page: 1, pageSize: 7 });
  };

  const lastItem = useVisibility(
    (visible) => {
      if (visible && curSearchedTags.length < searchedTagsTotal && !searchedTagsLoading) {
        getSearchedTags && getSearchedTags({ companyId, keyword: searchValue, page: curPage + 1, pageSize: 7 });
        setCurPage(curPage + 1);
      }
    },
    [searchedTagsTotal, curSearchedTags, curPage, searchValue],
  );

  useEffect(
    () => {
      if (!Array.isArray(searchedTags)) return;
      setCurSearchTags(prevState => (
        [...prevState, ...searchedTags.map(item => ({ id: item.id, name: item.name }))]
      ));
    },
    [searchedTags],
  );

  return (
    <SearchChips
      companyId={companyId}
      results={curSearchedTags}
      loading={searchedTagsLoading}
      lastItemRef={lastItem}
      disabled={disabled}
      initialValues={initialTags}
      setSelectedIds={handleSelectedTagsIds}
      onSearchValueChange={onSearchValChange}
    />
  );
}

const mapStateToProps = (state: any) => ({
  searchedTags: state.tagReducer.tagsByParams.data,
  searchedTagsTotal: state.tagReducer.tagsByParams.total,
  searchedTagsLoading: state.tagReducer.tagsByParams.loading,
});

const mapDispatchToProps = {
  getSearchedTags: getTagsByParams,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(TagsSearchChips);
