import React from 'react';
import Typography from 'src/components/atoms/Typography';
import StackedHorizontalBar from 'src/components/atoms/StackedHorizontalBar';
import { StatisticsCardTypes } from './types';
import './index.scss';

function StatisticsCard(props: StatisticsCardTypes.IProps) {
  const { name, reports, total } = props;

  return (
    <div className="stat-card">
      <div className="d-flex align-items-center justify-content-between mb-32">
        <Typography variant="h2">
          {name}
        </Typography>
        <Typography variant="xsmallmed">
          {total}
        </Typography>
      </div>
      <StackedHorizontalBar dataSet={reports} />
      <div className="mt-24">
        {reports.map((n, i) => (
          <div key={i} className="d-flex align-items-center my-16">
            <span className="stat-card__dot" style={{ backgroundColor: n.color }} />
            <Typography variant="xsmall">
              {n.name}
            </Typography>
            <Typography variant="xsmallmed" className="ml-auto">
              {n.count}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatisticsCard;
