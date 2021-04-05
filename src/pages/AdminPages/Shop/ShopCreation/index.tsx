import React from 'react';
import Layout from 'src/components/organisms/Layout';
import ShopCreationEdition from 'src/components/organisms/ShopCreationEdition';
import { LOCAL_STORAGE } from 'src/core/store/values';

function ShopCreation() {
  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || undefined;

  return (
    <Layout
      isAdminRouting
      className="color_grey__bg"
    >
      {companyId && <ShopCreationEdition type="create" companyId={+companyId} />}
    </Layout>
  );
}

export default ShopCreation;
