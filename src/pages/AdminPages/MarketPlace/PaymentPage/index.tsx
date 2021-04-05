import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import marketplaceActions from 'src/store/marketplace/actions';
import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Arrow from 'src/components/atoms/Svg/Icons/Arrow';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Typography from 'src/components/atoms/Typography';
import CardBadge from 'src/components/atoms/Cards/CardBadge';
import Rate from 'src/components/atoms/Rate';
import Icons from 'src/components/molecules/Cards/CardMicroLearning/consts';
import Layout from 'src/components/organisms/Layout';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import DoneLogo from 'src/assets/img/logos/done.svg';
import Logo from 'src/assets/img/logos/orange_logo.svg';
import 'src/pages/AdminPages/MarketPlace/PaymentPage/index.scss';
import { PaymentTypes } from 'src/pages/AdminPages/MarketPlace/PaymentPage/types';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import Loader from 'src/components/atoms/Loader';
import useNotification from 'src/components/molecules/Notification/useNotification';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { NotificationType } from 'src/components/molecules/Notification/types';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

function PaymentPage(props: PaymentTypes.IProps) {
  const { createOrder, marketplaceItemDetail, marketplaceItemDetailLoading, getItemDetail } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [showModal, setShowModal] = useState<boolean>(false);
  const { id } = useParams();
  const itemId = id ? +id : -1;
  const notification = useNotification();

  const onCreateOrder = () => {
    createOrder && createOrder({ amount: 1, itemId }, companyId, {
      onSuccess: () => {
        setShowModal(true);
      },
      onError: () => {
        notification.add({
          ...DEFAULT_NOTIFICATION_DATA,
          description: 'Не удалось заказать товар',
          type: NotificationType.Danger,
        });      },
    });
  };

  useEffect(() => {
    if (itemId === -1) return;
    getItemDetail && getItemDetail(companyId, itemId);
  },        [itemId]);

  return (
    showModal && marketplaceItemDetail ? (
      <div className="payment-modal grid">
        <Image
          src={Logo}
          alt="gamisoft"
        />
        <div className="d-flex p-16 flex-column align-items-center payment-modal__body">
          <Image alt="done" src={DoneLogo}/>
          <Typography variant="h1" className="mt-24 text-center">
            Оболочка успешно добавлена в список <br/>доступных.
          </Typography>
          <div className="d-flex p-16 mt-64 payment-modal__body__card">
            <Image alt="marketplace image" src={marketplaceItemDetail.images[0].imageUrl || ''} className="payment-modal__body__card__img" />
            <div className="d-flex flex-column ml-16">
              <Typography variant="textmed">{marketplaceItemDetail.name}</Typography>
              <Typography variant="xsmall" color="grey_additional_2" className="mt-8">
                {marketplaceItemDetail.description}
              </Typography>
              <Typography variant="xsmall" color="main_50" className="mt-16">
                {marketplaceItemDetail.categoryName}
              </Typography>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center fill_w mt-24">
            <Button variant="textmed" to={addAdminSlash(AdminRouterPaths.MARKETPLACE)}>
              Продолжить покупки
            </Button>
            <div className="d-flex mt-16 align-items-center">
              <Button
                type="link"
                variant="textmed"
                className="mr-12"
                to={marketplaceItemDetail.itemEntityType === 'GAME_TEMPLATE' ?
                  addAdminSlash(AdminRouterPaths.GAME_CREATION) :
                  addAdminSlash(AdminRouterPaths.COURSE_CREATION)
                }
              >
                К созданию {marketplaceItemDetail.itemEntityType === 'GAME_TEMPLATE' ? 'игры' : 'курса'}
              </Button>
              <Arrow
                direction="right"
                color={'#FF9800'}
              />
            </div>
          </div>
        </div>
      </div>
      ) : (
        <Layout isAdminRouting className="color_grey__bg">
          {marketplaceItemDetailLoading && <Loader className="mt-64" /> }
          {marketplaceItemDetail && !marketplaceItemDetailLoading && (
            <div className="payment grid mb-48">
              <Breadcrumb
                className="py-48"
                items={[
                  { label: 'Marketplace', link: addAdminSlash(AdminRouterPaths.MARKETPLACE) },
                  { label: marketplaceItemDetail.itemEntityType === 'GAME_TEMPLATE' ? 'Оболочки' : 'Контент',
                    link: marketplaceItemDetail.itemEntityType === 'GAME_TEMPLATE' ?
                      addAdminSlash(AdminRouterPaths.MARKETPLACE) :
                      addAdminSlash(`${AdminRouterPaths.MARKETPLACE}?type=content`),
                  },
                  { label: marketplaceItemDetail.name },
                ]}
              />
              <Typography variant="headline">Заказ продукта</Typography>
              <div className="d-flex mt-32">
                <div className="payment__card p-16">
                  <div className="d-flex align-items-center">
                    <Arrow
                      direction="left"
                      color={'#FF9800'}
                    />
                    <Button
                      type="link"
                      to={marketplaceItemDetail.itemEntityType === 'GAME_TEMPLATE' ?
                        `${addAdminSlash(AdminRouterPaths.MARKETPLACE_DETAILED)}/${marketplaceItemDetail.entityId}` :
                        `${addAdminSlash(AdminRouterPaths.MARKETPLACE_EDUCATION_DETAIL)}/${marketplaceItemDetail.entityId}`}
                      variant="subtext"
                      className="ml-12"
                    >
                      Отмена
                    </Button>
                  </div>
                  <div className="d-flex mt-32">
                    <Image
                      alt="marketplace image"
                      src={marketplaceItemDetail.images[0]?.imageThumbnailUrl || ''}
                      className="payment__card__img"
                    />
                    <div className="d-flex flex-column ml-16">
                      <Typography variant="textmed">{marketplaceItemDetail.name}</Typography>
                      <Typography variant="text" className="mt-8">
                        {marketplaceItemDetail.description}
                      </Typography>
                      <div className="d-flex align-items-center mt-12">
                        <div className="d-flex align-items-center">
                          <Rate value={marketplaceItemDetail.rating || 0} small />
                          <Typography variant="text" className="ml-4">{marketplaceItemDetail.rating || 0}</Typography>
                        </div>
                        <CardBadge
                          icon={Icons.CommentIcon}
                          title={`${marketplaceItemDetail.commentsAmount || 0}`}
                          className="ml-42"
                        />
                      </div>
                      <Typography variant="h2" className="mt-20">{marketplaceItemDetail.price}</Typography>
                    </div>
                  </div>
                  <div className="line my-24"/>
                  <div className="d-flex align-items-center justify-content-between payment__card__btn-wrapper">
                    <div className="d-flex align-items-center p-16">
                      <Typography variant="text" color="grey_additional_1">Итого</Typography>
                      <Typography variant="h1" className="ml-16">{marketplaceItemDetail.price}&nbsp;₸</Typography>
                    </div>
                    <Button
                      variant="textmed"
                      className="payment__card__btn"
                      onClick={onCreateOrder}
                    >
                      Заказать
                    </Button>
                  </div>
                  <Typography variant="subtext" color="grey_additional_1" className="mt-24">
                    Цена указана с учетом НДС в применимых случаях
                  </Typography>
                </div>
                <div className="payment__card-instruction ml-24 p-16">
                  <Typography variant="text" color="grey_additional_1">
                    Нажмите "Оплатить", чтобы перейти на сайт сторонней платежной системы
                    и завершить оформление покупки. При этом будут применены
                    Условия выбранной вами системы.
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </Layout>
      )
  );
}

const mapStateToProps = (state: any) => ({
  marketplaceItemDetail: state.marketplaceReducer.marketplaceItemDetail.data,
  marketplaceItemDetailLoading: state.marketplaceReducer.marketplaceItemDetail.loading,
});

const mapDispatchToProps = {
  createOrder: marketplaceActions.createOrder,
  getItemDetail: marketplaceActions.getItemDetail,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(PaymentPage));
