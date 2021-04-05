import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { createRating } from 'src/store/rate/actions';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Rate from 'src/components/atoms/Rate';
import CardModule from 'src/components/molecules/Cards/CardModule';
import ImageCertificate from 'src/components/atoms/ImageCertificate';
import Comments from 'src/components/organisms/Comments/index';
import CardFinalExam from 'src/components/organisms/CourseDetail/MainInfo/CardFinalExam';

import { ReactComponent as OvalPointsIcon } from 'src/assets/img/icons/oval-points.svg';
import { MainInfoTypes } from 'src/components/organisms/CourseDetail/MainInfo/types';
import { COURSE_ADDITION_INFO } from 'src/components/organisms/CourseDetail/AdminInfo/const';
import { ProgressStatus } from 'src/store/course/types';
import 'src/components/organisms/CourseDetail/MainInfo/index.scss';

function MainInfo(props: MainInfoTypes.IProps) {
  const {
    modules, certificateImageUrl, tags, handleRateAdd,
    description, className, variant, courseUuid,
    courseId, examStatus, createRating, userRating, finalResultCertificateId,
  } = props;
  const [rate, setRate] = useState<{ savedVal?: number, newVal?: number }>();

  const onRate = () => {
    if (!rate?.newVal) return;

    const bodyParams = {
      entityType: 'COURSE',
      entityUuid: courseUuid,
      value: rate.newVal,
    };
    createRating && createRating(bodyParams, {
      onSuccess: () => {
        setRate(prevState => ({ ...prevState, savedVal: prevState?.newVal }));
        rate.newVal && handleRateAdd && handleRateAdd(rate.newVal);
      },
    });
  };

  const onChangeRate = (newVal: number) => {
    setRate(prevState => ({ ...prevState, newVal }));
  };

  useEffect(
    () => {
      setRate(prevState => ({ ...prevState, savedVal: userRating }));
    },
    [userRating],
  );

  return (
    <div
      className={classNames('main-info d-flex justify-content-between py-48 px-64', className)}
    >
      <div className="main-info__left d-flex flex-column">
        <Typography variant="h2">
          Описание
        </Typography>
        <Typography variant="subtext" className="main-info__description mt-16">
          {description || 'Здесь будет описание курса'}
        </Typography>
        <Typography variant="h2" className="mt-32 mb-16">
          Содержание курса:
        </Typography>
        {modules && (
          <div>
            {modules.map((item, index) => (
              <CardModule
                key={`${index}-${item.name}`}
                index={index}
                id={item.id}
                courseId={courseId}
                status={item.status || ProgressStatus.NOT_STARTED}
                testStatus={item.testStatus || ProgressStatus.NOT_STARTED}
                variant={variant}
                title={item.name}
                cards={item.cards}
                className="mb-24"
              />
            ))}
          </div>
        )}
        <CardFinalExam
          examStatus={examStatus}
          courseId={courseId}
          variant={variant}
          certificateId={finalResultCertificateId}
        />

        <div className="mt-24 mb-48 d-flex flex-column">
          <Typography variant="textmed">
            Понравилась ли вам данная запись? Поставьте оценку
          </Typography>
          <Rate
            disabled={variant !== 'web' || !!rate?.savedVal}
            className="mt-16"
            onChange={onChangeRate}
            value={rate?.savedVal}
          />
          {rate?.savedVal ?
            <Typography variant="text" color="green" className="mt-24">
              Благодарим за вашу оценку!
            </Typography> :
            rate?.newVal ?
              <Button
                variant="textmed"
                className="px-32 mt-24 align-self-start"
                onClick={onRate}
              >
                Отправить
              </Button>
              : ''
          }

          <Typography variant="subtext" color="grey_additional_2" className="mb-2 mt-32">
            Тэги:
          </Typography>
          {tags && tags.length > 0 && (
            <div className="mt-4">
              {tags.map(item => (
                <Typography
                  key={`${item.name}-${item.id}`}
                  variant="subtext"
                  className="mr-16 word-break_break-all"
                  color="main_50"
                >
                  #{item.name}
                </Typography>
              ))}
            </div>
          )}
          <Comments
            type="COURSE"
            uuid={courseUuid}
            className="mt-32"
          />
        </div>
      </div>
      <div className="main-info__right">
        {COURSE_ADDITION_INFO.map((e, i) => (
          <div className="d-flex flex-column" key={`course-addition-info-${i}`}>
            {i !== 0 && <OvalPointsIcon className="ml-32 mt-16 mb-16"/>}
            <div className="main-info__additional-info d-flex align-items-center px-16">
              {e.icon}
              <Typography variant="text" className="ml-16">
                {e.title}
              </Typography>
            </div>
          </div>
        ))}
        <div className="pos_relative mt-48">
          <ImageCertificate bgImage={certificateImageUrl || undefined} />
          <Typography variant="subtext" className="mt-16">
            Вознаграждается при успешном окончании курса
          </Typography>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  createRating,
};

export default connect<any>(
  null,
  mapDispatchToProps,
)(MainInfo);
