import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import useDebounce from 'src/hooks/useDebounce';
import useVisibility from 'src/hooks/useVisibility';
import useNotification from 'src/components/molecules/Notification/useNotification';
import cardActions from 'src/store/card/actions';
import categoryActions from 'src/store/category/actions';
import utilsActions from 'src/store/utils/actions';

import { AdminRouterPaths, RouterPaths } from 'src/core/enum';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { findCategoryPath, isEqualArray } from 'src/utils/helpers';

import Button from 'src/components/atoms/Button';
import Loader from 'src/components/atoms/Loader';
import Typography from 'src/components/atoms/Typography';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Modal from 'src/components/molecules/Modal';
import Input from 'src/components/molecules/Input';
import GroupRubricTree from 'src/components/molecules/RubricTree/GroupRubricTree';

import { parseCategoriesToRubric } from 'src/components/organisms/CardSearch/consts';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { CardSearchTypes } from 'src/components/organisms/CardSearch/types';
import { CategoryTypes } from 'src/store/category/types';
import { CardTypes, IGetCardsQueryParams } from 'src/store/card/types';
import { ReactComponent as IconDelete } from 'src/assets/img/icons/delete.svg';
import { ReactComponent as IconEdit } from 'src/assets/img/icons/edit.svg';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import 'src/components/organisms/CardSearch/index.scss';

function CardSearch(props: CardSearchTypes.IProps) {
  const {
    className, categoriesData, cardsData, deletedCardState, companyId,
    getCategories, getCards, deleteCard, clearCardsState,
    additionalParams, tags, clearAdminCardsData, asAdmin = false,
  } = props;

  const notification = useNotification();

  const {
    data: propsCategories, loading: categoriesLoading,
    nextPage: categoriesNextPage, curPage,
  } = categoriesData || {};
  const { data: propsCards, loading: cardsLoading, nextPage: cardsNextPage } = cardsData || {};

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [selectedCardId, setSelectedCardId] = useState<number>();
  const [isDeleteCardModalOpen, setDeleteCardModal] = useState<boolean>(false);
  const [cards, setCards] = useState<CardTypes.IRenderProps[]>([]);
  const [categories, setCategories] = useState<CategoryTypes.ICategoryRenderProps[]>([]);
  const [currentCardsPage, setCurrentCardsPage] = useState<number>(1);

  const debouncedSearchValue = useDebounce(searchValue, 500);
  const categoryPath = categories && selectedCategory && findCategoryPath(categories, selectedCategory);

  useEffect(
    () => {
      setCards([]);
      setCategories([]);
      setSelectedCardId(undefined);
      setCurrentCardsPage(1);
      setSearchValue('');
      getCategories && companyId && getCategories(companyId);
    },
    [getCategories, companyId],
  );

  useEffect(
    () => {
      return () => {
        clearAdminCardsData && clearAdminCardsData();
      };
    },
    [],
  );

  useEffect(
    () => {
      if (deletedCardState) {
        notification.addStateNotification(deletedCardState);
        if (deletedCardState.responseType === NotificationType.Success) {
          getCardsByParams();
        }
      }
      clearCardsState && clearCardsState();
    },
    [deletedCardState],
  );

  useEffect(
    () => {
      getCardsByParams(1);
      setCards([]);
    },
    [debouncedSearchValue, selectedCategory, additionalParams],
  );

  useEffect(
    () => {
      if (!propsCards) return;
      const oldCards = [...cards];
      if (!isEqualArray(oldCards, propsCards)) {
        setCards([...oldCards, ...propsCards]);
      }
    },
    [propsCards],
  );

  useEffect(
    () => {
      if (!propsCategories) return;
      if (curPage === 1) {
        setCategories(propsCategories);
        return;
      }
      const oldCategories = [...categories];
      if (!isEqualArray(oldCategories, propsCategories)) {
        setCategories([...oldCategories, ...propsCategories]);
      }
    },
    [propsCategories],
  );

  const getCardsByParams = (page?: number) => {
    if (!companyId) return;
    const params: IGetCardsQueryParams = {
      companyId,
      page: page || currentCardsPage,
      pageSize: 20,
      categoryId: selectedCategory === -1 ? undefined : selectedCategory,
      keyword: debouncedSearchValue,
      ...additionalParams,
    };
    getCards && getCards(params);
  };

  const lastItemCards = useVisibility(
    (visible) => {
      if (visible && cardsNextPage && !cardsLoading) {
        setCurrentCardsPage(cardsNextPage);
        getCardsByParams(cardsNextPage);
      }
    },
    [cardsNextPage, cardsLoading],
  );

  const lastItemCategories = useVisibility(
    (visible) => {
      if (visible && categoriesNextPage && !categoriesLoading) {
        getCategories && companyId && getCategories(companyId, categoriesNextPage);
      }
    },
    [categoriesNextPage, categoriesLoading],
  );

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentCardsPage(1);
  };

  const onDeleteCard = () => {
    setDeleteCardModal(false);
    deleteCard && selectedCardId && deleteCard(selectedCardId);
  };

  return (
    <div className={`card-search d-flex ${className}`}>
      <div className="card-search__category d-flex flex-column">
        <Typography variant="h2" className="mb-32">Поиск по рубрикам</Typography>
        {categories && categories.length > 0 && (
          <GroupRubricTree
            lastItemRef={lastItemCategories}
            className="card-search__category__rubric"
            rubrics={parseCategoriesToRubric(categories)}
            onRubricChange={onCategoryChange}
          />
        )}
        {categoriesLoading && <Loader />}
      </div>
      <div className="card-search__divider" />
      <div className="card-search__content">
        <Input
          type="text"
          placeholder="Поиск в базе знаний"
          classNames="card-search__content__input"
          value={searchValue}
          onChange={onInputChange}
          icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
        />
        {selectedCategory !== -1 && categoryPath && (
          <Breadcrumb
            className="mt-24"
            items={categoryPath.map(n => ({ label: n?.name || '' }))}
          />
        )}
        {tags && tags.length > 0 && (
          <div className="d-flex flex-wrap mt-24">
            {tags.map(n => (
              <Typography
                key={n.id}
                variant="text"
                classNames="mr-20 mb-8"
              >
                {n.name}
              </Typography>
            ))}
          </div>
        )}
        {searchValue && (
          <Typography
            variant="textmed"
            classNames={[tags && tags.length ? 'mt-24' : 'mt-32']}
          >
            Результаты поиска
          </Typography>
        )}
        <div className="card-search__card-list mt-24">
          {cards && cards.map((n, index) => (
            <div
              key={n.id}
              className="card-search__card"
              ref={(index === cards.length - 1) ? lastItemCards : null}
            >
              <div className="d-flex">
                <Button
                  type="link"
                  variant="subtextunderlined"
                  classNames="card-search__card__title"
                  to={`${asAdmin ? addAdminSlash(AdminRouterPaths.CARD_VIEW) : RouterPaths.CARD_VIEW}/${n.id}`}
                >
                  {n.name}
                </Button>
                {asAdmin && (
                  <>
                    <Link to={`${addAdminSlash(AdminRouterPaths.CARD_EDIT)}/${n.id}`}>
                      <IconEdit className="card-search__card__icon ml-16" />
                    </Link>
                    <IconDelete
                      className="card-search__card__icon ml-16"
                      onClick={() => { setSelectedCardId(n.id); setDeleteCardModal(true); }}
                    />
                  </>
                )}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: n.description }}
                className="mt-8 inner-html card-search__card__desc"
              />
            </div>
          ))}
          {!cardsLoading && cards.length === 0 && (
            <Typography
              color="grey_additional_2"
              variant="subtext"
            >Данная рубрика пуста</Typography>
          )}
          {cardsLoading && <Loader />}
        </div>
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
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  categoriesData: state.categoryReducer.categories,
  cardsData: state.cardReducer.cardsAggregator,
  deletedCardState: state.cardReducer.deletedCardState.data,
});

const mapDispatchToProps = {
  getCategories: categoryActions.getCategories,
  getCards: cardActions.getCardsByAggregator,
  deleteCard: cardActions.deleteCard,
  clearCardsState: cardActions.clearCardsState,
  clearAdminCardsData: utilsActions.clearAdminCardsData,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(CardSearch);
