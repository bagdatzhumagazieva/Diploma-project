import React from 'react';
import moment from 'moment';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import IconExcel from 'src/assets/img/icons/excel.png';
import { ReactComponent as ClockIcon } from 'src/assets/img/icons/clock.svg';
import { ReactComponent as UsersIcon } from 'src/assets/img/icons/users.svg';
import { ReportCardTypes } from './types';
import './index.scss';
import statisticsActions from 'src/store/statistics/actions';
import { connect } from 'react-redux';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { Link } from 'react-router-dom';
import { getColorForPercentage } from 'src/components/atoms/Cards/CardBranch';

function ReportCard(props: ReportCardTypes.IProps) {
  const {
    reportType,
    appearance = 'default',
    id,
    name,
    createdAt,
    imageThumbnail,
    minutesToFinish,
    numberOfViews,
    percentAvg,
    type,
    downloadedPerformanceLoading,
    downloadPerformance,
    downloadedPerformanceWithStart,
    downloadErrorReport,
    downloadedErrorReportLoading,
    downloadedErrorReportWithStart,
  } = props;

  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const onDownloadClick = () => {
    if (reportType === 'performance') {
      downloadPerformance({
        companyId,
        type,
        entityId: id,
      });
    } else if (reportType === 'error') {
      downloadErrorReport({
        companyId,
        type,
        entityId: id,
      });
    }
  };

  if (appearance === 'wide') {
    return <div className="report-card--wide">
      <div className="report-card--wide__header">
        <Image
          src={imageThumbnail}
          alt="report image"
          className="report-card--wide__img"
        />
        <div className="m-8">
          <Typography variant="subtext" className="pb-2">
            {name}
          </Typography>
          <Typography variant="xsmall" className="pt-4 d-block" color="grey_additional_1">
            {type === 'GAME' ? 'Игра' : type === 'COURSE' ? 'Курс' : type}
          </Typography>
        </div>

        <Typography
          variant="h1"
          className="report-card--wide__percentage"
          style={{
            background: getColorForPercentage(percentAvg),
          }}
        >
          {percentAvg}%
        </Typography>

        <Button
          className="button--type-additional report-card--wide__download"
          loading={
            downloadedPerformanceLoading && id === downloadedPerformanceWithStart.entityId ||
            downloadedErrorReportLoading && id === downloadedErrorReportWithStart.entityId
          }
          onClick={onDownloadClick}
        >
          <Image
            src={IconExcel}
            alt="excel icon"
            className="excel-icon"
          />
        </Button>
      </div>
      <div className="report-card--wide__footer">
        <ClockIcon className="mr-4" />
        <Typography
          variant="subtext"
          color="grey_additional_1"
          className="ml-2"
        >
          {minutesToFinish} мин.
        </Typography>
        <UsersIcon color="#7A7B82" className="mr-4 ml-32" />
        <Typography
          variant="subtext"
          color="grey_additional_1"
          className="ml-2"
        >
          {numberOfViews}
        </Typography>
        <Typography variant="subtextmed" className="ml-auto" color="grey_additional_1">
          {moment(createdAt).format('DD.MM.YYYY')}
        </Typography>
      </div>
    </div>;
  }

  return (
    <div className="report-card">
      <div className="report-card__header">
        <Typography variant="subtext" className="report-card__type">
          {type === 'GAME' ? 'Игра' : type === 'COURSE' ? 'Курс' : type}
        </Typography>
        <Typography variant="subtext">
          {moment(createdAt).format('DD.MM.YYYY')}
        </Typography>
      </div>
      <div className="report-card__content">
        <Image
          src={imageThumbnail}
          alt="report image"
          className="report-card__img"
        />
        <div className="report-card__content__info">
          <Link to={`/admin/reports/${reportType}/${id}/${type}`}>
            <Typography variant="text" className="color_main_50">
              {name}
            </Typography>
          </Link>

          <div className="d-flex align-items-center mt-12">
            <div className="d-flex align-items-center">
              <ClockIcon className="mr-4" />
              <Typography
                variant="subtext"
                color="grey_additional_1"
                className="ml-2"
              >
                {minutesToFinish} мин.
              </Typography>
            </div>
            <div className="d-flex align-items-center ml-32">
              <UsersIcon color="#7A7B82" className="mr-4" />
              <Typography
                variant="subtext"
                color="grey_additional_1"
                className="ml-2"
              >
                {numberOfViews}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="report-card__footer">
        <Button
          className="button--type-additional report-card__download"
          loading={downloadedPerformanceLoading && id === downloadedPerformanceWithStart.entityId}
          onClick={onDownloadClick}
        >
          <Image
            src={IconExcel}
            alt="excel icon"
            className="excel-icon"
          />
          <Typography variant="textmed" className="excel-text">
            Скачать отчет
          </Typography>
        </Button>
        <Typography
          variant="textmed"
          className="report-card__percentage"
          style={{
            background: getColorForPercentage(percentAvg, .2),
            color: getColorForPercentage(percentAvg),
          }}
        >
          {percentAvg}%
        </Typography>
      </div>
    </div>
  );
}
const mapStateToProps = (state: any) => ({
  downloadedPerformanceLoading: state.statisticsReducer.downloadedPerformance.loading,
  downloadedPerformanceWithStart: state.statisticsReducer.downloadedPerformance.withStart,
  downloadedErrorReportLoading: state.statisticsReducer.downloadedErrorReport.loading,
  downloadedErrorReportWithStart: state.statisticsReducer.downloadedErrorReport.withStart,
});

const mapDispatchToProps = {
  downloadPerformance: statisticsActions.downloadPerformance,
  downloadErrorReport: statisticsActions.downloadErrorReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportCard);
