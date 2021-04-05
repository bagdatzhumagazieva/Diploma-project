import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import useDebounce from 'src/hooks/useDebounce';
import { useHistory, useLocation } from 'react-router';
// import { coursesToDraft, coursesToPublish, deleteCourses, getCoursesByAdmin } from 'src/store/course/actions';
// import { getGroups } from 'src/store/group/actions';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import Table, { TableWithCheckboxes } from 'src/components/molecules/Table';
import IconPlus from 'src/assets/img/icons/plus.svg';
import Pagination from 'src/components/atoms/Pagination';
import Modal from 'src/components/molecules/Modal';
import useNotification from 'src/components/molecules/Notification/useNotification';
import ModalLoading from 'src/components/atoms/ModalLoading';
import TableOptions from 'src/components/molecules/TableOptions';

import { ContentCoursesTypes } from 'src/components/organisms/ContentComponents/ContentCourses/types';
import {
  DEFAULT_COURSE_FILTERS_DATA,
  TABLE_HEADER,
} from 'src/components/organisms/ContentComponents/ContentCourses/consts';
import { CourseDetailTypes } from 'src/store/course/types';
import { CONVERT_GROUPS_TO_OPTIONS } from 'src/components/organisms/CourseCreationEdition/GeneralInformation/consts';
import { Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import { getActionText, getSaveButtonLabel } from 'src/pages/AdminPages/Course/consts';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { SortDirection } from 'src/components/molecules/Table/types';
import 'src/components/organisms/ContentComponents/ContentCourses/index.scss';
import { COURSES } from './mock';

function ContentCourses(props: ContentCoursesTypes.IProps) {
  const {
    getCoursesByAdmin, coursesLoading,
    groups, handleSelectedIds, coursesTotal = 0,
    coursesToDraft, coursesToPublish, deleteCourses,
  } = props;
  const pageSize = 10;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [courses, setCourses] = useState<TableWithCheckboxes<CourseDetailTypes.IRenderProps>[]>([]);
  const location = useLocation();
  const { page } = queryString.parse(location.search);
  const [filterData, setFilterData] = useState<ContentCoursesTypes.IFilter>({
    ...DEFAULT_COURSE_FILTERS_DATA,
    page: page ? +page : 1,
  });
  const [searchName, setSearchName] = useState('');
  const debounceSearchValue = useDebounce(searchName, 500);
  const history = useHistory();
  const [selectedData, setSelectedData] = useState<ContentCoursesTypes.ISelectedData>();
  const [isResetFilters, setResetFilters] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const notification = useNotification();

  useEffect(
    () => {
      if (!groups) return;
      setFilterData(prevState => ({ ...prevState, groups: CONVERT_GROUPS_TO_OPTIONS(groups) }));
    },
    [groups],
  );

  useEffect(
    () => {
      setCourses(COURSES);
    },
    [],
  );
  console.log(courses)

  useEffect(
    () => {
      setFilterData((prevState) => {
        const newFilterData =  { ...prevState, keyword: debounceSearchValue };
        // getCourses(newFilterData);
        // TODO: add method
        return newFilterData;
      });
    },
    [debounceSearchValue],
  );

  const getLastOption = (id: number) => {
    const index = courses.findIndex(e => e.id === id);
    return courses?.length === 1 ? 'single' :
    (index % 10 === 9 || index % 10 === 8 || index === courses.length - 1 || index === courses.length - 2)
      ? 'last' : 'firsts';
  };

  const tableHeader = [
    ...TABLE_HEADER,
    {
      key: 'option',
      name: '',
      width: '72px',
      render: (n: CourseDetailTypes.IRenderProps) => (
        <TableOptions
          position={getLastOption(n.id)}
          status={n.status}
          onEdit={() => history.push(`/admin/content/course/course-edition/${n.id}`)}
          onDelete={() => setSelectedData({ id: n.id, action: Action.DELETE, name: n.name || '' })}
          onDraft={() => setSelectedData({ id: n.id, action: Action.DRAFT, name: n.name || '' })}
          onPublish={() => setSelectedData({ id: n.id, action: Action.PUBLISH, name: n.name || '' })}
        />
      ),
    },
  ];

  const onCoursesSelect = (data: TableWithCheckboxes<CourseDetailTypes.IRenderProps>[]) => {
    handleSelectedIds(data.filter(item => item.isChecked).map(item => item.id));
    setCourses(data);
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    setFilterData((prevState) => {
      const newFilterData = {
        ...prevState,
        page: 1,
        orderField: sortDirection !== SortDirection.Default ? label : undefined,
        orderDirection: sortDirection !== SortDirection.Default ? sortDirection : undefined,
      };
      // getCourses({ ...newFilterData });
      // TODO: add method
      return newFilterData;
    });
  };

  const onPaginationPageClick = (page: number) => {
    history.push(`${location.pathname}?type=courses&page=${page}`);
    setFilterData((prevState) => {
      const newFilterData = {
        ...prevState,
        page,
      };
      // getCourses({ ...newFilterData });
      // TODO: add method
      return newFilterData;
    });
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onDraftCourse = (ids: number[]) => {
    setPageLoading(true);
    setSelectedData(undefined);
    coursesToDraft && coursesToDraft(ids, {
      onSuccess: () => {
        updateData('Курс успешно перенесен в черновик');
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const onPublishCourse = (ids: number[]) => {
    setPageLoading(true);
    setSelectedData(undefined);
    coursesToPublish && coursesToPublish(ids, {
      onSuccess: () => {
        updateData('Курс успешно опубликован');
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const onDeleteCourse = (ids: number[]) => {
    setPageLoading(true);
    setSelectedData(undefined);
    deleteCourses && deleteCourses(ids, {
      onSuccess: () => {
        updateData('Курс успешно удален');
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const updateData = (description: string) => {
    // Data in the search service does not have enough time to update
    const timeId = setTimeout(
      () => {
        const params = {
          page: 1,
          pageSize: 10,
        };
        history.push(`${location.pathname}?type=courses`);
        getCoursesByAdmin && getCoursesByAdmin(companyId, params, {
          onSuccess: () => {
            notification.add({ ...DEFAULT_NOTIFICATION_DATA, description });
            setPageLoading(false);
          },
        });
        clearTimeout(timeId);
      },
      1500,
    );
  };

  const onChangeStatusClick = (selectedData: ContentCoursesTypes.ISelectedData) => (
    selectedData.action === Action.DRAFT ? onDraftCourse([selectedData.id]) : onPublishCourse([selectedData.id])
  );

  return (
    <div className="content-courses py-24">
      <div className="d-flex align-items-center mb-24">
        <Typography variant="h1">
          Курсы
        </Typography>
        <Typography
          variant="text"
          className="ml-8"
        >
          ({coursesTotal})
        </Typography>
      </div>
      <div className="d-flex align-items-end justify-content-between">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Поиск курса
            </Typography>
            <Input
              type="text"
              placeholder="Название"
              classNames="content-courses__input-searcher"
              value={searchName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
              icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
            />
          </div>
        </div>
        <Button
          className="d-flex align-items-center py-12 px-24"
          variant="textmed"
          to={addAdminSlash(AdminRouterPaths.COURSE_CREATION)}
        >
          <Image
            src={IconPlus}
            alt="add button"
            className="mr-8"
          />
          Создать курс
        </Button>
      </div>
      <Table
        checkbox
        wrapperClassName="mt-16"
        headerData={tableHeader}
        bodyData={courses}
        onSort={onSort}
        loading={coursesLoading}
        onCheckboxChange={onCoursesSelect}
      />
      <Pagination
        pageSize={pageSize}
        page={filterData.page}
        total={coursesTotal || pageSize}
        className="mt-16"
        onGetPage={onPaginationPageClick}
      />
      {selectedData !== undefined && (
        <Modal
          width={422}
          title={selectedData.action === Action.DELETE ? 'Удаление курса' : 'Изменение статуса'}
          deleteLabel={selectedData.action === Action.DELETE ? 'Удалить' : undefined}
          saveLabel={getSaveButtonLabel(selectedData.action)}
          cancelLabel="Отмена"
          onCloseClick={() => setSelectedData(undefined)}
          onDeleteClick={() => selectedData.action === Action.DELETE && onDeleteCourse([selectedData.id])}
          onSaveClick={() => selectedData.action !== Action.DELETE && onChangeStatusClick(selectedData)}
        >
          <div className="mx-32">
            <Typography
              variant="text"
            >
              Вы действительно хотите
              {getActionText(selectedData.action)}
              курс - <Typography variant="h2" color="blacker">"{selectedData.name}"</Typography>
            </Typography>
          </div>
        </Modal>
      )}
      {pageLoading && (
        <ModalLoading />
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  // courses: state.courseReducer.coursesByAdmin.data,
  // coursesTotal: state.courseReducer.coursesByAdmin.total,
  // coursesLoading: state.courseReducer.coursesByAdmin.loading,
  // groups: state.groupReducer.groups.data,
});

const mapDispatchToProps = {
  // getCoursesByAdmin,
  // deleteCourses,
  // coursesToDraft,
  // coursesToPublish,
  // getGroups,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(ContentCourses);
