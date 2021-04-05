import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';

import { getCourseDetail, getCourseModule, getModuleCardList } from 'src/store/course/actions';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';

import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import Layout from 'src/components/organisms/Layout';
import ModuleData from 'src/pages/GamePages/Course/Module/ModuleData';
import CardGroup from 'src/pages/GamePages/Course/Module/CardGroup';
import ModuleCardList from 'src/components/molecules/ModuleCardList';
import Breadcrumb from 'src/components/atoms/BreadCrumb';

import { parseCardListItem } from 'src/pages/GamePages/Course/Lesson/parsers';
import { ModulePageTypes } from 'src/pages/GamePages/Course/Module/types';
import { MODULE_FILTER_OPTIONS } from 'src/pages/GamePages/Course/Module/consts';
import { IOption } from 'src/components/molecules/Select/types';
import 'src/pages/GamePages/Course/Module/index.scss';

function ModulePage(props: ModulePageTypes.IProps) {
  const {
    courseModule, getCourseModule, getModuleCardList, testStatus,
    cardList, cardListLoading, course, getCourseDetail,
  } = props;
  const [selectedFilterOption, setSelectedFilterOption] = useState<IOption>(MODULE_FILTER_OPTIONS[0]);
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID);

  const { moduleId: propsModuleId, courseId: propsCourseId } = useParams();
  const moduleId = propsModuleId ? +propsModuleId : -1;
  const courseId = propsCourseId ? +propsCourseId : - 1;

  useEffect(
    () => {
      if (!moduleId || moduleId < 0) return;
      getCourseModule && getCourseModule(companyId, moduleId);
      getModuleCardList && getModuleCardList(companyId, moduleId);
    },
    [moduleId],
  );

  useEffect(
    () => {
      if (!course || course.id !== +courseId) {
        getCourseDetail && getCourseDetail(companyId, +courseId);
      }
    },
    [course],
  );

  const breadcrumbs = [
    { label: 'Обучение', link: '/education/?type=courses' },
    { label: 'Курсы', link: '/education/?type=courses' },
    { label: course?.name || '', link: `/education/course/${courseId}` },
    { label: courseModule?.name || '', link: '' },
  ];

  return (
    <Layout className="module-page">
      <div className="module-page__header grid d-flex flex-column pt-48">
        <Breadcrumb
          items={breadcrumbs}
          className="grid"
        />
        <div className="d-flex justify-content-between align-items-center pt-32 pb-24">
          <Typography variant="headline" className="mr-auto">Модуль {courseModule?.orderIndex || 0}</Typography>
          <Typography
            variant="subtext"
            className="mr-8"
            color="grey_additional_2"
          >
            Фильтрация:
          </Typography>
          <Select
            staticWidth
            classNames="module-page__filter"
            options={MODULE_FILTER_OPTIONS}
            selectedOption={selectedFilterOption}
            setSelectedOption={setSelectedFilterOption}
          />
        </div>
      </div>
      <div className="module-page__content color_grey__bg flex-grow-1 pt-32 pb-48">
        <div className="grid">
          <Typography variant="h1" className="mb-24">{courseModule?.name || ''}</Typography>
          <div className="d-flex justify-content-between">
            <div className="module-page__block-left">
              <ModuleData description={courseModule?.description || ''} imageUrl={courseModule?.imageUrl} />
              <CardGroup
                moduleId={moduleId}
                courseId={courseId}
                cards={courseModule?.cards || []}
              />
            </div>
            <ModuleCardList
              type="card"
              curId={moduleId}
              testStatus={testStatus}
              data={Array.isArray(cardList) ? cardList.map(item =>  parseCardListItem(item)) : []}
              link={`/education/course/${courseId}/module/${moduleId}/`}
              loading={cardListLoading || false}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  cardList: state.courseReducer.moduleCardList.data.cardList,
  cardListLoading: state.courseReducer.moduleCardList.loading,
  testStatus: state.courseReducer.moduleCardList.data?.module?.testStatus,
  courseModule: state.courseReducer.courseModule.data,
  course: state.courseReducer.courseDetail.data,
});

const mapDispatchToProps = {
  getCourseDetail,
  getCourseModule,
  getModuleCardList,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(ModulePage);
