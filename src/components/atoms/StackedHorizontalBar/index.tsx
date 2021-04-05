import React from 'react';
import { StackedHorizontalBarTypes } from './types';
import './index.scss';

function StackedHorizontalBar(props: StackedHorizontalBarTypes.IProps) {
  const { dataSet } = props;

  const sum = dataSet.reduce((n, { count }) => n + count, 0);

  return (
    <div className="hor-bar">
      {dataSet.map((n, i) => (
        <span
          key={i}
          className="hor-bar__item"
          style={{ width: `${n.count * 100 / sum}%`, backgroundColor: n.color }}
          title={n.name}
        />
      ))}
    </div>
  );
}

export default StackedHorizontalBar;
