import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RouterPaths } from 'src/core/enum';
import { useLocation, withRouter } from 'react-router';
import queryString from 'query-string';

import Button from 'src/components/atoms/Button';
import Pagination from 'src/components/atoms/Pagination';
import Loader from 'src/components/atoms/Loader';
import CardMicroLearning from 'src/components/molecules/Cards/CardMicroLearning';
import FilterTags from 'src/components/organisms/FilterTags';
import Typography from 'src/components/atoms/Typography';
import Layout from 'src/components/organisms/Layout';
import Select from 'src/components/molecules/Select';
import AppContext from 'src/components/AppContext';

import taskActions from 'src/store/task/actions';

import { TasksFeedTypes } from 'src/pages/GamePages/TasksFeed/types';
import { TaskAggregatorTypes } from 'src/store/task/types';
import { tasksTypes } from 'src/pages/GamePages/TasksFeed/consts';
import { IOption } from 'src/components/molecules/Select/types';
import { ProgressStatus } from 'src/store/course/types';
import { StaticFilterOptions } from 'src/components/organisms/MyGames/consts';
import { getMicroLearningTitle } from 'src/components/atoms/MicroLearningText/consts';
import { ReactComponent as UnexistDataIcon } from 'src/assets/img/no-data.svg';
import { ExampleAlphabet } from 'src/components/organisms/FilterTags/mocks';
import './index.scss';

function TasksFeedPage(props: TasksFeedTypes.IProps) {
  const {
    getExercises, exercises, total: propsTotal, exerciseLoading,
    onMakeFavorite, onDeleteFavorite, history,
  } = props;
  const { companyId } = useContext(AppContext);
  const [staticFilterOption, setStaticFitterOption] = useState<IOption>(StaticFilterOptions[0]);
  const pageSize = 10;
  const [curTypes, setCurTypes] = useState<string[]>();
  const [filteredTags, setFilteredTags] = useState<number[]>();
  const location = useLocation();
  const { page } = queryString.parse(location.search);
  const [queryParams, setQueryParams] = useState<TaskAggregatorTypes.IQueryProps>(
    {
      pageSize,
      page: page ? +page : 1,
    });
  const [total, setTotal] = useState<number>(0);

  const handleStaticFilterOption = (option: IOption) => {
    setStaticFitterOption(option);
    if (typeof  companyId !== 'number') return;
    const newParams = {
      groupId: queryParams.groupId,
      branchId: queryParams.branchId,
      page: queryParams.page,
      pageSize: queryParams.pageSize,
      personalExercises: queryParams.personalExercises,
      types: queryParams.types,
      tags: queryParams.tags,
    };
    option.value === 'favorite' && setQueryParams({ ...newParams, isFavorite: true });
    option.value === 'completed' && setQueryParams({ ...newParams, isFinished: true });
    option.value === 'new' && setQueryParams({ ...newParams, sortByDate: true });
    option.value === 'rewards' && setQueryParams({ ...newParams, sortByReward: true });
    option.value === 'all' && setQueryParams({ ...newParams });
  };

  useEffect(
    () => {
      window.scrollTo(0, 0);
      getExercises && getExercises(queryParams);
    },
    [queryParams, companyId]);

  useEffect(
    () => {
      if (!propsTotal || total === propsTotal) return;
      setTotal(propsTotal);
    },
    [propsTotal],
  );

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      setCurTypes(undefined);
      setStaticFitterOption(StaticFilterOptions[0]);
      setFilteredTags(undefined);
      setQueryParams({ pageSize , page: page ? +page : 1 });
    },
    [companyId],
  );

  useEffect(
    () => {
      if (curTypes || filteredTags) {
        setQueryParams(prevState => ({ ...prevState, types: curTypes, tags: filteredTags, page: 1 }));
      }
    },
    [curTypes, filteredTags],
  );

  const onTypeClick = (type: string) => {
    if (curTypes?.includes(type)) {
      setCurTypes(curTypes.filter(item => item !== type));
    } else {
      setCurTypes(curTypes  ? [...curTypes, type] : [type]);
    }
  };

  const onPageClick = (page: number) => {
    history.push(`${location.pathname}?page=${page}`);
    setQueryParams({ ...queryParams, page, types: curTypes });
  };

  return (
    <Layout className="tasks-feed-page">
      <Typography className="grid py-48" variant="headline">Задания</Typography>
      <div className="tasks-feed-page__content pt-32 pb-48 flex-grow-1">
        <div className="grid">
          <div className="tasks-feed-page__filters d-flex justify-content-between align-items-center mb-24">
            <div className="filters__tasks-type">
              {tasksTypes.map(task => (
                <Button
                  key={task}
                  variant="subtext"
                  color="grey_additional_2"
                  className={classNames(
                    'tasks-type__button mr-16 py-8 px-20',
                    { 'tasks-type__button--active': curTypes?.includes(task) },
                  )}
                  onClick={() => onTypeClick(task)}
                >
                  {getMicroLearningTitle(task)}
                </Button>
              ))}
            </div>
            <div className="d-flex">
              <FilterTags
                companyId={companyId}
                alphabet={ExampleAlphabet}
                handleTags={tags => setFilteredTags(tags.map(n => n.id))}
              />
              <div className="filters__static d-flex align-items-center ml-64">
                <Typography variant="subtext" className="mr-4">Сортировка:</Typography>
                <Select
                  staticWidth
                  options={StaticFilterOptions}
                  selectedOption={staticFilterOption}
                  className="static__select ml-2"
                  setSelectedOption={handleStaticFilterOption}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="tasks-feed-page__micro-learning-group">
              {exerciseLoading && <Loader/>}
              {exercises && exercises.map((item, index) => (
                <CardMicroLearning
                  link={`/${RouterPaths.TASKS_FEED}/${item.id}`}
                  id={item.id}
                  key={index}
                  favorite={item.isFavorite}
                  image={item.imageThumbnail}
                  comments={item.commentsAmount}
                  coins={item.rewardAmount}
                  title={item.name}
                  description={item.description}
                  time={item.minutesToFinish}
                  type={item.type}
                  rating={item.rating}
                  date={item.publishDateTime || ''}
                  className="mb-24"
                  processStatus={item.isFinished ? ProgressStatus.SUCCESS : ProgressStatus.NOT_STARTED}
                  onMakeFavorite={onMakeFavorite}
                  onDeleteFavorite={onDeleteFavorite}
                />
              ))}
              {propsTotal === 0 || (!exercises && !exerciseLoading) ? (
                  <div className="d-flex flex-column align-items-center">
                    <UnexistDataIcon/>
                    <Typography variant="text" color="grey_additional_2" className="mt-16">
                      Упс! Пока нет никаких заданий
                    </Typography>
                  </div>
                ) :
                <Pagination
                  onGetPage={onPageClick}
                  total={total || pageSize}
                  pageSize={pageSize}
                  page={queryParams.page}
                />
              }
            </div>
            <div className="tasks-feed-page__sidebar">
              {/* todo: banner from back */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  exercises: state.taskReducer.tasksByAggregator.data,
  exerciseLoading: state.taskReducer.tasksByAggregator.loading,
  total: state.taskReducer.tasksByAggregator.total,
});

const mapDispatchToProps = {
  getExercises: taskActions.getTasksByAggregator,
  onMakeFavorite: taskActions.makeFavourTask,
  onDeleteFavorite: taskActions.deleteFavourTask,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(TasksFeedPage));
