import React from 'react';
import Layout from 'src/components/organisms/Layout';
import MarketplaceShellEducationDetail from 'src/components/organisms/MarketplaceShellEducationDetail';

function MarketplaceShellDetailedPage() {
  return (
    <Layout isAdminRouting className="color_grey__bg">
      <MarketplaceShellEducationDetail type="shell" />
    </Layout>
  );
}

export default MarketplaceShellDetailedPage;
