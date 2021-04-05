import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';

import courseActions from 'src/store/course/actions';

import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Layout from 'src/components/organisms/Layout';
import CourseDetail from 'src/components/organisms/CourseDetail';

import { CoursePageTypes } from 'src/pages/GamePages/Course/Course/types';

function CoursePage(props: CoursePageTypes.IProps) {
  const { course, loading, getCourseDetail, clearCourseDetail } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const { id } = useParams();
  const courseId = id ? +id : -1;

  useEffect(
    () => {
      if (courseId < 0) return;
      getCourseDetail && getCourseDetail(companyId, courseId);
      return () => {
        clearCourseDetail && clearCourseDetail();
      };
    },
    [courseId, companyId],
  );

  const breadcrumbs = [
    { label: 'Обучение', link: '/education/?type=courses' },
    { label: 'Курсы', link: '/education/?type=courses' },
    { label: course?.name || '', link: '' },
  ];

  return (
    <Layout
      className="course-page"
      childrenClassName="py-48 color_grey__bg"
    >
      <Breadcrumb
        items={breadcrumbs}
        itemsLoading={loading}
        className="mb-32 grid"
      />
      <CourseDetail
        variant="web"
        loading={loading}
        {...course}
      />
    </Layout>
  );
}

export const mapStateToProps = (state: any) => ({
  course: state.courseReducer.courseDetail.data,
  loading: state.courseReducer.courseDetail.loading,
});

export const mapDispatchToProps = {
  getCourseDetail: courseActions.getCourseDetail,
  clearCourseDetail: courseActions.clearCourseDetail,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(CoursePage);
