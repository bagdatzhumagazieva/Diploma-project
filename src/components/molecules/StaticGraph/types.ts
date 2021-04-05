import { IBaseProps } from 'src/core/components/types';
import { CourseStatisticsTypes } from 'src/components/organisms/CourseDetailStatistics/types';

export declare namespace StaticGraphTypes {
  export interface IProps extends IBaseProps{
    options: CourseStatisticsTypes.IOptions[];
  }
}
