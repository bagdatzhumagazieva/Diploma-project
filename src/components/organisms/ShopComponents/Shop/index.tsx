import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Typography from 'src/components/atoms/Typography';
import Pagination from 'src/components/atoms/Pagination';
import Loader from 'src/components/atoms/Loader';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import CardPrize from 'src/components/molecules/Cards/CardPrize';
import Select from 'src/components/molecules/Select';
import useNotification from 'src/components/molecules/Notification/useNotification';

import shopActions from 'src/store/item/actions';
import { addSlash } from 'src/core/components/router';
import { RouterPaths } from 'src/core/enum';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import { ShopContentTypes } from 'src/components/organisms/ShopComponents/Shop/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ShopGamePrizeTypes } from 'src/store/item/types';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import ShopBasketContext from 'src/pages/GamePages/Shop/ShopContext';
import { PrizeSort } from 'src/components/organisms/ShopComponents/Shop/const';
import employmentActions from 'src/store/employment/actions';

import 'src/components/organisms/ShopComponents/Shop/index.scss';

function ShopContent(props: ShopContentTypes.IProps) {

  const { getPrizes, companyId, prizes, history, location, prizeLoading, employment, getEmploymentByCompanyId } = props;
  const pageSize = 9;
  const notification = useNotification();

  const [prizeTypes, setPrizeTypes] = useState<ShopContentTypes.IType[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<IOption>(PrizeSort[0]);
  const { page, categoryId } = queryString.parse(location.search);
  const [curType, setCurType] = useState<number>(categoryId ? +categoryId : 0);
  const DEFAULT_PARAMS = { companyId, page: page ? +page : 1, page_size: pageSize };
  const [bodyParams, setBodyParams] = useState<ShopGamePrizeTypes.IQueryProps>(DEFAULT_PARAMS);

  const { basketItems, setBasketItems } = useContext(ShopBasketContext);

  useEffect(() => {
    getPrizes && getPrizes(bodyParams);
    getEmploymentByCompanyId && getEmploymentByCompanyId(companyId);
  },        []);

  useEffect(() => {
    if (prizes?.categories) {
      const allPrize = {
        id: 0,
        title: 'Все',
        count: prizes?.categories.map(e => e.total).reduce((a, b) => a + b, 0) || 0,
      };
      setPrizeTypes([
        allPrize,
        ...prizes?.categories.map((e) => ({
          id: e.categoryId,
          title: e.categoryName,
          count: e.total,
        }))]);
    }
  },        [prizes]);

  const onChangeBasket = (type: 'add' | 'drop', amount: number, itemId: number) => {
    const newItem = prizes?.prizes.find(e => e.id === itemId);
    const isConsist = basketItems.find(e => e.item.id === itemId);
    if (newItem) {
      const newBasketItems = !isConsist ? [...basketItems, { amount, item: newItem }]
        : (type === 'drop' && !amount) ? basketItems.filter(b => b.item.id !== itemId)
          :basketItems.map(e => e.item.id === itemId ? { amount, item: newItem } : e);
      setBasketItems(newBasketItems);
      localStorage.setItem(LOCAL_STORAGE.SHOP_BASKET_ITEMS, JSON.stringify(newBasketItems));
    }
    if (amount === 1 && type === 'add') {
      notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Приз добавлен в корзину' });
    }
  };

  const onPaginationPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page });
    history.push(`${location.pathname}?page=${page}`);
    getPrizes && getPrizes({ ...bodyParams, page });
  };

  const onCLickType = (type: ShopContentTypes.IType) => {
    setCurType(type.id);
    history.push(`${location.pathname}?page=${bodyParams.page}&categoryId=${type.id}`);
    if (!type.id) {
      setBodyParams(DEFAULT_PARAMS);
      getPrizes && getPrizes(DEFAULT_PARAMS);
    } else {
      const newParams = {
        ...bodyParams,
        categoryIds: [type.id],
      };
      getPrizes && getPrizes(newParams);
      setBodyParams(newParams);
    }
  };

  const onSelectSort = (option: IOption) => {
    setSelectedSort(option);
    if (option === PrizeSort[0]) {
      setBodyParams(DEFAULT_PARAMS);
      getPrizes && getPrizes(DEFAULT_PARAMS);
    } else {
      const newParams = {
        ...bodyParams,
        sortBy: option === PrizeSort[3] ? 'price' : option.value,
        desc: option === PrizeSort[3],
      };
      setBodyParams(newParams);
      getPrizes && getPrizes(newParams);
    }
  };

  return (
    <div className="shop-content">
      <div className="shop-content__header">
        <div className="grid  d-flex justify-content-between py-48 px-24">
          <Typography variant="headline">Магазин</Typography>
          <div className="d-flex">
            <div className="d-flex align-items-center">
              <Image alt="coin icon" src={CoinIcon} classNames="coins__image ml-4"/>
              <span className="d-flex flex-column ml-8">
              <Typography variant="subtext" color="grey_additional_2">Монет доступно</Typography>
              <Typography
                variant="h1"
                color="main_50"
                onClick={() => setBodyParams(bodyParams)}
              >
                {employment?.rewardAvailable || 0}
              </Typography>
            </span>
            </div>
            <div className="d-flex flex-column ml-32">
              <Typography variant="subtext" color="grey_additional_2">Всего заработано</Typography>
              <Typography variant="h1">
                {employment?.rewardAmount || 0}
              </Typography>
            </div>
            <div className="d-flex flex-column ml-32">
              <Typography variant="subtext" color="grey_additional_2">Всего потрачено</Typography>
              <Typography variant="h1">
                {(employment?.rewardAmount || 0) - (employment?.rewardAvailable || 0) || 0}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <Typography variant="h1" className="mt-32">Призы</Typography>
        <div className="d-flex align-items-baseline">
          <div className="shop-content__type-wrap mt-8">
            {prizeTypes.slice(0, showAll ? prizeTypes.length : 5).map(type => (
              <Button
                key={type.id}
                variant="subtext"
                color="grey_additional_2"
                className={classNames(
                  'shop-content__type__button mr-16 py-8 px-20 mt-16',
                  { 'shop-content__type__button--active': curType === type.id },
                )}
                onClick={() => onCLickType(type)}
              >
                {`${type.title} (${type.count})`}
              </Button>
            ))}
            {prizeTypes.length > 0 && (
              <Button
                variant="subtext"
                className="mr-16 py-8 mt-16"
                type="link"
                onClick={() => setShowAll(!showAll)}
                color="main_50"
              >
                {!showAll ? 'Все' : 'Скрыть'}
              </Button>
            )}
          </div>
          <div className="d-flex align-items-center">
            <Typography
              variant="subtext"
              className="mr-8"
              color="grey_additional_2"
            >
              Сортировка:
            </Typography>
            <Select
              staticWidth
              width={154}
              options={PrizeSort}
              selectedOption={selectedSort}
              setSelectedOption={onSelectSort}
              className="color_grey__bg"
            />
          </div>
        </div>

        {prizeLoading ? (
            <Loader className="mt-48" size={40} />
          ) :
          <div className="shop-content__cards d-flex flex-wrap">
            {prizes?.prizes.map((e, i) => {
              const basketCount = basketItems.find(n => n.item.id === e.id);
              return (
                <CardPrize
                  key={e.id}
                  id={e.id}
                  amount={e.amount}
                  title={e.name || ''}
                  reward={e.price || 0}
                  rating={e.rating || 0}
                  imgSrc={e.images[0]?.imageUrl || ''}
                  basketCount={basketCount?.amount || 0}
                  onChangeBasket={onChangeBasket}
                  link={`${addSlash(RouterPaths.SHOP_DETAIL)}/${e.id}`}
                  className="shop-content__cards__item mt-24"
                />
              );
            })}
          </div>
        }
        <Pagination
          pageSize={pageSize}
          total={prizes?.total || pageSize}
          className="mt-16 mb-48"
          page={bodyParams.page}
          onGetPage={onPaginationPageClick}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  prizes: state.itemReducer.gamePrizes.data,
  employment: state.employmentReducer.employment.data,
  prizeLoading: state.itemReducer.gamePrizes.loading,
});

const mapDispatchToProps = {
  getPrizes: shopActions.getPrizes,
  getEmploymentByCompanyId: employmentActions.getEmploymentByCompanyId,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ShopContent));
