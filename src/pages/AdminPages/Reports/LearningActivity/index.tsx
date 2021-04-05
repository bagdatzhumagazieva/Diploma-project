import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import statisticsActions from 'src/store/statistics/actions';
import Typography from 'src/components/atoms/Typography';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import Loader from 'src/components/atoms/Loader';
import Button from 'src/components/atoms/Button';
import { LearningActivityTypes, options } from './types';
import { ReportColors } from '../types';
import './index.scss';

function LearningActivity(props: LearningActivityTypes.IProps) {
  const { getLearningActivity, learningActivity, learningActivityLoading } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const [date, setDate] = useState<'day' | 'week'>('day');

  useEffect(
    () => {
      getLearningActivity(companyId, date);
    },
    [getLearningActivity, companyId, date],
  );

  return (
    <div className="grid learning-activity">
      <div className="d-flex align-items-center mb-32">
        <Typography variant="h2">
          Активность обучения
        </Typography>
        <div className="flex align-items-center ml-auto">
          <Button
            variant="text"
            type="plain"
            classNames={['activity-date', { 'activity-date--active': date === 'day' }]}
            onClick={() => setDate('day')}
          >
            за день
          </Button>
          <Button
            variant="text"
            type="plain"
            classNames={['activity-date', { 'activity-date--active': date === 'week' }]}
            onClick={() => setDate('week')}
          >
            за неделю
          </Button>
        </div>
      </div>

      {learningActivityLoading
        ? <Loader className="my-48" size={40} />
        : learningActivity && (
          <div className="overflow-auto">
            <Bar data={{
              labels: learningActivity.activities.map(n =>
                moment(n.rangeStart).format(date === 'day' ? 'HH:mm' : 'D MMMM'),
              ),
              datasets: [
                {
                  label: 'Баттлов',
                  data: learningActivity.activities.map(n => n.results.battles),
                  backgroundColor: ReportColors.RED,
                  barPercentage: 0.4,
                },
                {
                  label: 'Игры',
                  data: learningActivity.activities.map(n => n.results.games),
                  backgroundColor: ReportColors.YELLOW,
                  barPercentage: 0.4,
                },
                {
                  label: 'Лента',
                  data: learningActivity.activities.map(n => n.results.exercises),
                  backgroundColor: ReportColors.GREEN,
                  barPercentage: 0.4,
                },
                {
                  label: 'Курсы',
                  data: learningActivity.activities.map(n => n.results.courses),
                  backgroundColor: ReportColors.BLUE,
                  barPercentage: 0.4,
                },
              ],
            }} options={options} />
          </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  learningActivity: state.statisticsReducer.learningActivity.data,
  learningActivityLoading: state.statisticsReducer.learningActivity.loading,
});

const mapDispatchToProps = {
  getLearningActivity: statisticsActions.getLearningActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningActivity);
