import { IOption } from 'src/components/molecules/Select/types';
import { GroupTypes } from 'src/store/group/types';

export namespace GeneralInformationTypes {
  export interface IProps {
    companyId: number;
    courseId?: number;
    type?: 'create' | 'update';
    groups?: GroupTypes.IRenderProps[];
    getGroups?(queryParams: GroupTypes.IQueryParams): void;
  }

  export interface IData {
    title: string;
    description: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    groups: IOption[];
    tags?: string[];
  }

  export interface IDataErrorMessages {
    title: string;
    description: string;
    groups: string;
  }
}
