import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getCategories } from 'src/store/category/actions';
import { getBranches } from 'src/store/branch/actions';
import { getGroups } from 'src/store/group/actions';
import { createBattle, getBattleEmployees } from 'src/store/battles/action';

import Button from 'src/components/atoms/Button';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Typography from 'src/components/atoms/Typography';
import ModalLoading from 'src/components/atoms/ModalLoading';
import useNotification from 'src/components/molecules/Notification/useNotification';
import TreeSelect from 'src/components/molecules/TreeSelect';
import Input from 'src/components/molecules/Input';
import Select from 'src/components/molecules/Select';
import Table, { TableWithCheckboxes } from 'src/components/molecules/Table';
import Modal from 'src/components/molecules/Modal';
import Layout from 'src/components/organisms/Layout';
import ModalBattleInstruction from 'src/pages/GamePages/Battles/BattleInvitation/ModalBattleInstruction';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import { addSlash } from 'src/core/components/router';
import { RouterPaths } from 'src/core/enum';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import useDebounce from 'src/hooks/useDebounce';
import { BattleInvitationTypes } from 'src/pages/GamePages/Battles/BattleInvitation/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IOption } from 'src/components/molecules/Select/types';
import { parseCategoriesToTreeSelect } from 'src/components/organisms/AdminCategories/parsers';
import { BranchesTypes } from 'src/store/branch/types';
import { BattleEmployeesTypes } from 'src/store/battles/types';
import { parseBranchesToTreeSelect } from 'src/utils/parse';
import { CategoryTypes } from 'src/store/category/types';
import { BattleInvitationHeaderData, parseBattleEmployees } from 'src/pages/GamePages/Battles/BattleInvitation/consts';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { NotificationType } from 'src/components/molecules/Notification/types';
import 'src/pages/GamePages/Battles/BattleInvitation/index.scss';

function BattleInvitation(props: BattleInvitationTypes.IProps) {
  const {
    getCategories, categories, getBranches, getGroups,
    groups: propsGroups, branches: propsBranches,
    createBattle, history, battleEmployees, getBattleEmployees,
    battleEmployeesLoading, categoriesLoading, createdBattleError,
  } = props;

  const notification = useNotification();
  const [step, setStep] = useState<number>(0);
  const [groups, setGroups] = useState<IOption[]>([]);
  const [branches, setBranches] = useState<ITreeOption[]>([]);
  const [showBattleInstruction, setShowBattleInstruction] = useState<boolean>();
  const [selectedUser, setSelectedUser] = useState<number>();
  const [error, setError] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [createdBattleId, setCreatedBattleId] = useState<number>();
  const [battles, setBattles] = useState<TableWithCheckboxes<BattleInvitationTypes.TableTypes>[]>();
  const [selectedCategories, setSelectedCategories] = useState<ITreeOption[]>();
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [bodyParams, setBodyParams] = useState<BattleEmployeesTypes.IQueryParams>({ companyId });
  const [searchName, setSearchName] = useState('');
  const debounceSearchValue = useDebounce(searchName, 500);

  const breadCrumbItems = [
    { label: 'Баттлы', link: '/battles' },
    { label: 'Приглашение на Баттл', link: '' },
  ];

  useEffect(() => {
    if (createdBattleError) {
      notification.add({
        ...DEFAULT_NOTIFICATION_DATA,
        type: NotificationType.Danger,
        description: createdBattleError,
      });
    }
  },        [createdBattleError]);

  const onNextButtonClick = () => {
    if (step === 0) {
      setStep(prevState => prevState + 1);
      return;
    }
    if (step === 1) {
      setLoader(true);
      selectedUser && createBattle && createBattle({
        categoryIds: selectedCategories?.map(e => +e.value) || [],
        userId: selectedUser,
      },                                           companyId, {
        onSuccess: (res: any) => {
          setLoader(false);
          if (!res.data.id) return;
          setCreatedBattleId(res.data.id);
          setShowBattleInstruction(true);
        },
        onError: () => {
          setLoader(false);
        },
      });
    }
  };

  useEffect(() => {
    if (battleEmployees) {
      setBattles(parseBattleEmployees(battleEmployees));
    }
  },        [battleEmployees]);

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      getCategories && getCategories(companyId, 1, 50);
      getBattleEmployees && getBattleEmployees(bodyParams);
      getBranches && getBranches(companyId);
      const data = {
        companyId,
        page: 1,
        pageSize: 100,
      };
      getGroups && getGroups(data);
    },
    [companyId],
  );

  useEffect(
    () => {
      setBodyParams((prevState) => {
        const newFilterData =  { ...prevState, keyword: debounceSearchValue };
        getBattleEmployees && getBattleEmployees(newFilterData);
        return newFilterData;
      });
    },
    [debounceSearchValue],
  );

  useEffect(
    () => {
      if (!Array.isArray(propsGroups)) return;
      setGroups(propsGroups.map(item => ({ name: item.name || '', value: `${item.id}` })));
    },
    [propsGroups],
  );

  const onCLickUserName = (id: number) => {
    setSelectedUser(id);
    if (battles) {
      setBattles(battles.map(b => ({ ...b, isChecked: b.id === id })));
    }
  };

  const onBattleTableChange = (data: TableWithCheckboxes<BattleInvitationTypes.TableTypes>[]) => {
    setBattles(data);
    setSelectedUser(data.find(e => e.isChecked)?.id);
    setError(data.filter(e => e.isChecked === true).length === 1 ? '' : 'Выберите одного пользователя.');
  };

  const onSelectBranches = (trees: ITreeOption[]) => {
    setBranches(trees);
    const newParams = {
      ...bodyParams,
      branchIds: trees.map(e => +e.value),
    };
    setBodyParams(newParams);
    getBattleEmployees && getBattleEmployees(newParams);
  };

  const onSelectGroups = (options: IOption[]) => {
    setGroups(options);
    const newParams = {
      ...bodyParams,
      groupIds: options.filter(e => e.checkboxChecked).map(e => +e.value),
    };
    setBodyParams(newParams);
    getBattleEmployees && getBattleEmployees(newParams);
  };

  return (
    <Layout className="battle-invitation">
      <div className="d-flex flex-column pt-48 pb-24 grid">
        <Breadcrumb items={breadCrumbItems} />
        <Typography variant="headline" className="mt-32">Приглашение на Баттл</Typography>
      </div>
      <div className="battle-invitation__main-content flex-grow-1 color_grey_background__bg pt-32 pb-48">
        <div className="grid">
          <div className="battle-invitation__card-wrapper d-flex flex-column">
            <div className="battle-invitation__card px-24 py-32 d-flex flex-column">
              {step === 0 ? (
                <div className="battle-invitation__rubric-select-block">
                  <Typography variant="h1">Выбор темы Баттла</Typography>
                  <TreeSelect
                    withChips
                    staticWidth
                    isMultiSelect
                    isPositionStatic
                    withoutRef
                    chooseLimit={3}
                    loading={categoriesLoading}
                    placeholder="Выберите рубрики"
                    treeOptions={categories
                      ? categories.map((n: CategoryTypes.ICategoryRenderProps) => parseCategoriesToTreeSelect(n))
                      : []}
                    selectedTreeOptions={selectedCategories}
                    setSelectedOptions={setSelectedCategories}
                    prompt="Система случайным образом выберет вопросы из данных 3 рубрик"
                    className="mt-32"
                  />
                </div>
              ) : step === 1 ? (
                  <>
                    <Typography variant="h1">Выбор соперника</Typography>
                    <Input
                      label="Поиск соперника"
                      type="text"
                      value={bodyParams.keyword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
                      placeholder="Имя Фамилия / никнейм / e-mail"
                      classNames="battle-invitation__search-input mt-32"
                    />
                    <TreeSelect
                      withChips
                      staticWidth
                      isMultiSelect
                      isPositionStatic
                      treeOptions={propsBranches
                        ? propsBranches.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n))
                        : []}
                      selectedTreeOptions={branches}
                      setSelectedOptions={onSelectBranches}
                      placeholder="Выбор филиала"
                      className="battle-invitation__select mt-24"
                    />
                    <Select
                      id="group"
                      staticWidth
                      withChips
                      withCheckbox
                      options={groups}
                      onCheckboxChanges={onSelectGroups}
                      width={358}
                      label="Выбор группы"
                      placeholder="Выбор группы"
                      className="battle-invitation__select mt-24 mb-32"
                    />
                    <Typography variant="h2">Результаты поиска:</Typography>
                    <Table
                      radio
                      headerData={BattleInvitationHeaderData(onCLickUserName)}
                      bodyData={battles || []}
                      loading={battleEmployeesLoading}
                      wrapperClassName="battle-invitation__table mt-24"
                      onCheckboxChange={onBattleTableChange}
                      onRadioChange={onBattleTableChange}
                    />
                    {error && (
                      <Typography
                        variant="text"
                        color="red"
                        className="my-8"
                      >
                        {error}
                      </Typography>
                    )}
                  </>
                ) :
                <></>
              }
            </div>
            <div className="mt-24 align-self-end">
              {!step ? <Button
                disabled={!selectedCategories || selectedCategories.length < 1}
                onClick={onNextButtonClick}
                className="battle-invitation__submit-button"
                variant="textmed"
              >
                  Далее
              </Button> :
                <Button
                  disabled={error !== '' || selectedUser === undefined}
                  onClick={onNextButtonClick}
                  className="battle-invitation__submit-button"
                  variant="textmed"
                >
                  Создать баттл
                </Button>}
            </div>
          </div>
        </div>
      </div>
      {showBattleInstruction && (
        <Modal
          withSaveBtnArrow
          withCloseIcon={false}
          title="Инструкция по прохождению Баттла"
          titleVariant="h1"
          width={712}
          isSaveButtonDisable
          saveLabel="Пройти Баттл"
          cancelLabel="Вернуться назад"
          onCloseClick={() => {
            setShowBattleInstruction(false);
            history.push(`${addSlash(RouterPaths.BATTLES)}`);
          }}
          onSaveClick={() => history.push(`${addSlash(RouterPaths.BATTLE)}/${createdBattleId}`)}
        >
          <ModalBattleInstruction />
        </Modal>
      )}
      {loader && (
        <ModalLoading />
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  categories: state.categoryReducer.categories.data,
  categoriesLoading: state.categoryReducer.categories.loading,
  branches: state.branchReducer.branches.data,
  groups: state.groupReducer.groups.data,
  battleEmployees: state.battlesReducer.battleEmployees.data,
  battleEmployeesLoading: state.battlesReducer.battleEmployees.loading,
  createdBattleError: state.battlesReducer.createdBattleState.errorMessage,
});

const mapDispatchToProps = {
  getBranches,
  getCategories,
  getGroups,
  createBattle,
  getBattleEmployees,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withNotificationProvider(BattleInvitation)));
