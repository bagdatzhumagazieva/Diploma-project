import React from 'react';
import { useHistory } from 'react-router';

import Layout from 'src/components/organisms/Layout';
import GameCreationEdition from 'src/components/organisms/GameCreationEdition';
import { LOCAL_STORAGE } from 'src/core/store/values';

function GameEditionPage() {
  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || undefined;
  const history = useHistory();
  const gameId = history.location.pathname.split('/').pop() || '';

  if (window.performance) {
    if (performance.navigation.type === 1) {
      if (history.location.state) {
        history.replace({ ...history.location, state: undefined });
      }
    }
  }
  return (
    <Layout isAdminRouting className="color_grey_background__bg" childrenClassName="pb-48">
      {companyId && (
        <GameCreationEdition
          type="edit"
          companyId={+companyId}
          gameId={parseInt(gameId, 10)}
        />
      )}
    </Layout>
  );
}

export default GameEditionPage;
