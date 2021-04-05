import React from 'react';
import moment from 'moment';

import Typography from 'src/components/atoms/Typography';
import MicroLearningText from 'src/components/atoms/MicroLearningText';
import Image from 'src/components/atoms/Image';
import Comments from 'src/components/organisms/Comments';

import { ReactComponent as ClockIcon } from 'src/assets/img/icons/clock.svg';
import { ReactComponent as CoinIcon } from 'src/assets/img/icons/coin.svg';
import { ReactComponent as StarIcon } from 'src/assets/img/icons/star.svg';
import { TaskPreviewTypes } from 'src/components/organisms/TaskCreationEdition/Preview/types';
import 'src/components/organisms/TaskCreationEdition/Preview/index.scss';
import { parseNumberToStringWithComma } from 'src/utils/format';

function Preview(props: TaskPreviewTypes.IProps) {
  const {
    data: propsData, isDetailPage,
    children, isStatistic,
  } = props;

  return (
    <div className="d-flex flex-column task-preview">
      <div className="task-preview__body d-flex flex-column">
        {!isDetailPage && <Typography variant="h1">Предпросмотр</Typography>}
        <div className="p-64">
          <MicroLearningText type={propsData.type || ''}/>
          <br/>
          <Typography variant="h1" className="mt-24">
            {propsData.name}
          </Typography>
          <div className="d-flex mt-16 justify-content-between">
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <Typography variant="h2" color="main_50">
                  +{propsData.rewardAmount}
                </Typography>
                <CoinIcon width={14} height={14} className="ml-4"/>
              </div>
              <div className="d-flex align-items-center ml-24">
                <ClockIcon />
                <Typography variant="subtext" color="grey_additional_2" className="ml-2">
                  {propsData.minutesToFinish} мин
                </Typography>
              </div>
              <div className="d-flex align-items-center">
                <StarIcon className="ml-24"/>
                <Typography variant="subtext" color="grey_additional_2" className="ml-8 mt-2">
                  {parseNumberToStringWithComma(propsData?.rating || 0)}
                </Typography>
              </div>
            </div>
            <Typography variant="subtext">
              {propsData?.publishDate && moment(propsData.publishDate).format('DD.MM.YYYY')}
            </Typography>
          </div>
          {propsData.image && (
            <Image
              alt="Article"
              src={propsData.image || ''}
              className="fill_w mt-24"
            />
          )}
          {!isStatistic && (
            <div className="d-flex flex-column mt-32 mb-48">
              {propsData?.mainCardDescription && (
                <div
                  className="mt-24 inner-html task-preview__body__descr pl-24 mt-24"
                  dangerouslySetInnerHTML={{ __html: propsData?.mainCardDescription || '' }}
                />
              )}
              {propsData?.mainCardContent && (
                <Typography
                  variant="text"
                  className="mt-8 inner-html pl-12"
                  dangerouslySetInnerHTML={{ __html: propsData?.mainCardContent }}
                >
                </Typography>
              )}
            </div>
          )}
          {children}
          {!isStatistic && (
            <>
              <div className="d-flex flex-column mt-32">
                <Typography variant="subtext" color="grey_additional_2">Тэги:</Typography>
                <Typography variant="subtext" color="main_50" className="mt-8">
                  {propsData.tags?.map(e => `#${e.name} `)}
                </Typography>
              </div>
              <Comments
                isAdmin
                type="EXERCISE"
                uuid={propsData.uuid}
                className="mt-32"
              />
            </>)}
        </div>
      </div>
    </div>
  );
}

export default Preview;
