import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import marketplaceActions from 'src/store/marketplace/actions';
import classNames from 'classnames';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import CardMarketplace from 'src/components/molecules/Cards/CardMarketplace';
import Select from 'src/components/molecules/Select';
import {
 MarketShellFilterOptions,
} from 'src/pages/AdminPages/MarketPlace/Tabs/MarketPlaceShell/consts';
import { IOption } from 'src/components/molecules/Select/types';
import 'src/pages/AdminPages/MarketPlace/Tabs/MarketPlaceShell/index.scss';
import { MarketPlaceShellTypes } from 'src/pages/AdminPages/MarketPlace/Tabs/MarketPlaceShell/types';
import Loader from 'src/components/atoms/Loader';
import { MarketplaceItemTypes } from 'src/store/marketplace/types';
import Pagination from 'src/components/atoms/Pagination';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import EmptyDataContainer from 'src/components/atoms/EmptyDataContainer';

function MarketPlaceShell(props: MarketPlaceShellTypes.IProps) {
  const pageSize = 16;
  const [curCategory, setCurCategory] = useState<number>();
  const [staticFilterOption, setStaticFilterOption] = useState<IOption>(MarketShellFilterOptions[0]);
  const {
    getMarketplaceItems,
    marketplaceItems,
    marketplaceItemsLoading,
    marketplaceItemsError,
    marketplaceItemsTotal,
    companyId,
    history,
    location,
    filterCategories,
    getFilterCategories,
  } = props;
  const { page } = queryString.parse(location.search);
  const ENTITY_TYPE = 'GAME_TEMPLATE';
  const DEFAULT_PARAMS = { companyId: companyId, entityType: ENTITY_TYPE, page: page ? +page : 1, page_size: pageSize };
  const [itemCategories, setItemCategories] = useState<MarketPlaceShellTypes.ICategory[]>([]);
  const [bodyParams, setBodyParams] = useState<MarketplaceItemTypes.IQueryParams>(DEFAULT_PARAMS);
  const DEFAULT_CATEGORY_PARAMS = { type: ENTITY_TYPE, companyId: companyId };

  const onTypeClick = (type: MarketPlaceShellTypes.ICategory) => {
    if (!type.id) {
      setCurCategory(type.id);
      setBodyParams(DEFAULT_PARAMS);
    } else {
      setCurCategory(type.id);
      const newParams = { ...DEFAULT_PARAMS, categoryId: type.id }
      setBodyParams(newParams);
    }
  };

  useEffect(() => {
    getMarketplaceItems && getMarketplaceItems(bodyParams);
    getFilterCategories && getFilterCategories(DEFAULT_CATEGORY_PARAMS);
  }, [bodyParams]);

  useEffect(() => {
    if (filterCategories) {
      const allItems = {
        id: 0,
        name: 'Все',
        count: filterCategories.map((e: any) => e.amount).reduce((a: number, b: number) => a + b, 0) || 0,
      };
      setItemCategories([
        allItems,
        ...filterCategories.map((e: any, i: number) => ({
          id: e.categoryId,
          name: e.categoryName,
          count: e.amount,
        }))]);
    }
  }, [filterCategories]);

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
    history.push(`${location.pathname}?page=${page}`);
    const newParams = { ...DEFAULT_PARAMS, page: page, page_size: pageSize };
    setBodyParams(newParams);
  };

  return (
    <div className="marketplace-shell mb-64">
      <div className="d-flex justify-content-between align-items-center marketplace-shell__filters mt-40">
        <div className="marketplace-shell__type">
          {itemCategories.map(category => (
            <Button
              key={category.id}
              variant="subtext"
              color="grey_additional_2"
              className={classNames(
                'marketplace-shell__type__button mr-16 py-8 px-20',
                { 'marketplace-shell__type__button--active': curCategory === category.id },
              )}
              onClick={() => onTypeClick(category)}
            >
              {`${category.name} (${category.count})`}
            </Button>
          ))}
        </div>
        <div className="marketplace-shell__sort d-flex align-items-center">
          <Typography variant="subtext" className="mr-4">Сортировка:</Typography>
          <Select
            staticWidth
            options={MarketShellFilterOptions}
            selectedOption={staticFilterOption}
            className="marketplace-shell__sort__select ml-2"
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
              <div className="d-flex flex-wrap mt-16" >
                {marketplaceItems?.items.map((e, i) => (
                  <div key={e.entityId}>
                    <CardMarketplace
                      className={classNames(['marketplace-shell__card mt-32', i && i % 3 === 0 ? 'mr-0' : 'mr-24'])}
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
)(withRouter(MarketPlaceShell));
