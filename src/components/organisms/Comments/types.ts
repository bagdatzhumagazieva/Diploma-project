import { CommentTypes } from 'src/store/comment/types';
import { ProfileTypes } from 'src/store/profile/types';

export namespace CardCommentTypes {
  export interface IProps extends CommentTypes.IRender {
    rootId: number;
    parentId: number;
    className?: string;
    companyId: number;
    courseUuid: string;
    profile?: ProfileTypes.IRenderProps;
    isNewRoot?: boolean;
    isAdmin?: boolean;

    onRefreshRootComments?: (id: number, isNewRoot?: boolean) => void;
    getRootSubComments?(uuid: string, params: CommentTypes.IQueryParams, callbacks?: any): void;
    createComment?(companyId: number, data: CommentTypes.ICreateBody, callbacks?: any): void;
    deleteComment?(companyId: number, commentId: number, callbacks?: any): void;
  }
}
export namespace GroupTypes {
  export interface IProps {
    uuid: string;
    type: string;
    isAdmin?: boolean;
    totalRootComments?: number;
    className?: string;
    rootComments?: CommentTypes.IRender[];
    profile?: ProfileTypes.IRenderProps;

    createComment?(companyId: number, data: CommentTypes.ICreateBody, callbacks?: any): void;
    getRootComments?(uuid: string, params: CommentTypes.IQueryParams, callbacks?: any): void;
    clearComments?(): void;
  }
}
