import { IBaseProps } from 'src/core/components/types';
import { BranchesTypes } from 'src/store/branch/types';

export namespace BranchesStructureTypes {
  export interface IProps extends IBaseProps {
    branch: IBranch;
    onAddBranch(branchName: string, parentBranchId: number, isRootBranch?: boolean): void;
  }
}

export interface IBranch extends BranchesTypes.IRenderProps {
  isRootBranch?: boolean;
}
