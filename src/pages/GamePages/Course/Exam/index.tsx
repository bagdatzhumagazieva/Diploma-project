import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';

import { getCourseDetail } from 'src/store/course/actions';
import { getModuleList } from 'src/store/module/actions';
import { startCourseTestComplete } from 'src/store/courseComplete/actions';

import Layout from 'src/components/organisms/Layout';
import Typography from 'src/components/atoms/Typography';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import ModuleCardList from 'src/components/molecules/ModuleCardList';

import Quiz from 'src/pages/GamePages/Course/Quiz';
import 'src/pages/GamePages/Course/Test/index.scss';
import { ExamTypes } from 'src/pages/GamePages/Course/Exam/types';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';
import { getCourseFistModuleData } from 'src/pages/GamePages/Course/Exam/consts';

function Exam(props: ExamTypes.IProps) {
  const {
    getModuleList, moduleList, course, getCourseDetail, employment,
    startCourseTestComplete,
  } = props;
  const { courseId: propsCourseId } = useParams();
  const courseId = propsCourseId ? +propsCourseId : -1;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID);
  const [completeAttempt, setCompleteAttempt] = useState<CourseCompleteTypes.IRenderCompleteAttempt>();
  const { firstModuleId, firstCardId } = getCourseFistModuleData(moduleList);

  const breadCrumbs = [
    { label: 'Обучение', link: '/education' },
    { label: 'Курсы', link: '/education' },
    { label: course?.name || '', link: `/education/course/${courseId}` },
    { label: 'Финальный экзамен', link: '' },
  ];

  useEffect(
    () => {
      if (!employment || !employment.userId || !employment.companyId) return;
      const body = {
        employmentId: employment.id,
        userId: +employment.userId,
        companyId: +employment.companyId,
      };

      startCourseTestComplete && startCourseTestComplete(courseId, body, {
        onSuccess: (response: any) => {
          if (!response || !response.id || !Array.isArray(response.card_ids) || response.card_ids.length < 1) return;
          setCompleteAttempt({ id: response.id, cardIds: response.card_ids });
        },
      });
    },
    [employment],
  );

  useEffect(
    () => {
      if (!course || course.id !== +courseId) {
        getCourseDetail && getCourseDetail(companyId, +courseId);
      }
    },
    [],
  );

  useEffect(
    () => {
      if (!companyId || courseId < 0) return;
      getModuleList && getModuleList(companyId, courseId);
    },
    [courseId, companyId],
  );

  return (
    <Layout className="module-test" childrenClassName="d-flex flex-column">
      <div className="py-48 pb-24 grid d-flex flex-column">
        <Breadcrumb items={breadCrumbs} className="mb-32" />
        <Typography variant="headline">Финальный экзамен</Typography>
      </div>
      <div className="color_grey__bg flex-grow-1 pt-32 pb-48">
        <div className="grid d-flex justify-content-between">
          <div className="module-test__block--left">
            <Quiz
              type="course"
              courseId={courseId}
              cardIds={completeAttempt?.cardIds || []}
              moduleId={firstModuleId}
              curModuleFirstCardId={firstCardId}
              completeAttemptId={completeAttempt?.id}
            />
          </div>
          <ModuleCardList
            isTest
            type="module"
            data={moduleList || []}
            loading={false}
            testStatus={course?.examStatus}
            link={''}
          />
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  moduleList: state.moduleReducer.moduleList.data,
  testStatus: state.courseReducer.moduleCardList.data.testStatus,
  employment: state.employmentReducer.employment.data,
  course: state.courseReducer.courseDetail.data,
});

const mapDispatchToProps = {
  getCourseDetail,
  getModuleList,
  startCourseTestComplete,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(Exam);
