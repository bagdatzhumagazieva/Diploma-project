import React, { useCallback, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getTemplates } from 'src/store/game/template/actions';
import { getGroups } from 'src/store/group/actions';

import SearchCard from 'src/components/molecules/SearchCard';
import useVisibility from 'src/hooks/useVisibility';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import ButtonImageUpload from 'src/components/organisms/ButtonImageUpload';
import Select from 'src/components/molecules/Select';
import TagsSearchChips from 'src/components/organisms/TagsSearchChips';
import Button from 'src/components/atoms/Button';
import Checkbox from 'src/components/molecules/Checkbox';
import GameContext from 'src/components/organisms/GameCreationEdition/GameContext';

import { Status } from 'src/store/course/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';
import { GeneralInformationTypes } from 'src/components/organisms/GameCreationEdition/GeneralInformation/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';
import { GroupTypes } from 'src/store/group/types';
import { CONVERT_GROUPS_TO_OPTIONS } from 'src/components/organisms/CourseCreationEdition/GeneralInformation/consts';
import 'src/components/organisms/GameCreationEdition/GeneralInformation/index.scss';

function GeneralInformation(props: GeneralInformationTypes.IProps) {
  const { companyId, getTemplates, templates, getGroups, groups } = props;
  const { setStep, gameData, setGameData } = useContext(GameContext);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>([]);
  const activeGroupsAmount = selectedGroups.filter(item => item.checkboxChecked).length;
  const activeGroupTitle = selectedGroups.find(item => item.checkboxChecked)?.name || '';

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'name' && nameErrorMessage) {
      setNameErrorMessage('');
    }
    setGameData({ ...gameData, [name]: value });
  };

  const handleImageUpload = (image: ButtonImageUploadTypes.IImage) => {
    setGameData({ ...gameData, imageUrl: image.imageUrl, imageThumbnailUrl: image.imageThumbnailUrl });
  };

  const selectedTemplate = (data: ICard) => {
    setGameData({ ...gameData, templateId: data.id });
  };

  const lastItemCardRef = useVisibility(
    (visible) => {
      if (visible) {
      }
    },
    [],
  );

  const onSelectGroupsChange = (options: IOption[]) => {
    setSelectedGroups(options);
    const selectedOptions = options.filter(item => item.checkboxChecked).map(item => +item.value);
    setGameData({ ...gameData, groupIds: selectedOptions });
  };

  useEffect(
    () => {
      getGroups && getGroups({ companyId });
      getTemplates && getTemplates();
    },
    [],
  );

  useEffect(
    () => {
      if (!groups) return;
      const groupsWithActive: GroupTypes.IRenderProps[] = groups.map((item) => {
        const isActive =  Array.isArray(gameData.groupIds) && gameData.groupIds.includes(item.id);
        return { ...item, checkboxChecked: isActive };
      });

      setSelectedGroups(CONVERT_GROUPS_TO_OPTIONS(groupsWithActive));
    },
    [groups],
  );

  const onCustomGroupChange = useCallback(
    () => {
      const selectedOptions = selectedGroups.map(group => ({ ...group, checkboxChecked: false }));
      setSelectedGroups(selectedOptions);
      setGameData({ ...gameData, groupIds: [] });
    },
    [selectedGroups, gameData],
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
          disabled={gameData.status === Status.PUBLISHED}
          value={gameData.name || ''}
          onChange={onInputChange}
        />
        <Input
          name="description"
          type="text"
          label="Описание"
          placeholder="Введите описание"
          prompt="Небольшое описание, которое поможет пользователям понять что они будут изучать в данном курсе"
          classNames="general-information__input mb-32"
          disabled={gameData.status === Status.PUBLISHED}
          value={gameData.description || ''}
          onChange={onInputChange}
        />
        <ButtonImageUpload
          title="Обложка"
          description="JPG и PNG до 10 МБ"
          disabled={gameData.status === Status.PUBLISHED}
          image={{ imageUrl: gameData.imageUrl || '', imageThumbnailUrl: gameData.imageThumbnailUrl || '' }}
          handleImageUpload={handleImageUpload}
        />
        <Typography
          variant="subtext"
          className="mb-4 mt-32"
        >
          Оболочка
        </Typography>
        <SearchCard
          title={templates?.find(e => e.id === gameData.templateId)?.name || 'Выберите оболочку'}
          options={Array.isArray(templates) ? templates : []}
          lastItemCardRef={lastItemCardRef}
          getSelectedCard={selectedTemplate}
          loading={false}
        />
        <Typography
          variant="xsmall"
          className="mt-8"
          color="grey_additional_1"
        >
          Общее оформление игры(сюжет,стилистика и другое )
        </Typography>
        <div className="game-creation-edition__line my-32" />
        <Select
          staticWidth
          withCheckbox
          withChips
          label="Выбор групп"
          prompt="Выберите группы которые обязательно должны пройти данный курс"
          disabled={gameData.status === Status.PUBLISHED}
          options={selectedGroups}
          classNames="general-information__groups"
          customTitle={activeGroupsAmount > 1 ? `${activeGroupsAmount} групп` :
            activeGroupsAmount === 1 ? activeGroupTitle : 'Все пользователи'}
          customOption={{
            name: 'Все пользователи',
            value: 'all-values',
            checkboxChecked: activeGroupsAmount === 0,
            disabled: activeGroupsAmount === 0,
          }}
          onCheckboxChanges={onSelectGroupsChange}
          onCustomOptionClick={onCustomGroupChange}
        />
        <div className="general-information__search-chips mt-32">
          <Typography variant="subtext" className="mb-4">
            Теги <Typography variant="tag" color="main_50">- необязательно</Typography>
          </Typography>
          <TagsSearchChips
            companyId={companyId}
            disabled={gameData.status === Status.PUBLISHED}
            initialTags={gameData.tags || []}
            handleSelectedTagsIds={(tags: ITag[]) => setGameData({ ...gameData, tags })}
          />
          <Typography variant="xsmall" color="grey_additional_1" className="mt-8">
            Теги помогут пользователям при поиске данной карточки
          </Typography>
        </div>
        <div className="game-creation-edition__line my-32" />
        <Checkbox
          isClicked={gameData.isModifiersIncluded}
          setClicked={(state: boolean) => setGameData({ ...gameData, isModifiersIncluded: state })}
          title="Включить модифаеры"
          titleVariant="text"
          prompt="Модифаеры - случайные события во время игры, например “Увеличение призовых монет за прохождение игры в 2 раза”. Модифаеры никак не влияют на итоговую оценку"
        />
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
  templates: state.gameTemplateReducer.templates.data,
  groups: state.groupReducer.groups.data,
});

const mapDispatchToProps = {
  getTemplates,
  getGroups,
};

export default connect<any, any>(mapStateToProps, mapDispatchToProps)(GeneralInformation);
