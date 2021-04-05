import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';

import Hint from 'src/components/atoms/Hint';
import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import Modal from 'src/components/molecules/Modal';
import Layout from 'src/components/organisms/Layout';
import TreeSelect from 'src/components/molecules/TreeSelect';
import TableEmployeesWithPagination from 'src/components/organisms/TableComponents/TableEmployees/TableEmployeesWithPagination';
import ModalEmployeesAdditionToGroupOrBranch from 'src/components/organisms/ModalEmployeesAdditionToGroupOrBranch';

import { parseBranchesToTreeSelect } from 'src/utils/parse';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import IconEdit from 'src/assets/img/icons/edit.svg';
import IconDelete from 'src/assets/img/icons/delete.svg';
import IconInfo from 'src/assets/img/icons/info.svg';
import branchActions from 'src/store/branch/actions';
import companyActions from 'src/store/company/actions';
import groupActions from 'src/store/group/actions';
import employmentActions from 'src/store/employment/actions';

import { BranchesTypes } from 'src/store/branch/types';
import { BranchPageTypes } from 'src/pages/AdminPages/Branch/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IOption } from 'src/components/molecules/Select/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import IconPlus from 'src/assets/img/icons/plus.svg';
import 'src/pages/AdminPages/Branch/index.scss';

function BranchPage(props: BranchPageTypes.IProps) {
  const {
    getBranchById, getCompanyById, getBranches,
    updateBranch, deletedBranch, getGroups,
    branchById, company, branches,
    groups, updatedBranchState, deleteBranch,
    clearFilteredEmployees,
    clearChangedBranchState,
    branchByIdLoading,
    companyLoading,
  } = props;

  const { id: branchId } = useParams();
  const history = useHistory();
  const breadCrumbs = [
    { label: (company && branchById) ? company?.name : '', link: '/admin/company' },
    { label: (branchById && branchById) ? branchById?.name : '', link: '' },
  ];
  const isRootBranch = branchId === 'main';
  const notification = useNotification();
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [isEditBranchModalOpen, setEditBranchModalOpen] = useState<boolean>(false);
  const [isDeleteBranchModalOpen, setDeleteBranchModalOpen] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>();
  const [branchName, setBranchName] = useState<string>();
  const [inputErrorMessage, setInputErrorMessage] = useState<string>();
  const [isEmployeeAddModalOpen, setEmployeeAddModalOpen] = useState<boolean>(false);

  const getBranchesTreeSelect = (disableBranchId?: number):ITreeOption[] => [{
    name: company?.name || '',
    value: company && company.id ? 'main' : '-1',
    children: branches
      ? branches.filter(e => e.id !== branchById?.id)
        .map((n: BranchesTypes.IRenderProps) =>
          parseBranchesToTreeSelect(n, disableBranchId, branchById?.id))
      : undefined,
  }];

  const branchesTreeSelect: ITreeOption[] = getBranchesTreeSelect();
  const branchesTreeSelectWithDisableBranch:ITreeOption[] = getBranchesTreeSelect(branchId ? +branchId : undefined);
  const companyBranchLoading = isRootBranch ? companyLoading : branchByIdLoading;
  const onEditBranch = () => {
    if (branchName) {
      setEditBranchModalOpen(false);
      const branch = selectedBranch || parentBranch || branchesTreeSelect[0];

      const isRootBranch = branch.value === 'main';

      company && branchId && updateBranch && updateBranch(+branchId, companyId, {
        name: branchName,
        is_active: true,
        parent_branch_id: isRootBranch ? undefined : +branch.value,
        company_id: isRootBranch ? +company.id : undefined,
      });
    } else {
      setInputErrorMessage('Введите данные');
    }
  };

  const onDeleteBranch = () => {
    setDeleteBranchModalOpen(false);
    const branch = selectedBranch || parentBranch || branchesTreeSelect[0];
    deleteBranch && branchId && companyId && deleteBranch(
      +branchId, companyId, branch.value !== 'main' ? +branch.value : undefined,
    );
  };

  useEffect(
    () => {
      getCompanyById && getCompanyById(companyId);
      getBranches && getBranches(companyId);
      getGroups && getGroups({ companyId, page: 1, pageSize: 20 });
      getBranchById && branchId && companyId && !isRootBranch && getBranchById(+branchId, companyId);
    },
    [branchId],
  );

  useEffect(
    () => {
      branchById?.name && setBranchName(branchById.name);
    },
    [branchById],
  );

  useEffect(
    () => {
      if (deletedBranch) {
        notification.addStateNotification(deletedBranch);
        if (deletedBranch.responseType === NotificationType.Success) {
          history.push(addAdminSlash(AdminRouterPaths.COMPANY));
        }
        clearChangedBranchState && clearChangedBranchState();
      }
      if (updatedBranchState) {
        notification.addStateNotification(updatedBranchState);
        clearChangedBranchState && clearChangedBranchState();
      }
    },
    [deletedBranch, updatedBranchState],
  );

  const parentBranch = branchById && {
    name: branchById.parentBranch ? branchById.parentBranch.name : (company ? company.name : ''),
    value: branchById.parentBranch ? `${branchById.parentBranch.id}` : (company && company.id ? 'main' : ''),
  };

  const onAddToToGroupsOrBranchModalSubmitOrClose = () => {
    setEmployeeAddModalOpen(false);
    clearFilteredEmployees && clearFilteredEmployees();
  };
  return (
    <Layout
      isAdminRouting
      classNames="branch-page"
    >
      <div className="branch-info grid py-48 d-flex justify-content-between">
        <>
          <div>
            <Breadcrumb
              itemsLoading={companyLoading || branchByIdLoading}
              items={breadCrumbs}
              className="mb-24"
            />
            <Typography
              variant="headline"
              classNames="d-block"
              covered={companyBranchLoading}
            >
              {`${isRootBranch ? company?.name : branchById?.name}`}
            </Typography>
            <Typography
              classNames="mt-24 mr-24"
              variant="text"
              covered={companyBranchLoading}

            >
              {`Пользователей ${isRootBranch ? company?.employeesCount : branchById?.employeesCount}`}
            </Typography>
            <Typography
              variant="text"
              covered={companyBranchLoading}
              classNames="mt-24"
            >
              {`Активность ${isRootBranch ? company?.employeesCount : branchById?.employeesCount} %`}
            </Typography>
          </div>
          {!isRootBranch && (
            <div className="d-flex mt-auto">
              <Button
                variant="textmed"
                type="black-icon"
                className="d-flex align-items-center branch-info__btn mr-24"
                onClick={() => setEditBranchModalOpen(true)}
              >
                <Image
                  alt="filter button image"
                  className="button__image mr-8"
                  src={IconEdit}
                />
                Изменить
              </Button>
              <Button
                variant="textmed"
                type="black-icon"
                className="d-flex align-items-center branch-info__btn"
                onClick={() => setDeleteBranchModalOpen(true)}
              >
                <Image
                  alt="filter button image"
                  className="button__image mr-8"
                  src={IconDelete}
                />
                Удалить
              </Button>
            </div>
          )}
          {isEditBranchModalOpen && (
            <Modal
              width={422}
              title="Редактирование филиала"
              cancelLabel="Отмена"
              saveLabel="Сохранить"
              onCloseClick={() => setEditBranchModalOpen(false)}
              onSaveClick={onEditBranch}
            >
              <div className="mx-32">
                <Typography
                  variant="subtext"
                  className="mb-8 d-block"
                >
                  Родительский филиал
                </Typography>
                <TreeSelect
                  staticWidth
                  isPositionFixed
                  treeOptions={branchesTreeSelect}
                  selectedTreeOption={selectedBranch || parentBranch || branchesTreeSelect[0]}
                  setSelectedOption={option => setSelectedBranch(option)}
                  classNames="mb-24"
                />
                <Typography
                  variant="subtext"
                  className="mb-4 d-block"
                >
                  Название
                </Typography>
                <Input
                  type="text"
                  placeholder="Введите название"
                  classNames="mb-24"
                  value={branchName}
                  errorMessage={inputErrorMessage}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBranchName(event.target.value)}
                />
              </div>
            </Modal>
          )}
          {isDeleteBranchModalOpen && (
            <Modal
              width={422}
              title="Удаление филиала"
              cancelLabel="Отмена"
              deleteLabel="Удалить"
              onCloseClick={() => setDeleteBranchModalOpen(false)}
              onDeleteClick={onDeleteBranch}
            >
              <div className="mx-32">
                <Typography
                  variant="text"
                  className="mb-24 d-block"
                >
                  Вы действительно хотите удалить данный филиал?
                </Typography>
                <Typography
                  variant="text"
                  className="mb-24"
                >
                  Выберите из списка филиал, который унаследует пользователей
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
                        После удаления все пользователи перейдут в выбранный вами филиал
                      </Typography>
                    }
                  >
                    <Image
                      src={IconInfo}
                      className="branch-delete-info__img"
                      alt="После удаления все пользователи перейдут в выбранный вами филиал"
                    />
                  </Hint>
                </Typography>
                <Typography
                  variant="subtext"
                  className="mb-8 d-block"
                >
                  Филиал наследник
                </Typography>
                <TreeSelect
                  staticWidth
                  isPositionFixed
                  treeOptions={branchesTreeSelect}
                  selectedTreeOption={selectedBranch || parentBranch || branchesTreeSelect[0]}
                  setSelectedOption={option => setSelectedBranch(option)}
                  classNames="mb-24"
                />
              </div>
            </Modal>
          )}
        </>
      </div>
      <div className="branch-page__content pt-32">
        {branchId && (
          <TableEmployeesWithPagination
            className="branch-employees"
            employeesCount={(isRootBranch ? company?.employeesCount : branchById?.employeesCount) || 0}
            companyId={companyId}
            branchId={branchId}
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
      {isEmployeeAddModalOpen && company && branches && branchId && (
        <Modal
          width={976}
          title="Добавление пользователей"
          onCloseClick={() => setEmployeeAddModalOpen(false)}
        >
          <ModalEmployeesAdditionToGroupOrBranch
            type="branch"
            companyId={company.id}
            curBranchId={+branchId}
            branches={{
              branchesOptions: branchesTreeSelectWithDisableBranch,
              selectedTreeOption: branchesTreeSelectWithDisableBranch[0],
            }}
            groupsOptions={(groups && groups.map(n => ({ name: n.name, value: `${n.id}` } as IOption))) || []}
            onSubmitClick={onAddToToGroupsOrBranchModalSubmitOrClose}
          />
        </Modal>
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  company: state.companyReducer.company.data,
  companyLoading: state.companyReducer.company.loading,
  branchById: state.branchReducer.branchById.data,
  branchByIdLoading: state.branchReducer.branchById.loading,
  branches: state.branchReducer.branches.data,
  branchesLoading: state.branchReducer.branches.loading,
  updatedBranchState: state.branchReducer.updatedBranchState.data,
  groups: state.groupReducer.groups.data,
  deletedBranch: state.branchReducer.deletedBranch.data,
});

const mapDispatchToProps = {
  getCompanyById: companyActions.getCompanyById,
  getBranchById: branchActions.getBranchById,
  getBranches: branchActions.getBranches,
  updateBranch: branchActions.updateBranch,
  deleteBranch: branchActions.deleteBranch,
  getGroups: groupActions.getGroups,
  clearChangedBranchState: branchActions.clearChangedBranchState,
  clearFilteredEmployees: employmentActions.clearFilteredEmployees,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(BranchPage));
