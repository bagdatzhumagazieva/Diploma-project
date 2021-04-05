import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import useNotification from 'src/components/molecules/Notification/useNotification';
import cardActions from 'src/store/card/actions';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import CardSearch from 'src/components/organisms/CardSearch';
import FilterTags from 'src/components/organisms/FilterTags';
import { IOption } from 'src/components/molecules/Select/types';
import { AdminCardsTypes } from 'src/components/organisms/AdminCards/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { CardSortOptions, CardSortParams } from 'src/components/organisms/AdminCards/consts';
import { ExampleAlphabet } from 'src/components/organisms/FilterTags/mocks';
import IconPlus from 'src/assets/img/icons/plus.svg';
import 'src/components/organisms/AdminCards/index.scss';

function AdminCards(props: AdminCardsTypes.IProps) {
  const {
    createdCardState, deletedCardState, updatedCardState,
    clearCardState, companyId,
  } = props;
  const notification = useNotification();

  const [selectedSort, setSelectedSort] = useState<IOption>(CardSortOptions[0]);
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(
    () => {
      if (createdCardState) {
        notification.addStateNotification(createdCardState);
      }
      if (deletedCardState) {
        notification.addStateNotification(deletedCardState);
      }
      if (updatedCardState) {
        notification.addStateNotification(updatedCardState);
      }
    },
    [createdCardState, deletedCardState, notification, updatedCardState],
  );

  useEffect(
    () => {
      clearCardState && clearCardState();
      return () => {
        clearCardState && clearCardState();
      };
    },
    [clearCardState],
  );

  return (
    <div className="admin-cards">
      <div className="admin-cards__header d-flex align-items-center">
        <Typography variant="headline">
          Карточки
        </Typography>
        <div className="d-flex align-items-center ml-auto">
          <FilterTags
            alphabet={ExampleAlphabet}
            companyId={companyId}
            handleTags={setTags}
          />
          <Typography
            variant="subtext"
            className="ml-20 mr-8"
            color="grey_additional_2"
          >
            Сортировка:
          </Typography>
          <Select
            staticWidth
            classNames="admin-cards__sort"
            options={CardSortOptions}
            selectedOption={selectedSort}
            setSelectedOption={setSelectedSort}
          />
        </div>
        <Button
          className="d-flex align-items-center py-14 px-24 admin-cards__create-btn"
          variant="textmed"
          to={addAdminSlash(AdminRouterPaths.CARD_CREATION)}
        >
          <Image
            src={IconPlus}
            alt="add card"
            className="mr-8"
          />
          Создать карточку
        </Button>
      </div>
      <CardSearch
        asAdmin
        tags={tags}
        additionalParams={{
          ...CardSortParams[selectedSort.value],
          tagIds: tags.map(n => n.id),
        }}
        companyId={companyId}
        className="color_whiter__bg"
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  createdCardState: state.cardReducer.createdCardState.data,
  deletedCardState: state.cardReducer.deletedCardState.data,
  updatedCardState: state.cardReducer.updatedCardState.data,
});

const mapDispatchToProps = {
  clearCardsState: cardActions.clearCardsState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminCards);
