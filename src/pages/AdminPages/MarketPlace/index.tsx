import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import queryString from 'query-string';

import Typography from 'src/components/atoms/Typography';
import Tabs from 'src/components/molecules/Tabs';
import Layout from 'src/components/organisms/Layout';
import MarketPlaceEducationContent from 'src/pages/AdminPages/MarketPlace/Tabs/MarketplaceEducationContent';
import MarketPlaceShell from 'src/pages/AdminPages/MarketPlace/Tabs/MarketPlaceShell';
import MarketplaceOrder from 'src/pages/AdminPages/MarketPlace/Tabs/MarketplaceOrder';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';

import { MARKETPLACE_TABS } from 'src/pages/AdminPages/MarketPlace/consts';
import 'src/pages/AdminPages/MarketPlace/index.scss';

function MarketPlace() {
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const { type } = queryString.parse(location.search);
  const [activeTab, setActiveTab] = useState<string>(MARKETPLACE_TABS[0].id);
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  useEffect(
    () => {
      if (!type) return;
      setActiveTab(Array.isArray(type) ? type[0] : type);
    },
    [type],
  );

  const tabs = [
    <MarketPlaceShell companyId={companyId} />,
    <MarketPlaceEducationContent companyId={companyId} />,
    <MarketplaceOrder companyId={companyId} />,
  ];

  return (
    <Layout
      isAdminRouting
      className="marketplace"
      childrenClassName="pos_relative"
    >
      <div className="marketplace-info grid py-48">
        <Typography
          variant="headline"
        >
          Marketplace
        </Typography>
        <div className="marketplace-info__content">
          <Typography variant="subtext">
            В данном разделе вы можете приобрести новую оболочку для игр или
          </Typography>
          <Typography variant="subtext">
            учебный контент для игр и курсов.
          </Typography>
        </div>
      </div>
      <Tabs
        pathname={pathname}
        key={activeTab}
        tabOptions={MARKETPLACE_TABS}
        setActiveTabId={setActiveTab}
        activeId={activeTab}
        className="flex-grow-1"
        contentClassName="color_grey__bg"
      >
        {tabs.map((item, index) => (
          <div key={MARKETPLACE_TABS[index].id}>
            {item}
          </div>
        ))}
      </Tabs>
    </Layout>
  );
}

export default MarketPlace;
