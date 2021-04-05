import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router';

import {
  coursesToDraft, coursesToPublish, deleteCourse,
  getCourseByAdmin, clearAdminCourse,
} from 'src/store/course/actions';

import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';

import Loader from 'src/components/atoms/Loader';
import ModalLoading from 'src/components/atoms/ModalLoading';
import Typography from 'src/components/atoms/Typography';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Modal from 'src/components/molecules/Modal';
import Layout from 'src/components/organisms/Layout';
import CourseDetail from 'src/components/organisms/CourseDetail';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import useNotification from 'src/components/molecules/Notification/useNotification';

import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { ACTIONS } from 'src/components/organisms/CourseDetail/Actions';
import { getActionText, getSaveButtonLabel } from 'src/pages/AdminPages/Course/consts';
import { CourseDetailPageTypes, Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';
import { CourseDetailTypes, Status } from 'src/store/course/types';
import { IActionData } from 'src/components/organisms/CourseDetail/types';
import { AdminRouterPaths } from 'src/core/enum';

function CourseDetailPage(props: CourseDetailPageTypes.IProps) {
  const {
    course: propsCourse, loading, getCourseByAdmin, clearAdminCourse,
    deleteCourse, coursesToPublish, coursesToDraft,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [selectedAction, setSelectedAction] = useState<Action>();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<CourseDetailTypes.IRenderProps>();
  const { id } = useParams();
  const history = useHistory();
  const notification = useNotification();
  const courseId = id ? +id : -1;

  useEffect(
    () => {
      if (courseId === -1) return;
      getCourseByAdmin && getCourseByAdmin(companyId, courseId);
      return () => {
        clearAdminCourse && clearAdminCourse();
      };
    },
    [courseId],
  );

  useEffect(
    () => {
      if (!propsCourse) return;
      setCourse(propsCourse);
    },
    [propsCourse],
  );

  const breadcrumbs = [
    { label: 'Контент', link: '/admin/content' },
    { label: 'Курсы', link: '/admin/content?type=courses' },
    { label: course?.name || '', link: '' },
  ];

  const onModeClick = (mode: Action) => {
    if (mode === Action.CHANGE) history.push(`/admin/content/course/course-edition/${id}`);
    setSelectedAction(mode);
  };

  const onDeleteClick = () => {
    setSelectedAction(undefined);
    setPageLoading(true);
    deleteCourse && deleteCourse(courseId, {
      onSuccess: () => {
        history.push(`/admin/${AdminRouterPaths.CONTENT}?type=courses`, { isCourseDeleted: true });
      },
      onError: () => {
      },
    });
  };

  const courseToPublish = () => {
    setPageLoading(true);
    coursesToPublish && coursesToPublish([courseId], {
      onSuccess: () => {
        setCourse(prevState => (prevState ? { ...prevState, status: Status.PUBLISHED } : undefined));
        setPageLoading(false);
        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно опубликован' });
      },
    });
  };

  const courseToDraft = () => {
    setPageLoading(true);
    coursesToDraft && coursesToDraft([courseId], {
      onSuccess: () => {
        setCourse(prevState => (prevState ? { ...prevState, status: Status.DRAFT } : undefined));
        setPageLoading(false);
        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно перещен в черновик' });
      },
    });
  };

  const onChangeStatusClick = (mode: Action) => {
    setSelectedAction(undefined);
    if (mode === Action.PUBLISH) {
      courseToPublish();
    } else {
      courseToDraft();
    }
  };

  return (
    <Layout
      isAdminRouting
      className={classNames('course-detail-page', { 'pointer-events-none': pageLoading })}
      childrenClassName="py-48 color_grey__bg"
    >
      <Breadcrumb
        items={breadcrumbs}
        className="grid"
      />
      {course && !loading && (
        <>
          <div className="d-flex mb-16 mt-32 grid">
            {ACTIONS(course.status === Status.DRAFT).map((e: IActionData, index: number) => (
              <div
                key={index}
                className="d-flex mr-32 cursor-pointer"
                onClick={() => onModeClick(e.mode)}
              >
                {e.iconJSX}
                <Typography variant="subtext" color={e.color} className="ml-4">
                  {e.title}
                </Typography>
              </div>
            ))}
          </div>
          <CourseDetail
            variant="admin"
            {...course}
            modules={course.modules}
          />
        </>
      )}
      {loading && (
        <Loader />
      )}
      {selectedAction !== undefined && (
        <Modal
          width={422}
          title={selectedAction === Action.DELETE ? 'Удаление курса' : 'Изменение статуса'}
          deleteLabel={selectedAction === Action.DELETE ? 'Удалить' : undefined}
          saveLabel={getSaveButtonLabel(selectedAction)}
          cancelLabel="Отмена"
          onCloseClick={() => setSelectedAction(undefined)}
          onDeleteClick={() => selectedAction === Action.DELETE && onDeleteClick()}
          onSaveClick={() => selectedAction !== Action.DELETE && onChangeStatusClick(selectedAction)}
        >
          <div className="mx-32">
            <Typography
              variant="text"
            >
              Вы действительно хотите
              {getActionText(selectedAction)}
              данный курс?
            </Typography>
          </div>
        </Modal>
      )}
      {pageLoading && (
        <ModalLoading />
      )}
    </Layout>
  );
}

export const mapStateToProps = (state: any) => ({
  course: state.courseReducer.courseByAdmin.data,
  loading: state.courseReducer.courseByAdmin.loading,
});

export const mapDispatchToProps = {
  getCourseByAdmin,
  deleteCourse,
  coursesToDraft,
  coursesToPublish,
  clearAdminCourse,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(CourseDetailPage));
