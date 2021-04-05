import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import branchActions from 'src/store/branch/actions';
import companyActions from 'src/store/company/actions';

import Input from 'src/components/molecules/Input';
import Image from 'src/components/atoms/Image';
import Loader from 'src/components/atoms/Loader';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import TreeSelect from 'src/components/molecules/TreeSelect';
import BranchesStructure from 'src/components/molecules/BranchesStructure';
import iconPlus from 'src/assets/img/icons/plus.svg';

import { BranchesTypes } from 'src/store/branch/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { parseBranchesToTreeSelect } from 'src/utils/parse';
import {
  CompanyStructureTypes,
  ICompanyNewBranchBody,
} from 'src/components/organisms/CompanyComponents/CompanyStructure/types';
import 'src/components/organisms/CompanyComponents/CompanyStructure/index.scss';
import ExcelPng from 'src/assets/img/icons/excel.png';

function CompanyStructure(props: CompanyStructureTypes.IProps) {
  const {
    companyId, branches, branchesLoading,
    company, companyLoading, addBranchToCompany,
    getBranches, addedBranchState,
    getCompanyExcel, clearChangedBranchState,
  } = props;

  const notification = useNotification();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>();
  const [branchName, setBranchName] = useState<string>('');
  const [inputErrorMessage, setInputErrorMessage] = useState<string>();

  useEffect(
    () => {
      getBranches && getBranches(companyId);
    },
    [getBranches, companyId],
  );

  useEffect(
    () => {
      if (addedBranchState) {
        notification.addStateNotification(addedBranchState);
        clearChangedBranchState && clearChangedBranchState();
      }
    },
    [addedBranchState],
  );

  const branchesTreeSelect: ITreeOption[] = [{
    name: (company && company.name) || '',
    value: company?.id ? 'main' : '0',
    children: branches ? branches.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n)) : undefined,
  }];

  const onAddBranch = (branchName: string, parentBranchId: number, isRootBranch: boolean) => {
    const newBranch: ICompanyNewBranchBody = {
      name: branchName,
      is_active: true,
      parent_branch_id: isRootBranch ? undefined : parentBranchId,
      company_id: isRootBranch ? companyId : undefined,
    };
    addBranchToCompany && addBranchToCompany(newBranch, companyId);
  };

  const onDownloadReport = () => {
    getCompanyExcel && getCompanyExcel(companyId);
  };

  const onSaveModalData = () => {
    if (branchName) {
      const branch = selectedBranch || branchesTreeSelect[0];
      const isRootBranch = branch.value === 'main';
      branch && onAddBranch(branchName, +branch.value, isRootBranch);
      setModalOpen(false);
      setBranchName('');
    } else {
      setInputErrorMessage('Введите данные');
    }
  };

  return (
    <div className="company-structure pos_relative">
      {(companyLoading || branchesLoading) ?
        <div className="d-flex fill_w">
          <Loader size={30} label="Загрузка..." className="mt-32 mx-auto" />
        </div> :
        company && (
          <>
            <div className="company-structure__buttons d-flex align-items-center justify-content-end px-24">
              <Button
                variant="textmed"
                className="d-flex justify-content-center button--type-additional company-structure__excel-btn__icon mr-24"
                onClick={onDownloadReport}
              >
                <Image
                  alt="excel download button image"
                  className="excel-icon"
                  src={ExcelPng}
                />
              </Button>
              <Button
                className="company-structure__add-btn d-flex align-items-center"
                variant="textmed"
                onClick={() => setModalOpen(true)}
              >
                <Image
                  src={iconPlus}
                  alt="add"
                  className="company-structure__add-btn__icon mr-8"
                />
                Создать
              </Button>
            </div>
            <BranchesStructure
              branch={{
                companyId: company.id,
                isRootBranch: true,
                ...company,
                parentBranchId: null,
                activityPercent: company.activityPercent || 0,
                subBranches: branches,
              }}
              onAddBranch={onAddBranch}
            />
            {isModalOpen && (
              <Modal
                width={422}
                title="Создание филиала"
                cancelLabel="Отмена"
                saveLabel="Сохранить"
                onCloseClick={() => setModalOpen(false)}
                onSaveClick={onSaveModalData}
              >
                {branches && (
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
                      selectedTreeOption={selectedBranch || branchesTreeSelect[0]}
                      setSelectedOption={option => setSelectedBranch(option)}
                      classNames="mb-24"
                    />
                    <Typography
                      variant="subtext"
                      className="mb-4 d-block"
                    >
                      Название филиала
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
                )}
              </Modal>
            )}
          </>
        )
      }
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  company: state.companyReducer.company.data,
  companyLoading: state.companyReducer.company.loading,
  branches: state.branchReducer.branches.data,
  branchesLoading: state.branchReducer.branches.loading,
  addedBranchState: state.branchReducer.addedBranchState.data,
});

const mapDispatchToProps = {
  getBranches: branchActions.getBranches,
  getCompanyExcel: companyActions.getCompanyExcel,
  addBranchToCompany: branchActions.addBranch,
  clearChangedBranchState: branchActions.clearChangedBranchState,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(CompanyStructure));
