import { BranchesTypes } from 'src/store/branch/types';

export const searchBranchTree = (branch: BranchesTypes.IRenderProps, branchId: number): BranchesTypes.IRenderProps | null => {
  if (branch.id === branchId) {
    return branch;
  }  if (branch.subBranches?.length && branch.subBranches?.length > 0) {
    let i;
    let result = null;
    for (i = 0; result == null && i < branch.subBranches.length; i++) {
      result = searchBranchTree(branch.subBranches[i], branchId);
    }
    return result;
  }
  return null;
};
