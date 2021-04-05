import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useNotification from 'src/components/molecules/Notification/useNotification';
import Typography from 'src/components/atoms/Typography';
import Pagination from 'src/components/atoms/Pagination';
import ModalLoading from 'src/components/atoms/ModalLoading';
import Button from 'src/components/atoms/Button';
import Checkbox from 'src/components/molecules/Checkbox';
import CardBasket from 'src/components/molecules/Cards/CardBasket';
import Modal from 'src/components/molecules/Modal';
import Image from 'src/components/atoms/Image';

import { getMoreLengthWithDots } from 'src/utils/values';
import { addSlash } from 'src/core/components/router';
import { RouterPaths } from 'src/core/enum';
import shopActions from 'src/store/item/actions';
import employmentActions from 'src/store/employment/actions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { ShopType } from 'src/pages/GamePages/Shop/ShopDetailPage/types';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { ShopBasketTypes } from 'src/components/organisms/ShopComponents/ShopBasket/types';
import ShopBasketContext from 'src/pages/GamePages/Shop/ShopContext';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import 'src/components/organisms/ShopComponents/ShopBasket/index.scss';

function ShopBasket(props: ShopBasketTypes.IProps) {

  const { createShopOrder, companyId, createdState, createdStateError, employment, getEmploymentByCompanyId } = props;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loader, setLoader] = useState<boolean>(false);
  const notification = useNotification();

  const { basketItems, setBasketItems } = useContext(ShopBasketContext);

  const onChangeBasketValue = (items: ShopType.IBasketItem[]) => {
    setBasketItems(items);
    localStorage.setItem(LOCAL_STORAGE.SHOP_BASKET_ITEMS, JSON.stringify(items));
  };

  const onChangeBasket = (amount: number, itemId: number) => {
    const newBasketItems = basketItems.map(e => e.item.id === itemId ?
      { amount, item: e.item, isSelected: e.isSelected } : e);
    onChangeBasketValue(newBasketItems);
  };

  const onSelectAll = (state: boolean) => {
    onChangeBasketValue(basketItems.map(e => ({ ...e, isSelected: state })));
  };

  const onDeleteItem = (id: number) => {
    const newItems = basketItems.filter(e => e.item.id !== id);
    onChangeBasketValue(newItems);
  };

  const onSelectItem = (id: number, state: boolean) => {
    const newItems = basketItems.map(e => e.item.id === id ? { ...e, isSelected: state } : e);
    onChangeBasketValue(newItems);
  };

  const onCheckoutOrder = () => {
    setLoader(true);
    createShopOrder && createShopOrder(basketItems.filter((el) => el.isSelected).map(e => ({
      amount: e.amount,
      itemId: e.item.id,
    })),                               companyId, {
      onSuccess: () => {
        setTimeout(() => {
          getEmploymentByCompanyId && getEmploymentByCompanyId(companyId, {
            onSuccess: () => {
              setLoader(false);
              setShowModal(true);
              onChangeBasketValue(basketItems.filter(e => !e.isSelected));
            },
            onError: () => {
              setLoader(false);
            },
          });
        },
                   3000);
      },
      onError: () => {
        setLoader(false);
      },
    });
  };

  useEffect(() => {
    getEmploymentByCompanyId && getEmploymentByCompanyId(companyId);
  },        []);

  useEffect(() => {
    if (createdStateError) {
      notification.add({
        ...DEFAULT_NOTIFICATION_DATA,
        type: NotificationType.Danger,
        description: +createdStateError === 89 ? 'Недостаточно монет!' : 'Нет в наличии!' });
    }
  },        [createdStateError]);

  return (
    <div className="shop-basket grid my-32">
      <Typography variant="h1">
        Корзина
        <Typography variant="text" className="ml-8">({basketItems.length || 0})</Typography>
      </Typography>
      {basketItems.length ? <Checkbox title="Выбрать все" className="mt-24" setClicked={onSelectAll} /> : ''}

      <div className="d-flex mt-16 justify-content-between">
        <div>
          {basketItems?.slice((page - 1) * 4, (page - 1) * 4 + 4).map(e => (
            <CardBasket
              key={e.item.id}
              id={e.item.id}
              category={e.item.categoryName || ''}
              title={e.item.name}
              description={e.item.description || ''}
              basketCount={e.amount}
              amount={e.item.amount}
              rewardAmount={e.item.price}
              imgSrc={e.item.images[0]?.imageUrl || ''}
              isChecked={e.isSelected}
              link={`${addSlash(RouterPaths.SHOP_DETAIL)}/${e.item.id}`}
              onChangeBasket={onChangeBasket}
              onDeleteCard={onDeleteItem}
              onSelectItem={onSelectItem}
              className="mb-16 shop-basket__card"
            />
          ))}
          {basketItems.length ? (
            <Pagination
              pageSize={4}
              total={basketItems.length || 1}
              className="mt-16 mb-48"
              page={page}
              onGetPage={setPage}
            />
          ) : ''}
        </div>
        <div className="shop-basket__pay-card px-16 py-20">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-around">
              <Typography variant="textmed">Количество призов</Typography>
              <Typography variant="textmed" className="mt-20">К оплате</Typography>
              <Typography variant="textmed" className="mt-20">Доступно</Typography>
            </div>
            <div className="d-flex flex-column justify-content-around align-items-end text-right">
              <div className="d-flex flex-column">
                <Typography variant="h1" color="main_50" className="mr-16">
                  {basketItems.filter((el) => el.isSelected).map(e => e.amount).reduce((a, b) => a + b, 0)}
                </Typography>
                <Typography variant="h1" color="main_50" className="mt-20 d-flex align-items-center">
                  {basketItems.filter((el) => el.isSelected)
                    .map(e => e.item.price * e.amount).reduce((a, b) => a + b, 0)}
                  <Image alt="coin icon" className="icon ml-4" src={CoinIcon} />
                </Typography>
              </div>
              <Typography variant="h1" color="main_50" className="mt-20 d-flex align-items-center">
                {employment?.rewardAvailable || 0}
                <Image alt="coin icon" className="icon ml-4" src={CoinIcon} />
              </Typography>
            </div>
          </div>
          <Button
            disabled={!basketItems.some((el) => el.isSelected)}
            variant="textmed"
            className="mt-32 shop-basket__pay-card__btn"
            onClick={onCheckoutOrder}
          >
            Оформить заказ
          </Button>
          <Typography variant="subtext" color="grey_additional_1" className="mt-12">
            Оформляя заказ, вы принимаете условия
          </Typography>
          <Typography variant="subtext" color="main_50" className="mt-4">
            Пользовательских соглашений.
          </Typography>
        </div>
      </div>
      {showModal && (
        <Modal
          title="Ваш заказ успешно оформлен!"
          onCloseClick={() => setShowModal(false)}
        >
          <div className="position-relative">
          <div className="p-32 shop-basket__modal-card-wrap">
            {createdState?.map((e, i) => (
              <div className="d-flex shop-basket__modal-card p-16 mb-16">
                <Image
                  className="shop-basket__modal-card__img"
                  alt="card image"
                  src={e.imageThumbnailUrl || ''}
                />
                <div className="d-flex flex-column ml-16">
                  <Typography variant="textmed">
                    {getMoreLengthWithDots(23, `${i + 1}. ${e.name || ''}`)}
                  </Typography>

                  <div>
                    <Typography variant="xsmall">
                      Статус заказа:
                      <Typography variant="xsmall" color="main_50" className="ml-4">
                        {e.status === 'PENDING' ? 'В обработке' : 'Доставлен'}
                      </Typography>
                    </Typography>
                  </div>
                  <Typography variant="xsmall" color="grey_additional_1" className="mt-4">
                    {getMoreLengthWithDots(30, e.description || '')}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
            <div className="px-32 py-24 position-sticky">
              <Button
                to={`${addSlash(RouterPaths.SHOP)}?type=my-orders`}
                variant="textmed"
                className="shop-basket__modal-card-button"
              >
                Мои заказы
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {loader && <ModalLoading/>}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  createdState: state.itemReducer.createdOrdersState.data,
  createdStateError: state.itemReducer.createdOrdersState.errorMessage,
  employment: state.employmentReducer.employment.data,
});

const mapDispatchToProps = {
  createShopOrder: shopActions.createShopOrder,
  getEmploymentByCompanyId: employmentActions.getEmploymentByCompanyId,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(ShopBasket);
