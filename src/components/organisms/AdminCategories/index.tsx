import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import categoryActions from 'src/store/category/actions';
import useVisibility from 'src/hooks/useVisibility';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Loader from 'src/components/atoms/Loader';
import CardCategory from 'src/components/molecules/Cards/CardCategory';
import TreeSelect from 'src/components/molecules/TreeSelect';
import Modal from 'src/components/molecules/Modal';
import Input from 'src/components/molecules/Input';
import Image from 'src/components/atoms/Image';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import useNotification from 'src/components/molecules/Notification/useNotification';
import EmptyTitle from 'src/components/organisms/AdminCategories/EmptyTitle';

import { AdminCategoriesTypes } from 'src/components/organisms/AdminCategories/types';
import { IRenderBody } from 'src/core/components/types';
import { CategoryTypes } from 'src/store/category/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import IconPlus from 'src/assets/img/icons/plus.svg';
import { isEqualArray } from 'src/utils/helpers';
import {
  parseCategoriesToTreeSelect,
  parseCategoriesToTreeSelectWithDisable as parseCatToTreeSelectWithDisable,
} from 'src/components/organisms/AdminCategories/parsers';
import {
  ROOT_RUBRIC, ROOT_RUBRIC_VAL,
  WITHOUT_RUBRIC, WITHOUT_RUBRIC_VAL,
} from 'src/components/organisms/AdminCategories/consts';
import './index.scss';

function AdminCategories(props: AdminCategoriesTypes.IProps) {
  const {
    categories, getCategories, companyId, createCategory,
    createdCategoryState, updateCategory, updatedCategoryState,
    clearChangedCreatedCategoryState, deleteCategory,
    deletedCategoryState, clearCategoriesState,
  } = props;

  const pageSize = 10;
  const notification = useNotification();
  const [curCategories, setCurCategories] = useState<CategoryTypes.ICategoryRenderProps[]>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const [curFirstLevelCategory, setCurFirstLevelCategory] = useState<ITreeOption>({ value: '', name: '' });
  const [secondLevelCategories, setSecondLevelCategories] = useState<CategoryTypes.ICategoryRenderProps[]>([]);
  const [curSecondLevelCategory, setCurSecondLevelCategory] = useState<ITreeOption>({ value: '', name: '' });
  const [thirdLevelCategories, setThirdLevelCategories] = useState<CategoryTypes.ICategoryRenderProps[]>();
  const totalCategories = (categories && categories[0] && categories[0]?.total) || 0;

  const [isShowCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [createdCategory, setCreatedCategory] = useState<CategoryTypes.ICreateCategoryBody>(
    { name: '', parentId: null });
  const [selectedCreateTreeCategory, setSelectedCreateCategory] = useState<ITreeOption>({ ...ROOT_RUBRIC });

  const [isShowChangeModal, setShowChangeModal] = useState<boolean>(false);
  const [editedCategory, setEditedCategory] = useState<CategoryTypes.ICategoryRenderProps>();
  const [selectedEditTreeCategory, setSelectedEditTreeCategory] = useState<ITreeOption>({ ...ROOT_RUBRIC });

  const [isShowDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletedCategory, setDeletedCategory] = useState<CategoryTypes.ICategoryRenderProps>();
  const [editedCategoryNewData, setEditedCategoryNewData] = useState<CategoryTypes.IEditCategoryBody>(
    { name: '', newParentId: null, categoryId: null });
  const [selectedDeleteTreeCategory, setSelectedDeleteTreeCategory] = useState<ITreeOption>(WITHOUT_RUBRIC);

  const addNotification = (notificationBody: IRenderBody) => {
    notification.addStateNotification(notificationBody);
    clearChangedCreatedCategoryState && clearChangedCreatedCategoryState();
  };

  const getLevelCategories = (categories: CategoryTypes.ICategoryRenderProps[], id: number) => {
    if (categories) {
      const category = categories.find(item => item.id === id);
      return category ? category.subCategories : [];
    }
    return [];
  };

  const categoriesTreeOptions: ITreeOption[] = [{
    ...ROOT_RUBRIC,
    children: curCategories
      ? curCategories.map((n: CategoryTypes.ICategoryRenderProps) => parseCategoriesToTreeSelect(n))
      : undefined,
  }];

  const lastItem = useVisibility(
    (visible) => {
      if (!categories) return;
      if (visible && curCategories.length < totalCategories && !loading && !isError) {
        setLoading(true);
        const page = curPage + 1;
        getCategories && getCategories(companyId, page, pageSize, {
          onSuccess: () => {
            setLoading(false);
          },
          onError: () => {
            setLoading(false);
            setError(true);
          },
        });
        setCurPage(page);
      }
    },
    [curCategories, loading],
  );

  const deleteCategoriesTreeOptions: ITreeOption[] = curCategories ?
  [{ ...WITHOUT_RUBRIC },
    ...curCategories.map((n: CategoryTypes.ICategoryRenderProps) => parseCategoriesToTreeSelect(n))]
    : [];

  const editedCategoriesTreeOptions: ITreeOption[] = [{
    ...ROOT_RUBRIC,
    children: curCategories?.map(
        (n: CategoryTypes.ICategoryRenderProps) => parseCatToTreeSelectWithDisable(n, false, editedCategory),
    ),
  }];

  const onCreateCategoryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedCategory({ ...createdCategory, name: event.target.value });
  };

  const onEditCategoryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCategoryNewData({ ...editedCategoryNewData, name: event.target.value });
  };

  const onCreateCategoryButtonClick = () => {
    createCategory && createCategory(
      companyId, createdCategory, {
        onSuccess: () => {
          setCurCategories([]);
          setSelectedCreateCategory(categoriesTreeOptions[0]);
          setCreatedCategory({ name: '', parentId: null });
          getCategories && getCategories(companyId, 1);
          setCurPage(1);
        },
        onError: () => {
          setSelectedCreateCategory(categoriesTreeOptions[0]);
          setCreatedCategory({ name: '', parentId: null });
        },
      },
    );
    setShowCreateModal(false);
  };

  const onChangeCategoryClick = (
    parentCategory: ITreeOption, id: number, categories: CategoryTypes.ICategoryRenderProps[],
  ) => {
    setShowChangeModal(true);
    setSelectedEditTreeCategory(parentCategory);
    const category = categories.find(item => item.id === id) || undefined;
    setEditedCategory(category);
  };

  const onDeleteCategoryClick = (categories: CategoryTypes.ICategoryRenderProps[], id: number) => {
    setShowDeleteModal(true);
    const category = categories.find(item => item.id === id) || undefined;
    setDeletedCategory(category);
  };

  const onUpdateCategorySubmitClick = () => {
    updateCategory && updateCategory(
      companyId, editedCategoryNewData, {
        onSuccess: () => {
          setCurCategories([]);
          setSelectedEditTreeCategory(editedCategoriesTreeOptions[0]);
          setEditedCategoryNewData({ name: '', categoryId: null, newParentId: null });
          getCategories && getCategories(companyId, 1);
          setCurPage(1);
        },
        onError: () => {
          setSelectedEditTreeCategory(editedCategoriesTreeOptions[0]);
          setEditedCategoryNewData({ name: '', categoryId: null, newParentId: null });
        },
      });
    setShowChangeModal(false);
  };

  const onUpdateCategoryCancelClick = () => {
    setShowChangeModal(false);
    setEditedCategory(undefined);
    setEditedCategoryNewData({ name: '', categoryId: null, newParentId: null });
  };

  const onCreateCategoryCancelClick = () => {
    setShowCreateModal(false);
    setCreatedCategory({ name: '', parentId: null });
    setSelectedCreateCategory({ ...ROOT_RUBRIC });
  };

  const onDeleteCategorySubmitClick = () => {
    if (!deletedCategory) return;
    const newCategoryId = selectedDeleteTreeCategory.value === WITHOUT_RUBRIC_VAL
      ? undefined :  +selectedDeleteTreeCategory.value;

    deleteCategory && deleteCategory(companyId, { newCategoryId, categoryId: deletedCategory.id }, {
      onSuccess: () => {
        setCurCategories([]);
        setSelectedDeleteTreeCategory(WITHOUT_RUBRIC);
        setDeletedCategory(undefined);
        getCategories && getCategories(companyId, 1);
        setCurPage(1);
      },
      onError: () => {
        setSelectedDeleteTreeCategory(WITHOUT_RUBRIC);
        setDeletedCategory(undefined);
      },
    });
    setShowDeleteModal(false);
  };

  const onDeleteCategoryCancelClick = () => {
    setShowDeleteModal(false);
    setDeletedCategory(undefined);
    setSelectedDeleteTreeCategory(WITHOUT_RUBRIC);
  };

  const onCreateCategoryClick = (level: number) => {
    if (level === 2) setSelectedCreateCategory(curFirstLevelCategory);
    if (level === 3) setSelectedCreateCategory(curSecondLevelCategory);
    setShowCreateModal(true);
  };

  useEffect(
    () => {
      createdCategoryState && addNotification(createdCategoryState);
      updatedCategoryState && addNotification(updatedCategoryState);
      deletedCategoryState && addNotification(deletedCategoryState);
    },
    [createdCategoryState, updatedCategoryState, deletedCategoryState],
  );

  useEffect(
    () => {
      if (!categories) return;
      if (!isEqualArray(categories, curCategories)) {
        setCurCategories([...categories]);
      }
    },
    [categories, setCurCategories],
  );

  useEffect(
    () => {
      setLoading(true);
      getCategories && getCategories(companyId, 1, pageSize, {
        onSuccess: () => {
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
          setError(true);
        },
      });

      return () => {
        clearCategoriesState && clearCategoriesState();
      };
    },
    [],
  );

  useEffect(
    () => {
      curCategories && curFirstLevelCategory &&
      setSecondLevelCategories(getLevelCategories(curCategories, +curFirstLevelCategory.value));
      setCurSecondLevelCategory({ value: '', name: '' });
      setThirdLevelCategories(undefined);
    },
    [curFirstLevelCategory, curCategories],
  );

  useEffect(
    () => {
      secondLevelCategories && curSecondLevelCategory &&
      setThirdLevelCategories(getLevelCategories(secondLevelCategories, +curSecondLevelCategory.value));
    },
    [curSecondLevelCategory, secondLevelCategories],
  );

  useEffect(
    () => {
      const { value } = selectedCreateTreeCategory;
      const curParentId = value === ROOT_RUBRIC_VAL ? null : +value;
      const category = { ...createdCategory, parentId: curParentId };
      setCreatedCategory({ ...category });
    },
    [selectedCreateTreeCategory],
  );

  useEffect(
    () => {
      const { value } = selectedEditTreeCategory;
      const newParentId = value === ROOT_RUBRIC_VAL ? null : +value;
      const category = { ...editedCategoryNewData, newParentId };
      setEditedCategoryNewData({ ...category });
    },
    [selectedEditTreeCategory],
  );

  useEffect(
    () => {
      if (!editedCategory) return;
      const categoryNewData = {
        name: editedCategory.name,
        categoryId: editedCategory.id,
        newParentId: editedCategory.parentId,
      };
      setEditedCategoryNewData({ ...categoryNewData });
    },
    [editedCategory],
  );

  return (
    <div className="admin-categories pt-32">
      <div className="admin-categories__header d-flex align-items-center justify-content-between mb-16">
        <Typography variant="headline">Рубрикатор</Typography>
        <Button
          variant="textmed"
          className="d-flex align-items-center py-12 px-24"
          onClick={() => setShowCreateModal(true)}
        >
          <Image
            src={IconPlus}
            alt="add card"
            className="mr-8"
          />
          Создать рубрику
        </Button>
      </div>
      <div className="admin-categories__block d-flex">
        {/*First level*/}
        <div className="block__item d-flex flex-column">
          <Typography variant="textmed" className="mt-32 pb-24 px-24">Уровень 1</Typography>
          {(curCategories.length > 0 || loading) ? (
            <div
              className={classNames(
                'item__content flex-grow-1',
                { 'd-flex align-items-center justify-content-center': curCategories.length < 1 },
              )}>
              {curCategories.length > 0 && (
                <div>
                  {curCategories.map((item: CategoryTypes.ICategoryRenderProps, index: number) => (
                    <CardCategory
                      showArrow
                      key={`${item.name}-${index}-${item.id}`}
                      id={item.id}
                      lastItemRef={index === curCategories.length - 1 ? lastItem : null}
                      active={curFirstLevelCategory.value === `${item.id}`}
                      title={item.name}
                      totalCards={item.cardsNumber}
                      onClick={() => setCurFirstLevelCategory({ name: item.name, value: `${item.id}` })}
                      onChangeClick={() => onChangeCategoryClick({ ...ROOT_RUBRIC }, item.id, curCategories)}
                      onDeleteClick={() => onDeleteCategoryClick(curCategories, item.id)}
                    />
                  ))}
                </div>
              )}
              {loading && <Loader className="my-16" label="загружается" />}
            </div>
          ) : (
            <EmptyTitle
              level={1}
              onCreateClick={() => onCreateCategoryClick(1)}
            />
          )}
        </div>
        <div className="block__item d-flex flex-column">
          <Typography variant="textmed" className="mt-32 pb-24 px-24">Уровень 2</Typography>
          {secondLevelCategories && secondLevelCategories.length > 0 ? (
            <div className="item__content flex-grow-1">
              {secondLevelCategories.map((item: CategoryTypes.ICategoryRenderProps, index: number) => (
                <CardCategory
                  showArrow
                  key={`${item.name}-${index}-${item.id}`}
                  id={item.id}
                  active={curSecondLevelCategory.value === `${item.id}`}
                  title={item.name}
                  totalCards={item.cardsNumber}
                  onClick={() => setCurSecondLevelCategory({ name: item.name, value: `${item.id}` })}
                  onChangeClick={() => onChangeCategoryClick(curFirstLevelCategory, item.id, secondLevelCategories)}
                  onDeleteClick={() => onDeleteCategoryClick(secondLevelCategories, item.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyTitle
              level={2}
              curPrevId={curFirstLevelCategory.value}
              onCreateClick={() => onCreateCategoryClick(2)}
            />
          )}
        </div>
        <div className="block__item d-flex flex-column">
          <Typography variant="textmed" className="mt-32 pb-24 px-24">Уровень 3</Typography>
          {thirdLevelCategories && thirdLevelCategories.length > 0 ? (
            <div className="item__content flex-grow-1">
              {thirdLevelCategories.map((item: CategoryTypes.ICategoryRenderProps, index: number) => (
                <CardCategory
                  key={`${item.name}-${index}-${item.id}`}
                  id={item.id}
                  active={item.name === 'Бухгалтерия'}
                  title={item.name}
                  totalCards={item.cardsNumber}
                  onChangeClick={() => onChangeCategoryClick(curSecondLevelCategory, item.id, thirdLevelCategories)}
                  onDeleteClick={() => onDeleteCategoryClick(thirdLevelCategories, item.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyTitle
              level={3}
              curPrevId={curSecondLevelCategory.value}
              onCreateClick={() => onCreateCategoryClick(3)}
            />
          )}
        </div>
      </div>
      {isShowCreateModal && (
        <Modal
          width={422}
          title="Создание рубрики"
          cancelLabel="Отмена"
          saveLabel="Создать"
          closeColor="#7A7B82"
          isSaveButtonDisable={createdCategory.name.length < 1}
          onCloseClick={onCreateCategoryCancelClick}
          onSaveClick={onCreateCategoryButtonClick}
        >
          <div className="d-flex flex-column px-32">
            <Typography variant="subtext" className="mb-4">Расположение</Typography>
            <TreeSelect
              staticWidth
              isPositionFixed
              treeOptions={categoriesTreeOptions}
              selectedTreeOption={selectedCreateTreeCategory}
              setSelectedOption={setSelectedCreateCategory}
            />
            <Typography variant="subtext" className="mb-4 mt-24">Название</Typography>
            <Input
              type="text"
              placeholder="Введите название"
              className="py-10"
              onChange={onCreateCategoryInputChange}
            />
          </div>
        </Modal>
      )}
      {isShowChangeModal && (
        <Modal
          width={422}
          title="Редактирование рубрики"
          cancelLabel="Отмена"
          saveLabel="Сохранить"
          closeColor="#7A7B82"
          isSaveButtonDisable={editedCategoryNewData.name.length < 1 ||
          (editedCategory && editedCategoryNewData.name === editedCategory.name &&
            editedCategoryNewData.newParentId === editedCategory.parentId)}
          onCloseClick={onUpdateCategoryCancelClick}
          onSaveClick={onUpdateCategorySubmitClick}
        >
          <div className="d-flex flex-column px-32">
            <Typography variant="subtext" className="mb-4">Расположение</Typography>
            <TreeSelect
              staticWidth
              treeOptions={editedCategoriesTreeOptions}
              selectedTreeOption={selectedEditTreeCategory}
              setSelectedOption={setSelectedEditTreeCategory}
            />
            <Typography variant="subtext" className="mb-4 mt-24">Название</Typography>
            <Input
              type="text"
              placeholder="Введите название"
              className="py-10"
              value={editedCategoryNewData.name}
              onChange={onEditCategoryInputChange}
            />
          </div>
        </Modal>
      )}
      {isShowDeleteModal && (
        <Modal
          width={422}
          title="Удаление рубрики"
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          closeColor="#7A7B82"
          onCloseClick={onDeleteCategoryCancelClick}
          onDeleteClick={onDeleteCategorySubmitClick}
        >
          <div className="d-flex flex-column px-32">
            <Typography variant="subtext" className="mb-24">Вы действительно хотите удалить данную рубрику?</Typography>
            <Typography variant="subtext" className="mb-24">
              Выберите из списка рубрику, которая унаследует карточки
            </Typography>
            <Typography variant="subtext" className="mb-4">Рубрика наследница</Typography>
            <TreeSelect
              staticWidth
              treeOptions={deleteCategoriesTreeOptions}
              selectedTreeOption={selectedDeleteTreeCategory}
              setSelectedOption={setSelectedDeleteTreeCategory}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  categories: state.categoryReducer.categories.data,
  createdCategoryState: state.categoryReducer.createdCategoryState.data,
  updatedCategoryState: state.categoryReducer.updatedCategoryState.data,
  deletedCategoryState: state.categoryReducer.deletedCategoryState.data,
});

const mapDispatchToProps = {
  getCategories: categoryActions.getCategories,
  clearCategoriesState: categoryActions.clearCategoriesState,
  createCategory: categoryActions.createCategory,
  updateCategory: categoryActions.updateCategory,
  deleteCategory: categoryActions.deleteCategory,
  clearChangedCreatedCategoryState: categoryActions.clearChangedCreatedCategoryState,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(AdminCategories));
