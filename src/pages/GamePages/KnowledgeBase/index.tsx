import React from 'react';
import Layout from 'src/components/organisms/Layout';
import UserCards from 'src/components/organisms/AdminCards/UserCards.index';
import './index.scss';

function KnowledgeBase() {
  return (
    <Layout className="knowledge-base-page">
      <UserCards />
    </Layout>
  );
}

export default KnowledgeBase;
