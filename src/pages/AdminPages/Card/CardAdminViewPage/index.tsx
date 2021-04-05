import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import cardActions from 'src/store/card/actions';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';

import Button from 'src/components/atoms/Button';
import Preloader from 'src/components/atoms/Preloader';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import Layout from 'src/components/organisms/Layout';
import CardView from 'src/components/organisms/CardView';

import { NotificationType } from 'src/components/molecules/Notification/types';
import { CardAdminViewPageTypes } from 'src/pages/AdminPages/Card/CardAdminViewPage/types';
import { ReactComponent as IconEdit } from 'src/assets/img/icons/edit.svg';
import { ReactComponent as IconDelete } from 'src/assets/img/icons/delete.svg';
import 'src/pages/AdminPages/Card/CardAdminViewPage/index.scss';

function CardAdminViewPage(props: CardAdminViewPageTypes.IProps) {
  const { id: cardId } = useParams();
  const history = useHistory();
  const notification = useNotification();

  const { getCardFull, fullCardState, deleteCard, deletedCardState } = props;
  const { data: fullCard, loading } = fullCardState || {};

  const [isDeleteCardModalOpen, setDeleteCardModal] = useState<boolean>(false);

  useEffect(
    () => {
      if (cardId) {
        getCardFull && getCardFull(+cardId);
      }
    },
    [cardId],
  );

  useEffect(
    () => {
      if (deletedCardState) {
        notification.addStateNotification(deletedCardState);
        if (deletedCardState.responseType === NotificationType.Success) {
          history.push(addAdminSlash(AdminRouterPaths.KNOWLEDGE_BASE));
        }
      }
    },
    [deletedCardState],
  );

  const onDeleteCard = () => {
    deleteCard && cardId && deleteCard(+cardId);
  };

  return (
    <Layout
      isAdminRouting
      classNames="card-view-page"
      childrenClassName="color_grey__bg"
    >
      <div className="grid">
        <Breadcrumb
          className="py-48"
          items={[
            { label: 'База знаний', link: addAdminSlash(AdminRouterPaths.KNOWLEDGE_BASE) },
            { label: 'Результаты поиска' },
            { label: fullCard?.name || '' },
          ]}
        />
        <div className="grid d-flex align-items-center mb-16">
          <Link
            to={`${addAdminSlash(AdminRouterPaths.CARD_EDIT)}/${cardId}`}
            className="d-flex align-items-center"
          >
            <IconEdit className="card-view-page__edit-icon" />
            <Typography
              variant="subtext"
              color="main_50"
              className="ml-8"
            >
              Отредактировать карточку
            </Typography>
          </Link>
          <Button
            type="plain"
            className="d-flex align-items-center ml-32"
            onClick={() => setDeleteCardModal(true)}
          >
            <IconDelete className="card-view-page__delete-icon" />
            <Typography
              variant="subtext"
              color="red"
              className="ml-8"
            >
              Удалить
            </Typography>
          </Button>
        </div>
        <Preloader
          loading={loading}
          label="Карточка загружается"
          className="my-48"
        >
          {fullCard && <CardView isShowCardImage className="card-view-page__card " card={fullCard} />}
        </Preloader>
      </div>
      {isDeleteCardModalOpen && (
        <Modal
          title="Удаление карточки"
          deleteLabel="Удалить"
          cancelLabel="Отмена"
          onCloseClick={() => setDeleteCardModal(false)}
          onDeleteClick={onDeleteCard}
        >
          <div className="mx-32">
            <Typography
              variant="text"
              className="mb-24 d-block"
            >
              Вы действительно хотите удалить данную карточку?
            </Typography>
            <Typography variant="text">
              Данная карточка была задействована в других ресурсах данного сервиса.
            </Typography>
          </div>
        </Modal>
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => {
  return ({
    fullCardState: state.cardReducer.fullCard,
    deletedCardState: state.cardReducer.deletedCardState.data,
  });
};

const mapDispatchToProps = {
  getCardFull: cardActions.getCardFull,
  deleteCard: cardActions.deleteCard,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(CardAdminViewPage));
