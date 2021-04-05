import React from 'react';
import { StatusTypes } from 'src/components/atoms/Status/types';
import 'src/components/atoms/Status/index.scss';
import Typography from 'src/components/atoms/Typography';

function Status(props: StatusTypes.IProps) {
  const { status } = props;

  return (
    <div className="status pos_relative">
      <Typography variant="xxsmall" className="status__text pos_absolute">
        {status === 'PUBLISHED' ? 'Опубликован' : status === 'SCHEDULED' ? 'Запланирован' : 'В черновике'}
      </Typography>
      <div className={`status__circle status__circle--${status}`} />
    </div>
  );
}

export default Status;
