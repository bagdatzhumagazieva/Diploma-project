import React, { useEffect, useState } from 'react';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import TreeSelect from 'src/components/molecules/TreeSelect';
import { ModalCreateGroupTypes } from 'src/components/organisms/ModalCreateGroup/types';
import { CREATE_GROUP_TABS, BRANCHES,
  GROUPS, DURATION_IN_SYSTEM } from 'src/components/organisms/ModalCreateGroup/consts';
import './index.scss';
import Modal from 'src/components/molecules/Modal';
import Select from 'src/components/molecules/Select';
import { IOption } from 'src/components/molecules/Select/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import RadioButton from 'src/components/atoms/RadioButton';
import Arrow from 'src/components/atoms/Svg/Icons/Arrow';

function ModalCreateGroup(props: ModalCreateGroupTypes.IProps) {
  const { branches, groups, onClickCreateGroup, onClickCancel,
    onCLickCreateParametricGroup, errorMessage } = props;
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [handleClicked, setHandleClicked] = useState<boolean>(false);
  const [errors, setErrors] = useState<ModalCreateGroupTypes.IErrors>({} as ModalCreateGroupTypes.IErrors);
  const [createGroupData, setCreateGroupData] = useState<ModalCreateGroupTypes.ICreateGroupData>(
    { description: '', name: '' },
  );
  const [createParametricGroup, setCreateParametricGroup] = useState<ModalCreateGroupTypes.ICreateParametricData>(
    {
      duration_in_system: '',
      branch_id: 0,
      group_ids: [],
    },
  );

  const [selectedTab, setSelectedTab] = useState<string>(CREATE_GROUP_TABS[0].value);
  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>();
  const [openMoreSetting, setOpenMoreSetting] = useState<boolean>(false);
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>(groups || []);
  const [selectedDuration, setSelectedDuration] = useState<IOption>({} as IOption);
  const [gender, setGender] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      setModalShow(true);
    }
  },        [errorMessage]);

  useEffect(() => {
    setErrors(prevState => ({ ...prevState, branchError: '' }));
  },        [selectedBranch]);

  useEffect(() => {
    if (selectedGroups.length) {
      setErrors(prevState => ({ ...prevState, groupError: '' }));
    }
  },        [selectedGroups]);

  useEffect(() => {
    setErrors(prevState => ({ ...prevState, durationError: '' }));
  },        [selectedDuration]);

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateGroupData({ ...createGroupData, [event.target.name] : event.target.value });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateParametricGroup({ ...createParametricGroup, [event.target.name] : event.target.value });
  };

  const onClickCreate = () => {
    const data = {
      description: createGroupData.description,
      name: createGroupData.name,
    };
    onClickCreateGroup && onClickCreateGroup(data);
  };

  const onClickCreateParametric = () => {
    const group_ids = selectedGroups.filter((e: IOption) => e.checkboxChecked)
      .map((el: IOption) => { return +el.value; });
    const data = {
      group_ids,
      gender: gender || 'male',
      name: createParametricGroup.name,
      description: createParametricGroup.description,
      age_from: Number(createParametricGroup.age_from),
      age_to: Number(createParametricGroup.age_to),
      duration_in_system: selectedDuration.value,
      branch_id: Number(selectedBranch?.value),
    };
    onCLickCreateParametricGroup && onCLickCreateParametricGroup(data);
  };

  const handleCreateGroup = () => {
    if (selectedTab === CREATE_GROUP_TABS[0].value) {
      onClickCreate();
    } else {
      setHandleClicked(true);
      setErrors({
                  ...errors,
                  branchError: !selectedBranch?.value ? 'Вы не выбрали филиал' : '',
                  groupError: !selectedGroups.length ? 'Вы не выбрали группы' : '',
                  durationError: !selectedDuration?.value ? 'Вы не выбрали длительность нахождения' : '',
                });
      if (selectedGroups.length > 0 && selectedBranch?.value && selectedDuration.value) {
        onClickCreateParametric();
      }
    }
  };

  return(
    <div className="modal-create-group">
      <div className="modal-create-group__header pt-24 d-flex flex-column">
        <Typography
          variant="h1"
          className="ml-24 mb-24"
        >
          Создание Группы
        </Typography>
        <div className="modal-create-group__tabs d-flex align-self-start">
          {CREATE_GROUP_TABS.map(tab => (
            <Button
              key={tab.value}
              variant={selectedTab === tab.value ? 'textmed' : 'text'}
              classNames={[
                'tabs__button px-24 py-12',
                { 'tabs__button--active': selectedTab === tab.value },
              ]}
              onClick={() => setSelectedTab(tab.value)}
            >
              {tab.title}
            </Button>
          ))}
        </div>
      </div>

      {selectedTab === CREATE_GROUP_TABS[0].value && (
        <div className="px-32 py-24">
          <Input
            type="text"
            name="name"
            onChange={handleInputChange}
            label="Название группы"
            placeholder="Введите название"
          />
          <Input
            classNames="mt-24"
            type="text"
            name="description"
            onChange={handleInputChange}
            label="Описание(необязательно)"
            placeholder="Введите описание"
          />
        </div>
      )}
      {selectedTab === CREATE_GROUP_TABS[1].value && (
        <div className="px-32 py-24">
          <Typography variant="text">
            При создании параметрической группы добавляются сотрудники из выбранных филиала и группы
          </Typography>
          {branches && (
            <div className="d-flex flex-column multiple-invitation__branch mt-24">
              <Typography
                variant="subtext"
                className="mb-4"
              >
                Филиал
              </Typography>
              <TreeSelect
                staticWidth
                placeholder="Выберите филиал"
                treeOptions={BRANCHES}
                selectedTreeOption={selectedBranch}
                setSelectedOption={setSelectedBranch}
                errorMessage={handleClicked ? errors.branchError : ''}
              />
            </div>
          )}
          {groups && (
            <div className="d-flex flex-column multiple-invitation__groups mt-24">
              <Typography
                variant="subtext"
                className="mb-4"
              >
                Группы
              </Typography>
              <Select
                staticWidth
                withCheckbox
                errorMessage={errors.groupError}
                options={GROUPS}
                selectedOption={{} as IOption}
                customTitle="Выберите группы"
                onCheckboxChanges={setSelectedGroups}
              />
            </div>
          )}
          <Input
            classNames="mt-24"
            type="text"
            name="name"
            onChange={handleChange}
            label="Название группы"
            placeholder="Введите название"
          />
          <Input
            classNames="mt-24"
            type="text"
            name="description"
            onChange={handleChange}
            label="Описание(необязательно)"
            placeholder="Введите описание"
          />
          <Button
            className="mt-32 mb-24"
            onClick={() => setOpenMoreSetting(!openMoreSetting)}
            type="link"
          >
            <Arrow
              color="#FF9800"
              direction={openMoreSetting ? 'up' : 'down'}
            />
            <Typography className="ml-12" variant="subtext" color="main">
              Расширенные настройки
            </Typography>
          </Button>
          {openMoreSetting && (
            <>
              <div className="form__gender d-flex flex-column mb-40">
                <Typography className="mb-16" variant="subtext">Ваш пол</Typography>
                <div className="d-flex">
                  <RadioButton
                    setClicked={radioButtonHandler}
                    classNames="mr-48"
                    label="Мужской"
                    name="gender"
                    value="male"
                    isChecked={'male' === gender}
                  />
                  <RadioButton
                    setClicked={radioButtonHandler}
                    label="Женский"
                    name="gender"
                    value="female"
                    isChecked={'female' === gender}
                  />
                </div>
              </div>
              <Typography className="mb-16" variant="subtext">Возраст</Typography>
              <div className="d-flex justify-content-between">
                <Input
                  type="text"
                  classNames="mr-12"
                  placeholder="от"
                  name="age_from"
                  onChange={handleChange}
                />
                <Input
                  classNames="ml-12"
                  type="text"
                  placeholder="до"
                  name="age_to"
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex flex-column multiple-invitation__groups mt-24">
                <Typography
                  variant="subtext"
                  className="mb-4"
                >
                  Длительность нахождения в системе
                </Typography>
                <Select
                  staticWidth
                  options={DURATION_IN_SYSTEM}
                  setSelectedOption={setSelectedDuration}
                  selectedOption={{} as IOption}
                  customTitle="Выберите группы"
                  onCheckboxChanges={setSelectedGroups}
                  errorMessage={errors.durationError}
                />
              </div>
            </>)}
        </div>
      )}
      <div className="d-flex justify-content-end m-32 mb-24">
        <Button
          className="modal__btn"
          color="blacker"
          variant="textmed"
          type="link"
          onClick={onClickCancel}
        >
          Отмена
        </Button>
        <div className="ml-auto">
          <Button
            className="modal__btn"
            variant="textmed"
            onClick={handleCreateGroup}
          >
            Создать
          </Button>
        </div>
      </div>
      {modalShow && (
        <Modal
          width={422}
          top={24}
          right={24}
          withCloseIcon={false}
          onCloseClick={() => setModalShow(false)}
        >
          <div className="parametric-group-error-modal">
            <Typography
              variant="h2"
              className="d-block"
            >
              Пользователи не найдены!
            </Typography>
            <Typography
              variant="text"
              className="mt-24"
            >
              {errorMessage && errorMessage}
            </Typography>
            <Typography
              variant="text"
              className="mt-24"
            >
              Попробуйте снова.
            </Typography>
            <Button
              className="parametric-group-error-modal__close-btn d-flex ml-auto"
              variant="textmed"
              onClick={() => setModalShow(false)}
            >
              Понятно
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ModalCreateGroup;
