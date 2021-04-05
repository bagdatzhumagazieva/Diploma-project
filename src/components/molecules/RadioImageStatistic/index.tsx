import React from 'react';
import classNames from 'classnames';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import 'src/components/molecules/RadioImageStatistic/index.scss';
import { RadioImageStatisticTypes } from 'src/components/molecules/RadioImageStatistic/types';

function RadioImageStatistics(props: RadioImageStatisticTypes.IProps) {
  const { image, answerAmount, percent, className } = props;
  return (
    <div className={classNames(
      'radio-image-statistic d-flex align-items-center', className)}>
      <Image
        src={image}
        alt="Radio Image"
        className="radio-image-statistic__img"
      />
      <div className="radio-image-statistic__bar-wrap ml-16" style={{ width: `${percent}%` }}/>
      <Typography variant="xsmall" className="ml-8">
        {`- (${percent.toFixed(0)}%)`}
        {answerAmount ? `${answerAmount} ответа` : ''}
      </Typography>
    </div>
  );
}

export default RadioImageStatistics;
