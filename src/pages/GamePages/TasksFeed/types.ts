import { TaskAggregatorTypes } from 'src/store/task/types';
import { RouteComponentProps } from 'react-router';

export namespace TasksFeedTypes {
  export interface IProps extends RouteComponentProps {
    total?: number;
    exerciseLoading?: boolean;
    exercises?:TaskAggregatorTypes.IRenderProps[];
    getExercises?(params: TaskAggregatorTypes.IQueryProps): void;
    onMakeFavorite?(taskId: number, callback?: any): void;
    onDeleteFavorite?(taskId: number, callback?: any): void;
  }
}
