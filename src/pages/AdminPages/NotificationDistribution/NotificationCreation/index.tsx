import React from 'react';
import Layout from 'src/components/organisms/Layout';
import NotificationCreationEdition from 'src/components/organisms/NotificationCreationEdition';

function NotificationCreation() {

  return (
    <Layout isAdminRouting>
      <NotificationCreationEdition type="create" />
    </Layout>
  );
}

export default NotificationCreation;
