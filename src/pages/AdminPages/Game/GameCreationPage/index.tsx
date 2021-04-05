import React from 'react';

import Layout from 'src/components/organisms/Layout';
import GameCreationEdition from 'src/components/organisms/GameCreationEdition';
import { LOCAL_STORAGE } from 'src/core/store/values';

function GameCreationPage() {
  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || undefined;

  return (
    <Layout isAdminRouting className="color_grey_background__bg" childrenClassName="pb-48">
      {companyId && <GameCreationEdition type="create" companyId={+companyId} />}
    </Layout>
  );
}

export default GameCreationPage;
