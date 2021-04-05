import React from 'react';
import { CourseStatisticsTypes } from 'src/components/organisms/CourseDetailStatistics/types';
import { STATISTICS_STATE_DEFAULT_VALUES } from 'src/components/organisms/CourseDetailStatistics/const';

export interface IProps {
  statisticsParams: CourseStatisticsTypes.IStatisticsState;
  setStatisticsParams(statistics: CourseStatisticsTypes.IStatisticsState): void;
}

const defaultValues = {
  statisticsParams: STATISTICS_STATE_DEFAULT_VALUES,
  setStatisticsParams: (params: CourseStatisticsTypes.IStatisticsState) => {},
};

const CourseCreationContext = React.createContext<IProps>(defaultValues);

export default CourseCreationContext;
