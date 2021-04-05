import { TagsTypes } from 'src/store/tag/types';
import { ITag } from 'src/components/organisms/AdminTags/types';

export namespace TagsSearchChipsTypes {
  export interface IProps {
    companyId: number;
    searchedTags?: TagsTypes.IRenderProps[];
    searchedTagsTotal?: number;
    searchedTagsLoading?: boolean;
    initialTags?: ITag[];
    disabled?: boolean;

    getSearchedTags?(params: TagsTypes.IQueryParams, callback?: any): void;
    handleSelectedTagsIds?(tags: ITag[]): void;
  }
}
