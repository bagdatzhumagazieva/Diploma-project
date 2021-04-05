import React from 'react';
import Layout from 'src/components/organisms/Layout';
import CardCreation from 'src/components/organisms/CardCreation';
import { CardCreationPageTypes } from 'src/pages/AdminPages/Card/CardCreationPage/types';
import 'src/pages/AdminPages/Card/CardCreationPage/index.scss';

function CardCreationPage(props: CardCreationPageTypes.IProps) {
  return (
    <Layout
      isAdminRouting
      classNames="card-creation-page"
    >
      <CardCreation type="create" />
    </Layout>
  );
}

export default CardCreationPage;
