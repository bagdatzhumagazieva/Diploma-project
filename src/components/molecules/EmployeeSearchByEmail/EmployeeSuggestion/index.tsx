import React from 'react';

import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';

import { EmployeeSuggestionTypes } from 'src/components/molecules/EmployeeSearchByEmail/EmployeeSuggestion/types';
import 'src/components/molecules/EmployeeSearchByEmail/EmployeeSuggestion/index.scss';

function EmployeeSuggestion(props: EmployeeSuggestionTypes.IProps) {
  const { email, role, avatarUrl, onSuggestClick, className } = props;

  return (
    <div
      className={`employee-search__suggestion d-flex ${className}`}
      onClick={onSuggestClick}
    >
      <Image
        src={avatarUrl}
        alt="employee-image"
        className="employee-search__suggestion__img"
      />
      <div className="d-flex flex-column ml-8">
        <Typography variant="subtext">
          {email}
        </Typography>
        <Typography
          variant="subtext"
          className="mt-4"
          color="grey_additional_2"
        >
          {role}
        </Typography>
      </div>
    </div>
  );
}

export default EmployeeSuggestion;
