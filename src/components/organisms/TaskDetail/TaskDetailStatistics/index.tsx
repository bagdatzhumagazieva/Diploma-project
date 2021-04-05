import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Typography from 'src/components/atoms/Typography';
import Loader from 'src/components/atoms/Loader';
import ChartProgress from 'src/components/atoms/ChartProgress';
import Rate from 'src/components/atoms/Rate';
import ProgressBar from 'src/components/atoms/ProgressBar';

import taskActions from 'src/store/task/actions';

import { COLORS } from 'src/core/store/values';
import { generateRandomColor } from 'src/components/organisms/CourseDetailStatistics/const';
import { TaskDetailStatisticTypes } from 'src/components/organisms/TaskDetail/TaskDetailStatistics/types';
import { CourseStatisticsTypes } from 'src/components/organisms/CourseDetailStatistics/types';
import 'src/components/organisms/TaskDetail/TaskDetailStatistics/index.scss';

function TaskDetailStatistic(props: TaskDetailStatisticTypes.IProps) {

  const { children, groupStatistics, groupStatisticsLoading, onGetTaskStatisticByGroups, companyId, taskId } = props;

  const [statistic, setStatistic] = useState<CourseStatisticsTypes.IOptions[]>([]);
  const commonPercent =
    (groupStatistics && (groupStatistics?.finishedAmount / groupStatistics?.totalAmount) * 100) || 0;

  useEffect(() => {
    onGetTaskStatisticByGroups && onGetTaskStatisticByGroups(taskId, companyId);
  },        []);

  useEffect(() => {
    if (groupStatistics) {
      const newStatistic: CourseStatisticsTypes.IOptions[] = groupStatistics.groupAmounts.map((item, i) => ({
        title: item.groupName,
        value: +item.finishedAmount?.toFixed(0),
        color: (i < COLORS.length) ? COLORS[i] : generateRandomColor(),
      }));
      setStatistic(newStatistic);
    }
  },        [groupStatistics]);

  return (
    <div>
      {groupStatisticsLoading ? <Loader className="mt-16" /> : groupStatistics && (
        <div className="task-statistic">
          {children}
          <div className="d-flex justify-content-between px-64">
            <div>
              <Typography variant="h2" className="mb-24">Группы прошедшие заданий</Typography>
              {statistic.length && <ChartProgress options={statistic} />}
            </div>
            <div>
              <span className="d-flex flex-column">
              <Typography variant="h2" className="mb-8">Всего участников:</Typography>
              <Typography variant="h2">{groupStatistics?.totalAmount}</Typography>
              </span>
              <span className="d-flex flex-column">
              <Typography variant="h2" className="mb-8 mt-48">Средний рейтинг задания</Typography>
              <Rate className="mt-16" disabled value={groupStatistics?.rating} />
              </span>
            </div>
          </div>
          <div className="mx-64 mb-48">
            <Typography variant="h2" className="mb-8 mt-48">Пользователей прошедших задания</Typography>
            <div className="d-flex mt-24 pb-24">
              <Typography variant="xsmall" className="task-statistic__progress-title">
                Все
              </Typography>
              <ProgressBar
                regular
                percent={commonPercent > 100 ? 100 : commonPercent}
                className="d-flex align-items-center task-statistic__progress-bar ml-24 mr-16"
              />
              <Typography variant="subtext" className="pb-4">
                {`${groupStatistics?.finishedAmount} / ${groupStatistics?.totalAmount}`}
              </Typography>
            </div>
            {groupStatistics?.groupAmounts.map((e, i) => {
              const percent = (e.finishedAmount / e.totalAmount) * 100 || 0;
              return (
                <div className="d-flex mt-24 pb-24" key={i}>
                  <Typography variant="xsmall" className="task-statistic__progress-title">
                    {e.groupName || ''}
                  </Typography>
                  <ProgressBar
                    regular
                    percent={percent > 100 ? 100 : percent}
                    className="d-flex align-items-center task-statistic__progress-bar ml-24 mr-16"
                  />
                  <Typography variant="subtext" className="pb-4">
                    {`${e.finishedAmount} / ${e?.totalAmount}`}
                  </Typography>
                </div>);
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  groupStatistics: state.taskReducer.groupStatistics.data,
  groupStatisticsLoading: state.taskReducer.groupStatistics.loading,
});

const mapDispatchToProps = {
  onGetTaskStatisticByGroups: taskActions.getStatisticsByGroups,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(TaskDetailStatistic);
