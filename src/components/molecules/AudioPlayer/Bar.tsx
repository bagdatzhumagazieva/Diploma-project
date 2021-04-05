import React from 'react';
import classNames from 'classnames';
import { secondsToTimeFormat } from 'src/utils/format';
import Typography from 'src/components/atoms/Typography';
import { BarTypes } from 'src/components/molecules/AudioPlayer/types';
import './index.scss';

function Bar(props: BarTypes.IProps) {
  const { duration, curTime, onTimeUpdate, className } = props;

  const curPercentage = (curTime / duration) * 100;

  const calcClickedTime = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickPositionInPage = e.pageX;
    const bar = document.getElementById('progress-bar') as HTMLDivElement;
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  };

  const handleTimeDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    onTimeUpdate && onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove: any) => {
      onTimeUpdate && onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener('mousemove', updateTimeOnMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMove);
    });
  };

  return (
    <div className={classNames('bar d-flex align-items-center fill_w', className)}>
      <Typography variant="subtext" className="bar__time mr-16">{secondsToTimeFormat(curTime)}</Typography>
      <div
        id="progress-bar"
        className="bar__progress d-flex align-items-center mr-16"
        style={{
          background: `linear-gradient(to right, #FF9800 ${curPercentage}%, #E0E0E6 0)`,
        }}
        onMouseDown={handleTimeDrag}
      >
        <span
          className="bar__progress__knob pos_relative"
          style={{ left: `${curPercentage - 1}%` }}
        />
      </div>
      <Typography variant="subtext" className="bar__time">{secondsToTimeFormat(duration)}</Typography>
    </div>
  );
}

export default Bar;
