import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Button from 'src/components/atoms/Button';
import CardBranch from 'src/components/atoms/Cards/CardBranch';
import Input from 'src/components/molecules/Input';
import IconPlus from 'src/components/atoms/Svg/Plus';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import { ReactComponent as CheckIcon } from 'src/assets/img/icons/done.svg';

import { BranchesStructureTypes, IBranch } from 'src/components/molecules/BranchesStructure/types';
import 'src/components/molecules/BranchesStructure/index.scss';

function BranchesStructure(props: BranchesStructureTypes.IProps) {
  const { branch : propBranch, onAddBranch } = props;

  const [branch, setBranch] = useState(props.branch);
  const [current, setCurrent] = useState<string>();
  const [inputErrorMessage, setInputErrorMessage] = useState<string>();
  const [branchName, setBranchName] = useState<string>('');

  useEffect(
    () => {
      setBranch(propBranch);
      setCurrent(undefined);
      setBranchName('');
      setInputErrorMessage(undefined);
    },
    [propBranch],
  );

  const onAddBranchEnter = (parentBranchId: number, isRootBranch?: boolean) => {
    onAddBranch && onAddBranch(branchName, parentBranchId, isRootBranch);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputErrorMessage) setInputErrorMessage(undefined);
    setBranchName(event.target.value);
  };

  const onInputKeyDown =
    (parentBranchId: number, isRootBranch?: boolean) =>
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (branchName.length < 1) {
          setInputErrorMessage('Введите название');
          return;
        }
        onAddBranchEnter(parentBranchId, isRootBranch);
      }
    };

  const onCancelInputIconClick = () => {
    setCurrent(undefined);
    setBranchName('');
    setInputErrorMessage(undefined);
  };

  const onSubmitInputIconClick = (parentBranchId: number, isRootBranch?: boolean) => {
    if (branchName.length < 1) {
      setInputErrorMessage('Введите название');
      return;
    }
    onAddBranchEnter(parentBranchId, isRootBranch);
  };

  const structureThisShit = (branch: IBranch, onlyChild?: boolean) => {
    return (
      <div className={classNames(['entry', { only : onlyChild, 'root-entry': branch.isRootBranch }])}>
        <div className="label">
          <CardBranch
            isRootBranch={branch.isRootBranch}
            branchId={branch.id}
            name={branch.name}
            usersCount={branch.employeesCount || 0}
            percent={branch.activityPercent || 0}
          />
          <IconPlus
            className="label__plus"
            onClick={() => setCurrent(branch.uuid)}
          />
        </div>
        {((branch.subBranches?.length) || branch.uuid === current) && (
          <div className="branch">
            {branch.subBranches && branch.subBranches.map(n => (
              <React.Fragment key={n.id}>
                {structureThisShit(
                  n,
                  (branch.subBranches?.length) === 1 && (branch.uuid !== current),
                )}
              </React.Fragment>
            ))}
            {(branch.uuid === current) && (
              <div className={classNames('entry entry--create', { only : !(branch.subBranches?.length) })}>
                <div className="branch__input-wrapper d-flex pos_relative align-items-center">
                  <Button
                    className="branch__button-cancel pos_absolute d-flex align-items-center p-8"
                    onClick={onCancelInputIconClick}
                  >
                    <CancelIcon color="#F04848" />
                  </Button>
                  <Input
                    autoFocus
                    type="text"
                    placeholder="Введите название нового филиала"
                    classNames="branch__input d-flex justify-content-center"
                    value={branchName}
                    onChange={onInputChange}
                    errorMessage={inputErrorMessage}
                    onKeyDown={onInputKeyDown(branch.id, branch.isRootBranch)}
                  />
                  <Button
                    className="branch__button-submit pos_absolute d-flex align-items-center p-4"
                    onClick={() => onSubmitInputIconClick(branch.id, branch.isRootBranch)}
                  >
                    <CheckIcon width="20" height="20" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="branches-structure fill">
      {structureThisShit(branch)}
    </div>
  );
}

export default BranchesStructure;
