import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import { getUserCourses, getAvailableCourses } from 'src/store/course/actions';

import AppContext from 'src/components/AppContext';
import Typography from 'src/components/atoms/Typography';
import Layout from 'src/components/organisms/Layout';
import Tabs from 'src/components/molecules/Tabs';
import MyGames from 'src/components/organisms/MyGames';
import Courses from 'src/pages/GamePages/Education/Courses';

import { EducationTypes } from 'src/pages/GamePages/Education/types';
import { LEARNING_TABS } from 'src/pages/GamePages/Education/consts';
import './index.scss';

function EducationPage(props: EducationTypes.IProps) {
  const {
    getUserCourses, userCourses, userCoursesTotal,
    getAvailableCourses, availableCourses, availableCoursesTotal,
  } = props;
  const location = useLocation();
  const { type } = queryString.parse(location.search);
  const { companyId } = useContext(AppContext);

  const userCoursesParams = {
    page: 1,
    pageSize: 3,
  };
  const availableCoursesParams = {
    page: 1,
    pageSize: 4,
  };
  const [activeTab, setActiveTab] = useState<string>(LEARNING_TABS[0].id);

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      window.scrollTo(0, 0);
      getUserCourses && getUserCourses(userCoursesParams);
      getAvailableCourses && getAvailableCourses(availableCoursesParams);
    },
    [companyId],
  );
  useEffect(
    () => {
      if (!type || type !== 'courses') return;
      setActiveTab(type);
    },
    [type],
  );

  const handleActiveTab = (id: string) => setActiveTab(id);

  const tabs = [
    <MyGames companyId={companyId ? +companyId : 0} />,
    <Courses
      userCourses={userCourses || []}
      userCoursesTotal={userCoursesTotal || 0}
      availableCourses={availableCourses || []}
      availableCoursesTotal={availableCoursesTotal || 0}
    />,
  ];

  return (
    <Layout className="education-page">
      <Typography className="py-48 grid" variant="headline">Обучение</Typography>
      <Tabs
        key={activeTab}
        pathname={location.pathname}
        tabOptions={LEARNING_TABS}
        activeId={activeTab}
        setActiveTabId={handleActiveTab}
        contentClassName="color_grey__bg"
        className="flex-grow-1"
      >
        {tabs.map((item, index) => (
          <div
            key={LEARNING_TABS[index].id}
            className="pt-32 pb-48"
          >
            {item}
          </div>
        ))}
      </Tabs>
    </Layout>
  );
}

export const mapStateToProps = (state: any) => ({
  userCourses: state.courseReducer.userCourses.data,
  userCoursesTotal: state.courseReducer.userCourses.total,
  availableCourses: state.courseReducer.availableCourses.data,
  availableCoursesTotal: state.courseReducer.availableCourses.total,
});

export const mapDispatchToProps = {
  getUserCourses,
  getAvailableCourses,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(EducationPage);
