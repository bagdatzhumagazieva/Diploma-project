import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import { IOption } from 'src/components/molecules/Select/types';
import Select from 'src/components/molecules/Select';
import TreeSelect from 'src/components/molecules/TreeSelect';
import ShopContext from 'src/components/organisms/ShopCreationEdition/ShopContext';

import groupActions from 'src/store/group/actions';
import branchActions from 'src/store/branch/actions';
import employmentActions from 'src/store/employment/actions';
import { parseBranchesToTreeSelect } from 'src/utils/parse';

import { CONVERT_GROUPS_TO_OPTIONS } from 'src/components/organisms/CourseCreationEdition/GeneralInformation/consts';
import { searchBranchTree } from 'src/components/organisms/ShopCreationEdition/Availability/consts';
import { ShopAvailabilityTypes } from 'src/components/organisms/ShopCreationEdition/Availability/types';
import { GroupTypes } from 'src/store/group/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { BranchesTypes } from 'src/store/branch/types';
import 'src/components/organisms/ShopCreationEdition/Availability/index.scss';

function Availability(props: ShopAvailabilityTypes.IProps) {
  const {
    companyId,
    getGroups,
    groups = [],
    getBranches,
    branches: propsBranches,
    getEmployees,
    employeesTotal,
  } = props;
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>([]);
  const activeGroupTitle = selectedGroups.find(item => item.checkboxChecked)?.name || '';
  const activeGroupsAmount = selectedGroups.filter(item => item.checkboxChecked).length;
  const { setStep, itemData, setItemData } = useContext(ShopContext);
  const [selectedBranches, setSelectedBranches] = useState<ITreeOption[]>([]);

  const defaultParams = {
    company_id: 1,
    keyword: '',
  };

  useEffect(() => {
    getEmployees && getEmployees({
      ...defaultParams, branch_ids: itemData.branchIds || [], group_ids: itemData.groupIds || [] });
  },        [itemData]);

  useEffect(
    () => {
      getBranches && getBranches(companyId);
      getGroups && getGroups({ companyId });
    },
    [companyId, getGroups],
  );

  useEffect(() => {
    if (!propsBranches || !itemData.branchIds) return;
    const branchesWithActive: BranchesTypes.IRenderProps[] = [];

    itemData.branchIds.forEach((item) => {
      propsBranches.forEach((branch) => {
        const activeBranch = searchBranchTree(branch, item);
        if (activeBranch) {
          branchesWithActive.push(activeBranch);
        }
      });
    });

    const activeTreeOptions = branchesWithActive &&
      branchesWithActive.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n));
    setSelectedBranches(activeTreeOptions);
  },        [propsBranches]);

  useEffect(
    () => {
      if (!groups) return;
      let groupsWithActive: GroupTypes.IRenderProps[];
      groupsWithActive = Array.isArray(groups) ? groups.map((item) => {
        const isActive = Array.isArray(itemData.groupIds) && itemData.groupIds.includes(item.id);
        return { ...item, checkboxChecked: isActive };
      }) : [];
      setSelectedGroups(CONVERT_GROUPS_TO_OPTIONS(groupsWithActive));
      if (itemData.groupIds) {
      }
    },
    [groups],
  );

  const onSelectGroupsChange = (options: IOption[]) => {
    setSelectedGroups(options);
    const selectedOptions = options.filter(item => item.checkboxChecked).map(item => +item.value);
    setItemData({ ...itemData, groupIds: selectedOptions });
  };

  const onCustomGroupChange = () => {
    const selectedOptions = selectedGroups.map(group => ({ ...group, checkboxChecked: false }));
    setSelectedGroups(selectedOptions);
    setItemData({ ...itemData, groupIds: [] });
  };

  const onCustomTreeClick = (option: ITreeOption) => {
    setSelectedBranches([]);
    setItemData({ ...itemData, branchIds: [] });
  };

  const handleNextClicked = () => {
    setStep(1);
  };

  useEffect(() => {
    const activeBranchIds = selectedBranches.map(b => parseInt((b.value), 10));
    setItemData({ ...itemData, branchIds: activeBranchIds });
  },        [selectedBranches]);

  return (
    <div className="availability d-flex flex-column">
      <div className="availability__info py-32 pl-24">
        <Typography variant="h1">
          Доступность
        </Typography>
        <div className="d-flex flex-column mt-32">
          <Typography variant="subtext">
            Выбор филиала
          </Typography>
          <TreeSelect
            withChips
            staticWidth
            isMultiSelect
            isPositionStatic
            placeholder="Выберите филиалы"
            treeOptions={propsBranches
              ? propsBranches.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n))
              : []}
            customTree={{
              name: 'Все пользователи',
              value: 'all-values',
              checkboxChecked: selectedBranches.length === 0,
              disabled: selectedBranches.length === 0,
            }}
            onCustomTreeOptionClick={onCustomTreeClick}
            selectedTreeOptions={selectedBranches}
            setSelectedOptions={setSelectedBranches}
            className="mt-8 availability__info__select"
          />
        </div>
        <Select
          staticWidth
          withCheckbox
          withChips
          options={selectedGroups}
          className="mt-32 availability__info__select"
          label="Выбор группы"
          onCheckboxChanges={onSelectGroupsChange}
          onCustomOptionClick={onCustomGroupChange}
          customOption={{
            name: 'Все пользователи',
            value: 'all-values',
            checkboxChecked: activeGroupsAmount === 0,
            disabled: activeGroupsAmount === 0,
          }}
          customTitle={activeGroupsAmount > 1 ? `${activeGroupsAmount} групп` :
            activeGroupsAmount === 1 ? activeGroupTitle : 'Выберите группы'}
        />
        <Typography variant="h2" className="mt-48">
          Выбрано пользователей: {employeesTotal || 0}
        </Typography>
      </div>
      <Button
        className="next-button align-self-end mt-32 mb-32"
        onClick={handleNextClicked}
      >
        Далее
      </Button>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  groups: state.groupReducer.groups.data,
  branches: state.branchReducer.branches.data,
  company: state.companyReducer.company.data,
  employeesTotal: state.employmentReducer.employees.total,
});

const mapDispatchToProps = {
  getGroups: groupActions.getGroups,
  getBranches: branchActions.getBranches,
  getEmployees: employmentActions.getEmployees,
};

export default connect<any>(mapStateToProps, mapDispatchToProps)(Availability);
