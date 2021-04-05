import React, { useState } from 'react';
import { useHistory } from 'react-router';
import classNames from 'classnames';

import Arrow from 'src/components/atoms/Svg/Table/filterArrow';
import Typography from 'src/components/atoms/Typography';
import { CardModuleTypes } from 'src/components/molecules/Cards/CardModule/types';
import { getIcon } from 'src/pages/GamePages/Course/Course/consts';
import { ProgressStatus } from 'src/store/course/types';
import 'src/components/molecules/Cards/CardModule/index.scss';

function CardModule(props: CardModuleTypes.IProps) {
  const {
    index, title, cards, className, id,
    variant, status, testStatus, courseId,
  } = props;
  const history = useHistory();
  const [isShowContent, setShowContent] = useState<boolean>(false);

  const onArrowClick = () => setShowContent(!isShowContent);
  const isFinished = (status: ProgressStatus = ProgressStatus.NOT_STARTED) => status !== ProgressStatus.NOT_STARTED;
  const onNameClick = (cardId: number, status?: ProgressStatus) => {
    if (!isFinished(status)) return;
    history.push(`/education/course/${courseId}/module/${id}/card/${cardId}`);
  };

  return (
    <div className={classNames('card-module', className)}>
      <div className="card-module__header p-24 d-flex align-items-center">
        <Arrow
          direction={isShowContent ? 'down' : 'right'}
          className="card-module__arrow cursor-pointer"
          onClick={onArrowClick}
        />
        <div
          className={classNames(
            'd-flex flex-column px-16 fill_w',
            { 'pointer-events-none': variant !== 'web' },
          )}>
          <Typography variant="subtext" color="grey_additional_2">
            Модуль {index + 1}
          </Typography>
          <Typography
            variant="h2"
            className="mt-8 cursor-pointer"
            onClick={() => history.push(`/education/course/${courseId}/module/${id}`)}
          >
            {title}
          </Typography>
        </div>
        {getIcon(variant, status)}
      </div>
      {isShowContent && cards && (
        <div className={classNames('p-24', { 'pointer-events-none': variant !== 'web' })}>
          {cards.map((item, index) => (
            <div
              key={`card-module__card-${index}-${item.name}`}
              className="py-4 d-flex align-items-center justify-content-between mb-24"
            >
              <Typography
                variant="subtext"
                color={[ProgressStatus.IN_PROGRESS, ProgressStatus.SUCCESS].includes(item.status) ? 'blacker' : 'grey_additional_2'}
                onClick={() => onNameClick(item.id, item.status)}
                className={isFinished(item.status) ? 'cursor-pointer' : ''}
              >
                {item.name}
              </Typography>
              <div className="d-flex align-items-center">
                {item.status === ProgressStatus.IN_PROGRESS && (
                  <Typography variant="subtext" color="main_50" className="mr-24">Начать</Typography>
                )}
                {getIcon(variant, item.status || ProgressStatus.NOT_STARTED, 16)}
              </div>
            </div>
          ))}
          <div key="card-module__card-test" className="py-4 d-flex align-items-center justify-content-between">
            <Typography
              variant="subtext"
              color={[ProgressStatus.IN_PROGRESS, ProgressStatus.SUCCESS, ProgressStatus.FAIL].includes(testStatus) ? 'blacker' : 'grey_additional_2'}
              onClick={() => history.push(`/education/course/${courseId}/module/${id}/test`)}
              className={testStatus === ProgressStatus.NOT_STARTED ? 'pointer-events-none' : 'cursor-pointer' }
            >
              Тест
            </Typography>
            {getIcon(variant, testStatus, 16)}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardModule;
