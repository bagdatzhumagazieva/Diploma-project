import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Select from 'src/components/molecules/Select';
import { IOption } from 'src/components/molecules/Select/types';
import Input from 'src/components/molecules/Input';
import ButtonImageUpload from 'src/components/organisms/ButtonImageUpload';

import groupActions from 'src/store/group/actions';
import {
  TASKS_TYPE,
  DEFAULT_ERROR_MES,
} from 'src/components/organisms/TaskCreationEdition/GeneralInformation/const';
import TaskCreationContext from 'src/components/organisms/TaskCreationEdition/TaskCreationContext';
import { TaskGeneralInformationTypes } from 'src/components/organisms/TaskCreationEdition/GeneralInformation/types';
import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';
import 'src/pages/AdminPages/Task/TaskCreationPage/index.scss';
import { CONVERT_GROUPS_TO_OPTIONS } from 'src/components/organisms/CourseCreationEdition/GeneralInformation/consts';
import { GroupTypes } from 'src/store/group/types';

function GeneralInformation(props: TaskGeneralInformationTypes.IProps) {
  const { companyId, getGroups, groups = [] } = props;
  const { setStep, setPublication, taskData, setTaskData, publication } = useContext(
    TaskCreationContext,
  );
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>([]);
  const activeGroupTitle = selectedGroups.find(item => item.checkboxChecked)?.name || '';
  const activeGroupsAmount = selectedGroups.filter(item => item.checkboxChecked).length;
  const [errorMessage, setErrorMessage] = useState<TaskGeneralInformationTypes.IDataErrorMessages>(
    DEFAULT_ERROR_MES,
  );

  useEffect(
    () => {
      getGroups && getGroups({ companyId });
      setErrorMessage(DEFAULT_ERROR_MES);
    },
    [],
  );

  useEffect(
    () => {
      if (!groups) return;
      let groupsWithActive: GroupTypes.IRenderProps[];
      groupsWithActive = Array.isArray(groups) ? groups.map((item) => {
        const isActive = Array.isArray(taskData.groupIds) && taskData.groupIds.includes(item.id);
        return { ...item, checkboxChecked: isActive };
      }) : [];
      setSelectedGroups(CONVERT_GROUPS_TO_OPTIONS(groupsWithActive));
    },
    [groups],
  );

  const handleImageUpload = (image: ButtonImageUploadTypes.IImage) => {
    setTaskData({ ...taskData, image: image.imageUrl, imageThumb: image.imageThumbnailUrl });
    setErrorMessage({ ...errorMessage, picture: '' });
  };

  const handleSelectedPublication = (option: IOption) => {
    setPublication(option);
    setTaskData({ ...taskData, type: option.value });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'rewardAmount') {
      setTaskData({ ...taskData, [name]: value.length < 1 ? null : +value });
    } else {
      setTaskData({ ...taskData, [name]: value });
    }
    setErrorMessage({ ...errorMessage, [name]: '' });
  };

  const onSelectGroupsChange = (options: IOption[]) => {
    setSelectedGroups(options);
    const selectedOptions = options.filter(item => item.checkboxChecked).map(item => +item.value);
    setTaskData({ ...taskData, groupIds: selectedOptions });
  };

  const onCustomGroupChange = () => {
    const selectedOptions = selectedGroups.map(group => ({ ...group, checkboxChecked: false }));
    setSelectedGroups(selectedOptions);
    setTaskData({ ...taskData, groupIds: [] });
  };

  const onNextButtonClick = () => {
    const errors = errorMessage;
    let isHasError = false;

    if (!taskData.rewardAmount) {
      errors.rewardAmount = 'Введите количество монет';
      isHasError = true;
    }
    if (taskData.rewardAmount && (taskData.rewardAmount < 0 || taskData.rewardAmount > 100000)) {
      errors.rewardAmount = 'Укажите число от 0 до 100 000';
      isHasError = true;
    }
    if (!taskData.name) {
      errors.name = 'Введите заголовок';
      isHasError = true;
    }
    if (!taskData.imageThumb || !taskData.image) {
      errors.picture = 'Выберите обложку';
      isHasError = true;
    }
    setErrorMessage({ ...errors });

    if (isHasError) return;
    setStep(1);
  };

  const onRewardInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (taskData.rewardAmount === 0 || e.key === '-' || e.key === 'e') e.preventDefault();
  };

  return (
    <div className="d-flex flex-column">
      <div className="task-creation__info pt-32 pl-24 pb-32 d-flex flex-column">
        <Typography variant="h1">Общая информация</Typography>
        <Typography variant="text-med" className="mt-32">
          Тип задания
        </Typography>
        <div className="task-creation__info__border">
          <Select
            staticWidth
            options={TASKS_TYPE}
            className="mt-32 mb-32 task-creation__info__select"
            label="Выбор публикации"
            setSelectedOption={handleSelectedPublication}
            selectedOption={
              taskData.type ? {
                value: taskData.type || '',
                name: TASKS_TYPE.find((e: IOption) => e.value === taskData.type)?.name || '',
              } : publication}
          />
        </div>
        <div className="task-creation__info__input mb-8">
          <Input
            type="text"
            label="Заголовок задания"
            name="name"
            classNames="task-creation__info__cover pt-32"
            value={taskData.name || ''}
            errorMessage={errorMessage.name}
            onChange={handleInputChange}
            placeholder="Желательно использовать не более 7 слов в названии"
            prompt="Заголовок, который будут видеть сотрудники вашей компании."
          />
          <Input
            type="text"
            label="Тизер для ленты"
            name="description"
            classNames="mt-32"
            value={taskData.description || ''}
            onChange={handleInputChange}
            placeholder="Введите текст"
            prompt="Короткое рекламное сообщение про задание, повышающее интерес к его исполнению"
          />
        </div>
        <div className="task-creation__info__border pb-32 mt-32">
          <ButtonImageUpload
            title="Обложка"
            description="JPG и PNG до 10 МБ"
            image={{
              imageUrl: taskData?.image || '',
              imageThumbnailUrl: taskData?.imageThumb || '',
            }}
            handleImageUpload={handleImageUpload}
            errorMessage={errorMessage.picture}
          />
        </div>
        <Select
          staticWidth
          withCheckbox
          withChips
          options={selectedGroups}
          className="mt-32 mb-8 task-creation__info__select"
          label="Выбор группы"
          onCheckboxChanges={onSelectGroupsChange}
          onCustomOptionClick={onCustomGroupChange}
          customTitle={activeGroupsAmount > 1 ? `${activeGroupsAmount} групп` :
            activeGroupsAmount === 1 ? activeGroupTitle : 'Все пользователи'}
          customOption={{
            name: 'Все пользователи',
            value: 'all-values',
            checkboxChecked: activeGroupsAmount === 0,
            disabled: activeGroupsAmount === 0,
          }}
        />
        <Typography
          variant="xsmall"
          color="grey_additional_1"
          className="task-creation__info__select mb-32"
        >
          Выберите группы которые обязательно должны пройти данное задание
        </Typography>
        <Typography variant="subtext" className="task-creation__info__cover mb-8">
          Вознаграждение
        </Typography>
        <div className="task-creation__info__input mb-8">
          <Input
            type="number"
            name="rewardAmount"
            value={taskData.rewardAmount || undefined}
            onChange={handleInputChange}
            onKeyPress={onRewardInputKeyPress}
            placeholder="Введите кол-во монет"
            errorMessage={errorMessage.rewardAmount}
          />
          <Typography variant="xsmall" color="grey_additional_1" className="mt-8">
            Сколько монет пользователь получит за прохождение данного задания
          </Typography>
        </div>
      </div>
      <Button
        variant="textmed"
        className="next-button align-self-end mt-32 mb-32"
        onClick={onNextButtonClick}
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
  getGroups: groupActions.getGroups,
};

export default connect<any>(mapStateToProps, mapDispatchToProps)(GeneralInformation);
