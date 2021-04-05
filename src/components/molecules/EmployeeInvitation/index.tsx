import React, { useEffect, useState } from 'react';
import { EMAIL_VALIDATION, PHONE_VALIDATION } from 'src/core/validataion';

import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import Select from 'src/components/molecules/Select';
import TreeSelect from 'src/components/molecules/TreeSelect';

import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import { IOption } from 'src/components/molecules/Select/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { ModalInvitationManualTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationManual/types';
import { EmployeeInvitationTypes } from 'src/components/molecules/EmployeeInvitation/types';
import 'src/components/molecules/EmployeeInvitation/index.scss';

function EmployeeInvitation(props: EmployeeInvitationTypes.IProps) {
  const {
    type,
    branches,
    groups,
    employee: propsEmployee,
    onEmployeeDataChange,
    onDeleteEmployee,
    showErrors,
  } = props;

  const [employee, setEmployee] = useState<ModalInvitationManualTypes.IEmployeeData>(propsEmployee);

  useEffect(
    () => {
      propsEmployee && setEmployee(propsEmployee);
    },
    [propsEmployee],
  );

  const onInputChange = (type: 'mail' | 'phone') => (event: React.ChangeEvent<HTMLInputElement>) => {
    onEmployeeDataChange && onEmployeeDataChange({
      ...employee,
      [type]: event.target.value,
      errors: {
        ...employee.errors,
        email: type === 'mail'
          ? event.target.value.length > 0
            ? (EMAIL_VALIDATION.test(event.target.value) ? '' : 'Введен не существующий Email')
            : 'Введите email'
          : employee.errors.email,
        phone: type === 'phone'
          ? event.target.value.length > 0
            ? (PHONE_VALIDATION.test(event.target.value) ? '' : 'Введен не существующий номер телефонв')
            : 'Введите phone'
          : employee.errors.phone,
      },
    });
  };

  const handleSelectedTreeOption = (option: ITreeOption) => {
    onEmployeeDataChange && onEmployeeDataChange({
      ...employee, selectedBranch: option,
      errors: {
        ...employee.errors,
        branch: '',
      },
    });
  };

  const onSelectGroups = (options: IOption[]) => {
    onEmployeeDataChange && onEmployeeDataChange({
      ...employee,
      groups: options,
      errors: {
        ...employee.errors,
      },
    });
  };

  const onDeleteEmployeeClick = () => {
    onDeleteEmployee && onDeleteEmployee(employee);
  };

  const selectedGroupsCount = employee.groups.filter(n => n.checkboxChecked).length;
  const { email: emailError, phone: phoneError, branch: branchError } = employee.errors;
  return (
    <div className="employee-invitation d-flex flex-column">
      <div className="d-flex">
        <div className="d-flex flex-grow-1">
          {type === 'mail' ?
            <Input
              type="text"
              name="mail"
              placeholder="Введите email: example@example.com"
              classNames="employee-invitation__input"
              onChange={onInputChange('mail')}
              value={employee.mail}
            /> :
            <Input
              type="text"
              name="phone"
              variant="subtext"
              onChange={onInputChange('phone')}
              placeholder="Введите номер телефона"
              classNames="employee-invitation__input"
              mask="+9 (999) 999-99-99"
              value={employee.phone}
            />
          }
          {branches && (
            <TreeSelect
              staticWidth
              isPositionFixed
              placeholder="Выберите филиал"
              treeOptions={branches}
              selectedTreeOption={employee.selectedBranch}
              setSelectedOption={handleSelectedTreeOption}
              className="employee-invitation__branches"
            />
          )}
          {groups && (
            <Select
              id={employee.id}
              staticWidth
              isStaticDirection
              withCheckbox
              optionsMaxHeight={120}
              options={employee.groups}
              selectedOption={{} as IOption}
              customTitle={selectedGroupsCount ? `${selectedGroupsCount} групп` : 'Выберите группы'}
              onCheckboxChanges={onSelectGroups}
              className="employee-invitation__groups"
            />
          )}
        </div>
        <div className="d-flex align-items-center employee-invitation__delete-btn">
          <CancelIcon
            color="#F04848"
            className="employee-invitation__delete-btn__icon"
            onClick={onDeleteEmployeeClick}
          />
        </div>
      </div>
      {showErrors && (branchError || (type === 'mail' ? emailError : phoneError)) && (
        <div className="employee-invitation__errors">
          <Typography
            variant="xsmall"
            color="red"
          >
            {[(type === 'mail' ? emailError : phoneError), branchError].filter(n => n).join(' / ')}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default EmployeeInvitation;
