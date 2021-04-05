import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';

import { getModuleCardList, getCourseDetail } from 'src/store/course/actions';
import { startModuleTestComplete } from 'src/store/courseComplete/actions';

import Layout from 'src/components/organisms/Layout';
import Typography from 'src/components/atoms/Typography';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import ModuleCardList from 'src/components/molecules/ModuleCardList';
import Quiz from 'src/pages/GamePages/Course/Quiz';

import { ModuleTestTypes } from 'src/pages/GamePages/Course/Test/types';
import { getCurrentAndNextModule } from 'src/pages/GamePages/Course/Test/consts';
import { parseCardListItem } from 'src/pages/GamePages/Course/Lesson/parsers';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';
import 'src/pages/GamePages/Course/Test/index.scss';

function ModuleTest(props: ModuleTestTypes.IProps) {
  const {
    startModuleTestComplete, cardList = [],
    getModuleCardList, cardListLoading = false,
    course, getCourseDetail, testStatus,
  } = props;
  const { courseId: propsCourseId, moduleId: propsModuleId } = useParams();
  const courseId = propsCourseId ? +propsCourseId : -1;
  const moduleId = propsModuleId ? +propsModuleId : -1;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID);
  const [completeAttempt, setCompleteAttempt] = useState<CourseCompleteTypes.IRenderCompleteAttempt>();
  const [currentAndNextModules, setCurrentAndNextModules] = useState<ModuleTestTypes.ICurNextModule>();
  const isLastModule = currentAndNextModules?.currentModule?.isFinalModule || false;

  const breadCrumbs = [
    { label: 'Обучение', link: '/education' },
    { label: 'Курсы', link: '/education' },
    { label: course?.name || '', link: `/education/course/${courseId}` },
    { label: currentAndNextModules?.currentModule?.name || '',
      link: `/education/course/${courseId}/module/${moduleId}` },
    { label: 'Тест', link: '' },
  ];

  useEffect(
    () => {
      const employmentData = JSON.parse(localStorage.getItem('employment') || '');

      if (!employmentData || !employmentData.userId || !employmentData.companyId) return;
      const body = {
        employmentId: +employmentData.id,
        userId: +employmentData.userId,
        companyId: +employmentData.companyId,
      };
      startModuleTestComplete && startModuleTestComplete(courseId, moduleId, body, {
        onSuccess: (response: any) => {
          if (!response || !response.id || !Array.isArray(response.card_ids) || response.card_ids.length < 1) return;
          setCompleteAttempt({ id: response.id, cardIds: response.card_ids });
        },
      });
    },
    [],
  );

  useEffect(
    () => {
      if (!course || (course.id !== +courseId)) {
        getCourseDetail && getCourseDetail(companyId, +courseId);
      }
    },
    [],
  );

  useEffect(
    () => {
      if (!course || moduleId < 0) return;
      setCurrentAndNextModules(getCurrentAndNextModule(moduleId.toString(), course));
    },
    [course],
  );

  useEffect(
    () => {
      if (!companyId || moduleId < 0 || courseId < 0) return;
      getModuleCardList && getModuleCardList(companyId, moduleId);
    },
    [courseId, moduleId, companyId],
  );

  return (
    <Layout className="module-test" childrenClassName="d-flex flex-column">
      <div className="py-48 pb-24 grid d-flex flex-column">
        <Breadcrumb items={breadCrumbs} className="mb-32" />
        <Typography variant="headline">Тест</Typography>
      </div>
      <div className="color_grey__bg flex-grow-1 pt-32 pb-48">
        <div className="grid d-flex justify-content-between">
          <div className="module-test__block--left">
            <Quiz
              type="module"
              courseId={courseId}
              cardIds={completeAttempt?.cardIds || []}
              completeAttemptId={completeAttempt?.id}
              moduleId={moduleId}
              curModuleFirstCardId={(cardList && cardList.length > 0 && cardList[0]?.id) || undefined}
              isLastModule={isLastModule}
              nextModuleId={currentAndNextModules?.nextModule?.id}
            />
          </div>
          <ModuleCardList
            isTest
            testStatus={testStatus}
            type="card"
            data={Array.isArray(cardList) ? cardList.map(item => parseCardListItem(item)) : []}
            loading={cardListLoading}
            link={`/education/course/${courseId}/module/${moduleId}/`}
          />
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  cardList: state.courseReducer.moduleCardList.data?.cardList,
  testStatus: state.courseReducer.moduleCardList.data?.module?.testStatus,
  cardListLoading: state.courseReducer.moduleCardList.loading,
  employment: state.employmentReducer.employment.data,
  course: state.courseReducer.courseDetail.data,
});

const mapDispatchToProps = {
  startModuleTestComplete,
  getModuleCardList,
  getCourseDetail,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(ModuleTest);
