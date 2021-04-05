import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useLocation, withRouter } from 'react-router';
import queryString from 'query-string';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Pagination from 'src/components/atoms/Pagination';
import ModalLoading from 'src/components/atoms/ModalLoading';
import useNotification from 'src/components/molecules/Notification/useNotification';
import Table, { TableWithCheckboxes } from 'src/components/molecules/Table';
import Input from 'src/components/molecules/Input';
import Select from 'src/components/molecules/Select';
import Modal from 'src/components/molecules/Modal';
import TaskOptions from 'src/components/molecules/TableOptions';
import ModalPublishSetting from 'src/components/molecules/ModalPublishSetting';
import DateRangePicker from 'src/components/molecules/DateRangePicker';

import useDebounce from 'src/hooks/useDebounce';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import taskActions from 'src/store/task/actions';
import groupActions from 'src/store/group/actions';
import { DEFAULT_TASK_VALUE } from 'src/components/organisms/TaskCreationEdition/consts';
import IconPlus from 'src/assets/img/icons/plus.svg';
import { IOption } from 'src/components/molecules/Select/types';
import { ContentTasksTypes } from 'src/components/organisms/ContentComponents/ContentTasks/types';
import { SortDirection, TableTypes } from 'src/components/molecules/Table/types';
import { TaskTypes } from 'src/store/task/types';
import {
  parseDataTask,
  TASK_STATUSES,
  TaskAction,
  TaskTableData,
} from 'src/components/organisms/ContentComponents/ContentTasks/consts';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { TASKS_TYPE } from 'src/components/organisms/TaskCreationEdition/GeneralInformation/const';
import { GroupTypes } from 'src/store/group/types';
import { DEFAULT_DATE_FORMAT } from 'src/core/store/values';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import 'src/components/organisms/ContentComponents/ContentTasks/index.scss';

function ContentTasks(props: ContentTasksTypes.IProps) {
  const {
    tasks, taskLoading, deleteTask, history,
    loadingDeletedTask, updateTask, companyId, getGroups, groups, setSelectedTaskData,
    taskData, setTaskData, getAdminTasks,
  } = props;
  const pageSize = 10;
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showModalDate, setShowModalDate] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>('');
  const [dateRange, setDateRange] = useState<any>();
  const [status, setStatus] = useState<string>('DRAFT');
  const [selectedData, setSelectedData] = useState<ContentTasksTypes.ISelectedData>();
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [searchName, setSearchName] = useState('');
  const [isResetFilters, setResetFilters] = useState<boolean>(false);
  const [currentOptionDate, setCurrentOptionDate] = useState<TaskTypes.IBodyProps>(
    {
      ...DEFAULT_TASK_VALUE,
      publishDate: moment(date).format('DD.MM.YYYY'),
    });
  const debounceSearchValue = useDebounce(searchName, 500);
  const getTasks = (bodyParams: TaskTypes.IGetTaskBodyParams, callback?: any) => {
    getAdminTasks && getAdminTasks(bodyParams, callback);
  };
  const location = useLocation();
  const { page } = queryString.parse(location.search);
  const defaultBodyParams = {
    page: page ? +page : 1, page_size: pageSize, company_id: companyId, keyword: '',
  };
  const [bodyParams, setBodyParams] = useState<TaskTypes.IGetTaskBodyParams>(defaultBodyParams);
  const notification = useNotification();

  useEffect(
    () => {
      getGroups && getGroups({ companyId });
    },
    [companyId],
  );

  useEffect(
    () => {
      if (groups) {
        const groupsFilterData: IOption[] =
          groups.map((group: GroupTypes.IRenderProps) => ({ value: `${group.id}`, name: group.name || '' }));
        setSelectedGroups(groupsFilterData);
      }
    },
    [groups],
  );

  useEffect(
    () => {
      setBodyParams((prevState) => {
        const newFilterData =  { ...prevState, keyword: debounceSearchValue, order_field: 'date_desc' };
        getTasks(newFilterData);
        return newFilterData;
      });
    },
    [debounceSearchValue],
  );

  useEffect(
    () => {
      if (tasks?.exercises) {
        setTaskData(tasks.exercises);
      }
    },
    [tasks],
  );

  const onPaginationPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page });
    history.push(`${location.pathname}?page=${page}`);
    getTasks({ ...bodyParams, page });
  };

  const updateData = (description: string) => {
    // Data in the search service does not have enough time to update
    setBodyParams({ ...bodyParams, page: 1 });
    history.push(`${location.pathname}`);
    const timeId = setTimeout(
      () => {
        getTasks({ ...bodyParams, page: 1 }, {
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

  const onTaskOptionsClick = (callback: () => void) => () => callback();

  const onDeleteTask = (id: number) => {
    setSelectedData(undefined);
    setPageLoading(true);
    deleteTask && deleteTask([id], {
      onSuccess: () => {
        updateData('Задание успешно удалено!');
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const onDraftPublicateTask = () => {
    setSelectedData(undefined);
    setPageLoading(true);
    const taskData: TaskTypes.IBodyProps = {
      ...currentOptionDate,
      status: selectedData?.action === TaskAction.PUBLICATE ? 'PUBLISHED' : 'DRAFT',
    };
    updateTask && updateTask(taskData, currentOptionDate.id || 0, {
      onSuccess: () => {
        updateData(
          selectedData?.action === TaskAction.PUBLICATE ? 'Задание успешно опубликовано'
            : 'Задание успешно перенесено в черновик');
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const onChangeDate = () => {
    setPageLoading(true);
    setShowModalDate(false);
    const taskData: TaskTypes.IBodyProps = {
      ...currentOptionDate,
      status,
      publishDate: status === 'SCHEDULED' ?
        moment(date).format(`YYYY-MM-DDT${time[0] + time[1]}:${time[3] + time[4]}:00[.000]Z`) :
        currentOptionDate.publishDate,
    };
    updateTask && updateTask(taskData, taskData.id || 0, {
      onSuccess: () => {
        updateData(
          status === 'SCHEDULED'
            ? 'Задание успешно запланировано'
            : status === 'DRAFT' ? 'Задание успешно перенесено в черновик'
            : 'Задание успешно опубликовано');
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    const newBodyParams = {
      ...bodyParams,
      order_field: (sortDirection !== SortDirection.Default) ? `${label}_${sortDirection}` : undefined,
      page: 1,
    };
    setBodyParams(newBodyParams);
    getTasks(newBodyParams);
  };

  const onSelectGroupsChange = (options: IOption[]) => {
    setBodyParams((prevState) => {
      const newBodyParams = { ...prevState, group_ids: options.filter(n => n.checkboxChecked).map(e => +e.value) };
      getTasks(newBodyParams);
      return newBodyParams;
    });
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onSelectTypeChange = (options: IOption[]) => {
    setBodyParams((prevState) => {
      const newBodyParams = { ...prevState, types: options.filter(n => n.checkboxChecked).map(e => e.value) };
      getTasks(newBodyParams);
      return newBodyParams;
    });
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onTaskSelect = (data: TableWithCheckboxes<TaskTypes.IRenderAdminExercise>[]) => {
    setSelectedTaskData(data.filter(n => n.isChecked).map(item => item.id));
    setTaskData(data);
  };

  const handleSelectStatus = (option: IOption) => {
    const newParams = { ...bodyParams, status: option.value, page: 1 };
    setBodyParams(newParams);
    getTasks(newParams);
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onDateRangeChange = (dateRange: any) => {
    setDateRange(dateRange);
    const newParam = {
      ...bodyParams,
      publish_date_from: dateRange?.start?.format(DEFAULT_DATE_FORMAT),
      publish_date_to: dateRange?.end?.format(DEFAULT_DATE_FORMAT),
    };
    setBodyParams(newParam);
    getTasks(newParam);
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onResetFiltersClick = () => {
    setSelectedGroups(selectedGroups.map(e => e.checkboxChecked ? { ...e, checkboxChecked: false } : e));
    setResetFilters(false);
    setDateRange(undefined);
    setBodyParams((prevState) => {
      const newBodyParams = {
        ...defaultBodyParams,
        order_field: prevState.order_field,
        keyword: prevState.keyword,
      };
      getTasks(newBodyParams);
      return newBodyParams;
    });
  };

  const getLastOption = (id: number) => {
    const index = taskData.findIndex(e => e.id === id);
    return taskData?.length === 1 ? 'single' :
    (index % 10 === 9 || index % 10 === 8 || index === taskData.length - 1 || index === taskData.length - 2)
      ? 'last' : 'firsts';
  };

  const taskHeader: TableTypes.IHeaderData[] = [
    ...TaskTableData,
    {
      key: 'option',
      name: '',
      width: '72px',
      textAlign: 'center',
      render: (n: TaskTypes.IRenderAdminExercise) => (
        <TaskOptions
          position={getLastOption(n.id)}
          status={n.status}
          onChangePublicationDate={onTaskOptionsClick(() => {
            setShowModalDate(true);
            setStatus(n.status);
            setCurrentOptionDate(parseDataTask(n));
            setTime(n.publishDatetime.slice(11, 16));
            setDate(new Date(n.publishDatetime));
          })}
          onDraft={() => {
            setSelectedData({ id: n.id, action: TaskAction.DRAFT, name: n.name || '' });
            setCurrentOptionDate(parseDataTask(n));
          }}
          onPublish={() => {
            setSelectedData({ id: n.id, action: TaskAction.PUBLICATE, name: n.name || '' });
            setCurrentOptionDate(parseDataTask(n));
          }}
          onEdit={() => { history.push(addAdminSlash(`${AdminRouterPaths.TASK_EDITION}/${n.id}`)); }}
          onDelete={() => setSelectedData({ id: n.id, action: TaskAction.DELETE, name: n.name || '' })}
        />
      ),
    },
  ];

  return (
    <div className="py-24">
      <div className="d-flex align-items-center mb-24">
        <Typography variant="h1">
          Задания
        </Typography>
        <Typography
          variant="text"
          className="ml-8"
        >
          {`(${tasks?.total || 0})`}
        </Typography>
      </div>
      <div className="d-flex align-items-end justify-content-between">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Поиск задания
            </Typography>
            <Input
              type="text"
              placeholder="Название"
              value={bodyParams.keyword}
              classNames="content-task-search-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
              icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
            />
          </div>
          <Button
            type="link"
            variant="subtext"
            className="d-flex align-items-center ml-5 mt-3"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FilterArrow active className="mr-8" direction={showFilter ? 'up' : 'down'}/>
            Фильтры
          </Button>
          <Button
            disabled={!isResetFilters}
            type="link"
            variant="subtext"
            className="align-items-center ml-5 mt-3"
            onClick={onResetFiltersClick}
          >
            Очистить фильтры
          </Button>
        </div>
        <Button
          className="d-flex align-items-center py-12 px-24"
          variant="textmed"
          to={`${addAdminSlash(AdminRouterPaths.TASK_CREATION)}`}
        >
          <Image
            src={IconPlus}
            alt="add button"
            className="mr-8"
          />
          Создать задание
        </Button>
      </div>
      {showFilter && (
        <div className="d-flex mt-24">
          <div className="mr-32 content-task__filter-status">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Статус
            </Typography>
            <Select
              staticWidth
              width={216}
              options={TASK_STATUSES}
              setSelectedOption={handleSelectStatus}
              selectedOption={{} as IOption}
              customTitle="Выберите статус"
              className="course-filter"
            />
          </div>
          <Select
            staticWidth
            withCheckbox
            width={288}
            label="Тип"
            options={TASKS_TYPE}
            selectedOption={{} as IOption}
            onCheckboxChanges={onSelectTypeChange}
            customTitle="Выберите тип"
            className="color_grey__bg mr-32"
          />
          {groups && (
            <div className="mr-32">
              <Typography
                variant="subtext"
                className="mb-4"
              >
                Группы
              </Typography>
              <Select
                staticWidth
                withCheckbox
                width={288}
                options={selectedGroups}
                selectedOption={{} as IOption}
                onCheckboxChanges={onSelectGroupsChange}
                customTitle="Выберите группы"
                className="course-filter"
              />
            </div>
          )}
          <div className="">
            <Typography
              variant="subtext"
              className="mb-4"
            >
              Дата создания
            </Typography>
            <DateRangePicker date={dateRange} setDate={onDateRangeChange} />
          </div>
        </div>
      )}
      <Table
        checkbox
        loading={taskLoading || loadingDeletedTask}
        headerData={taskHeader}
        bodyData={taskData}
        onSort={onSort}
        onCheckboxChange={onTaskSelect}
        wrapperClassName="mt-16"
      />
      <Pagination
        pageSize={pageSize}
        total={tasks?.total || pageSize}
        className="mt-16"
        page={bodyParams.page}
        onGetPage={onPaginationPageClick}
      />
      {showModalDate && (
        <Modal
          title="Настройки публикации"
          width={648}
          onCloseClick={() => setShowModalDate(false)}
          onSaveClick={onChangeDate}
        >
          <ModalPublishSetting
            time={time}
            date={date}
            setDate={setDate}
            setTime={setTime}
            setStatus={setStatus}
            status={status}
            onSaveClick={onChangeDate}
            onCancelClick={() => setShowModalDate(false)}
          />
        </Modal>
      )}
      {selectedData !== undefined && (
        <Modal
          width={422}
          title={selectedData.action === TaskAction.DELETE ? 'Удаление задания' : 'Изменение статуса'}
          deleteLabel={selectedData.action === TaskAction.DELETE ? 'Удалить' : undefined}
          cancelLabel="Отмена"
          saveLabel={selectedData.action === TaskAction.DRAFT ? 'В черновик' :
            selectedData.action === TaskAction.PUBLICATE ? 'Опубликовать' :''}
          onCloseClick={() => setSelectedData(undefined)}
          onDeleteClick={() => selectedData.action === TaskAction.DELETE && onDeleteTask(selectedData.id)}
          onSaveClick={() => selectedData.action === TaskAction.DELETE ?
            onDeleteTask(selectedData.id) : onDraftPublicateTask()}
        >
          <div className="mx-32">
            <Typography
              variant="text"
            >
              Вы действительно хотите
              {selectedData.action === TaskAction.DELETE ? ' удалить '
                :selectedData.action === TaskAction.PUBLICATE ? ' опубликовать ' : ' перенести в черновик '}
              задание - <Typography variant="h2" color="blacker">"{selectedData.name || ''}"</Typography>
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
  tasks: state.taskReducer.tasksAdmin.data,
  loadingDeletedTask: state.taskReducer.deletedTask.loading,
  taskLoading: state.taskReducer.tasksAdmin.loading,
  groups: state.groupReducer.groups.data,
});

const mapDispatchToProps = {
  getAdminTasks: taskActions.getAdminTasks,
  deleteTask: taskActions.deleteTask,
  updateTask: taskActions.updateTask,
  getGroups: groupActions.getGroups,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ContentTasks));
