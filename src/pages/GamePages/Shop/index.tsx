import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Tabs from 'src/components/molecules/Tabs';
import Layout from 'src/components/organisms/Layout';
import ShopMyOrder from 'src/components/organisms/ShopComponents/ShopMyOrder';
import ShopContent from 'src/components/organisms/ShopComponents/Shop';
import ShopBasket from 'src/components/organisms/ShopComponents/ShopBasket';

import shopActions from 'src/store/item/actions';
import { CONTENT_TABS } from 'src/pages/GamePages/Shop/consts';
import { LOCAL_STORAGE } from 'src/core/store/values';
import ShopBasketContext from 'src/pages/GamePages/Shop/ShopContext';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { ShopType } from 'src/pages/GamePages/Shop/ShopDetailPage/types';
import { ITabOption } from 'src/components/molecules/Tabs/types';
import { ShopGameTypes } from 'src/pages/GamePages/Shop/types';

function Shop(props: ShopGameTypes.IProps) {

  const { history, location, getMyOrders, orders } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [basketItems, setBasketItems] = useState<ShopType.IBasketItem[]>([]);
  const value = { basketItems, setBasketItems };

  const tabs = [
    <ShopContent companyId={companyId} />,
    <ShopBasket companyId={companyId} />,
    <ShopMyOrder companyId={companyId} />,
  ];
  const [content, setContent] = useState<ITabOption[]>(CONTENT_TABS);
  const [activeTab, setActiveTab] = useState<string>(content[0].id);
  const { type } = queryString.parse(location.search);

  useEffect(() => {
    // @ts-ignore
    const newBasketItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE.SHOP_BASKET_ITEMS)) || [];
    setBasketItems(newBasketItems);
    getMyOrders && getMyOrders({ companyId, page: 1, page_size: 5 });
  },        []);

  useEffect(
    () => {
      if (!type) return;
      setActiveTab(Array.isArray(type) ? type[0] : type);
    },
    [type],
  );

  useEffect(() => {
    if (orders) {
      setContent([...content.map(e => e.id === 'my-orders' ? { ...e, label: `Мои заказы (${orders.total})` } :
        e.id === 'basket' ? { ...e, label: `Корзина (${basketItems.length})` } : e)]);
    }
  },        [orders, basketItems]);

  const handleActiveTab = (id: string) => {
    setActiveTab(id);
    history.push(`${location.pathname}?type=${id}`);
  };

  return (
    <ShopBasketContext.Provider value={value}>
      <Layout className="rating-page">
        <Tabs
          setActiveTabId= {handleActiveTab}
          tabOptions={content}
          activeId={activeTab}
          key={activeTab}
          className="flex-grow-1"
          contentClassName="color_grey__bg"
        >
          {activeTab === content[0].id ? tabs[0]
            : activeTab === content[1].id ? tabs[1] : tabs[2]}
        </Tabs>
      </Layout>
    </ShopBasketContext.Provider>
  );
}

const mapStateToProps = (state: any) => ({
  orders: state.itemReducer.myOrdersState.data,
});

const mapDispatchToProps = {
  getMyOrders: shopActions.getMyOrders,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Shop));
