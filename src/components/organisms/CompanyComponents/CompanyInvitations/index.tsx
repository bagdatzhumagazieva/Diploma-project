import React from 'react';
import TableInvitationsWithPagination from 'src/components/organisms/TableComponents/TableInvitations/TableInvitationsWithPagination';
import { CompanyInvitationsTypes } from 'src/components/organisms/CompanyComponents/CompanyInvitations/types';

function CompanyInvitations(props: CompanyInvitationsTypes.IProps) {
  const { companyId } = props;
  return (
    <div className="company-invitations">
      <TableInvitationsWithPagination
        companyId={companyId}
      />
    </div>
  );
}

export default CompanyInvitations;
