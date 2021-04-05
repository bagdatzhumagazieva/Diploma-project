import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import marketplaceActions from 'src/store/marketplace/actions';
import classNames from 'classnames';
import Typography from 'src/components/atoms/Typography';
import CardMarketplace from 'src/components/molecules/Cards/CardMarketplace';
import Select from 'src/components/molecules/Select';
import 'src/pages/AdminPages/MarketPlace/Tabs/MarketplaceEducationContent/index.scss';
import { MarketPlaceEducationContentTypes } from 'src/pages/AdminPages/MarketPlace/Tabs/MarketplaceEducationContent/types';
import { IOption } from 'src/components/molecules/Select/types';
import { MarketplaceItemTypes } from 'src/store/marketplace/types';
import {
  MarketShellFilterOptions,
 } from 'src/pages/AdminPages/MarketPlace/Tabs/MarketPlaceShell/consts';
 import Loader from 'src/components/atoms/Loader';
 import Pagination from 'src/components/atoms/Pagination';
 import { withRouter } from 'react-router';
 import queryString from 'query-string';
import EmptyDataContainer from 'src/components/atoms/EmptyDataContainer';

function MarketPlaceEducationContent(props: MarketPlaceEducationContentTypes.IProps) {
  const pageSize = 16;
  const ENTITY_TYPE = 'COURSE';
  const {
    marketplaceItems,
    getMarketplaceItems,
    marketplaceItemsLoading,
    marketplaceItemsError,
    marketplaceItemsTotal,
    history,
    location,
    companyId,
    filterCategories,
    getFilterCategories,
  } = props;
  const { page } = queryString.parse(location.search);
  const [selectedCategories, setSelectedCategories] = useState<IOption[]>([]);
  const DEFAULT_PARAMS = { companyId, entityType: ENTITY_TYPE, page: page ? +page : 1, page_size: pageSize };
  const [bodyParams, setBodyParams] = useState<MarketplaceItemTypes.IQueryParams>(DEFAULT_PARAMS);
  const [curCategory, setCurCategory] = useState<IOption>();
  const [staticFilterOption, setStaticFilterOption] = useState<IOption>(MarketShellFilterOptions[0]);
  const DEFAULT_CATEGORY_PARAMS = { type: ENTITY_TYPE, companyId: companyId };

  useEffect(() => {
    getMarketplaceItems && getMarketplaceItems(bodyParams);
    getFilterCategories && getFilterCategories(DEFAULT_CATEGORY_PARAMS);
  }, [bodyParams]);

  useEffect(() => {
    if (filterCategories) {
      const allItems = {
        value: '0',
        name: 'Все',
      };
      setSelectedCategories([
        allItems,
        ...filterCategories.map((e: any) => ({
          value: `${e.categoryId}`,
          name: e.categoryName,
        }))]);
    }
  }, [filterCategories]);

  const onSelectCategory = (option: IOption) => {
    setCurCategory(option);
    const newParams = { ...DEFAULT_PARAMS, categoryId: parseInt(option.value, 10) };
    setBodyParams(newParams);
  };

  useEffect(() => {
    if (staticFilterOption.value === '+price') {
      setBodyParams({ ...DEFAULT_PARAMS, sortBy: 'price', desc: false });
    } else if (staticFilterOption.value === '-price') {
      setBodyParams({ ...DEFAULT_PARAMS, sortBy: 'price', desc: true });
    } else if (staticFilterOption.value === 'rating') {
      setBodyParams({ ...DEFAULT_PARAMS, sortBy: 'rating', desc: false });
    } else {
      setBodyParams({ ...DEFAULT_PARAMS });
    }
  }, [staticFilterOption]);

  const onPaginationPageClick = (page: number) => {
    history.push(`${location.pathname}?type=content&page=${page}`);
    const newParams = { ...DEFAULT_PARAMS, page: page, page_size: pageSize };
    setBodyParams(newParams);
  };

  return (
    <div className="marketplace-education-content mb-64">
      <div className="d-flex justify-content-between">
        <div className="marketplace-education-content__select mt-32">
          <Typography variant="subtext" className="mb-4">Рубрика</Typography>
          <Select
            staticWidth
            isPositionFixed
            options={selectedCategories}
            selectedOption={curCategory}
            customTitle="Выберите рубрику"
            setSelectedOption={onSelectCategory}
          />
        </div>
        <div className="d-flex align-items-center">
          <Typography variant="subtext" className="mr-4">Сортировка:</Typography>
          <Select
            staticWidth
            options={MarketShellFilterOptions}
            selectedOption={staticFilterOption}
            className="marketplace-education-content__sort ml-2"
            setSelectedOption={setStaticFilterOption}
          />
        </div>
      </div>
      {marketplaceItemsLoading ? <Loader className="mt-48" size={40} /> :
        marketplaceItemsError || (marketplaceItems?.items.length === 0) ?
          <EmptyDataContainer
            description={marketplaceItemsError || 'Нет данных'}
            className="mt-32"
          /> :
          <>
            <div className="d-flex flex-wrap" >
              {marketplaceItems?.items.map((e, i) => (
                <div key={e.entityId}>
                  <CardMarketplace
                    className={classNames(['marketplace-education-content__card mt-32', i && i % 3 === 0 ? 'mr-0' : 'mr-24'])}
                    { ...e }
                    itemType={ENTITY_TYPE}
                  />
                </div>
              ))}
            </div>
            <Pagination
              pageSize={pageSize}
              total={marketplaceItemsTotal || pageSize}
              className="mt-16"
              onGetPage={onPaginationPageClick}
            />
          </>
      }
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  marketplaceItems: state.marketplaceReducer.marketplaceItems.data,
  marketplaceItemsLoading: state.marketplaceReducer.marketplaceItems.loading,
  marketplaceItemsError: state.marketplaceReducer.marketplaceItems.errorMessage,
  marketplaceItemsTotal: state.marketplaceReducer.marketplaceItems.data?.total,
  filterCategories: state.marketplaceReducer.filterCategories.data,
});

const mapDispatchToProps = {
  getMarketplaceItems: marketplaceActions.getMarketplaceItems,
  getFilterCategories: marketplaceActions.getFilterCategories,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MarketPlaceEducationContent));
