import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import courseActions from 'src/store/course/actions';

import CoursesContainer from 'src/components/organisms/CoursesContainer';
import Layout from 'src/components/organisms/Layout';

import { UserCoursesTypes } from 'src/pages/GamePages/Course/UserCourses/types';
import { IOption } from 'src/components/molecules/Select/types';
import 'src/pages/GamePages/Course/UserCourses/index.scss';
import AppContext from 'src/components/AppContext';

function UserCoursesPage(props: UserCoursesTypes.IProps) {
  const { getUserCourses, userCourses, userCoursesTotal, userCoursesLoading } = props;
  const history = useHistory();
  const { companyId } = useContext(AppContext);
  const pageSize = 9;
  const queryParams = {
    pageSize,
    page: 1,
  };

  useEffect(
    () => {
      if (!companyId) return;
      getUserCourses && getUserCourses(queryParams);
    },
    [companyId],
  );

  const handleCoursesParams = (page: number, filter: IOption, tagIds: number[]) => {
    if (!companyId) return;
    if (page !== 1) {
      history.push(`${history.location}?page=${page}`);
    }
    getUserCourses && getUserCourses({
      ...queryParams,
      page,
      tagIds,
      ...(filter.value !== 'all' ? { [filter.value]: true } : {}),
    });
  };

  return (
    <Layout className="user-courses-page">
      <CoursesContainer
        title="Мои курсы"
        companyId={companyId}
        courses={userCourses || []}
        total={userCoursesTotal || 0}
        loading={userCoursesLoading || false}
        pageSize={pageSize}
        setCoursesParams={handleCoursesParams}
      />
    </Layout>
  );
}

export const mapStateToProps = (state: any) => ({
  userCourses: state.courseReducer.userCourses.data,
  userCoursesTotal: state.courseReducer.userCourses.total,
  userCoursesLoading: state.courseReducer.userCourses.loading,
});

export const mapDispatchToProps = {
  getUserCourses: courseActions.getUserCourses,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(UserCoursesPage);
