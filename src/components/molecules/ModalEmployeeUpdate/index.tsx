import React, { useState } from 'react';
import { getGender, getRole } from 'src/utils/values';
import { ROLES_OPTIONS } from 'src/core/store/values';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import RadioButton from 'src/components/atoms/RadioButton';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import TreeSelect from 'src/components/molecules/TreeSelect';

import { ModalEmployeeUpdateTypes } from 'src/components/molecules/ModalEmployeeUpdate/types';
import { EmploymentTypes } from 'src/store/employment/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IOption } from 'src/components/molecules/Select/types';
import './index.scss';

function ModalEmployeeUpdate(props: ModalEmployeeUpdateTypes.IProps) {
  const {
    email, gender, birthDate,
    phone, groups, fullName,
    role, isBlocked, id, branch, companyId,
    avatarThumbnailUrl,
  } = props.employee;
  const { groupsOptions, branches, setUpdatedData, handleCancelClick, companyName } = props;
  const [status, setStatus] = useState<string | null>(isBlocked ? 'blocked' : 'active');
  const getCurBranch = () :IOption => {
    if (!branch) return { value: companyName ? companyName + companyId : '', name: companyName || '' };
    return { value: `${branch.id}`, name: branch.name };
  };
  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>(getCurBranch());
  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const generateSelectedGroups = () => {
    if (!groups) return groupsOptions;
    const newGroups:IOption[] = groupsOptions.map(item => groups.find(activeGroup => activeGroup.id === +item.value) ?
      { name: item.name, value: item.value, checkboxChecked: true } :
      { name: item.name, value: item.value, checkboxChecked: false },
    );
    return newGroups;
  };
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>(generateSelectedGroups());
  const [selectedRole, setSelectedRole] = useState<IOption>(getRole(role || ''));
  const selectedGroupsCount = selectedGroups.filter(item => item.checkboxChecked).length;

  const onSaveClick = () => {
    const groups = selectedGroups.filter(item => item.checkboxChecked).map(item => +item.value);
    if (!groups.length || !selectedBranch) return;
    const isRootBranch = selectedBranch.value === 'main' || selectedBranch.value.length < 1;
    const updatedData:EmploymentTypes.IUpdateEmployeeBodyProps = {
      role: selectedRole.value,
      isBlocked: status === 'blocked',
      companyId: isRootBranch ? companyId : undefined,
      branchId: isRootBranch ? undefined : +selectedBranch.value,
      groupIds: selectedGroups.filter(item => item.checkboxChecked).map(item => +item.value),
      employeeIds: [id],
    };
    setUpdatedData && setUpdatedData(updatedData);
  };

  return (
    <div className="modal-employee-update px-32 pb-24">
      <div className="modal-employee-update__card d-flex p-24">
        <div className="modal-employee-update__image-wrapper mr-24">
          <Image
            alt="user avatar"
            src={avatarThumbnailUrl}
            className="modal-employee-update__image fill"
          />
        </div>
        <div className="d-flex flex-column pt-12">
          <Typography variant="h2" className="mb-8">{fullName || '-' }</Typography>
          <Typography variant="text" className="mb-32">{email || '-'}</Typography>
          <div className="d-flex mt-4">
            <div className="d-flex flex-column align-items-end mr-48">
              <Typography variant="text" color="grey_additional_1" className="mb-24">Пол</Typography>
              <Typography variant="text" color="grey_additional_1" className="mb-24">Дата рождения</Typography>
              <Typography variant="text" color="grey_additional_1">Номер телефона</Typography>
            </div>
            <div className="d-flex flex-column">
              <Typography variant="text" className="mb-24">{getGender(gender)}</Typography>
              <Typography variant="text" className="mb-24">{birthDate}</Typography>
              <Typography variant="text">{phone}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-employee-update__block d-flex flex-wrap justify-content-between mt-24">
        <div className="block__item d-flex flex-column mb-24">
          <Typography variant="subtext" className="mb-16">Статус</Typography>
          <div className="d-flex justify-content-between">
            <RadioButton
              name="status"
              value="active"
              isChecked={status === 'active'}
              setClicked={handleClick}
              label="Активен"
            />
            <RadioButton
              name="status"
              value="blocked"
              isChecked={status === 'blocked'}
              setClicked={handleClick}
              label="Заблокирован"
            />
          </div>
        </div>
        <div className="block__item mb-24">
          <Typography variant="subtext" className="mb-4">Роль</Typography>
          <Select
            staticWidth
            options={ROLES_OPTIONS}
            selectedOption={selectedRole}
            setSelectedOption={setSelectedRole}
          />
        </div>
        <div className="block__item">
          <Typography variant="subtext" className="mb-4">Филиал</Typography>
          {branches && selectedBranch && (
            <TreeSelect
              staticWidth
              treeOptions={branches.branchesOptions}
              selectedTreeOption={selectedBranch}
              setSelectedOption={option => setSelectedBranch(option)}
              classNames="mb-24"
            />
          )}
        </div>
        <div className="block__item">
          <Typography variant="subtext" className="mb-4">Группы</Typography>
          <Select
            staticWidth
            isPositionFixed
            withCheckbox
            options={selectedGroups}
            selectedOption={null}
            customTitle={selectedGroupsCount ? `${selectedGroupsCount} групп` : 'Выберите группы'}
            onCheckboxChanges={setSelectedGroups}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end mt-8">
        <Button
          type="link"
          color="blacker"
          variant="textmed"
          className="mr-16"
          onClick={handleCancelClick}
        >
          Отмена
        </Button>
        <Button
          variant="textmed"
          className="py-16 px-42"
          onClick={onSaveClick}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default ModalEmployeeUpdate;
