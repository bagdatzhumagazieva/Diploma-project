import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Typography from 'src/components/atoms/Typography';
import { ChartProgressTypes } from 'src/components/atoms/ChartProgress/types';
import { CourseStatisticsTypes } from 'src/components/organisms/CourseDetailStatistics/types';
import 'src/components/atoms/ChartProgress/index.scss';

function ChartProgress(props: ChartProgressTypes.IProps) {
  const { options } = props;
  const labelFunction = ({ dataEntry } : any) =>
    dataEntry.percentage !== 0 ? `${dataEntry.percentage.toFixed(1)}%` : '';
  return (
    <div className="chart-progress d-flex">
      <div className="chart-progress__circle">
        <PieChart
          label={labelFunction}
          data={options}
          labelStyle={{
            fontSize: `${options.length > 4 ?  8 : 12}px` ,
            letterSpacing: '0.04em',
            fill: '#FFFFFF',
          }}
        />
      </div>
      <div className="ml-32">
        {options.map((e:CourseStatisticsTypes.IOptions, i) => (
          <div className="d-flex" key={i}>
            <div className="chart-progress__title-circle mr-8 mt-2" style={{ background: `${e.color}` }}/>
            <Typography variant="xsmall" className="mb-8" color="black">{e.title}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartProgress;
