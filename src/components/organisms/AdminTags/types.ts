import { TagsTypes } from 'src/store/tag/types';
import { IRenderBody } from 'src/core/components/types';
import { ILoadTypes } from 'src/core/store/types';

export namespace AdminTagsTypes {
  export interface IProps {
    companyId: number;
    tags?: ILoadTypes<TagsTypes.IRenderProps[]>;
    createdTagState?: IRenderBody;
    alphabet: string[];
    total?: number;
    tagsByKeyword?: ILoadTypes<TagsTypes.IRenderProps[]>;

    getTags?(params: TagsTypes.IQueryParams): void;
    createTag?(companyId: number, tagName: string, callbacks?: any): void;
    clearTagsState?(): void;
    getTagsByKeyword?(params: TagsTypes.IQueryParams): void;
    deleteTag?(companyId: number, tagId: number, callback?: any): void;
    editTag?(tagId: number, tagName: string, callback?: any): void;
  }
}

export interface IKeyword {
  letter: string;
  input: string;
}

export interface ITag {
  id: number;
  name: string;
}
