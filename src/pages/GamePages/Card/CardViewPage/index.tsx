import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import cardActions from 'src/store/card/actions';
import { AdminRouterPaths } from 'src/core/enum';

import Preloader from 'src/components/atoms/Preloader';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Layout from 'src/components/organisms/Layout';
import CardView from 'src/components/organisms/CardView';

import { CardViewPageTypes } from 'src/pages/GamePages/Card/CardViewPage/types';

function CardViewPage(props: CardViewPageTypes.IProps) {
  const { id: cardId } = useParams();

  const { getCardFull, fullCardState } = props;
  const { data: fullCard, loading } = fullCardState || {};

  useEffect(
    () => {
      if (cardId) {
        getCardFull && getCardFull(+cardId);
      }
    },
    [cardId],
  );

  return (
    <Layout
      className="card-view-page"
    >
      <Breadcrumb
        className="py-48 grid"
        items={[
          { label: 'База знаний', link: `/${AdminRouterPaths.KNOWLEDGE_BASE}` },
          { label: 'Результаты поиска' },
          { label: fullCard?.name || '' },
        ]}
      />
      <div className="d-flex grid">
        <Preloader
          loading={loading}
          label="Карточка загружается"
          className="my-48 fill_w"
        >
          {fullCard && <CardView isShowCardImage card={fullCard} />}
        </Preloader>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  fullCardState: state.cardReducer.fullCard,
});

const mapDispatchToProps = {
  getCardFull: cardActions.getCardFull,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(CardViewPage);
