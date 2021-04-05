import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import groupActions from 'src/store/group/actions';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import ButtonImageUpload from 'src/components/organisms/ButtonImageUpload';
import Select from 'src/components/molecules/Select';
import CourseCreationContext from 'src/components/organisms/CourseCreationEdition/CourseCreationContext';
import TagsSearchChips from 'src/components/organisms/TagsSearchChips';

import { GeneralInformationTypes } from 'src/components/organisms/CourseCreationEdition/GeneralInformation/types';
import { IOption } from 'src/components/molecules/Select/types';
import { CONVERT_GROUPS_TO_OPTIONS } from 'src/components/organisms/CourseCreationEdition/GeneralInformation/consts';
import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';
import { GroupTypes } from 'src/store/group/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { Status } from 'src/store/course/types';
import 'src/components/organisms/CourseCreationEdition/GeneralInformation/index.scss';

function GeneralInformation(props: GeneralInformationTypes.IProps) {
  const { getGroups, groups = [], companyId } = props;
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>([]);
  const activeGroupsAmount = selectedGroups.filter(item => item.checkboxChecked).length;
  const activeGroupTitle = selectedGroups.find(item => item.checkboxChecked)?.name || '';
  const {
    setStep, setCourseData, courseData,
    nameErrorMessage, setNameErrorMessage,
  } = useContext(CourseCreationContext);

  const handleImageUpload = (image: ButtonImageUploadTypes.IImage) => {
    setCourseData({ ...courseData, imageUrl: image.imageUrl, imageThumbnailUrl: image.imageThumbnailUrl });
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'name' && nameErrorMessage) {
      setNameErrorMessage('');
    }
    setCourseData({ ...courseData, [name]: value });
  };

  const onCustomGroupChange = () => {
    const selectedOptions = selectedGroups.map(group => ({ ...group, checkboxChecked: false }));
    setSelectedGroups(selectedOptions);
    setCourseData({ ...courseData, groupIds: [] });
  };

  const onSelectGroupsChange = (options: IOption[]) => {
    setSelectedGroups(options);
    const selectedOptions = options.filter(item => item.checkboxChecked).map(item => +item.value);
    setCourseData({ ...courseData, groupIds: selectedOptions });
  };

  const handleSelectedTagsIds = (tags: ITag[]) => {
    setCourseData({ ...courseData, tags, tagIds: tags.map(item => item.id) });
  };

  useEffect(
    () => {
      getGroups && getGroups({ companyId });
    },
    [],
  );

  useEffect(
    () => {
      if (!groups) return;
      const groupsWithActive: GroupTypes.IRenderProps[] = groups.map((item) => {
        const isActive =  Array.isArray(courseData.groupIds) && courseData.groupIds.includes(item.id);
        return { ...item, checkboxChecked: isActive };
      });

      setSelectedGroups(CONVERT_GROUPS_TO_OPTIONS(groupsWithActive));
    },
    [groups],
  );

  return (
    <div className="general-information d-flex flex-column">
      <div className="general-information__content px-24 py-32 mb-24 d-flex flex-column">
        <Typography variant="h1" className="mb-32">Общая информация</Typography>
        <Input
          name="name"
          type="text"
          label="Название"
          placeholder="Желательно использовать не более 7 слов в названии"
          prompt="Название курса которое будут видеть пользователи"
          classNames="general-information__input mb-32"
          disabled={courseData.status === Status.PUBLISHED}
          value={courseData.name || ''}
          errorMessage={nameErrorMessage}
          onChange={onInputChange}
        />
        <Input
          name="description"
          type="text"
          label="Описание"
          placeholder="Введите описание"
          prompt="Небольшое описание, которое поможет пользователям понять что они будут изучать в данном курсе"
          classNames="general-information__input mb-32"
          disabled={courseData.status === Status.PUBLISHED}
          value={courseData.description || ''}
          onChange={onInputChange}
        />
        <ButtonImageUpload
          title="Обложка"
          description="JPG и PNG до 10 МБ"
          disabled={courseData.status === Status.PUBLISHED}
          image={{ imageUrl: courseData?.imageUrl || '', imageThumbnailUrl: courseData?.imageThumbnailUrl || '' }}
          handleImageUpload={handleImageUpload}
        />
        <div className="line my-32" />
        <Select
          staticWidth
          withCheckbox
          withChips
          label="Выбор групп"
          prompt="Выберите группы которые обязательно должны пройти данный курс"
          options={selectedGroups}
          classNames="general-information__groups"
          onCheckboxChanges={onSelectGroupsChange}
          onCustomOptionClick={onCustomGroupChange}
          disabled={courseData.status === Status.PUBLISHED}
          customTitle={activeGroupsAmount > 1 ? `${activeGroupsAmount} групп` :
            activeGroupsAmount === 1 ? activeGroupTitle : 'Все пользователи'}
          customOption={{
            name: 'Все пользователи',
            value: 'all-values',
            checkboxChecked: activeGroupsAmount === 0,
            disabled: activeGroupsAmount === 0,
          }}
        />
        <div className="general-information__search-chips mt-32">
          <Typography variant="subtext" className="mb-4">
            Теги <Typography variant="tag" color="main_50">- необязательно</Typography>
          </Typography>
          <TagsSearchChips
            companyId={companyId}
            disabled={courseData.status === Status.PUBLISHED}
            initialTags={courseData.tags}
            handleSelectedTagsIds={handleSelectedTagsIds}
          />
          <Typography variant="xsmall" color="grey_additional_1" className="mt-8">
            Теги помогут пользователям при поиске данной карточки
          </Typography>
        </div>
      </div>
      <Button
        className="next-button align-self-end"
        variant="textmed"
        onClick={() => setStep(1)}
      >
        Далее
      </Button>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  groups: state.groupReducer.groups.data,
});

const mapDispatchToProps = {
  // getGroups: groupActions.getGroups,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(GeneralInformation);
