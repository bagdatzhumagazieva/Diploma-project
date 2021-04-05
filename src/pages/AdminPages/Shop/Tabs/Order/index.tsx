import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import useDebounce from 'src/hooks/useDebounce';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Pagination from 'src/components/atoms/Pagination';
import Table from 'src/components/molecules/Table';
import DateRangePicker from 'src/components/molecules/DateRangePicker';
import Input from 'src/components/molecules/Input';
import Select from 'src/components/molecules/Select';
import shopAction from 'src/store/item/actions';
import groupActions from 'src/store/group/actions';
import { OrderTableData, ORDER_STATUSES } from 'src/pages/AdminPages/Shop/Tabs/Order/const';
import { DEFAULT_DATE_FORMAT } from 'src/core/store/values';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import { OrderTypes } from 'src/pages/AdminPages/Shop/Tabs/Order/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ShopAdminOrderTypes } from 'src/store/item/types';
import 'src/pages/AdminPages/Shop/Tabs/Order/index.scss';
import Modal from 'src/components/molecules/Modal';
import useNotification from 'src/components/molecules/Notification/useNotification';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import ModalLoading from 'src/components/atoms/ModalLoading';
import { SortDirection } from 'src/components/molecules/Table/types';

function Order(props: OrderTypes.IProps) {

  const { companyId, getAdminOrders, ordersLoading, orders, history, location, updateOrder } = props;

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [isResetFilters, setResetFilters] = useState<boolean>(false);
  const { page } = queryString.parse(location.search);
  const pageSize = 10;
  const DEFAULT_PARAMS = { companyId, page: page ? +page : 1, page_size: pageSize, desc: null, sortBy: null };
  const [searchName, setSearchName] = useState('');
  const debounceSearchValue = useDebounce(searchName, 500);
  const [bodyParams, setBodyParams] = useState<ShopAdminOrderTypes.IQueryParams>(DEFAULT_PARAMS);
  const [filters, setFilters] = useState<OrderTypes.IFilter>();
  const [updateItemOrder, setUpdateItemOrder] = useState<number>();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const notification = useNotification();

  useEffect(() => {
    setBodyParams(bodyParams);
    getAdminOrders && getAdminOrders(bodyParams);
  },        []);

  const onResetFiltersClick = () => {
    setBodyParams(DEFAULT_PARAMS);
    getAdminOrders && getAdminOrders(DEFAULT_PARAMS);
    setResetFilters(false);
    setFilters(undefined);
  };

  const onPaginationPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page });
    history.push(`${location.pathname}?type=orders&page=${page}`);
    getAdminOrders && getAdminOrders({ ...bodyParams, page });
  };

  useEffect(
    () => {
      setBodyParams((prevState) => {
        const newFilterData =  { ...prevState, keyword: debounceSearchValue };
        getAdminOrders && getAdminOrders(newFilterData);
        return newFilterData;
      });
    },
    [debounceSearchValue],
  );

  const onSelectStatus = (option: IOption) => {
    const newParams = { ...bodyParams, status: option.value, page: 1 };
    setBodyParams(newParams);
    getAdminOrders && getAdminOrders(newParams);
    if (!isResetFilters) {
      setResetFilters(true);
    }
    setFilters({ ...filters, status: option });
  };

  const onDateRangeChange = (dateRange: any) => {
    setFilters({ ...filters, dateCreation: dateRange });
    const newParam = {
      ...bodyParams,
      creationStartTime: dateRange?.start?.format(DEFAULT_DATE_FORMAT),
      creationEndTime: dateRange?.end?.format(DEFAULT_DATE_FORMAT),
    };
    setBodyParams(newParam);
    getAdminOrders && getAdminOrders(newParam);
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onDateOrderRangeChange = (dateRange: any) => {
    setFilters({ ...filters, dateShipping: dateRange });
    const newParam = {
      ...bodyParams,
      shippingStartTime: dateRange?.start?.format(DEFAULT_DATE_FORMAT),
      shippingEndTime: dateRange?.end?.format(DEFAULT_DATE_FORMAT),
    };
    setBodyParams(newParam);
    getAdminOrders && getAdminOrders(newParam);
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const headerData = [
    ...OrderTableData,
    {
      key: 'finish',
      name: '',
      width: '226px',
      render: (n: ShopAdminOrderTypes.IRenderOrder) => (
        <Typography
          variant="subtext"
          color="main_50"
          style={{ cursor: 'pointer' }}
          onClick={() => setUpdateItemOrder(n.id)}
        >
          {n.status === 'PENDING' ? 'Завершить заказ' : ''}
        </Typography>
      ),
    },
  ];

  const onUpdateItemOrder = (id: number) => {
    setPageLoading(true);
    setUpdateItemOrder(undefined);
    updateOrder && updateOrder(id, {
      onSuccess: () => {
        const timeId = setTimeout(
          () => {
            getAdminOrders && getAdminOrders({ ...bodyParams, page: 1 }, {
              onSuccess: () => {
                notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Заказ успешно завершен' });
                setPageLoading(false);
              },
            });
            clearTimeout(timeId);
          },
          1500,
        );
      },
      onError: () => {
        notification.add({
          ...DEFAULT_NOTIFICATION_DATA,
          description: 'Не удалось завершить заказ',
          type: NotificationType.Danger,
        });
        setPageLoading(false);
      },
    });
  };

  const handleTableSort = (label: string, sortDirection: SortDirection) => {
    const descValue = sortDirection === 'desc';
    setBodyParams({ ...bodyParams, sortBy: label, desc: descValue });
    getAdminOrders && getAdminOrders({ ...bodyParams, sortBy: label, desc: descValue });
  };

  return (
    <div className="pb-64">
      <Typography variant="h1" className="mt-32">
        Список заказов
      </Typography>
      <div className="d-flex mt-24 justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <Typography variant="subtext" className="mb-4">
            Поиск призов
          </Typography>
          <div className="d-flex align-items-center">
              <Input
                placeholder="Название"
                classNames="shop-order__searcher-input"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
                icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
              />
            <div className="d-flex mr-20">
              <Button
                type="link"
                variant="subtext"
                className="d-flex align-items-center ml-5"
                onClick={() => setShowFilter(!showFilter)}
              >
                <FilterArrow active className="mr-8" direction={showFilter ? 'up' : 'down'} />
                Фильтры
              </Button>
              <Button
                disabled={!isResetFilters}
                type="link"
                variant="subtext"
                className="align-items-center ml-5"
                onClick={onResetFiltersClick}
              >
                Очистить фильтры
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showFilter && (
        <div className="d-flex mt-24">
          <div>
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Дата заказа
            </Typography>
            <DateRangePicker date={filters?.dateCreation} setDate={onDateRangeChange}  />
          </div>
          <Select
            staticWidth
            width={288}
            setSelectedOption={onSelectStatus}
            options={ORDER_STATUSES}
            label="Статус"
            customTitle={filters?.status?.name || 'Выберите статус'}
            className="color_grey__bg mx-32"
          />
          <div>
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Дата доставки
            </Typography>
            <DateRangePicker date={filters?.dateShipping} setDate={onDateOrderRangeChange} />
          </div>
        </div>
      )}
      <Table
        checkbox
        headerData={headerData}
        bodyData={orders?.orders || []}
        wrapperClassName="mt-16"
        loading={ordersLoading}
        onSort={handleTableSort}
      />
      <Pagination
        pageSize={pageSize}
        total={orders?.total || pageSize}
        className="mt-16"
        page={bodyParams.page}
        onGetPage={onPaginationPageClick}
      />
      {updateItemOrder !== undefined && (
        <Modal
          width={422}
          title="Завершение заказа"
          cancelLabel="Отмена"
          deleteLabel="Завершить"
          closeColor="#7A7B82"
          onCloseClick={() => setUpdateItemOrder(undefined)}
          onDeleteClick={() => onUpdateItemOrder(updateItemOrder)}
        >
          <Typography
            variant="text"
            className="px-32 mt-8"
          >
            Вы действительно хотите завершить данный заказ?
          </Typography>
        </Modal>
      )}
      {pageLoading && (
        <ModalLoading />
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  orders: state.itemReducer.adminOrders.data,
  ordersLoading: state.itemReducer.adminOrders.loading,
});

const mapDispatchToProps = {
  getAdminOrders: shopAction.getAdminOrders,
  deletePrizes: shopAction.deletePrizes,
  getGroups: groupActions.getGroups,
  updateOrder: shopAction.updateOrder,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Order));
