import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import groupActions from 'src/store/group/actions';
import branchActions from 'src/store/branch/actions';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Input from 'src/components/molecules/Input';
import Table from 'src/components/molecules/Table';
import Modal from 'src/components/molecules/Modal';
import ModalCreateGroup from 'src/components/organisms/ModalCreateGroup';
import Pagination from 'src/components/atoms/Pagination';
import Hint from 'src/components/atoms/Hint';
import Select from 'src/components/molecules/Select';
import GroupOptions from 'src/components/molecules/GroupOptions';

import { tableHeader } from 'src/components/organisms/CompanyComponents/CompanyGroups/consts';
import IconInfo from 'src/assets/img/icons/info.svg';
import IconPlus from 'src/assets/img/icons/plus.svg';
import { IOption } from 'src/components/molecules/Select/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { CompanyGroupTypes } from 'src/components/organisms/CompanyComponents/CompanyGroups/types';
import { ModalCreateGroupTypes } from 'src/components/organisms/ModalCreateGroup/types';
import { parseBranchesToTreeSelect } from 'src/utils/parse';
import { BranchesTypes } from 'src/store/branch/types';
import { SortDirection } from 'src/components/molecules/Table/types';
import { GroupTypes } from 'src/store/group/types';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import './index.scss';

function CompanyGroup(props: CompanyGroupTypes.IProps) {
  const {
    companyId, company, getGroups, getBranches, createGroup, updateGroup, deleteGroup,
    branches, createParametricGroup, parametricGroupError, downloadGroupEmployees,
    groupData, setGroupData,
  } = props;
  const { data: groups, total: groupsTotal, loading: groupsLoading } = props.groups || {};
  const groupsPerPage = 5;

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isEditGroupModalOpen, setEditGroupModalOpen] = useState(false);
  const [isDeleteGroupModalOpen, setDeleteGroupModalOpen] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState<string>();
  const [groupsForSelect, setGroupsForSelect] = useState<IOption[]>();
  const [selectedOption, setSelectedOption] = useState<IOption>();
  const [inheritanceGroupId, setInheritanceGroupId] = useState<number>();
  const [selectedGroup, setSelectedGroup] = useState<GroupTypes.IRenderProps>();
  const [groupName, setGroupName] = useState<string>();
  const [groupDescription, setGroupDescription] = useState<string>();
  const [groupsBodyParams, setGroupsBodyParams] = useState<GroupTypes.IQueryParams>(
    {
      companyId,
      page: 1,
      pageSize: groupsPerPage,
      orderField: '',
    });

  useEffect(
    () => {
      getBranches && getBranches(companyId);
      getGroups && getGroups(groupsBodyParams);
    },
    [],
  );

  useEffect(
    () => {
      const withoutHeritage = { name: 'Без наследия', value: 'withoutHeritage' };
      groups && setGroupsForSelect(
        [
          withoutHeritage,
          ...groups.map((n: GroupTypes.IRenderProps) => ({ name: n.name || '', value: n.id.toString() })),
        ]);
      setSelectedOption(withoutHeritage);
      groups && setGroupData(groups);
    },
    [groups],
  );

  const onEditGroup = () => {
    if (groupName) {
      const updateData:GroupTypes.ICreateGroupResponse = {
        company_id: companyId,
        name: groupName,
        description: groupDescription || '',
      };
      updateGroup && getGroups &&
      updateGroup((selectedGroup && selectedGroup.id) || 0, updateData, {
        onSuccess: () => {
          getGroups(groupsBodyParams);
        },
      });
      setEditGroupModalOpen(false);
    } else {
      setInputErrorMessage('Введите данные');
    }
  };

  const onDeleteGroup = () => {
    deleteGroup && getGroups && selectedGroup &&
    deleteGroup([selectedGroup.id], inheritanceGroupId, {
      onSuccess: () => {
        getGroups(groupsBodyParams);
      },
    });
    setDeleteGroupModalOpen(false);
  };

  const onDownloadReport = (group: GroupTypes.IRenderProps) => {
    downloadGroupEmployees && downloadGroupEmployees(group.id);
  };

  const getLastOption = (id: number) => {
    const index = groupData.findIndex(e => e.id === id);
    return index % 5 === 4 || index % 5 === 3 || index === groupData.length - 1 || index === groupData.length - 2;
  };

  const headerData = [
    ...tableHeader,
    {
      key: 'option',
      name: '',
      width: '72px',
      render: (n: any) => (
        <GroupOptions
          isLast={getLastOption(n.id)}
          onEditGroupClick={(onGroupOptionsClick(n, () => setEditGroupModalOpen(true)))}
          onDownloadReportClick={() => onDownloadReport(n)}
          onDeleteGroupClick={onGroupOptionsClick(n, () => setDeleteGroupModalOpen(true))}
        />
      ),
    },
  ];

  const onGroupOptionsClick = (group: GroupTypes.IRenderProps, callback?: () => void) => () => {
    setSelectedGroup(group);
    setGroupName(group.name);
    callback && callback();
  };

  const onSelectInheritanceGroup = (option: IOption) => {
    setInheritanceGroupId(option.value === 'withoutHeritage' ? undefined : parseInt(option.value, 10));
    setSelectedOption(option);
  };

  const onCreateGroup = (createGroupInfo: ModalCreateGroupTypes.ICreateGroupData) => {
    const data = {
      name: createGroupInfo.name,
      description: createGroupInfo.description,
      company_id: companyId,
    };
    createGroup && getGroups && createGroup(data, {
      onSuccess: () => {
        getGroups(groupsBodyParams);
      },
    });
    setCreateModalOpen(false);
  };

  const onCreateParametricGroup = (parametricInfo: ModalCreateGroupTypes.ICreateParametricData) => {
    const data = {
      name: parametricInfo.name || '',
      description: parametricInfo.description,
      company_id: companyId,
      gender: parametricInfo.gender,
      age_from: parametricInfo.age_from,
      age_to: parametricInfo.age_to,
      duration_in_system: parametricInfo.duration_in_system,
      branch_id: parametricInfo.branch_id,
      group_ids: parametricInfo.group_ids,
    };
    createParametricGroup && getGroups && createParametricGroup(data, () => getGroups(groupsBodyParams));
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    const newBodyParams = {
      ...groupsBodyParams,
      order_field: (sortDirection !== SortDirection.Default) ? `${label}_${sortDirection}` : undefined,
    };
    setGroupsBodyParams(newBodyParams);
    getGroups && getGroups(newBodyParams);
  };

  const onPaginationPageClick = (page: number) => {
    const newBodyParams = { ...groupsBodyParams, page };
    setGroupsBodyParams(newBodyParams);
    getGroups && getGroups(newBodyParams);
  };

  const branchesTreeSelect: ITreeOption[] = [{
    name: company?.name || 'text',
    value: company?.id ? 'main' : '0',
    children: branches
      ? branches.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n))
      : undefined,
  }];

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBodyParams = { ...groupsBodyParams, keyword: event.target.value };
    setGroupsBodyParams(newBodyParams);
    getGroups && getGroups(newBodyParams);
  };

  return (
    <div className="company-groups">
      <div className="d-flex align-items-center mb-24">
        <Typography variant="h1">
          Группы
        </Typography>
        <Typography
          variant="text"
          className="ml-8"
        >
          ({groupsTotal})
        </Typography>
      </div>
      <div className="d-flex align-items-end justify-content-between">
        <div className="d-flex flex-column">
          <Typography
            variant="subtext"
            className="mb-4"
          >
            Поиск группы
          </Typography>
          <Input
            type="text"
            placeholder="Название"
            classNames="company-groups__input-searcher"
            icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
            onChange={onInputChange}
          />
        </div>
        <div className="d-flex">
          <Button
            className="d-flex align-items-center py-12 px-24"
            variant="textmed"
            onClick={() => setCreateModalOpen(true)}
          >
            <Image
              src={IconPlus}
              alt="add button"
              className="mr-8"
            />
            Создать
          </Button>
        </div>
      </div>
      <Table
        checkbox
        wrapperClassName="mt-16"
        loading={groupsLoading}
        headerData={headerData}
        onSort={onSort}
        bodyData={groupData || []}
        onCheckboxChange={setGroupData}
        emptyDataDescription="Список групп пуст."
      />
      <div className="mt-16 mb-48 justify-content-end">
        <Pagination
          total={groupsTotal || groupsPerPage}
          pageSize={groupsPerPage}
          onGetPage={onPaginationPageClick}
        />
      </div>
      {createModalOpen && (
        <Modal
          width={422}
          onCloseClick={() => setCreateModalOpen(false)}
        >
          <ModalCreateGroup
            groups={groups ? groups.map(n => ({ name: n.name, value: `${n.id}` } as IOption)) : []}
            branches={branchesTreeSelect}
            onClickCreateGroup={onCreateGroup}
            onCLickCreateParametricGroup={onCreateParametricGroup}
            onClickCancel={() => setCreateModalOpen(false)}
            errorMessage={parametricGroupError}
          />
        </Modal>
      )}
      {isEditGroupModalOpen && selectedGroup && (
        <Modal
          width={422}
          title="Редактирование группы"
          cancelLabel="Отмена"
          saveLabel="Сохранить"
          onCloseClick={() => setEditGroupModalOpen(false)}
          onSaveClick={onEditGroup}
        >
          <div className="mx-32">
            <Input
              label="Название группы"
              type="text"
              placeholder="Введите название"
              classNames="mb-24"
              value={groupName}
              errorMessage={inputErrorMessage}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGroupName(event.target.value)}
            />
            <Input
              label="Описание"
              type="text"
              placeholder="Введите описание"
              value={selectedGroup.description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGroupDescription(event.target.value)}
            />
          </div>
        </Modal>
      )}
      {isDeleteGroupModalOpen && (
        <Modal
          width={422}
          title="Удаление группы"
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          onCloseClick={() => setDeleteGroupModalOpen(false)}
          onDeleteClick={onDeleteGroup}
        >
          <div className="mx-32">
            <Typography
              variant="text"
              className="mb-24 d-block"
            >
              Вы действительно хотите удалить данную группу?
            </Typography>
            <Typography
              variant="text"
              className="mb-24"
            >
              Выберите из списка группу, которая унаследует пользователей
              <Hint
                hasArrow
                interactive
                placement="right-start"
                hint={
                  <Typography
                    color="blacker"
                    variant="xxsmall"
                    classNames="d-block"
                  >
                    После удаления все пользователи перейдут в выбранный вами группу
                  </Typography>
                }
              >
                <Image
                  src={IconInfo}
                  className="branch-delete-info__img ml-8"
                  alt="После удаления все пользователи перейдут в выбранный вами группу"
                />
              </Hint>
            </Typography>
            <Typography
              variant="subtext"
              className="mb-8 d-block"
            >
              Группа наследница
            </Typography>
            {groupsForSelect && selectedGroup && (
              <Select
                classNames="mt-4"
                staticWidth
                isPositionFixed
                options={groupsForSelect.filter((n: IOption) => n.value !== selectedGroup.id.toString())}
                selectedOption={selectedOption || null}
                setSelectedOption={onSelectInheritanceGroup}
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  company: state.companyReducer.company.data,
  groups: state.groupReducer.groups,
  loadingGroups: state.groupReducer.groups.loading,
  branches: state.branchReducer.branches.data,
  parametricGroupError: state.groupReducer.parametricGroup.errorMessage,
});

const mapDispatchToProps = {
  getBranches: branchActions.getBranches,
  getGroups: groupActions.getGroups,
  createGroup: groupActions.createGroup,
  createParametricGroup: groupActions.createParametricGroup,
  updateGroup: groupActions.updateGroup,
  deleteGroup: groupActions.deleteGroup,
  downloadGroupEmployees: groupActions.downloadGroupEmployees,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyGroup);
