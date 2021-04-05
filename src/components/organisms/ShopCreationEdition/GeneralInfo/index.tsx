import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import useNotification from 'src/components/molecules/Notification/useNotification';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import ModalLoading from 'src/components/atoms/ModalLoading';
import Input from 'src/components/molecules/Input';
import Select from 'src/components/molecules/Select';
import Modal from 'src/components/molecules/Modal';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import ButtonImageUpload from 'src/components/organisms/ButtonImageUpload';

import ShopContext from 'src/components/organisms/ShopCreationEdition/ShopContext';

import itemActions from 'src/store/item/actions';
import itemCategoryActions, { createCategory } from 'src/store/item/category/actions';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';

import { GeneralInfoTypes } from 'src/components/organisms/ShopCreationEdition/GeneralInfo/types';
import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';
import { IOption } from 'src/components/molecules/Select/types';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { CONVERT_CATEGORIES_TO_OPTIONS, DEFAULT_ERROR_MES } from 'src/components/organisms/ShopCreationEdition/GeneralInfo/const';

function GeneralInformation(props: GeneralInfoTypes.IProps) {
  const { companyId, createItem, getItemCategories, itemCategories = [], type, updateItem, createCategory } = props;
  const [selectedCategories, setSelectedCategories] = useState<IOption[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [modalCreateCategory, setModalCreateCategory] = useState<boolean>(false);
  const {
    setStep,
    itemData,
    setItemData,
    itemCategoryOption,
    setItemCategoryOption,
    boughtAmount,
  } = useContext(ShopContext);
  const history = useHistory();
  const notification = useNotification();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if ((name === 'price' || name === 'amount') && !/^\d+$/.test(value)) {
      setErrorMessage({ ...errorMessage, [name]: 'Пожалуйста введите целое число' });
    } else {
      setErrorMessage({ ...errorMessage, [name]: '' });
    }
    if (name === 'name' || name === 'description') {
      setItemData({ ...itemData, [name]: value });
    } else {
      setItemData({ ...itemData, [name]: value.length < 1 ? null : +value });
    }
  };

  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const itemId = history.location.pathname.split('/').pop() || '';
  const [errorMessage, setErrorMessage] = useState<GeneralInfoTypes.IDataErrorMessages>(DEFAULT_ERROR_MES);

  const handleImagesUpload = (images: ButtonImageUploadTypes.IImage[]) => {
    setItemData({ ...itemData, images });
    setErrorMessage({ ...errorMessage, images: '' });
  };

  const onSaveButtonClick = () => {
    const errors = errorMessage;
    let isHasError = false;

    if (itemData.name.length < 1) {
      errors.name = 'Введите название приза';
      isHasError = true;
    }

    if (itemData.description.length < 1) {
      errors.description = 'Введите описание';
      isHasError = true;
    }

    if (!itemData.price) {
      errors.price = 'Введите стоимость';
      isHasError = true;
    }

    if (!/^\d+$/.test(`${itemData.price}`)) {
      isHasError = true;
    }

    if (!itemData.amount) {
      errors.amount = 'Введите количество';
      isHasError = true;
    }

    if (!/^\d+$/.test(`${itemData.amount}`)) {
      isHasError = true;
    }

    if (!itemData.categoryId) {
      errors.category = 'Выберите категорию';
      isHasError = true;
    }

    if (itemData.images.length < 1) {
      errors.images = 'Выберите изображения приза';
      isHasError = true;
    }

    setErrorMessage({ ...errors });
    return isHasError;
  };

  const handleItemCreate = () => {
    const hasError = onSaveButtonClick();
    if (hasError) return;
    setPageLoading(true);
    createItem(itemData, companyId, {
      onSuccess: () => {
        notification.add(
          {
            ...DEFAULT_NOTIFICATION_DATA,
            title: 'Приз опубликован!',
            description: 'Приз создан успешно',
          });
        setTimeout(
          () => {
            history.push(addAdminSlash(AdminRouterPaths.SHOP));
          },
          500);
        setPageLoading(false);
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const handleItemUpdate = () => {
    const hasError = onSaveButtonClick();
    if (hasError) return;
    itemId && updateItem && updateItem(itemData, +itemId, {
      onSuccess: () => {
        notification.add(
          {
            ...DEFAULT_NOTIFICATION_DATA,
            description: 'Изменения успешно сохранены.',
          });
        setTimeout(() => {
          history.push(`/admin/${AdminRouterPaths.SHOP}/${itemId}`);
        },         1000);
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  useEffect(() => {
    getItemCategories && getItemCategories({ companyId });
  },        []);

  useEffect(() => {
    if (!itemCategories) return;
    setSelectedCategories(CONVERT_CATEGORIES_TO_OPTIONS(itemCategories));
  },        [itemCategories]);

  const handleSelectedOption = (option: IOption) => {
    setItemCategoryOption(option);
    setItemData({ ...itemData, categoryId: parseInt(option.value, 10) });
    setErrorMessage({ ...errorMessage, category: '' });
  };

  const onCreateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCategoryName(event.target.value);
  };

  const onCreateCancelButtonClick = () => {
    setModalCreateCategory(false);
    setCategoryName('');
  };

  const onCreateSubmitButtonClick = () => {
    if (categoryName.length < 1) return;
    createCategory && createCategory(categoryName, companyId ? +companyId : 0, {
      onSuccess: () => {
        getItemCategories && getItemCategories({ companyId });
        notification.add(
          {
            ...DEFAULT_NOTIFICATION_DATA,
            description: 'Категория успешно создана.',
          });
        setModalCreateCategory(false);
        setCategoryName('');
      },
      onError: () => {
        setModalCreateCategory(false);
        setCategoryName('');
      },
    });
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div className="shop-creation-edition__gen-info pt-32 pl-24 pb-32 d-flex flex-column">
          <Typography variant="h1">
            Общая информация
          </Typography>
          <Input
            type="text"
            name="name"
            value={itemData.name}
            label="Название приза"
            placeholder="Желательно использовать не более 7 слов в названии"
            onChange={handleInputChange}
            prompt="Название курса которое будут видеть пользователи"
            classNames="shop-creation-edition__input mt-32"
            errorMessage={errorMessage.name}
          />
          <Input
            type="text"
            name="description"
            value={itemData.description}
            label="Описание "
            placeholder="Введите описание"
            onChange={handleInputChange}
            prompt="Небольшое описание, которое поможет пользователям узнать о призе больше информации"
            classNames="shop-creation-edition__input mt-32"
            errorMessage={errorMessage.description}
          />
          <Input
            type="number"
            name="price"
            value={itemData.price || undefined}
            label="Стоимость "
            placeholder="В монетах"
            onChange={handleInputChange}
            classNames="shop-creation-edition__input mt-32"
            errorMessage={errorMessage.price}
          />
          <div className="d-flex shop-creation-edition__prize-count-wrapper position-relative mt-32">
            <Input
              type="number"
              name="amount"
              value={itemData.amount || undefined}
              label="В наличии "
              placeholder="Число"
              prompt="Количество доступных призов в данный момент"
              onChange={handleInputChange}
              classNames="shop-creation-edition__input"
              style={{ width: '358px', borderRadius: '3px 0px 0px 3px' }}
              errorMessage={errorMessage.amount}
            />
            {type === 'edit' && (
              <Typography variant="xsmall" className="shop-creation-edition__prize-count mt-20">
                Куплено призов: {boughtAmount ? boughtAmount : 0}
              </Typography>
            )}
          </div>
          <ButtonImageUpload
            isMultiple
            title="Изображения приза"
            className="mt-32"
            description="JPG и PNG до 10 МБ"
            images={itemData.images.map(image =>
              ({ imageUrl: image.imageUrl, imageThumbnailUrl: image.imageThumbnailUrl }))}
            handleImagesUpload={handleImagesUpload}
            errorMessage={errorMessage.images}
          />
          <div className="d-flex">
            <Select
              staticWidth
              withChips
              options={selectedCategories}
              className="shop-creation-edition__select mt-32"
              label="Категория"
              selectedOption={itemCategoryOption}
              setSelectedOption={handleSelectedOption}
              customTitle="Выбрать"
              errorMessage={errorMessage.category}
            />
            <div className="ml-16 mt-32">
              <Button type="link" className="pt-32" onClick={() => setModalCreateCategory(true)}>
                Создать категорию
              </Button>
            </div>
          </div>
        </div>
        <div className="align-self-end d-flex align-items-center mt-32 mb-32">
          <Button variant="textmed" type="link-black" onClick={() => setStep(0)}>Назад</Button>
          <Button
            variant="textmed"
            className="next-button ml-24"
            onClick={type === 'edit' ? handleItemUpdate : handleItemCreate}
          >
            {type === 'edit' ? 'Изменить' : 'Создать'}
          </Button>
        </div>
      </div>
      {modalCreateCategory && (
        <Modal
          width={422}
          isSaveButtonDisable={categoryName.length < 1}
          title="Создание категории"
          saveLabel="Создать"
          cancelLabel="Отмена"
          onCloseClick={onCreateCancelButtonClick}
          onSaveClick={onCreateSubmitButtonClick}
        >
          <div className="px-32 pt-8">
            <Input
              type="text"
              label="Название"
              placeholder="Введите название"
              value={categoryName}
              onChange={onCreateInputChange}
            />
          </div>
        </Modal>
      )}
      {pageLoading && (
        <ModalLoading />
      )}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  itemState: state.itemReducer.createdItemState.data,
  itemCategories: state.itemCategoriesReducer.itemCategories.data,
});

const mapDispatchToProps = {
  createCategory,
  createItem: itemActions.createItem,
  updateItem: itemActions.updateItem,
  getItemCategories: itemCategoryActions.getItemCategories,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(withRouter(GeneralInformation)));
