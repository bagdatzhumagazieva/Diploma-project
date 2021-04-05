import { ProgressStatus } from 'src/store/course/types';

export namespace CardMicroLearningTypes {
  export interface IProps {
    id: number | string;
    type?: string;
    title: string;
    description: string;
    date: string;
    favorite?: boolean;
    comments?: number;
    time: number;
    coins?: number;
    rating: number;
    image?: string;
    processStatus?: ProgressStatus;
    className?: string;
    link?: string;
    onMakeFavorite?(taskId: number, callback?: any): void;
    onDeleteFavorite?(taskId: number, callback?: any): void;
  }
}
