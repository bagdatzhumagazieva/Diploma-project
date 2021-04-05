import React, { useState, useEffect } from 'react';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import Select from 'src/components/molecules/Select';
import Table from 'src/components/molecules/Table';
import DateRangePicker from 'src/components/molecules/DateRangePicker';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import {
  MARKETPLACE_ORDER_STATUS,
  MarketplaceOrderTableData,
} from 'src/pages/AdminPages/MarketPlace/Tabs/MarketplaceOrder/const';
import 'src/pages/AdminPages/MarketPlace/Tabs/MarketplaceOrder/index.scss';
import { IOption } from 'src/components/molecules/Select/types';
import { MarketPlaceOrderTypes } from 'src/pages/AdminPages/MarketPlace/Tabs/MarketplaceOrder/types';
import marketplaceActions from 'src/store/marketplace/actions';
import { connect } from 'react-redux';
import { MarketplaceOrderTypes } from 'src/store/marketplace/types';
import queryString from 'query-string';
import { DEFAULT_DATE_FORMAT } from 'src/core/store/values';
import Pagination from 'src/components/atoms/Pagination';
import { SortDirection } from 'src/components/molecules/Table/types';
import useDebounce from 'src/hooks/useDebounce';
import { withRouter } from 'react-router';
import Button from 'src/components/atoms/Button';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';

function MarketplaceOrder(props: MarketPlaceOrderTypes.IProps) {
  const { getMyOrders, marketplaceOrders, marketplaceOrdersLoading, companyId, location, history } = props;
  const [statusFilter, setStatusFilter] = useState<IOption>();
  const { page } = queryString.parse(location.search);
  const pageSize = 5;
  const DEFAULT_PARAMS = { companyId, page: page ? +page : 1, page_size: pageSize };
  const [bodyParams, setBodyParams] = useState<MarketplaceOrderTypes.IQueryParams>(DEFAULT_PARAMS);
  const [orderDate, setOrderDate] = useState();
  const [searchName, setSearchName] = useState('');
  const debounceSearchValue = useDebounce(searchName, 500);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [isResetFilters, setIsResetFilters] = useState<boolean>(false);

  const onSelectStatus = (option: IOption) => {
    if (!isResetFilters) {
      setIsResetFilters(true);
    }
    setStatusFilter(option);
    const newParams = { ...bodyParams, status: option.value, page: 1 };
    history.push(`${location.pathname}?type=order&page=${1}`);
    setBodyParams(newParams);
    getMyOrders && getMyOrders(newParams);
  };

  useEffect(() => {
    getMyOrders && getMyOrders(bodyParams);
  }, []);

  const onDateRangeChange = (dateRange: any) => {
    if (!isResetFilters) {
      setIsResetFilters(true);
    }
    setOrderDate(dateRange);
    const newParams = {
      ...bodyParams,
      page: 1,
      dateFrom: dateRange?.start?.format(DEFAULT_DATE_FORMAT),
      dateTo: dateRange?.end?.format(DEFAULT_DATE_FORMAT),
    };
    setBodyParams(newParams);
    history.push(`${location.pathname}?type=order&page=${1}`);
    getMyOrders && getMyOrders(newParams);
  };

  const onPaginationPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page });
    history.push(`${location.pathname}?type=order&page=${page}`);
    getMyOrders && getMyOrders({ ...bodyParams, page });
  };

  const handleTableSort = (label: string, sortDirection: SortDirection) => {
    setBodyParams({ ...bodyParams, orderField: `${label}_${sortDirection}` });
    getMyOrders && getMyOrders({ ...bodyParams, orderField: `${label}_${sortDirection}` });
  };

  useEffect(
    () => {
      setBodyParams((prevState) => {
        const newFilterData =  { ...prevState, keyword: debounceSearchValue, page: 1 };
        history.push(`${location.pathname}?type=order&page=${1}`);
        getMyOrders && getMyOrders(newFilterData);
        return newFilterData;
      });
    },
    [debounceSearchValue],
  );

  const onResetFiltersClick = () => {
    setBodyParams({ ...DEFAULT_PARAMS, page: 1 });
    getMyOrders && getMyOrders({ ...DEFAULT_PARAMS, page: 1 });
    history.push(`${location.pathname}?type=order&page=${1}`);
    setIsResetFilters(false);
    setOrderDate(undefined);
    setStatusFilter(undefined);
  };

  return (
    <div className="marketplace-order mb-64">
      <Typography variant="h1" className="mt-32">
        Список заказов
      </Typography>
      <div className="d-flex flex-column mt-24">
        <div className="d-flex align-items-center">
          <Input
            label="Поиск товаров"
            placeholder="Название"
            classNames="marketplace-order__searcher-input"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
            icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
          />
          <Button
            type="link"
            variant="subtext"
            className="d-flex align-items-center ml-5 mt-16"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FilterArrow active className="mr-8" direction={showFilter ? 'up' : 'down'} />
            Фильтры
          </Button>
          <Button
            disabled={!isResetFilters}
            type="link"
            variant="subtext"
            className="align-items-center ml-5 mt-16"
            onClick={onResetFiltersClick}
          >
            Очистить фильтры
          </Button>
        </div>
        {showFilter && (
          <div className="d-flex mt-24">
            <Select
              staticWidth
              width={288}
              options={MARKETPLACE_ORDER_STATUS}
              setSelectedOption={onSelectStatus}
              label="Статус"
              customTitle={statusFilter?.name || 'Выберите статус'}
              className="color_grey__bg mr-32"
            />
            <div>
              <Typography
                variant="subtext"
                className="mb-4"
              >
                Период
              </Typography>
              <DateRangePicker date={orderDate} setDate={onDateRangeChange} />
            </div>
          </div>
        )}
      </div>
      <div className="d-flex flex-wrap mt-16 " >
        <Table
          headerData={MarketplaceOrderTableData}
          bodyData={marketplaceOrders?.itemOrders || []}
          loading={marketplaceOrdersLoading}
          onSort={handleTableSort}
        />
      </div>
      <Pagination
        pageSize={pageSize}
        total={marketplaceOrders?.total || pageSize}
        className="mt-16"
        page={bodyParams.page}
        onGetPage={onPaginationPageClick}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  marketplaceOrders: state.marketplaceReducer.marketplaceOrders.data,
  marketplaceOrdersLoading: state.marketplaceReducer.marketplaceOrders.loading,
});

const mapDispatchToProps = {
  getMyOrders: marketplaceActions.getMyOrders,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MarketplaceOrder));
