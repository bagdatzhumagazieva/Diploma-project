import React  from 'react';
import Hint from 'src/components/atoms/Hint';
import Typography from 'src/components/atoms/Typography';

import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import { INVITATION_EXCEL_COLUMNS } from 'src/components/molecules/EmployeeInvitation/EmployeeInvitationExcel/consts';
import { EmployeesInvitationExcelTypes } from 'src/components/molecules/EmployeeInvitation/EmployeeInvitationExcel/types';
import 'src/components/molecules/EmployeeInvitation/EmployeeInvitationExcel/index.scss';

function EmployeesInvitationExcel(props: EmployeesInvitationExcelTypes.IProps) {
  const {
    employees,
    onDeleteEmployee,
  } = props;

  const onDeleteEmployeeClick = (employeeId: string) => () => {
    onDeleteEmployee && onDeleteEmployee(employeeId);
  };

  return (
    <div className="employee-invitations-excel">
      <div className="employee-invitations-excel__header d-flex">
        {INVITATION_EXCEL_COLUMNS.map(n => (
          <div
            key={n.id}
            className={`header__column header__column--${n.id}`}
          >
            <Typography
              color="grey_additional_2"
              variant="subtextmed"
            >
              {n.title}
            </Typography>
          </div>
        ))}
      </div>
      <div
        className="employee-invitations-excel__group"
      >
        {Object.keys(employees).map((n: string) => {
          const emp = employees[n];
          return (
            <div key={n} className="d-flex align-items-center employee-invitations-excel__group__item-wrap">
              <div className="employee-invitations-excel__group__item fill_w d-flex align-items-center">
                <div className="column column--name d-flex flex-column">
                  <Typography variant="subtext">
                    {emp.firstName} {emp.lastName}
                  </Typography>
                  <Typography
                    variant="xsmall"
                    className="mt-8"
                    color="grey_additional_2"
                  >
                    {emp.email}
                  </Typography>
                </div>
                <div
                  className="column column--phone"
                >
                  {emp.phone}
                </div>
                <div
                  className="column column--branch"
                >
                  {emp.branchName}
                </div>
                <div
                  className="column column--groups"
                >
                  {emp.groupNames?.length > 0 ?
                    emp.groupNames.length === 1 ?
                      <Typography variant="subtext">{emp.groupNames[0]}</Typography> :
                      <div className="d-inline-block">
                        <Hint
                          interactive
                          showOnClick
                          hasArrow
                          placement="top"
                          className="column--groups__hint"
                          hint={
                            <Typography
                              color="blacker"
                              variant="xxsmall"
                              classNames="d-block"
                            >
                              {emp.groupNames.join(', ')}
                            </Typography>
                          }
                        >
                          <Typography
                            className="text-decoration_underline"
                            variant="subtext"
                            classNames="column--groups__names"
                          >
                            {emp.groupNames.length} групп
                          </Typography>
                        </Hint>
                      </div> :
                    <Typography variant="subtext">-</Typography>
                  }
                </div>
              </div>
              <div className="d-flex align-items-center employee-invitation-excel__delete-btn">
                <CancelIcon
                  color="#F04848"
                  className="employee-invitation-excel__delete-btn__icon"
                  onClick={onDeleteEmployeeClick(n)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EmployeesInvitationExcel;
