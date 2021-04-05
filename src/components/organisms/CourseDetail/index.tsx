import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { numberToStringWithSpaces, parseNumberToStringWithComma } from 'src/utils/format';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Members from 'src/components/atoms/Svg/Icons/members';
import Image from 'src/components/atoms/Image';
import Rate from 'src/components/atoms/Rate';
import AdminInfo from 'src/components/organisms/CourseDetail/AdminInfo';
import MainInfo from 'src/components/organisms/CourseDetail/MainInfo';

import { ReactComponent as Clock } from 'src/assets/img/icons/clock.svg';
import { CourseDetailContainerTypes } from 'src/components/organisms/CourseDetail/types';
import { ReactComponent as CoinIcon } from 'src/assets/img/icons/coin.svg';
import { ProgressStatus } from 'src/store/course/types';
import 'src/components/organisms/CourseDetail/index.scss';

function CourseDetail(props: CourseDetailContainerTypes.IProps) {
  const {
    className, name, minutesToFinish = 0, rewardAmount,
    createdAt, imageUrl, variant, numberOfViews = 0,
    description, modules, tags, certificateImageUrl,
    rating = 0, uuid = '', id, curUrl = '#', userRating,
    loading = false, examStatus = ProgressStatus.NOT_STARTED,
    finalResultCertificateId,
  } = props;
  const [newRating, setNewRating] = useState<number>();

  const totalRating = newRating ? (rating === 0 ? newRating : (rating + newRating) / 2) : rating;

  return (
    <div className={classNames('course-detail pos_relative', className)}>
      <div className={classNames('course-detail__header mb-32', { covered: loading || imageUrl === undefined })}>
        <div className="header__overlay" />
        {imageUrl !== undefined && <Image alt="course image" src={imageUrl || ''} className="header__bg"/>}
        <div className="header__body pos_absolute align-items-center">
          <div className="d-flex align-items-center">
            <Rate
              disabled
              value={totalRating}
            />
            <Typography
              variant="text"
              className="ml-8 mt-4"
              color="whiter"
            >
              {parseNumberToStringWithComma(totalRating)}
            </Typography>
          </div>
          <Typography variant="headline" color="whiter" className="mt-24 header__title">
            {name || ''}
          </Typography>
          <div className="d-flex align-items-center mt-16">
            <div className="d-flex align-items-center mr-16">
              <Members color="#FFFFFF" className="mr-4"/>
              <Typography
                variant="subtext"
                color="whiter"
                className="ml-2"
              >
                {numberToStringWithSpaces(numberOfViews)}
              </Typography>
            </div>
            <div className="d-flex align-items-center ml-48">
              <Clock className="course-detail__clock-icon" />
              <Typography variant="subtext" color="whiter" className="ml-2">{minutesToFinish} мин.</Typography>
            </div>
            <div className="d-flex ml-48 align-items-center">
              <Typography variant="h2" color="main_50">
                +{rewardAmount || 0}
              </Typography>
              <CoinIcon width={14} height={14} className="ml-4 mt-2"/>
            </div>
            {createdAt && (
              <Typography variant="subtext" color="whiter" className="ml-48">
                Дата публикации: {moment(createdAt).format('DD.MM.YYYY')}
              </Typography>
            )}
          </div>
          <Button
            disabled={variant !== 'web'}
            className="header__button"
            to={curUrl}
          >
            Пройти курс
          </Button>
        </div>
      </div>
      {variant === 'admin' ? (
        <AdminInfo
          variant={variant}
          description={description}
          modules={modules}
          tags={tags}
          certificateImageUrl={certificateImageUrl}
          courseUuid={uuid || ''}
          courseId={id || -1}
          examStatus={examStatus}
          finalResultCertificateId={finalResultCertificateId}
        />
      ) : (
        <MainInfo
          courseId={id || -1}
          variant={variant}
          description={description}
          modules={modules}
          tags={tags}
          userRating={userRating}
          courseUuid={uuid || ''}
          certificateImageUrl={certificateImageUrl}
          className="course-detail__main-info--web"
          examStatus={examStatus}
          handleRateAdd={setNewRating}
          finalResultCertificateId={finalResultCertificateId}
        />
      )}
    </div>
  );
}

export default CourseDetail;
