import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { createCategory, getCategories } from 'src/store/category/actions';

import Button from 'src/components/atoms/Button';
import Input from 'src/components/molecules/Input';
import Typography from 'src/components/atoms/Typography';
import Checkbox from 'src/components/molecules/Checkbox';
import TreeSelect from 'src/components/molecules/TreeSelect';
import Modal from 'src/components/molecules/Modal';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import ButtonImageUpload from 'src/components/organisms/ButtonImageUpload';
import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';

import { ROOT_RUBRIC, ROOT_RUBRIC_VAL } from 'src/components/organisms/AdminCategories/consts';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { CardGeneralInformationTypes } from 'src/components/organisms/CardCreation/CardGeneralInformation/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import TagsSearchChips from 'src/components/organisms/TagsSearchChips';
import 'src/components/organisms/CardCreation/CardGeneralInformation/index.scss';
import { parseCategoriesToTreeSelect } from 'src/utils/parse';

function CardGeneralInformation(props: CardGeneralInformationTypes.IProps) {
  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID);

  const {
    categories: propsCategories, generalInformation: propsGeneralInformation,
    onGeneralInfoStepCompleted, createCategory, getCategories, isQuizCard,
  } = props;

  const [generalInformation, setGeneralInformation] = useState(propsGeneralInformation);

  useEffect(
    () => {
      propsGeneralInformation && setGeneralInformation(propsGeneralInformation);
    },
    [propsGeneralInformation],
  );

  const [errors, setErrors] = useState({ title: '', category: '', image: '' });
  const [isShowCreateRubricModal, setShowCreateRubricModal] = useState(false);
  const [createdCategory, setCreatedCategory] = useState<CardGeneralInformationTypes.ICreateCategoryBody>(
    { name: '', parentCategory: { ...ROOT_RUBRIC } });
  const [categories, setCategories] = useState<ITreeOption[]>([]);

  const onSelectedOption = (option: ITreeOption) => {
    setGeneralInformation({ ...generalInformation, category: option });
    setErrors({
      ...errors,
      category: '',
    });
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralInformation({ ...generalInformation, title: event.target.value });
    setErrors({
      ...errors,
      title: '',
    });
  };

  const onCheckInclude = (state: boolean) => {
    setGeneralInformation({ ...generalInformation, isIncludedInBase: state });
  };

  const handleSelectedTagsIds = (tags: ITag[]) => {
    setGeneralInformation({ ...generalInformation, tags });
  };

  const onNextStepClick = () => {
    if (generalInformation.title
      //TODO: add after ... && generalInformation.category?.value && generalInformation.imageUrl
    ) {
      onGeneralInfoStepCompleted && onGeneralInfoStepCompleted(generalInformation);
    } else {
      setErrors({
        title: generalInformation.title ? '' : 'Введите заголовок ',
        category: generalInformation.category?.value ? '' : 'Выберите рубрику',
        image: generalInformation.imageUrl ? '' : 'Добавьте изображение',
      });
    }
  };

  const handleImageUpload = (image: ButtonImageUploadTypes.IImage) => {
    setGeneralInformation(
      {
        ...generalInformation,
        imageUrl: image.imageUrl,
        imageThumbnailUrl: image.imageThumbnailUrl,
      });
    setErrors({ ...errors, image: '' });
  };
  const customTree: ITreeOption = { value: 'create-rubric', name: 'Добавить рубрику' };

  const onCreateCategoryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreatedCategory({ ...createdCategory, name: event.target.value });
  };

  const onCreateCategoryButtonClick = () => {
    const { value } = createdCategory.parentCategory;
    const curParentId = value === ROOT_RUBRIC_VAL ? null : +value;
    const category = { name: createdCategory.name, parentId: curParentId };
    createdCategory.name.length > 0 && companyId && createCategory && createCategory(
      +companyId, category, {
        onSuccess: (response: any) => {
          const { data } = response.createdCategoryState;
          if (!data) return;
          setCreatedCategory({ name: '', parentCategory: { ...ROOT_RUBRIC } });
          const treeOption: ITreeOption = { value: `${data.id}`, name: data.name, level: data.level };
          companyId && getCategories && getCategories(+companyId, 1, 100);
          onSelectedOption(treeOption);
        },
        onError: () => {
          setCreatedCategory({ name: '', parentCategory: { ...ROOT_RUBRIC } });
        },
      },
    );
    setShowCreateRubricModal(false);
  };

  const categoriesRootTreeOptions: ITreeOption[] = [{
    ...ROOT_RUBRIC,
    children: categories,
  }];

  const onCreateCategoryCancelButtonClick = () => {
    setShowCreateRubricModal(false);
  };

  useEffect(
    () => {
      setCategories(propsCategories ? propsCategories.map(n => parseCategoriesToTreeSelect(n)) : []);
      setCreatedCategory({ name: '', parentCategory: { ...ROOT_RUBRIC } });
    },
    [propsCategories],
  );

  return (
    <>
      <div className="card-general-info">
        <Typography
          variant="h1"
          className="mb-32"
        >
          Общая информация
        </Typography>
        <Input
          type="text"
          label="Заголовок карточки"
          value={generalInformation.title}
          classNames="card-general-info__title"
          onChange={onTitleChange}
          errorMessage={errors.title}
          placeholder="Желательно использовать не более 7 слов в названии"
          prompt="Заголовок карточки используется в Базе Знаний, чтобы облегчить пользователю поиск нужной информации. См. рекомендации <здесь>."
        />
        {categories && (
          <>
            <Typography
              variant="subtext"
              className="mt-32 mb-4"
            >
              Рубрика
            </Typography>
            <TreeSelect
              staticWidth
              errorMessage={errors.category}
              placeholder="Выберите рубрику"
              classNames="card-general-info__category"
              customTree={customTree}
              onCustomTreeOptionClick={() => setShowCreateRubricModal(true)}
              setSelectedOption={onSelectedOption}
              selectedTreeOption={generalInformation.category}
              treeOptions={categories}
            />
          </>
        )}
        <Typography
          variant="subtext"
          className="mt-4 d-block"
        >
          Рубрика поможет пользователям при поиске данной карточки.
        </Typography>
        <ButtonImageUpload
          title="Обложка"
          description="JPG и PNG до 10 МБ"
          image={{ imageUrl: generalInformation.imageUrl, imageThumbnailUrl: generalInformation.imageThumbnailUrl }}
          handleImageUpload={handleImageUpload}
          className="mt-32"
          errorMessage={errors.image}
        />
        <Typography
          variant="subtext"
          className="mt-32 mb-4"
        >
          Теги
          <Typography
            variant="tag"
            color="main_50"
            classNames="ml-4"
          >
            - Необязательно
          </Typography>
        </Typography>

        {companyId && (
          <TagsSearchChips
            initialTags={generalInformation.tags}
            companyId={+companyId}
            handleSelectedTagsIds={handleSelectedTagsIds}
          />
        )}

        {!isQuizCard && (
          <Checkbox
            classNames="mt-32"
            isClicked={generalInformation.isIncludedInBase}
            setClicked={onCheckInclude}
            title="Включить в Базу Знаний"
            titleVariant="text"
            prompt="Карточки являющиеся знанием отображаются в базе знаний"
          />
        )}
      </div>
      <Button
        variant="textmed"
        className="card-creation__next-btn d-flex ml-auto mt-32 justify-content-center"
        onClick={onNextStepClick}
      >
        Далее
      </Button>
      {isShowCreateRubricModal && (
        <Modal
          width={422}
          title="Создание рубрики"
          cancelLabel="Отмена"
          saveLabel="Создать"
          closeColor="#7A7B82"
          onSaveClick={onCreateCategoryButtonClick}
          onCloseClick={onCreateCategoryCancelButtonClick}
          isSaveButtonDisable={createdCategory.name.length < 1}
        >
          <div className="d-flex flex-column px-32">
            <Typography variant="subtext" className="mb-4">Расположение</Typography>
            {categories &&
              <TreeSelect
                staticWidth
                isPositionFixed
                treeOptions={categoriesRootTreeOptions}
                selectedTreeOption={createdCategory.parentCategory}
                setSelectedOption={option => setCreatedCategory({ ...createdCategory, parentCategory: option })}
            />
            }
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
    </>
  );
}

const mapStateToProps = (state: any) => ({
  categories: state.categoryReducer.categories.data,
});

const mapDispatchToProps = {
  createCategory,
  getCategories,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(CardGeneralInformation));
