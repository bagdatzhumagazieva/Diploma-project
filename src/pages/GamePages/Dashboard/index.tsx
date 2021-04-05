import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';

import taskActions from 'src/store/task/actions';
import { getCompanyById, getCompanyNews } from 'src/store/company/actions';
import { addCourseToFavorite, deleteCourseFromFavorite, getAllCourses } from 'src/store/course/actions';

import AppContext from 'src/components/AppContext';
import CardInformation from 'src/components/atoms/Cards/CardInformation';
import CardNews from 'src/components/atoms/Cards/CardNews';
import Image from 'src/components/atoms/Image';
import Section from 'src/components/atoms/Section';
import Typography from 'src/components/atoms/Typography';
import CardAdvertisement from 'src/components/molecules/Cards/CardAdvertisement';
import CardEducation from 'src/components/molecules/Cards/CardEducation';
import CardMicroLearning from 'src/components/molecules/Cards/CardMicroLearning';
import CardProfile from 'src/components/molecules/Cards/CardProfile';
import CardBattleGroup from 'src/components/molecules/Cards/CardBattle/CardBattleGroup';
import Layout from 'src/components/organisms/Layout';

import { ReactComponent as EmptyDataIcon } from 'src/assets/img/no-data.svg';
import { TaskAggregatorTypes } from 'src/store/task/types';
import { DashboardPageTypes } from 'src/pages/GamePages/Dashboard/types';
import { RouterPaths } from 'src/core/enum';
import { companyBannerFull } from 'src/pages/AdminPages/CompanySettings/consts';
import { CourseDetailTypes, ProgressStatus } from 'src/store/course/types';
import './index.scss';
// todo delete mock data
import { ExampleCardAdvertisement } from 'src/components/molecules/Cards/CardAdvertisement/mock';
import { CardInformationTypes } from 'src/components/atoms/Cards/CardInformation/types';

function DashboardPage(props: DashboardPageTypes.IProps) {
  const {
    profile, exercises, getExercises, onDeleteFavorite,
    onMakeFavorite, getAllCourses, courses, employment,
    uploadedCompanyBannerData, onGetNews, news, coursesTotal = 0, company,
    addCourseToFavorite, deleteCourseFromFavorite, getCompanyById,
  } = props;
  const { companyId } = useContext(AppContext);
  const companyUuid = localStorage.getItem('company_uuid') || '-1';
  const exercisesQueryParams: TaskAggregatorTypes.IQueryProps = { pageSize: 3, page: 1 };
  const coursesQueryParams: CourseDetailTypes.IQueryProps = { page: 1, pageSize: 4 };

  const onFavoriteClick = (id: number, favorite: boolean) => (
    favorite ? deleteCourseFromFavorite && deleteCourseFromFavorite(id) :
      addCourseToFavorite && addCourseToFavorite(id)
  );

  const getCardInformationData = (): CardInformationTypes.IProps[] => [
    {
      type: 'knowledge-set',
      descriptions: ['Онлайн библиотека со всем нужным обучающим материалом'],
    },
    {
      type: 'courses',
      descriptions: [`+${coursesTotal} бесплатных курсов`, 'Получи сертфикат за каждый пройденный курс'],
    },
  ];

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      window.scrollTo(0, 0);
      getExercises && getExercises(exercisesQueryParams);
      getAllCourses && getAllCourses(coursesQueryParams);
      onGetNews && onGetNews(companyId);
    },
    [companyId],
  );

  useEffect(
    () => {
      if (typeof companyId !== 'number' || (company && companyId === company.id)) return;
      getCompanyById && getCompanyById(companyId);
    },
    [company, companyId],
  );

  return (
    <Layout
      className="dashboard-page"
    >
      <div className="dashboard-page__header grid py-24">
        <div className="header__banner mb-32">
          <Image
            alt="Banner image"
            src={companyBannerFull(companyUuid, uploadedCompanyBannerData?.thumbnail)}
            className="fill"
          />
        </div>
        <Typography variant="headline" className="mb-24">Главная</Typography>
        <CardProfile
          showVerticalLine
          key={(profile?.login || 'login') + (profile?.id || 'id')}
          userName={profile?.fullName || '-'}
          userImage={profile?.avatarThumbnailUrl || ''}
          // TODO: add linkShop when shop will be ready
          curPoints={employment?.rewardAvailable || 0}
          linkShop={''}
          status={''}
          branch={employment?.branch?.name || ''}
          points={employment?.rewardAmount || 0}
          groups={employment?.groups?.map(e => e.name || '') || []}
          companyName={company?.name || ''}
        />
      </div>
      <div className="dashboard-page__content py-48 px-24">
        <div className="grid">
          <div className="d-flex justify-content-between">
            <div className="content__left">
              {/* todo combine with games(education == games + courses*/}
              {courses && (
                <Section
                  title="Обучение"
                  link={RouterPaths.MY_COURSES}
                  className="section-education mb-8"
                >
                  <div className="d-flex flex-wrap justify-content-between">
                    {courses.map(item => (
                      <CardEducation
                        key={item.id}
                        id={item.id}
                        progress={item.progress}
                        image={item.imageThumbnailUrl}
                        title={item.name}
                        rating={item.rating}
                        players={item.numberOfViews}
                        time={item.minutesToFinish}
                        favorite={item.isFavorite}
                        tags={item.tags}
                        link={`${RouterPaths.COURSE}/${item.id}`}
                        type="course"
                        variant={1}
                        className="section-education__item mb-24"
                        handleFavoriteClick={onFavoriteClick}
                      />
                    ))}
                  </div>
                </Section>
              )}
              <Section title="Задания" link={RouterPaths.TASKS_FEED} className="mb-8">
                {exercises?.map((item, index) => (
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
                    processStatus={item.isFinished ? ProgressStatus.SUCCESS : ProgressStatus.NOT_STARTED}
                    onMakeFavorite={onMakeFavorite}
                    onDeleteFavorite={onDeleteFavorite}
                    className="mb-24"
                  />
                ))}
              </Section>
              <div className="d-flex flex-wrap justify-content-between mb-8">
                {getCardInformationData().map((item, index) => (
                  <CardInformation
                    key={item.type + index}
                    className="dashboard-page__card-information mb-24"
                    {...item}
                  />
                ))}
              </div>
            </div>
            <div className="content__right">
              {/* todo add battles */}
              <CardBattleGroup />
              <div className="d-flex flex-column dashboard-page__card-news-group p-24">
                <Typography variant="h1" className="mb-16">Новости с фронта</Typography>
                {news?.length ? news.map((item, index) => (
                  <CardNews
                    key={index}
                    icon={item.achievementImageThumbnailUrl}
                    userName={item.employee?.username || ''}
                    // TODO: add when back will be ready
                    title={item.achievementName}
                    type="own"
                    description={''}
                    date={''}
                    link={''}
                    className="card-news-group__item mb-24"
                  />
                )) : (
                  <>
                    <EmptyDataIcon className="mx-auto pt-32" />
                    <Typography variant="text" color="grey_additional_2" className="mt-16 mx-auto pb-32">
                      Упс! Пока нет никаких новостей
                    </Typography>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* todo add advertisement */}
          <Section title="Рекомендуемое" link="" className="section-card-advertisement">
            {false ? (
              <div className="d-flex justify-content-between">
                {ExampleCardAdvertisement.map((item, index) => (
                  <CardAdvertisement key={index} className="section-card-advertisement__item" {...item} />
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column">
                <EmptyDataIcon className="mx-auto pt-32" />
                <Typography variant="text" color="grey_additional_2" className="mt-16 mx-auto pb-32">
                  Упс! Пока нет никаких рекомендации
                </Typography>
              </div>
            )
            }
          </Section>
        </div>
      </div>
    </Layout>
  );
}

export const mapStateToProps = (state: any) => ({
  profile: state.profileReducer.profile.data,
  uploadedCompanyBannerData: state.mediaReducer.uploadedCompanyBanner.data,
  exercises: state.taskReducer.tasksByAggregator.data,
  courses: state.courseReducer.allCourses.data,
  coursesTotal: state.courseReducer.allCourses.total,
  employment: state.employmentReducer.employment.data,
  news: state.companyReducer.news.data,
  company: state.companyReducer.company.data,
});

const mapDispatchToProps = {
  getAllCourses,
  addCourseToFavorite,
  deleteCourseFromFavorite,
  getCompanyById,
  onGetNews: getCompanyNews,
  getExercises: taskActions.getTasksByAggregator,
  onMakeFavorite: taskActions.makeFavourTask,
  onDeleteFavorite: taskActions.deleteFavourTask,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
