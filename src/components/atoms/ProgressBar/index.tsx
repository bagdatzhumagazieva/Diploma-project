import React from 'react';
import classNames from 'classnames';
import Typography from 'src/components/atoms/Typography';
import { ProgressBarTypes } from 'src/components/atoms/ProgressBar/types';
import 'src/components/atoms/ProgressBar/index.scss';

function ProgressBar(props: ProgressBarTypes.IProps) {
  const { percent, label, position = 'bottom', regular, className } = props;

  return (
    <div className={classNames(
      'progress',
      { 'd-flex flex-column-reverse': position === 'top' },
      { 'd-flex align-items-center': position === 'right' }, className,
    )}
    >
      <div className={classNames(
        'progress-container flex-grow-1',
        { 'mr-8': (position === 'right' && !regular) })
      }>
        <div className={classNames(
          'bar',
          { 'progress--end': percent > 60 },
          { 'progress--middle': percent > 30 && percent <= 60 },
          { 'progress--start': percent <= 30 })
        }
          style={{ width: `${percent}%` }}>
        </div>
      </div>
      { !regular && <Typography variant={position === 'right' ? 'subtext' : 'xsmall'}
        className={classNames(
          { 'mt-4': position === 'bottom' },
          { 'mb-4': position === 'top' },
        )}
      >
        {Math.floor(percent)}% {label}
      </Typography>}
    </div>
  );
}

export default ProgressBar;
