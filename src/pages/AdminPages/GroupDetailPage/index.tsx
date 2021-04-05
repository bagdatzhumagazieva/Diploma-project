import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import classNames from 'classnames';

import { AdminRouterPaths } from 'src/core/enum';
import { addAdminSlash } from 'src/routers/AdminRouters';
import useNotification from 'src/components/molecules/Notification/useNotification';

import companyActions from 'src/store/company/actions';
import branchActions from 'src/store/branch/actions';
import groupActions from 'src/store/group/actions';
import employmentActions from 'src/store/employment/actions';

import AppContext from 'src/components/AppContext';
import ModalLoading from 'src/components/atoms/ModalLoading';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Card from 'src/components/atoms/Cards/Card';
import Hint from 'src/components/atoms/Hint';
import Image from 'src/components/atoms/Image';
import Layout from 'src/components/organisms/Layout';
import Modal from 'src/components/molecules/Modal';
import Input from 'src/components/molecules/Input';
import Tabs from 'src/components/molecules/Tabs';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import TableEmployeesWithPagination from 'src/components/organisms/TableComponents/TableEmployees/TableEmployeesWithPagination';
import TabContent from 'src/pages/AdminPages/GroupDetailPage/tabContent';
import Select from 'src/components/molecules/Select';

import ModalEmployeesAdditionToGroupOrBranch from 'src/components/organisms/ModalEmployeesAdditionToGroupOrBranch';
import EditIcon from 'src/assets/img/icons/edit.svg';
import DeleteIcon from 'src/assets/img/icons/delete.svg';
import IconInfo from 'src/assets/img/icons/info.svg';
import ExcelPng from 'src/assets/img/icons/excel.png';

import { parseBranchesToTreeSelect } from 'src/utils/parse';
import { GROUP_DETAIL_TABS } from 'src/pages/AdminPages/GroupDetailPage/consts';
import { GroupDetailPageTypes } from 'src/pages/AdminPages/GroupDetailPage/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IOption } from 'src/components/molecules/Select/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { BranchesTypes } from 'src/store/branch/types';
import { GroupTypes } from 'src/store/group/types';
import IconPlus from 'src/assets/img/icons/plus.svg';
import './index.scss';

function GroupDetailPage(props: GroupDetailPageTypes.IProps) {
  const {
    company, branches, groups, updatedGroup, deletedGroup,
    getCompanyById, getBranches, getGroups, clearFilteredEmployees,
    updateGroup, deleteGroup, group, getGroupById, downloadGroupEmployees,
  } = props;

  const { companyId } = useContext(AppContext);
  const { id: groupId } = useParams();
  const history = useHistory();
  const notification = useNotification();
  const [pageLoading, setPageLoading] = useState<boolean>();

  const branchesTreeSelect: ITreeOption[] = [{
    name: company?.name || '',
    value: company?.id ? 'main' : '0',
    children: branches
      ? branches.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n))
      : undefined,
  }];

  const [activeTab, setActiveTab] = useState<string>('0');
  const [groupsForSelect, setGroupsForSelect] = useState<IOption[]>();
  const [groupName, setGroupName] = useState<string>();
  const [groupDescription, setGroupDescription] = useState<string>();
  const [inputErrorMessage, setInputErrorMessage] = useState<string>();
  const [isEditGroupModalOpen, setEditGroupModalOpen] = useState<boolean>(false);
  const [isDeleteGroupModalOpen, setDeleteGroupModalOpen] = useState<boolean>(false);
  const [isEmployeeAddModalOpen, setEmployeeAddModalOpen] = useState<boolean>(false);
  const [inheritanceGroupId, setInheritanceGroupId] = useState<number>();
  const [selectedOption, setSelectedOption] = useState<IOption>();
  const handleActiveTab = (id: string) => setActiveTab(id);

  const onEditGroup = () => {
    if (groupName && companyId) {
      updateGroup && getGroupById && groupId && updateGroup(
        +groupId,
        { company_id: companyId, description: groupDescription || '', name: groupName },
        {
          onSuccess: () => {
            setGroupName(undefined);
            setGroupDescription(undefined);
            getGroupById(+groupId);
          },
        },
      );
      setEditGroupModalOpen(false);
    } else {
      setInputErrorMessage('Введите данные');
    }
  };

  const onDeleteGroup = () => {
    deleteGroup && getGroups && groupId &&
    deleteGroup(+groupId, inheritanceGroupId, {
      onSuccess: () => {
        history.goBack();
      },
    });
    setDeleteGroupModalOpen(false);
  };

  const onDownloadReport = () => {
    downloadGroupEmployees && groupId && downloadGroupEmployees(+groupId);
  };

  const onSelectInheritanceGroup = (option: IOption) => {
    setInheritanceGroupId(option.value === 'withoutHeritage' ? undefined : parseInt(option.value, 10));
    setSelectedOption(option);
  };

  const onAddToGroupsModalSubmitOrClose = () => {
    setEmployeeAddModalOpen(false);
    clearFilteredEmployees && clearFilteredEmployees();
  };

  const handlePageLoading = (loading: boolean) => setPageLoading(loading);

  const onEditModalClick = () => {
    if (group?.name) {
      setEditGroupModalOpen(true);
      setGroupName(group.name);
      setGroupDescription(group?.description);
    }
  };

  const onEditCancelButtonClick = () => {
    setEditGroupModalOpen(false);
    setGroupName(undefined);
    setGroupDescription(undefined);
  };

  const isEditValid = () => (
    !!(groupName && groupName.length > 0 && (groupName !== group?.name || group?.description !== groupDescription))
  );

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      getCompanyById && getCompanyById(+companyId);
      getBranches && getBranches(+companyId);
      getGroups && getGroups({ companyId: +companyId });
      getGroupById && groupId && getGroupById(+groupId);
    },
    [companyId],
  );

  useEffect(
    () => {
      if (groups && groupId) {
        const withoutHeritage = { name: 'Без наследия', value: 'withoutHeritage' };
        setGroupsForSelect(
          [
            withoutHeritage,
            ...groups.filter((n: GroupTypes.IRenderProps) => n.id !== parseInt(groupId, 10))
              .map((n: GroupTypes.IRenderProps) => ({ name: n.name || '', value: n.id.toString() })),
          ]);
        setSelectedOption(withoutHeritage);
      }
    },
    [groups],
  );

  useEffect(
    () => {
      updatedGroup?.data && setEditGroupModalOpen(false);
      updatedGroup?.errorMessage && setInputErrorMessage(updatedGroup.errorMessage);
    },
    [updatedGroup],
  );

  useEffect(
    () => {
      if (deletedGroup) {
        notification.addStateNotification(deletedGroup);
        if (deletedGroup.responseType === NotificationType.Success) {
          history.push(addAdminSlash(AdminRouterPaths.COMPANY));
        }
      }
    },
    [deletedGroup],
  );

  return (
    <Layout
      isAdminRouting
      companyId={companyId}
      classNames={classNames('group-detail-page', { 'pointer-events-none': pageLoading })}
    >
      <Card classNames="px-0 grid py-48 d-flex justify-content-between align-items-center" hasBoxShadow={false} >
        <div className="d-flex flex-column">
          <Typography
            className="mb-8"
            variant="xxsmallmed"
          >
            Параметрическая группа</Typography>
          <Typography
            className="mb-16"
            variant="headline"
          >
            {group?.name}
          </Typography>
          <Typography
            className="mb-24"
            variant="text"
            color="grey_additional_2"
          >
            {group?.description}
          </Typography>
          <div className="d-flex">
            <Typography
              variant="text"
              className="mr-48"
            >
              {group?.employeeNumber} пользователей
            </Typography>
            {/*// todo add content*/}
            <Typography
              variant="text"
              className="mr-48"
            >
              0 контента
            </Typography>
            <Typography
              variant="text"
            >
              Активность {group?.totalActivityPercent}%
            </Typography>
          </div>
        </div>
        <div className="d-flex mt-auto">
          <Button
            variant="textmed"
            className="d-flex justify-content-center button--type-additional excel-icon-wrap mr-24"
            onClick={onDownloadReport}
          >
            <Image
              alt="excel download button image"
              className="excel-icon"
              src={ExcelPng}
            />
          </Button>
          <Button
            variant="textmed"
            type="black-icon"
            className="d-flex align-items-center group-info__btn mr-24"
            onClick={onEditModalClick}
          >
            <Image
              alt="edit button image"
              className="button__image mr-8"
              src={EditIcon}
            />
            Изменить
          </Button>
          <Button
            variant="textmed"
            type="black-icon"
            className="d-flex align-items-center group-info__btn"
            onClick={() => setDeleteGroupModalOpen(true)}
          >
            <Image
              alt="delete button image"
              className="button__image mr-8"
              src={DeleteIcon}
            />
            Удалить
          </Button>
        </div>
      </Card>
      <Tabs
        key={activeTab}
        tabOptions={GROUP_DETAIL_TABS}
        activeId={activeTab}
        setActiveTabId={handleActiveTab}
        className="group-detail-page__tabs"
        contentClassName="color_grey__bg pb-48"
      >
        <div key={0} className="pt-32">
          {groupId && (
            <TableEmployeesWithPagination
              employeesCount={group?.employeeNumber || 0}
              companyId={companyId}
              groupId={groupId}
              branches={{
                branchesOptions: branchesTreeSelect,
                selectedTreeOption: branchesTreeSelect[0],
              }}
              groups={{
                groupsOptions: groups && groups.map(n => ({ name: n.name, value: `${n.id}` } as ITreeOption)),
              }}
              actionButtons={
                <Button
                  className="d-flex align-items-center py-16 px-24"
                  variant="textmed"
                  onClick={() => setEmployeeAddModalOpen(true)}
                >
                  <Image alt="icon plus" src={IconPlus} className="group-detail-page__plus-icon mr-8" />
                  Добавить
                </Button>
              }
            />
          )}
        </div>
        <div key={1}>
          <TabContent
            groupId={groupId ? +groupId : 0}
            companyId={companyId}
            setPageLoading={handlePageLoading}
          />
        </div>
      </Tabs>
      {isEditGroupModalOpen && (
        <Modal
          width={422}
          title="Редактирование группы"
          cancelLabel="Отмена"
          saveLabel="Сохранить"
          isSaveButtonDisable={!isEditValid()}
          onCloseClick={onEditCancelButtonClick}
          onSaveClick={onEditGroup}
        >
          <div className="mx-32">
            <Input
              label="Название группы"
              type="text"
              placeholder="Введите название"
              classNames="mb-24"
              value={group?.name}
              errorMessage={inputErrorMessage}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGroupName(event.target.value)}
            />
            <Input
              label="Описание"
              type="text"
              placeholder="Введите описание"
              value={group?.description}
              errorMessage={inputErrorMessage}
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
            {groupsForSelect && (
              <Select
                classNames="mt-4"
                staticWidth
                isPositionFixed
                options={groupsForSelect}
                selectedOption={selectedOption || null}
                setSelectedOption={onSelectInheritanceGroup}
              />
            )}
          </div>
        </Modal>
      )}
      {isEmployeeAddModalOpen && groups && group && branches && (
        <Modal
          width={976}
          title="Добавление пользователей"
          onCloseClick={onAddToGroupsModalSubmitOrClose}
        >
          <ModalEmployeesAdditionToGroupOrBranch
            type="groups"
            companyId={companyId}
            branches={{
              branchesOptions: branchesTreeSelect,
              selectedTreeOption: branchesTreeSelect[0],
            }}
            groupsOptions={groups
              .filter(i => i.id !== group.id)
              .map(n => ({ name: n.name, value: `${n.id}` } as IOption))
            }
            curGroupId={group.id}
            onSubmitClick={onAddToGroupsModalSubmitOrClose}
          />
        </Modal>
      )}
      {pageLoading && <ModalLoading />}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  company: state.companyReducer.company.data,
  companyLoading: state.companyReducer.company.loading,
  branches: state.branchReducer.branches.data,
  branchesLoading: state.branchReducer.branches.loading,
  groups: state.groupReducer.groups.data,
  group: state.groupReducer.group.data,
  employees: state.employmentReducer.employees,
});

const mapDispatchToProps = {
  getCompanyById: companyActions.getCompanyById,
  getBranches: branchActions.getBranches,
  getGroups: groupActions.getGroups,
  getEmployees: employmentActions.getEmployees,
  clearFilteredEmployees: employmentActions.clearFilteredEmployees,
  getGroupById: groupActions.getGroupById,
  updateGroup: groupActions.updateGroup,
  deleteGroup: groupActions.deleteGroup,
  downloadGroupEmployees: groupActions.downloadGroupEmployees,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(GroupDetailPage));
