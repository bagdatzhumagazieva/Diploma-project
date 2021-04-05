export namespace CardTotalAmountBranchesTypes {
  export interface IProps {
    branches: IBranch[];
    classNames?: string;
  }
}

export interface IBranch {
  name: string;
  amount: number;
}
