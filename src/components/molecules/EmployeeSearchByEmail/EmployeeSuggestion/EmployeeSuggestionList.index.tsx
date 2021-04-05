import React from 'react';
import EmployeeSuggestion from 'src/components/molecules/EmployeeSearchByEmail/EmployeeSuggestion/index';
import { EmployeeSuggestionListTypes } from 'src/components/molecules/EmployeeSearchByEmail/EmployeeSuggestion/types';

function EmployeeSuggestionList(props: EmployeeSuggestionListTypes.IProps) {
  const { employees, currentPosition, onSuggestClick } = props;

  return (employees.length ?
    <div className="employee-search__suggestions">
      {employees.map((n, i) => (
        <EmployeeSuggestion
          email={n.email}
          key={n.employmentId}
          className={currentPosition === i ? 'employee-search__suggestion--active' : ''}
          avatarUrl={n.avatarUrl}
          onSuggestClick={() => onSuggestClick(n)}
          role="here will be role"
        />
      ))}
    </div> :
    <div className="employee-search__empty">
      Нет результатов
    </div>
  );
}

export default EmployeeSuggestionList;
