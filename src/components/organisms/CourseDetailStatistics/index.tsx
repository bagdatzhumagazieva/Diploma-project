import React, { useContext, useEffect, useState } from 'react';

import Typography from 'src/components/atoms/Typography';
import ProgressBar from 'src/components/atoms/ProgressBar';
import ChartProgress from 'src/components/atoms/ChartProgress';
import Checkbox from 'src/components/molecules/Checkbox';
import Table from 'src/components/molecules/Table';
import AdminInfoContext from 'src/components/organisms/CourseDetail/AdminInfo/AdminInfoContext';

import { CourseStatisticsTypes } from 'src/components/organisms/CourseDetailStatistics/types';
import { parseToHeaderData, parseToPieChartData, parseToTableData } from 'src/components/organisms/CourseDetailStatistics/const';
import 'src/components/organisms/CourseDetailStatistics/index.scss';

function CourseDetailStatistics(props: CourseStatisticsTypes.IProps) {
  const { users, average, pieChartData: pieChartDataProps } = props;
  const tableBodyData = average.length > 0 ? parseToTableData(average) : [];
  const tableHeaderData = average.length > 0 ? parseToHeaderData(average[0]) : [];
  const { setStatisticsParams, statisticsParams } = useContext(AdminInfoContext);
  const [pieChartData, setPieChartData] = useState<CourseStatisticsTypes.IOptions[]>([]);

  useEffect(
    () => {
      if (!Array.isArray(pieChartDataProps)) return;
      const newPieChartData = pieChartDataProps.map((item, index) => parseToPieChartData(item, index));
      setPieChartData(newPieChartData);
    },
    [pieChartDataProps],
  );

  const onStateChange = (state: boolean, id: string) => {
    const newParams = { ...statisticsParams, [id]: state };
    setStatisticsParams(newParams);
  };

  return (
    <div className="course-statistics pt-48 pl-64 pb-48">
      <div className="d-flex course-statistics__white">
        <div className="course-statistics__groups d-flex flex-column">
          <Typography variant="h2">Группы прошедшие курс</Typography>
          <Checkbox
            id="isGroupsImportant"
            title="Обязательные группы"
            titleVariant="text"
            className="mt-24 mb-24 align-self-start"
            setClicked={onStateChange}
          />
          <ChartProgress options={pieChartData} />
        </div>
        <div className="course-statistics__users d-flex flex-column">
          <Typography variant="h2">Пользователей прошедших курс</Typography>
          <Checkbox
            id="isUserImportant"
            title="Обязательные группы"
            titleVariant="text"
            className="mt-24 mb-24 align-self-start"
            setClicked={onStateChange}
          />
          <div className="course-statistics__users__progress">
            {users.map(e => (
              <div className="d-flex mb-24">
                <Typography variant="xsmall users__progress__employees mr-24">
                  {e.name}
                </Typography>
                <ProgressBar
                  regular
                  percent={(e.completed / e.total) * 100}
                  className="users__progress__statistic mr-16 pt-4"
                />
                <Typography variant="subtext" className="pb-4">
                  {`${e.completed} / ${e.total}`}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="course-statistics__middle-point pt-48 d-flex flex-column">
        <Typography variant="h2" className="course-statistics__white">
          Средний балл
        </Typography>
        <Checkbox
          id="isAverageImportant"
          title="Обязательные группы"
          titleVariant="text"
          className="mt-24 mb-24 align-self-start"
          setClicked={onStateChange}
        />
        <div className="course-statistics__middle-point__table">
          <Table
            headerData={tableHeaderData}
            bodyData={tableBodyData}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseDetailStatistics;
