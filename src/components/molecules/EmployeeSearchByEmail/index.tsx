import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import useDebounce from 'src/hooks/useDebounce';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { generateId } from 'src/utils/generation';
import { LOCAL_STORAGE } from 'src/core/store/values';

import searchActions from 'src/store/search/actions';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import EmployeeSuggestionList from 'src/components/molecules/EmployeeSearchByEmail/EmployeeSuggestion/EmployeeSuggestionList.index';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import { EDITED_INPUT_RESET } from 'src/components/molecules/Chips/consts';
import { SearchTypes } from 'src/store/search/types';
import { IEditedInput, IValue } from 'src/components/molecules/Chips/types';
import { EmployeeSearchByEmailTypes } from 'src/components/molecules/EmployeeSearchByEmail/types';
import 'src/components/molecules/EmployeeSearchByEmail/index.scss';

function EmployeeSearchByEmail(props: EmployeeSearchByEmailTypes.IProps) {
  const { searchEmployees, searchedEmployees, clearSearchedEmployees, onEmployeesChange, className } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const [inputValue, setInputValue] = useState<string>('');
  const [emails, setEmails] = useState<EmployeeSearchByEmailTypes.ISearchedEmployee[]>([]);
  const [selectedEmailInput, setSelectedEmailInput] = useState<IEditedInput>(EDITED_INPUT_RESET);
  const [searchEmployeeValue, setSearchEmployeeValue] = useState<string>('');
  const [cursor, setCursor] = useState<number>(0);

  const debouncedSearchValue = useDebounce(searchEmployeeValue, 500);

  const hasErrors = emails.some(n => !n.valid);
  const isEmailExists = (email: string) => emails.some((item: IValue) => item.value === email);

  useEffect(
    () => {
      searchEmployees && debouncedSearchValue && searchEmployees({
        keyword: debouncedSearchValue,
        company_id: companyId,
      });
    },
    [debouncedSearchValue],
  );

  useEffect(
    () => {
      onEmployeesChange && onEmployeesChange(emails.map(n => n.employeeId), !hasErrors);
    },
    [emails],
  );

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchEmployeeValue(event.target.value);
  };

  const onSuggestionClick = (emp: SearchTypes.ISearchRenderProps) => {
    const newEmail = {
      id: generateId(),
      value: emp.email,
      employeeId: emp.employmentId,
      valid: !isEmailExists(emp.email),
    };
    // check if email is being edited
    if (selectedEmailInput.id) {
      setEmails(emails => (
        [...emails].map(item => selectedEmailInput.id !== item.id ? item : newEmail)
      ));
    } else {
      setEmails(emails => [...emails, newEmail]);
    }
    clearSearch();
  };

  const onSelectedInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedEmailInput(selectedInput =>  ({ ...selectedInput, value }));
    setSearchEmployeeValue(value);
  };

  const clearSearch = () => {
    setInputValue('');
    setCursor(0);
    setSelectedEmailInput(EDITED_INPUT_RESET);
    setSearchEmployeeValue('');
    clearSearchedEmployees && clearSearchedEmployees();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchedEmployees && searchedEmployees.length) {
      // check if there are such employees
      if (e.keyCode === 38 && cursor > 0) {
        setCursor(c => c - 1);
      } else if (e.keyCode === 40 && cursor < searchedEmployees.length - 1) {
        setCursor(c => c + 1);
      } else if (e.keyCode === 13) {
        onSuggestionClick(searchedEmployees[cursor]);
      }
    } else {
      // check if there are no results
      if (e.keyCode === 13) {
        if (selectedEmailInput.id) {
          setEmails([...emails].map(item => (
            selectedEmailInput.id !== item.id
              ? item
              : { ...item, value: selectedEmailInput.value, valid: false, employeeId: -1 }),
          ));
        } else {
          setEmails(emails => [...emails, { id: generateId(), value: inputValue, valid: false, employeeId: -1 }]);
        }
        clearSearch();
      }
    }
  };

  const onDeleteEmailClick = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setEmails(emails => emails.filter(item => item.id !== id));
    clearSearch();
  };

  return (
    <div className={`employee-search ${className}`}>
      <Typography
        variant="subtext"
        className="mb-4"
      >
        Список пользователей
      </Typography>
      <div className="employee-search__content d-flex align-items-center">
        {emails.map(item => (
          selectedEmailInput.id === item.id ?
            <div
              key={item.id}
              className="employee-search__edit-input-wrap"
            >
              <Input
                type="text"
                id={selectedEmailInput.id}
                value={selectedEmailInput.value}
                size={selectedEmailInput.value.length + 2}
                onChange={onSelectedInputChange}
                onKeyDown={handleKeyDown}
                classNames="employee-search__edit-input"
              />
              {searchedEmployees && (
                <EmployeeSuggestionList
                  employees={searchedEmployees}
                  currentPosition={cursor}
                  onSuggestClick={onSuggestionClick}
                />
              )}
            </div> :
            <div
              key={item.id}
              className={classNames(
                'employee-search__chip d-flex align-items-center',
                { 'employee-search__chip--invalid' : !item.valid },
              )}
              onClick={() => setSelectedEmailInput({ id: item.id, value: item.value })}
            >
              <Typography
                variant="xsmall"
                className="mr-8"
              >
                {item.value}
              </Typography>
              <Button
                type="link"
                className="d-flex"
                onClick={onDeleteEmailClick(item.id)}
              >
                <CancelIcon className="employee-search__chip__delete" />
              </Button>
            </div>
        ))}
        <div className="employee-search__input-wrap">
          <Input
            type="text"
            classNames="employee-search__input"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={onInputChange}
          />
          {searchedEmployees && !selectedEmailInput.id && (
            <EmployeeSuggestionList
              employees={searchedEmployees}
              currentPosition={cursor}
              onSuggestClick={onSuggestionClick}
            />
          )}
        </div>
      </div>
      {hasErrors && (
        <Typography
          variant="xsmall"
          color="red"
          className="mt-8"
        >
          В списке есть несуществующий email или уже введенный Email
        </Typography>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return ({
    searchedEmployees: state.searchReducer.searchedEmployees.data,
  });
};

const mapDispatchToProps = {
  searchEmployees: searchActions.searchEmployees,
  clearSearchedEmployees: searchActions.clearSearchedEmployees,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeSearchByEmail);
