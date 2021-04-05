import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import courseActions from 'src/store/course/actions';

import CoursesContainer from 'src/components/organisms/CoursesContainer';
import Layout from 'src/components/organisms/Layout';

import { IOption } from 'src/components/molecules/Select/types';
import 'src/pages/GamePages/Course/UserCourses/index.scss';
import { AvailableCoursesPageTypes } from 'src/pages/GamePages/Course/AvailableCourses/types';
import AppContext from 'src/components/AppContext';

function AvailableCoursesPage(props: AvailableCoursesPageTypes.IProps) {
  const { availableCourses, availableCoursesTotal, availableCoursesLoading, getAvailableCourses } = props;
  const { companyId } = useContext(AppContext);
  const pageSize = 9;
  const queryParams = {
    pageSize,
    page: 1,
  };

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      getAvailableCourses && getAvailableCourses(queryParams);
    },
    [companyId],
  );

  const handleCoursesParams = (page: number, filter: IOption, tagIds: number[]) => {
    if (typeof companyId !== 'number') return;
    getAvailableCourses && getAvailableCourses({
      ...queryParams,
      page,
      tagIds,
      ...(filter.value !== 'all' ? { [filter.value]: true } : {}),
    });
  };

  return (
    <Layout className="available-courses">
      <CoursesContainer
        title="Доступные курсы"
        companyId={companyId}
        courses={availableCourses || []}
        total={availableCoursesTotal || 0}
        loading={availableCoursesLoading || false}
        pageSize={pageSize}
        setCoursesParams={handleCoursesParams}
      />
    </Layout>
  );
}

export const mapStateToProps = (state: any) => ({
  availableCourses: state.courseReducer.availableCourses.data,
  availableCoursesTotal: state.courseReducer.availableCourses.total,
  availableCoursesLoading: state.courseReducer.availableCourses.loading,
});

export const mapDispatchToProps = {
  getAvailableCourses: courseActions.getAvailableCourses,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(AvailableCoursesPage);
