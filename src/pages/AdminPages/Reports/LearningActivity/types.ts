import { StatisticsLearningActivityTypes } from 'src/store/statistics/types';

export declare namespace LearningActivityTypes {
  export interface IProps {
    getLearningActivity(companyId: number, range: 'day' | 'week'): void;
    learningActivity: StatisticsLearningActivityTypes.IRenderProps;
    learningActivityLoading: boolean;
  }
}

export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  legend: {
    position: 'bottom',
  },
  tooltip: {
    mode: 'dataset',
    intersect: false,
    position: 'nearest',
  },
};
