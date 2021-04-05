import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from 'src/components/atoms/Button';
import FavoriteIcon from 'src/components/atoms/Svg/Icons/favorite';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Typography from 'src/components/atoms/Typography';
import Slider from 'src/components/atoms/Slider';
import Rate from 'src/components/atoms/Rate';
import Modal from 'src/components/molecules/Modal';
import Table from 'src/components/molecules/Table';
import Layout from 'src/components/organisms/Layout';
import Comments from 'src/components/organisms/Comments';
import { useParams } from 'react-router';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import itemActions from 'src/store/item/actions';
import { ShopDetailPageTypes } from 'src/pages/AdminPages/Shop/ShopDetailPage/types';
import {
  CONVERT_IMAGES_TO_SLIDER,
  SHOP_DETAIL_TABS,
  SHOP_TABLE_DATA,
} from 'src/pages/AdminPages/Shop/ShopDetailPage/const';
import Loader from 'src/components/atoms/Loader';

import { ReactComponent as IconEdit } from 'src/assets/img/icons/edit.svg';
import { ReactComponent as IconDelete } from 'src/assets/img/icons/delete.svg';
import { ReactComponent as CoinIcon } from 'src/assets/img/icons/coin.svg';

import 'src/pages/AdminPages/Shop/ShopDetailPage/index.scss';
import { LOCAL_STORAGE } from 'src/core/store/values';
import useNotification from 'src/components/molecules/Notification/useNotification';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { NotificationType } from 'src/components/molecules/Notification/types';
import ModalLoading from 'src/components/atoms/ModalLoading';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import { ItemBuyerTypes } from 'src/store/item/types';
import Pagination from 'src/components/atoms/Pagination';
import { SortDirection } from 'src/components/molecules/Table/types';

function ShopDetailPage(props: ShopDetailPageTypes.IProps) {
  const { deletePrizes, getItemByAdmin, itemByAdmin, itemByAdminLoading, getItemBuyers, itemBuyers } = props;
  const [showAllText, setShowAllText] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(SHOP_DETAIL_TABS[0].value);
  const { id } = useParams();
  const itemId = id ? +id : -1;
  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || undefined;
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const notification = useNotification();
  const history = useHistory();
  const pageSize = 10;
  const defaultParams = {
    desc: null,
    sortBy: null,
    page: 1,
    pageSize: 10,
  };
  const [bodyParams, setBodyParams] = useState<ItemBuyerTypes.IQueryProps>(defaultParams);

  useEffect(
    () => {
      if (itemId === -1) return;
      getItemByAdmin && companyId && getItemByAdmin(+companyId, itemId);
      getItemBuyers && companyId && getItemBuyers(bodyParams, +companyId, itemId);
    },
    [itemId],
  );

  const showText = (text: string) => showAllText ? text : text?.length > 400 ? `${text?.slice(0, 400)}...` : text;

  const handleClickFavorite = () => {
    setFavorite(!favorite);
  };

  const deletePrize = () => {
    setPageLoading(true);
    deletePrizes && companyId && deletePrizes(+companyId, itemId, {
      onSuccess: () => {
        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Приз успешно удален' });
        setTimeout(
          () => {
            history.push(addAdminSlash(AdminRouterPaths.SHOP));
          },
          700);
        setPageLoading(false);
      },
      onError: () => {
        notification.add({
          ...DEFAULT_NOTIFICATION_DATA,
          description: 'Товар удалить невозможно так как у него есть покупатели. ' +
            'Вы можете уменьшить кол-во товаров в настроках товара, для того чтобы скрыть товар.',
          type: NotificationType.Danger,
        });
        setPageLoading(false);
      },
    });
    setModalDelete(false);
  };

  const onPaginationPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page });
    getItemBuyers && companyId && getItemBuyers({ ...bodyParams, page }, +companyId, itemId);
  };

  const handleTableSort = (label: string, sortDirection: SortDirection) => {
    const descValue = sortDirection === 'desc';
    const sortByValue = label === 'name' ? 'employee' : (label === 'date' ? 'created_at' : label);
    setBodyParams({ ...bodyParams, sortBy: sortByValue, desc: descValue });
    getItemBuyers && companyId &&
      getItemBuyers({ ...bodyParams, sortBy: sortByValue, desc: descValue }, +companyId, itemId);
  };

  return (
    <Layout
      isAdminRouting
      className="color_grey__bg"
    >
      {itemByAdminLoading && <Loader className="mt-64" /> }
      {itemByAdmin && !itemByAdminLoading && (
        <div className="shop-detail grid py-64">
          <Breadcrumb
            items={[
              { label: 'Управление магазином', link: addAdminSlash(AdminRouterPaths.SHOP) },
              { label: itemByAdmin.name },
            ]}
          />
          <div className="d-flex mt-48 shop-detail__icon">
            <Link
              to={`${addAdminSlash(AdminRouterPaths.SHOP_EDITION)}/${id}`}
              className="d-flex align-items-center cursor-pointer"
            >
              <IconEdit width="16" height="16" className="shop-detail__icon--yellow mr-8" />
              <Typography variant="subtext" color="main_50">Отредактировать приз</Typography>
            </Link>
            <div
              className="d-flex align-items-center cursor-pointer ml-32"
              onClick={() => setModalDelete(true)}
            >
              <IconDelete width="17" height="17" className="shop-detail__icon--red" />
              <Typography variant="subtext" color="red">Удалить </Typography>
            </div>
          </div>

          <div className="d-flex justify-content-center pt-32">
            <div className="mr-40">
              <Slider photos={CONVERT_IMAGES_TO_SLIDER(itemByAdmin.images)} />
            </div>

            <div className="shop-detail__card-wrap">
              <div className="shop-detail__card d-flex flex-column px-32 py-24">
                <Rate value={itemByAdmin.rating || 0} disabled />
                <Typography variant="subtext" color="main_50" className="mt-16">{itemByAdmin.categoryName}</Typography>
                <Typography variant="textmed" className="mt-16">{itemByAdmin.name}</Typography>
                <span>
                <Typography variant="text" className="mt-8">{showText(itemByAdmin.description || '')}</Typography>
                <Typography
                  variant="text"
                  color="main_50"
                  onClick={() => setShowAllText(!showAllText)}
                  className="cursor-pointer"
                >
                  {itemByAdmin?.description?.length > 400 && `Показать ${showAllText ? 'меньше' : 'полностью'}`}
                </Typography>
              </span>
                <div className="line mt-24" />
                <div className="d-flex align-items-center mt-32">
                  <span>
                    <Typography variant="h1" className="mr-8">{itemByAdmin.price}</Typography>
                    <CoinIcon width={15} height={15} />
                  </span>
                  <Typography
                    variant="subtext"
                    color="grey_additional_1"
                    className="ml-16"
                  >
                    Осталось призов: {itemByAdmin.amount || 0}
                  </Typography>
                  <Typography
                    variant="subtext"
                    color="grey_additional_1"
                    className="ml-16"
                  >
                    Куплено: {itemByAdmin.numberOfSold ? itemByAdmin.numberOfSold : 0}
                  </Typography>
                </div>
                <Button
                  variant="textmed"
                  className="mt-32"
                  disabled
                >
                  Оплатить
                </Button>
                <div className="d-flex align-items-center justify-content-center mt-24 mb-16">
                  <FavoriteIcon
                    bordered
                    active={favorite}
                    className="shop-detail__card__favorite mr-8"
                    onClick={handleClickFavorite}
                  />
                  <Typography variant="subtext" color="main_50">Добавить в корзину</Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="shop-detail__tabs mt-32">
            {SHOP_DETAIL_TABS.map(tab => (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? 'textmed' : 'text'}
                classNames={[
                  'tabs__button px-24 py-12',
                  { 'tabs__button--active': activeTab === tab.value },
                ]}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.title}
              </Button>
            ))}
          </div>
          <div className="shop-detail__tab-body">
            {activeTab === '0' ? (
              <div className="comments-theme">
                <Comments type="SHOP_ITEM" uuid={itemByAdmin.uuid} className="mt-32" />
              </div>
            ) : (
              <div className="p-32">
                <Typography variant="textmed" className="mb-16">Список покупателей</Typography>
                <Table
                  headerData={SHOP_TABLE_DATA}
                  bodyData={itemBuyers?.orders || []}
                  onSort={handleTableSort}
                />
                <Pagination
                  pageSize={pageSize}
                  total={itemBuyers?.total || pageSize}
                  className="mt-16"
                  page={bodyParams.page || 1}
                  onGetPage={onPaginationPageClick}
                />
              </div>
            )}
          </div>

          {modalDelete && (
            <Modal
              width={422}
              title="Удаление приза"
              cancelLabel="Отмена"
              deleteLabel="Удалить"
              onDeleteClick={deletePrize}
              onCloseClick={() => setModalDelete(false)}
            >
              <Typography
                variant="text"
                className="ml-32 mr-32"
              >
                Вы действительно хотите удалить данный приз?
              </Typography>
            </Modal>
          )}

        </div>
      )}
      {pageLoading && (
        <ModalLoading />
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  itemByAdmin: state.itemReducer.itemByAdmin.data,
  itemByAdminLoading: state.itemReducer.itemByAdmin.loading,
  itemBuyers: state.itemReducer.itemBuyers.data,
});

const mapDispatchToProps = {
  deletePrizes: itemActions.deletePrizes,
  getItemByAdmin: itemActions.getItemByAdmin,
  getItemBuyers: itemActions.getItemBuyers,
};

export default connect<any>(mapStateToProps, mapDispatchToProps)(withNotificationProvider(ShopDetailPage));
