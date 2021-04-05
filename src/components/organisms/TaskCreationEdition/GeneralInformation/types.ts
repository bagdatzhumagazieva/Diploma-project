import { GroupTypes } from 'src/store/group/types';

export namespace TaskGeneralInformationTypes {
  export interface IProps {
    companyId: number;
    groups?: GroupTypes.IRenderProps[];
    getGroups?(params: GroupTypes.IQueryParams): void;
  }

  export interface IDataErrorMessages {
    rewardAmount: string;
    name: string;
    picture: string;
  }
}
