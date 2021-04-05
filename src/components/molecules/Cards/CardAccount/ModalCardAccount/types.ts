import { IAccountData } from 'src/core/store/types';

export namespace AccountTypes {
  export interface IProps extends IAccountData {
    token: string;
  }
}
