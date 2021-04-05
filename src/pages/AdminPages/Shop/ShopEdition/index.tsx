import React from 'react';
import ShopCreationEdition from 'src/components/organisms/ShopCreationEdition';
import Layout from 'src/components/organisms/Layout';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { useHistory } from 'react-router';

function ShopEdition() {

  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || undefined;
  const history = useHistory();
  const itemId = history.location.pathname.split('/').pop() || '';

  return (
    <Layout
      isAdminRouting
      className="color_grey__bg"
    >
      {companyId && <ShopCreationEdition type="edit" companyId={+companyId} itemId={typeof +itemId === 'number' ? +itemId : undefined  }
      />}
    </Layout>
  );
}

export default ShopEdition;
