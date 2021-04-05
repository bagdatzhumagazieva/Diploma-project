import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Pagination from 'src/components/atoms/Pagination';
import Table from 'src/components/molecules/Table';
import shopActions from 'src/store/item/actions';
import { ShopMyOrdersTypes } from 'src/components/organisms/ShopComponents/ShopMyOrder/types';
import { SortDirection } from 'src/components/molecules/Table/types';
import { ShopOrderTypes } from 'src/store/item/types';
import { ShopContentTypes } from 'src/components/organisms/ShopComponents/Shop/types';
import { TaskTableData } from 'src/components/organisms/ShopComponents/ShopMyOrder/consts';
import coin from 'src/assets/img/icons/coin.svg';
import 'src/components/organisms/ShopComponents/ShopMyOrder/index.scss';

function ShopMyOrder(props: ShopMyOrdersTypes.IProps) {

  const { getMyOrders, companyId, orders, ordersLoading, history, location,
    getMyOrdersStatus, ordersStatus } = props;
  const pageSize = 10;
  const { page } = queryString.parse(location.search);
  const [bodyParams, setBodyParams] = useState<ShopOrderTypes.IQueryParams>(
    { companyId, page: page ? +page : 1, page_size: pageSize });
  const [orderStatuses, setOrderStatuses] = useState<ShopContentTypes.IType[]>([]);
  const [curStatus, setCurStatus] = useState<number>(0);

  useEffect(() => {
    setBodyParams(bodyParams);
    getMyOrders && getMyOrders(bodyParams);
    getMyOrdersStatus && getMyOrdersStatus(companyId);
  },        []);

  useEffect(() => {
    if (ordersStatus) {
      setOrderStatuses([
        {
          id: 0,
          title: 'Все',
          count: ordersStatus.allCount,
        },
        {
          id: 1,
          title: 'В обработке',
          count: ordersStatus.pendingCount || 0,
          value: 'PENDING',
        },
        {
          id: 2,
          title: 'Заказ доставлен',
          count: ordersStatus.finishedCount || 0,
          value: 'FINISHED',
        },
      ]);
    }
  },        [ordersStatus]);

  const onPaginationPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page });
    history.push(`${location.pathname}?type=my-orders&page=${page}`);
    getMyOrders && getMyOrders({ ...bodyParams, page });
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    const newBodyParams = {
      ...bodyParams,
      orderField: (sortDirection !== SortDirection.Default) ? `${label}_${sortDirection}` : undefined,
    };
    setBodyParams(newBodyParams);
    getMyOrders && getMyOrders(newBodyParams);
  };

  const onCLickStatus = (data: ShopContentTypes.IType) => {
    setCurStatus(data.id);
    const newParam = {
      ...bodyParams,
      status: data.value || '',
      page: 1,
    };
    setBodyParams(newParam);
    getMyOrders && getMyOrders(newParam);
  };

  return (
    <div className="grid pt-32 pl-24 pr-24">
      <Typography variant="h1">Мои заказы</Typography>
      <div className="d-flex justify-content-between align-items-center pt-32 pb-24">
        <div className="filters__tasks-type">
          {orderStatuses.map(e => (
            <Button
              key={e.id}
              variant="subtext"
              color="grey_additional_2"
              className={classNames(
                'tasks-type__button mr-16 py-8 px-20 mt-16',
                { 'tasks-type__button--active': curStatus === e.id },
              )}
              onClick={() => onCLickStatus(e)}
            >
              {`${e.title} (${e.count})`}
            </Button>
          ))}
        </div>
        <div className="d-flex flex-column">
          <Typography variant="subtext" >
            Количество товаров:
            <Typography variant="subtextmed" color="main_50" style={{ marginLeft: '5px' }}>
              {orders?.total || 0}
            </Typography>
          </Typography>
          <Typography variant="subtext" className="mt-8">
            Всего на сумму:
            <Image alt="coin" src={coin} className="coin__image" />
            <Typography variant="subtextmed" color="main_50" style={{ marginLeft: '5px' }}>
              {orders?.totalPrice || 0}
            </Typography>
          </Typography>
        </div>
      </div>
      <Table
        headerData={TaskTableData}
        bodyData={orders?.myOrders || []}
        wrapperClassName="mt-16"
        loading={ordersLoading}
        onSort={onSort}
      />
      <Pagination
        pageSize={pageSize}
        total={orders?.total || pageSize}
        className="mt-16 mb-48"
        page={bodyParams.page}
        onGetPage={onPaginationPageClick}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  orders: state.itemReducer.myOrdersState.data,
  ordersStatus: state.itemReducer.orderStatuses.data,
  ordersLoading: state.itemReducer.myOrdersState.loading,
});

const mapDispatchToProps = {
  getMyOrders: shopActions.getMyOrders,
  getMyOrdersStatus: shopActions.getOrderStatus,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ShopMyOrder));
