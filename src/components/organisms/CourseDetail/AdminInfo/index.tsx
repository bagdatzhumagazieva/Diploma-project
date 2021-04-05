import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import courseActions from 'src/store/course/actions';

import Button from 'src/components/atoms/Button';
import CourseDetailStatistics from 'src/components/organisms/CourseDetailStatistics';
import MainInfo from 'src/components/organisms/CourseDetail/MainInfo';
import CourseInfoContext from 'src/components/organisms/CourseDetail/AdminInfo/AdminInfoContext';

import { COURSE_TABS } from 'src/components/organisms/CourseDetail/AdminInfo/const';
import { AdminInfoTypes } from 'src/components/organisms/CourseDetail/AdminInfo/types';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { convertToGroupUsers, STATISTICS_STATE_DEFAULT_VALUES } from 'src/components/organisms/CourseDetailStatistics/const';
import { CourseStatisticsTypes } from 'src/components/organisms/CourseDetailStatistics/types';
import 'src/components/organisms/CourseDetail/AdminInfo/index.scss';

function AdminInfo(props: AdminInfoTypes.IProps) {
  const {
    description, tags, modules, certificateImageUrl, variant,
    courseUuid, getCourseStatistics, courseId,
    courseStatistics, examStatus,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [selectedTab, setSelectedTab] = useState<string>(COURSE_TABS[0].value);
  const [statisticsParams, setStatisticsParams] =
    useState<CourseStatisticsTypes.IStatisticsState>(STATISTICS_STATE_DEFAULT_VALUES);
  const value = { statisticsParams, setStatisticsParams };
  const statisticsDefaultParams = {
    companyId,
    isGroupsImportant: undefined,
    isUserImportant: undefined,
    isAverageImportant: undefined,
  };

  useEffect(
    () => {
      getCourseStatistics && getCourseStatistics(courseId, { ...statisticsDefaultParams, ...statisticsParams });
    },
    [statisticsParams],
  );

  return (
    <CourseInfoContext.Provider value={value}>
      <div className="admin-info">
        <div className="admin-info__tabs">
          {COURSE_TABS.map(tab => (
            <Button
              key={tab.value}
              variant={selectedTab === tab.value ? 'textmed' : 'text'}
              classNames={[
                'tabs__button px-24 py-12',
                { 'tabs__button--active': selectedTab === tab.value },
              ]}
              onClick={() => setSelectedTab(tab.value)}
            >
              {tab.title}
            </Button>
          ))}
        </div>
        {selectedTab === COURSE_TABS[0].value && (
          <MainInfo
            courseId={courseId}
            variant={variant}
            description={description}
            tags={tags}
            modules={modules}
            certificateImageUrl={certificateImageUrl}
            courseUuid={courseUuid}
            examStatus={examStatus}
          />
        )}
        {selectedTab === COURSE_TABS[1].value && (
            <CourseDetailStatistics
              users={convertToGroupUsers(courseStatistics?.users)}
              average={courseStatistics?.average || []}
              pieChartData={courseStatistics?.groups || []}
            />
        )}
      </div>
    </CourseInfoContext.Provider>
  );
}

export const mapStateToProps = (state: any) => ({
  courseStatistics: state.courseReducer.courseStatistics.data,
});

export const mapDispatchToProps = {
  getCourseStatistics: courseActions.getCourseStatistics,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(AdminInfo);
