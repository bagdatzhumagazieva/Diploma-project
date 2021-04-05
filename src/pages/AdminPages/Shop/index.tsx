import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';

import Typography from 'src/components/atoms/Typography';
import Layout from 'src/components/organisms/Layout';
import Tabs from 'src/components/molecules/Tabs';
import Order from 'src/pages/AdminPages/Shop/Tabs/Order';
import Prize from 'src/pages/AdminPages/Shop/Tabs/Prize';
import { CONTENT_TABS } from 'src/pages/AdminPages/Shop/consts';
import { ShopTypes } from 'src/pages/AdminPages/Shop/types';
import 'src/pages/AdminPages/Shop/index.scss';

function Shop(props: ShopTypes.IProps) {

  const { location } = props;
  const { pathname } = location;
  const { type } = queryString.parse(location.search);
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [activeTab, setActiveTab] = useState<string>(CONTENT_TABS[0].id);

  const handleActiveTab = (id: string) => {
    setActiveTab(id);
  };

  const tabs = [
    <Prize companyId={companyId} />,
    <Order companyId={companyId} />,
  ];

  useEffect(
    () => {
      if (!type) return;
      setActiveTab(Array.isArray(type) ? type[0] : type);
    },
    [type],
  );

  return (
    <Layout
      isAdminRouting
      className="shop"
      childrenClassName="pos_relative"
    >
      <div className="d-flex flex-column py-48 grid">
        <Typography
          variant="headline"
        >
          Управление магазином
        </Typography>
        <Typography variant="subtext" color="grey_additional_2" className="mt-24">
          В данном разделе вы можете создавать, удалять и редактировать призы <br/> магазина.
        </Typography>
      </div>
      <Tabs
        pathname={pathname}
        key={activeTab}
        tabOptions={CONTENT_TABS}
        activeId={activeTab}
        setActiveTabId={handleActiveTab}
        contentClassName="color_grey__bg"
      >
        {tabs.map((item, index) => (
          <div key={CONTENT_TABS[index].id}>
            {item}
          </div>
        ))}
      </Tabs>
    </Layout>
  );
}

export default withRouter(Shop);
