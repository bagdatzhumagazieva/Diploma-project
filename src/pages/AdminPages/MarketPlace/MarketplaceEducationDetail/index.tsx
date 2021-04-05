import React from 'react';
import Layout from 'src/components/organisms/Layout';
import MarketplaceShellEducationDetail from 'src/components/organisms/MarketplaceShellEducationDetail';

function MarketplaceEducationDetailedPage() {
  return (
    <Layout isAdminRouting className="color_grey__bg">
      <MarketplaceShellEducationDetail type="education" />
    </Layout>
  );
}

export default MarketplaceEducationDetailedPage;
