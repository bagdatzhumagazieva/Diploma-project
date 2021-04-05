import React, { useState } from 'react';

import Typography from 'src/components/atoms/Typography';
import Tabs from 'src/components/molecules/Tabs';
import Layout from 'src/components/organisms/Layout';
import AllNotifications from 'src/components/organisms/AllNotifications';
import UnReadNotification from 'src/components/organisms/UnReadNotification';

import { NOTIFICATION_TABS } from 'src/pages/GamePages/Notification/consts';

function NotificationPage() {
  const [activeTab, setActiveTab] = useState<string>('0');

  const tabs = [
    <AllNotifications />,
    <UnReadNotification />,
  ];

  return (
    <Layout className="notification-page">
      <Typography variant="headline py-48 grid">Уведомления</Typography>
      <Tabs
        key={activeTab}
        tabOptions={NOTIFICATION_TABS}
        activeId={activeTab}
        setActiveTabId={(id: string) => setActiveTab(id)}
        contentClassName="color_grey__bg pt-32 pb-48"
      >
        {tabs.map((item, index) => (
          <div
            key={NOTIFICATION_TABS[index].id}
            className="notification-page__content"
          >
            {item}
          </div>
        ))}
      </Tabs>
    </Layout>
  );
}

export default NotificationPage;
