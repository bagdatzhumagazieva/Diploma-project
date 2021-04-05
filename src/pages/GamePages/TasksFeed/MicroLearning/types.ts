import { RouteComponentProps } from 'react-router';
import { CreateAttemptTask, TaskAggregatorTypes } from 'src/store/task/types';
import { RatingTypes } from 'src/store/rate/types';

export namespace MicrolearningPageTypes {
  export interface IProps extends RouteComponentProps {
    createdAttemptData?: any;
    createdAttemptLoading?: boolean;
    detailTask?: TaskAggregatorTypes.IRenderDetailProps;
    attemptResult?: CreateAttemptTask.IRenderProps;

    onCreateAttemptTask?(taskId: number, data: CreateAttemptTask.IRender[], callback?: any): void;
    onGetDetailTask?(taskId: number): void;
    onMakeFavorite?(taskId: number, callback?: any): void;
    onDeleteFavorite?(taskId: number, callback?: any): void;
    onSendRating?(data: RatingTypes.ICreateBody, callback?: any): void;
    clearDetailTask?(): void;
  }
}
