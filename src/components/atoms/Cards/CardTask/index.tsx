import React from 'react';
import classNames from 'classnames';
import { mapPropsToAttributes } from 'src/core/components';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';

import { CardTaskTypes } from 'src/components/atoms/Cards/CardTask/types';
import { USER_TASK_STATUSES } from 'src/components/atoms/Cards/CardTask/consts';
import 'src/components/atoms/Cards/CardTask/index.scss';
import { getDate } from 'src/utils/format';

function CardTask(props: CardTaskTypes.IProps) {
  const {
    title, imgSrc, info,
    progress, lastActivity, status, link,
  } = props;

  const attributes = mapPropsToAttributes<CardTaskTypes.IProps>(
    props, 'card-task', 'd-flex', 'justify-content-between', 'align-items-start',
  );

  return (
    <div {...attributes}>
      <div className="card-task__content d-flex">
        <div className="card-task__image-wrapper mr-24">
          <Image
            alt={title}
            src={imgSrc}
            classNames="card-task__image fill"
          />
        </div>
        <div className="d-flex flex-column">
          <Button
            to={link}
            type="link"
            color="blacker"
            variant="subtext"
            className="card-task__header mb-12"
          >
              {info}
              <Typography
                color="blacker"
                variant="subtextmed"
                classNames="d-inline ml-1"
              >
                "{title}"
              </Typography>
          </Button>
          <div className="card-task__progress mb-8">
            <div
              className={classNames(
                'progress__value',
                { 'progress__value--completed': status === USER_TASK_STATUSES.COMPLETED },
                )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <Typography variant="xsmall">
            {progress.toFixed(0)}% пройдено
          </Typography>
        </div>
      </div>
      <Typography variant="xsmall" color="grey_additional_1" classNames="mt-1">{getDate(lastActivity)}</Typography>
    </div>
  );
}

export default CardTask;
