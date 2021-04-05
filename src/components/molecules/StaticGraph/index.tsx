import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { StaticGraphTypes } from 'src/components/molecules/StaticGraph/types';
import 'src/components/molecules/StaticGraph/index.scss';

function StaticGraph(props: StaticGraphTypes.IProps) {
  const { options } = props;

  const data = {
    labels: ['', ...options.map(item => item.title)],
    datasets: [
      {
        label: '',
        backgroundColor: '#FF9800',
        data: [0, ...options.map(item => item.value)],
      },
    ],
  };

  return (
    <div className="statistic-graph">
      <HorizontalBar data={data} />
    </div>
  );
}

export default StaticGraph;
