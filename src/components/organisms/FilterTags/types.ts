import { TagsTypes } from 'src/store/tag/types';
import { ILoadTypes } from 'src/core/store/types';
import { ITag } from 'src/components/organisms/AdminTags/types';

export namespace FilterTagsTypes {
  export interface IProps {
    companyId?: number;
    alphabet: string[];
    tags?: ILoadTypes<TagsTypes.IRenderProps[]>;

    getTags?(params: TagsTypes.IQueryParams, callback?: any): void;
    handleTags?(tags: ITag[]): void;
  }
}

export interface IFilter {
  id?: number;
  isChecked: boolean;
  value: string;
}
