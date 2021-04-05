import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import queryString from 'query-string';

import { getAdminTasks, deleteTask } from 'src/store/task/actions';
import { deleteCourses, getCoursesByAdmin } from 'src/store/course/actions';

import Typography from 'src/components/atoms/Typography';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import Button from 'src/components/atoms/Button';
import Tabs from 'src/components/molecules/Tabs';
import { TableWithCheckboxes } from 'src/components/molecules/Table';
import Modal from 'src/components/molecules/Modal';
import Layout from 'src/components/organisms/Layout';
import ContentCourses from 'src/components/organisms/ContentComponents/ContentCourses';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import useNotification from 'src/components/molecules/Notification/useNotification';
import ModalLoading from 'src/components/atoms/ModalLoading';

import { CONTENT_TABS } from 'src/pages/AdminPages/Content/consts';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { TaskTypes } from 'src/store/task/types';
import { ContentPageTypes } from './types';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import CompanyEmployees from 'src/pages/AdminPages/Content/SystemUsers/index';
import CompanyGroup from 'src/pages/AdminPages/Content/Groups/index';
import { GroupTypes } from 'src/store/group/types';
import 'src/pages/AdminPages/Content/index.scss';

function ContentPage(props: ContentPageTypes.IProps) {
  const { deleteTask, getAdminTasks, deleteCourses, getCoursesByAdmin } = props;

  const history = useHistory<{ isCourseDeleted: boolean }>();
  const { location } = history;
  const { pathname, state } = location;
  const { type } = queryString.parse(location.search);
  const [activeTab, setActiveTab] = useState<string>(CONTENT_TABS[0].id);
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [selectedData, setSelectedData] = useState<ContentPageTypes.ISelectedData>();
  const [taskData, setTaskData] = useState<TaskTypes.IRenderAdminExercise[]>([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [groupData, setGroupData] = useState<GroupTypes.IRenderProps[]>([]);
  const notification = useNotification();

  const addNotification = (type: NotificationType, description: string) => {
    notification.add(
      {
        type,
        description,
        withIcon: true,
        duration: 4000,
        size: 'small',
        width: '600px',
      });
  };

  if (window.performance) {
    if (performance.navigation.type === 1) {
      if (location.state) {
        history.replace({ ...history.location, state: undefined });
      }
    }
  }

  useEffect(
    () => {
      if (!type) return;
      setActiveTab(Array.isArray(type) ? type[0] : type);
    },
    [type],
  );

  useEffect(
    () => {
      window.scrollTo(0, 0);
      if (state && state.isCourseDeleted) {
        addNotification(NotificationType.Success, 'Курс успешно удален');
      }
    },
    [],
  );

  const handleActiveTab = (id: string) => {
    setSelectedData(undefined);
    if (id === CONTENT_TABS[0].id) {
      setTaskData(prevState => prevState.map(item => ({ ...item, isChecked: false })));
    }
    setActiveTab(id);
  };

  const onCloseClick = () => {
    if (selectedData && selectedData.type === 'task') {
      setTaskData(taskData.map(
        (n: TableWithCheckboxes<TaskTypes.IRenderAdminExercise>) => n.isChecked ? { ...n, isChecked: false } : n));
    }
    setSelectedData(undefined);
  };

  const onDeleteTasks = (ids: number[]) => {
    setPageLoading(true);
    setSelectedData(undefined);
    deleteTask && deleteTask(ids, {
      onSuccess: () => {
        const timeId = setTimeout(
          () => {
            clearTimeout(timeId);
            const params =  {
              page: 1,
              page_size: 10,
              company_id: companyId,
              keyword: '',
            };
            getAdminTasks && getAdminTasks(params, {
              onSuccess: () => {
                setPageLoading(false);
                notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Задания успешно удалены' });
              },
            });
          },
          1500,
        );
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const onDeleteCourses = (ids: number[]) => {
    setPageLoading(true);
    setSelectedData(undefined);
    deleteCourses && deleteCourses(ids, {
      onSuccess: () => {
        // Data in the search service does not have enough time to update
        const timeId = setTimeout(
          () => {
            const params = {
              page: 1,
              pageSize: 10,
            };
            getCoursesByAdmin && getCoursesByAdmin(companyId, params, {
              onSuccess: () => {
                setPageLoading(false);
                notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курсы успешно удалены' });
              },
            });
            clearTimeout(timeId);
          },
          1500,
        );
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const onDeleteData = () => {
    setIsShowDeleteModal(false);
    if (!selectedData || selectedData.ids.length < 1) return;
    if (selectedData.type === 'task') {
      onDeleteTasks(selectedData.ids);
      setTaskData(prevState => prevState.map(item => ({ ...item, isChecked: false })));
      return;
    }
    if (selectedData.type === 'course') {
      onDeleteCourses(selectedData.ids);
      return;
    }
  };

  const tabs = [
    <ContentCourses handleSelectedIds={(ids: number[]) => setSelectedData({ ids, type: 'course' })} />,
    <CompanyEmployees companyId={companyId} />,
    <CompanyGroup
      companyId={companyId}
      groupData={groupData}
      setGroupData={setGroupData}
    />,
  ];

  return (
    <Layout
      isAdminRouting
      className="content-page"
      childrenClassName="pos_relative"
    >
      <div className="content-info grid py-48">
        <Typography
          variant="headline"
        >
          Контент
        </Typography>
        <div className="content-info__content">
          <Typography variant="subtext">
            В данном разделе вы можете управлять контентом
          </Typography>
        </div>
      </div>
      <Tabs
        pathname={pathname}
        key={activeTab}
        tabOptions={CONTENT_TABS}
        setActiveTabId={handleActiveTab}
        activeId={activeTab}
        className="flex-grow-1"
        contentClassName="color_grey__bg"
      >
        {tabs.map((item, index) => (
          <div key={CONTENT_TABS[index].id}>
            {item}
          </div>
        ))}
      </Tabs>
      {selectedData?.ids?.length ? (
        <div className="d-flex justify-content-between content-page__drawer">
          <Typography variant="text">
            {selectedData.type === 'task' ? 'Заданий ' : 'Курсов '}: {selectedData.ids.length}
          </Typography>
          <div className="d-flex">
            <Typography
              variant="subtext"
              className="cursor-pointer mt-4"
              onClick={() => setIsShowDeleteModal(true)}
            >
              Удалить
            </Typography>
            <Button
              type="link"
              onClick={onCloseClick}
              className="ml-64"
            >
              <CancelIcon color={'#B0BAC9'} />
            </Button>
          </div>
        </div>
      ) : ''}
      {isShowDeleteModal && selectedData && (
        <Modal
          width={422}
          title="Удаление заданий"
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          closeColor="#7A7B82"
          onCloseClick={() => setIsShowDeleteModal(false)}
          onDeleteClick={onDeleteData}
        >
          <div className="d-flex flex-column px-32">
            <Typography variant="subtext" className="mb-24">
              Вы действительно хотите удалить выбранные
              { selectedData.type === 'task' ? ' задания ' : ' курсы '}
              ({selectedData.ids.length || ''}) ?
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

const mapDispatchToProps = {
  deleteCourses,
  getCoursesByAdmin,
  getAdminTasks,
  deleteTask,
};

export default connect<any, any>(
  null,
  mapDispatchToProps,
)(withNotificationProvider(ContentPage));
