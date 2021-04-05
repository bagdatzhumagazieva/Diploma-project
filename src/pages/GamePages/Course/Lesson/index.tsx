import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import queryString from 'query-string';

import Breadcrumb from 'src/components/atoms/BreadCrumb';
import ModuleCardList from 'src/components/molecules/ModuleCardList';
import CardView from 'src/components/organisms/CardView';
import Layout from 'src/components/organisms/Layout';
import Modal from 'src/components/molecules/Modal';
import ModalLoading from 'src/components/atoms/ModalLoading';
import ModuleTestRules from 'src/pages/GamePages/Course/Lesson/ModuleTestRules';

import { LessonPageTypes } from 'src/pages/GamePages/Course/Lesson/types';
import { parseCardViewData, parseCardListItem } from 'src/pages/GamePages/Course/Lesson/parsers';
import { finishCardComplete, startCardComplete } from 'src/store/courseComplete/actions';
import { getCourseDetail, getModuleCardList } from 'src/store/course/actions';
import { DEFAULT_MODULE_SHORT_DATA } from 'src/store/course/consts';
import { CourseDetailTypes } from 'src/store/course/types';
import 'src/pages/GamePages/Course/Lesson/index.scss';

function LessonPage(props: LessonPageTypes.IProps) {
  const {
    getModuleCardList, cardList: propsCardList = [], cardListLoading,
    startCardComplete, finishCardComplete, courseLoading,
    module = DEFAULT_MODULE_SHORT_DATA, course, getCourseDetail,
  } = props;
  const { testStatus, name } = module;
  const history = useHistory();
  const { location } = history;
  const { test } = queryString.parse(location.search);
  const { moduleId: propsModuleId, cardId: propsCardId, courseId: propsCourseId } = useParams();
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const moduleId = propsModuleId ? +propsModuleId : -1;
  const cardId = propsCardId ? +propsCardId : -1;
  const courseId = propsCourseId ? +propsCourseId : -1;
  const [curIndex, setCurIndex] = useState(-1);
  const [cardCompleteData, setCardCompleteData] = useState<LessonPageTypes.ICardCompleteData>();
  const [showTestModal, setShowTestModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cardList, setCardList] = useState<CourseDetailTypes.ICardDetailRender[]>([]);
  const cardIndex = test ? (Array.isArray(test) ? +test[0] : +test) : cardList.findIndex(item => item.id === cardId);
  const card = (curIndex >= 0 && cardList.length > 0) ? parseCardViewData(cardList[curIndex]) : undefined;

  const onEndClick = () => {
    if (courseId < 0 || moduleId < 0 || !cardCompleteData) return;
    // don't finish card if it already finished
    if (!cardCompleteData.isFinished) {
      setLoading(true);
      finishCardComplete && finishCardComplete(courseId, moduleId, cardCompleteData.id, {
        onSuccess: () => {
          moveToTheNextCardOrStartTest();
          setLoading(false);
        },
        onError: () => {
          // todo show error
          setLoading(false);
        },
      });
    } else {
      moveToTheNextCardOrStartTest();
    }
  };

  const moveToTheNextCardOrStartTest = () => {
    if (cardIndex < 0 || cardList.length < 1) return;
    const finishedCard: CourseDetailTypes.ICardDetailRender  = { ...cardList[cardIndex], isFinished: true };
    if (cardIndex === cardList.length - 1) {
      setShowTestModal(true);
      setCardList(prevState => [...prevState.slice(0, cardIndex), finishedCard]);
    } else {
      const newCurCard: CourseDetailTypes.ICardDetailRender  = { ...cardList[cardIndex + 1], isCurrent: true };
      setCardList((prevState) => {
        return [...prevState.slice(0, cardIndex), finishedCard, newCurCard, ...prevState.slice(cardIndex + 2)];
      });
      history.push(`/education/course/${courseId}/module/${moduleId}/card/${cardList[cardIndex + 1].id}?test=${cardIndex + 1}`);
    }
  };

  const moveToTheTest = () => {
    history.push(`/education/course/${courseId}/module/${moduleId}/test`);
  };

  const breadCrumbs = [
    { label: 'Обучение', link: '/education' },
    { label: 'Курсы', link: '/education' },
    { label: course?.name || '', link: `/education/course/${courseId}` },
    { label: name, link: `/education/course/${courseId}/module/${moduleId}` },
    { label: card?.name || '', link: '' },
  ];

  useEffect(
    () => {
      if (course && course.id === courseId) return;
      getCourseDetail && getCourseDetail(companyId, courseId);
    },
    [course, courseId, getCourseDetail],
  );

  useEffect(
    () => {
      getModuleCardList && getModuleCardList(companyId, moduleId);
    },
    [moduleId],
  );

  useEffect(
    () => {
      if (!Array.isArray(propsCardList)) return;
      setCardList(propsCardList);
    },
    [propsCardList],
  );

  useEffect(
    () => {
      if (cardId < 0 || !Array.isArray(cardList)) return;
      if (test) {
        setCurIndex(Array.isArray(test) ? +test[0] : +test);
      } else {
        setCurIndex(cardList.findIndex(item => item.id === cardId));
      }
    },
    [cardId, cardList],
  );

  useEffect(
    () => {
      if (!companyId || moduleId < 0 || courseId < 0 || cardId < 0) return;

      startCardComplete && startCardComplete(companyId, courseId, moduleId, cardId, {
        onSuccess: (response: any) => {
          if (!response.id) return;
          setCardCompleteData({ id: response.id, isFinished: !!response.finished_at });
        },
      });
    },
    [history.location.pathname],
  );

  return (
    <Layout className="lesson-page color_grey__bg" childrenClassName="py-48">
      <div className="grid">
        <Breadcrumb
          items={breadCrumbs}
          itemsLoading={courseLoading || cardListLoading}
          className="mb-32"
        />
        <div className="d-flex justify-content-between">
          <CardView
            isShowCardImage
            card={card}
            type="web"
            className="card-view"
            loading={cardListLoading}
            onEndClick={onEndClick}
          />
          <ModuleCardList
            type="card"
            data={Array.isArray(cardList) ? cardList.map(item =>  parseCardListItem(item)) : []}
            loading={cardListLoading || false}
            curId={cardId}
            link={`/education/course/${courseId}/module/${moduleId}/`}
            testStatus={testStatus}
          />
        </div>
      </div>
      {showTestModal && (
        <Modal
          withSaveBtnArrow
          title="Инструкция к модальному тесту"
          cancelLabel="Вернуться назад"
          saveLabel="Начать тест"
          withCloseIcon={false}
          width={712}
          onCloseClick={() => setShowTestModal(false)}
          onSaveClick={moveToTheTest}
        >
          <ModuleTestRules
            questionsTotal={cardList.length}
          />
        </Modal>
      )}
      {loading &&  <ModalLoading />}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  cardList: state.courseReducer.moduleCardList.data.cardList,
  cardListLoading: state.courseReducer.moduleCardList.loading,
  module: state.courseReducer.moduleCardList.data.module,
  course: state.courseReducer.courseDetail.data,
  courseLoading: state.courseReducer.courseDetail.loading,
});

const mapDispatchToProps = {
  getModuleCardList,
  startCardComplete,
  finishCardComplete,
  getCourseDetail,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(LessonPage);
