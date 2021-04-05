import React, { useState } from 'react';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import TreeSelect from 'src/components/molecules/TreeSelect';
import InputChips from 'src/components/molecules/Chips';

import { IOption } from 'src/components/molecules/Select/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { EmployeesMultipleInvitationTypes } from 'src/components/molecules/EmployeeInvitation/EmployeeInvitationMultiple/types';
import 'src/components/molecules/EmployeeInvitation/EmployeeInvitationMultiple/index.scss';

function EmployeesMultipleInvitation(props: EmployeesMultipleInvitationTypes.IProps) {
  const { branches, groups, onAddMultipleEmployees, onDiscardClick, type } = props;

  const [inputs, setInputs] = useState<string[]>();
  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>();
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>(groups || []);
  const [isInputChipsValid, setIsInputChipsValid] = useState(true);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const selectedGroupsCount = selectedGroups.filter(n => n.checkboxChecked).length;

  const onInputsChange = (inputs: string[], isValid: boolean) => {
    setInputs(inputs);
    setIsInputChipsValid(isValid);
  };

  const onAddMultipleEmployeesClick = () => {
    if (!selectedBranch || !isInputChipsValid) {
      setShowErrors(true);
    } else {
      onAddMultipleEmployees && onAddMultipleEmployees({
        inputs,
        selectedBranch,
        groups: selectedGroups,
      });
    }
  };

  return (
    <div className="multiple-invitation">
      <Typography
        variant="h2"
        className="mb-32"
      >
        Добавление нескольких пользователей
      </Typography>
      <InputChips type={type} mask="+99999999999" onInputsChange={onInputsChange} />
      <div className="d-flex mt-32">
        {branches && (
          <div className="d-flex flex-column multiple-invitation__branch">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Филиал
            </Typography>
            <TreeSelect
              staticWidth
              isPositionFixed
              placeholder="Выберите филиал"
              treeOptions={branches}
              selectedTreeOption={selectedBranch}
              setSelectedOption={setSelectedBranch}
            />
            {!selectedBranch && showErrors && (
              <Typography
                color="red"
                variant="xsmall"
                className="mt-4"
              >
                Вы не выбрали филиал
              </Typography>
            )}
          </div>
        )}
        {groups && (
          <div className="d-flex flex-column multiple-invitation__groups">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Группы
            </Typography>
            <Select
              staticWidth
              withCheckbox
              isPositionFixed
              options={selectedGroups}
              selectedOption={{} as IOption}
              customTitle={selectedGroupsCount ? `${selectedGroupsCount} групп` : 'Выберите группы'}
              onCheckboxChanges={setSelectedGroups}
            />
          </div>
        )}
      </div>
      <div className="d-flex align-items-center mt-32">
        <Button
          type="link"
          variant="textmed"
          color="blacker"
          className="ml-auto"
          onClick={onDiscardClick}
        >
          Отмена
        </Button>
        <Button
          variant="textmed"
          className="ml-24 multiple-invitation__cancel-btn"
          onClick={onAddMultipleEmployeesClick}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
}

export default EmployeesMultipleInvitation;
