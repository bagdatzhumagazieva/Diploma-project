import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Slider from 'src/components/atoms/Slider';
import Typography from 'src/components/atoms/Typography';
import Loader from 'src/components/atoms/Loader';
import Button from 'src/components/atoms/Button';
import Rate from 'src/components/atoms/Rate';
import FavoriteIcon from 'src/components/atoms/Svg/Icons/favorite';
import Modal from 'src/components/molecules/Modal';
import Layout from 'src/components/organisms/Layout';
import Comments from 'src/components/organisms/Comments';

import { createRating } from 'src/store/rate/actions';
import { AdminRouterPaths, RouterPaths } from 'src/core/enum';
import { ReactComponent as CoinIcon } from 'src/assets/img/icons/coin.svg';
import { addSlash } from 'src/core/components/router';
import itemActions from 'src/store/item/actions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { ShopType } from 'src/pages/GamePages/Shop/ShopDetailPage/types';
import useNotification from 'src/components/molecules/Notification/useNotification';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { NotificationType } from 'src/components/molecules/Notification/types';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import 'src/pages/GamePages/Shop/ShopDetailPage/index.scss';

function ShopDetailGame(props: ShopType.IProps) {

  const { getItem, item, itemLoading, createShopOrder, createRating, history } = props;

  const [showAllText, setShowAllText] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [rateModal, setRateModal] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const { id } = useParams();
  const itemId = id ? +id : -1;
  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || 0;

  const notification = useNotification();

  const showText = (text: string) => showAllText ? text : text.length > 400 ? `${text.slice(0, 400)}...` : text;

  useEffect(
    () => {
      if (itemId === -1) return;
      getItem && getItem(itemId);

      // @ts-ignore
      const newBasketItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE.SHOP_BASKET_ITEMS)) || [];
      const newItem = newBasketItems.find((e: any) => e.item.id === itemId);
      setFavorite(newItem && newItem.amount > 0);
    },
    [itemId],
  );

  const onBuyProduct = () => {
    createShopOrder && createShopOrder([
      {
        itemId: item?.id || 0,
        amount: 1,
      },
    ],                                 +companyId, {
      onSuccess: () => {
        setRateModal(true);
      },
      onError: () => {
        notification.add({
          ...DEFAULT_NOTIFICATION_DATA,
          description: 'Не удалось оплатить товар',
          type: NotificationType.Danger,
        });
      },
    });
  };

  const onSendRating = () => {
    rating && createRating && createRating({
      entityType: 'SHOP_ITEM',
      entityUuid: item?.uuid || '',
      value: rating,
    },                                     {
      onSuccess: () => {
        setRateModal(false);
        history.push(`/${RouterPaths.SHOP}?type=my-orders`);
      },
    });
  };

  const onChangeBasket = () => {
    // @ts-ignore
    const newStorageItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE.SHOP_BASKET_ITEMS)) || [];
    if (item) {
      const newItem = {
        id: item.id,
        uuid: item.uuid,
        name: item.name,
        description: item.description,
        price: item.price,
        rating: item.rating,
        categoryName: item.categoryName,
        images: item.images,
      };
      const isInBasket = newStorageItems.findIndex((e: ShopType.IBasketItem) => e.item.id === itemId) !== -1;
      const newBasketItems = isInBasket ?
        newStorageItems.map((e: any)  => e.item.id === itemId ? (e.amount === 0 ?
          { amount: 1, item: newItem } : { amount: 0, item: newItem }) : e) :
          [...newStorageItems, { amount: 1, item: newItem }];
      localStorage.setItem(LOCAL_STORAGE.SHOP_BASKET_ITEMS, JSON.stringify(newBasketItems));
    }
    setFavorite(prevState => !prevState);
  };

  return (
    <Layout
      className="color_grey__bg"
    >
      {itemLoading ? <Loader className="mt-64" /> :
        <div className="shop-detail grid py-64">
          <Breadcrumb
            items={[
              { label: 'Магазин', link: addSlash(AdminRouterPaths.SHOP) },
              { label: item?.name || '' },
            ]}
          />

          <div className="d-flex justify-content-center pt-32">
            <div className="mr-40">
              <Slider
                photos={item?.images?.map(
                  e => ({ imgUrl: e.imageUrl || '', imgThumbnailUrl: e.imageThumbnailUrl || '' })) || []}
              />
            </div>

            <div className="shop-detail__card-wrap">
              <div className="shop-detail__card d-flex flex-column px-32 py-24">
                <Rate disabled value={item?.rating || 0} />
                <Typography variant="subtext" color="main_50" className="mt-16">Поездки</Typography>
                <Typography variant="textmed" className="mt-16">{item?.name || ''}</Typography>
                <span>
                  <Typography variant="text" className="mt-8">{showText(item?.description || '')}</Typography>
                  <Typography
                    variant="text"
                    color="main_50"
                    onClick={() => setShowAllText(!showAllText)}
                    className="cursor-pointer"
                  >
                    {item?.description ? (item?.description.length > 400 && `Показать ${showAllText ? 'меньше' : 'полностью'}`) : ''}
                  </Typography>
                </span>
                <div className="line mt-24" />
                <div className="d-flex align-items-center mt-32">
                <span>
                  <Typography variant="h1" className="mr-8">{item?.price || 0}</Typography>
                  <CoinIcon width={15} height={15} />
                </span>
                  <Typography
                    variant="subtext"
                    color="grey_additional_1"
                    className="ml-16"
                  >
                    Осталось призов: {item?.amount || 0}
                  </Typography>
                </div>
                <Button
                  variant="textmed"
                  className="mt-32"
                  onClick={onBuyProduct}
                >
                  Оплатить
                </Button>
                <div
                  className="d-flex align-items-center justify-content-center mt-24 mb-16"
                  onClick={onChangeBasket}
                  style={{ cursor: 'pointer' }}
                >
                  <FavoriteIcon
                    bordered
                    active={favorite}
                    className="shop-detail__card__favorite mr-8"
                  />
                  <Typography variant="subtext" color="main_50">
                    { favorite ? 'Удалить из корзины' : 'Добавить в корзину' }
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          {rateModal && (
            <Modal
              width={496}
              title="Понравился ли вам приз?"
              saveLabel="На главную"
              closeColor="#7A7B82"
              onSaveClick={onSendRating}
            >
              <div className="px-32">
                <Typography variant="text">
                  Пожалуйста, поставьте оценку
                </Typography>
                <Rate
                  className="mt-16"
                  value={rating}
                  onChange={setRating}
                />
              </div>
            </Modal>
          )}
          <div className="comments-theme mt-24">
            <Comments type="SHOP_ITEM" uuid={item?.uuid || ''} className="mt-32" />
          </div>
        </div>
      }
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  item: state.itemReducer.detailShop.data,
  itemLoading: state.itemReducer.detailShop.loading,
});

const mapDispatchToProps = {
  createRating,
  getItem: itemActions.getDetailShop,
  createShopOrder: itemActions.createShopOrder,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withNotificationProvider(ShopDetailGame)));
