import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useVisibility from 'src/hooks/useVisibility';

import { getCategories, clearCategoriesState } from 'src/store/category/actions';
import { getCards } from 'src/store/card/actions';

import TreeSelect from 'src/components/molecules/TreeSelect';
import Typography from 'src/components/atoms/Typography';
import SearchCard from 'src/components/molecules/SearchCard';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import { ModalCardAdditionTypes } from 'src/components/organisms/ModalCardAddition/types';
import { parseCategoriesToTreeSelect, CATEGORY_ALL_VARIANT } from 'src/components/organisms/ModalCardAddition/consts';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import 'src/components/organisms/ModalCardAddition/index.scss';
import { CardTypes } from 'src/store/card/types';

function ModalCardAddition(props: ModalCardAdditionTypes.IProps) {
  const {
    companyId, categoriesNextPage, categories = [],
    getCategories, cards = [], getCards, clearCategoriesState,
    categoriesLoading, getSelectedCard, cardsNextPage, cardsCurPage,
    cardsLoading = false, cardError,
  } = props;
  const [searchedKeyword, setSearchedKeyword] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ITreeOption>(CATEGORY_ALL_VARIANT);
  const [curCategories, setCurCategories] = useState<ITreeOption[]>([CATEGORY_ALL_VARIANT]);
  const [curCards, setCurCards] = useState<CardTypes.IRenderProps[]>([]);
  const categoriesPageSize = 15;
  const cardsPageSize = 10;

  const lastItemCategory = useVisibility(
    (visible) => {
      if (visible && categoriesNextPage) {
        getCategories && getCategories(companyId, categoriesNextPage, categoriesPageSize);
      }
    },
    [categoriesNextPage],
  );

  const lastItemCardRef = useVisibility(
    (visible) => {
      if (visible && cardsNextPage) {
        getCards && getCards(
          {
            companyId,
            keyword: searchedKeyword,
            categoryId: selectedCategory && +selectedCategory.value,
            page: cardsNextPage,
            pageSize: cardsPageSize ,
          },
        );
      }
    },
    [cardsNextPage],
  );

  useEffect(
    () => {
      getCategories && getCategories(companyId, 1, categoriesPageSize);
      return () => {
        clearCategoriesState && clearCategoriesState();
      };
    },
    [],
  );

  useEffect(
    () => {
      if (!categories) return;
      setCurCategories((prevState) =>  {
        const newCat = categories.map((item, index) => parseCategoriesToTreeSelect(
          item, (index === categories.length - 1) ? lastItemCategory : undefined,
        ));
        return [...prevState, ...newCat];
      });
    },
    [categories],
  );

  useEffect(
    () => {
      getCards && getCards(
        {
          companyId,
          keyword: searchedKeyword,
          categoryId: selectedCategory && +selectedCategory.value,
          page: 1,
          pageSize: cardsPageSize,
        },
      );
    },
    [searchedKeyword, selectedCategory],
  );

  useEffect(
    () => {
      if (!Array.isArray(cards)) return;
      if (cardsCurPage === 1) {
        setCurCards(cards);
      } else {
        setCurCards(prevState => [...prevState, ...cards]);
      }
    },
    [cards],
  );

  return (
    <div className="px-24 modal-card-addition d-flex flex-column">
      <Typography variant="subtext" className="mb-4">Рубрика</Typography>
      <TreeSelect
        staticWidth
        isPositionFixed
        placeholder="Выберите рубрику"
        selectedTreeOption={selectedCategory}
        setSelectedOption={setSelectedCategory}
        treeOptions={curCategories}
        onCustomTreeOptionClick={setSelectedCategory}
        loading={categoriesLoading}
        classNames="modal-card-addition__category-select mb-16"
      />
      <Typography variant="subtext" className="mb-4">Карточка</Typography>
      <SearchCard
        title="Выберите карточку"
        options={curCards ? curCards.map(item => ({
          id: item.id,
          name: item.name,
          imageThumbnailUrl: item.imageUrlThumbnail,
          description: item.description,
          minutesToFinish: item.minutesToFinish,
          content: item.content,
        })) : []}
        getSearchedKeyword={setSearchedKeyword}
        getSelectedCard={getSelectedCard}
        lastItemCardRef={lastItemCardRef}
        loading={cardsLoading}
      />
      <Typography variant="xsmall" color="red" className="mt-8" > {cardError} </Typography>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  categories: state.categoryReducer.categories.data,
  categoriesNextPage: state.categoryReducer.categories.nextPage,
  categoriesLoading: state.categoryReducer.categories.loading,
  cards: state.cardReducer.cards.data,
  cardsNextPage: state.cardReducer.cards.nextPage,
  cardsCurPage: state.cardReducer.cards.curPage,
  cardsLoading: state.cardReducer.cards.loading,
});

const mapDispatchToProps = {
  getCategories,
  clearCategoriesState,
  getCards,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(ModalCardAddition));
