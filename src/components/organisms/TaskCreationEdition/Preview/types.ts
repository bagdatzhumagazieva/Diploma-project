import { TaskTypes } from 'src/store/task/types';

export namespace TaskPreviewTypes {
  export interface IProps {
    data: TaskTypes.IBodyProps;
    isDetailPage?: boolean;
    children?: JSX.Element;
    isStatistic?: boolean;
  }
}
