import { IBaseProps, IRenderBody } from 'src/core/components/types';
import { ILoadTypes } from 'src/core/store/types';
import { InvitationTypes } from 'src/store/invitation/types';
import { SortDirection } from 'src/components/molecules/Table/types';
import { GroupTypes } from 'src/store/group/types';
import { BranchesTypes } from 'src/store/branch/types';

export namespace TableInvitationsTypes {
  export interface IProps extends IBaseProps {
    invitations: any;
    invitationsLoading?: boolean;
    deleteInvitations?(invitationIds: number[]): void;
    resendInvitations?(invitationIds: number[]): void;
    onSort?(label: string, sortDirection: SortDirection): void;
  }
}

export namespace TableInvitationsWithPaginationTypes {
  export interface IProps {
    className?: string;
    companyId?: number;
    branches?: BranchesTypes.IRenderProps[];
    groups?: GroupTypes.IRenderProps[];
    invitations?: ILoadTypes<InvitationTypes.IResponseProps[]>;
    resentInvitationsState?: IRenderBody;
    deletedInvitationsState?: IRenderBody;
    getGroups?(params: GroupTypes.IQueryParams): void;
    getBranches?(companyId: number): void;
    clearUpdatedInvitationsState?(): void;
    getInvitations?(params: InvitationTypes.IGetInvitationsBodyParams): void;
  }
}
