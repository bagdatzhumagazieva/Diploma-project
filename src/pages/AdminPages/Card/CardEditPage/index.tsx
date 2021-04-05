import React from 'react';
import { useParams } from 'react-router';
import Layout from 'src/components/organisms/Layout';
import { CardEditPageTypes } from 'src/pages/AdminPages/Card/CardEditPage/types';
import CardEdition from 'src/components/organisms/CardEdition/index';
import 'src/pages/AdminPages/Card/CardEditPage/index.scss';

function CardEditPage(props: CardEditPageTypes.IProps) {
  const { id } = useParams();

  return (
    <Layout
      isAdminRouting
      classNames="card-edit-page"
    >
      {id && <CardEdition cardId={+id} />}
    </Layout>
  );
}

export default CardEditPage;
