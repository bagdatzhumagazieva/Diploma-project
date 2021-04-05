import React from 'react';
import { connect } from 'react-redux';

import { addCourseToFavorite, deleteCourseFromFavorite } from 'src/store/course/actions';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import CardEducation from 'src/components/molecules/Cards/CardEducation';

import { EducationCoursesTypes } from 'src/pages/GamePages/Education/types';
import { RouterPaths } from 'src/core/enum';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { ReactComponent as EmptyDataIcon } from 'src/assets/img/no-data.svg';
import 'src/pages/GamePages/Education/index.scss';

function Courses(props: EducationCoursesTypes.IProps) {
  const {
    userCourses, userCoursesTotal, availableCourses, availableCoursesTotal,
    employment, addCourseToFavorite, deleteCourseFromFavorite,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const onFavoriteClick = (id: number, favorite: boolean) => {
    if (!favorite) {
      if (!employment) return;
      addCourseToFavorite && addCourseToFavorite(id, companyId);
    } else {
      deleteCourseFromFavorite && deleteCourseFromFavorite(id);
    }
  };

  return (
    <div className="courses d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between">
        <Typography variant="h1" className="mb-24">Мои курсы</Typography>
        {userCoursesTotal > 3 && (
          <Button type="link-underlined" to={`/${RouterPaths.MY_COURSES}/`}>Показать все</Button>
        )}
      </div>
      {userCourses.length > 0 ? (
        <div className="courses__user-courses d-flex mb-32">
          {userCourses.map(item => (
            <CardEducation
              key={item.id}
              id={item.id}
              progress={item.progress}
              image={item.imageUrl}
              title={item.name}
              rating={item.rating}
              players={item.numberOfViews}
              time={item.minutesToFinish}
              tags={item.tags}
              favorite={item.isFavorite}
              link={`/education/course/${item.id}`}
              type="course"
              variant={2}
              className="user-courses__card"
              handleFavoriteClick={onFavoriteClick}
            />
          ))}
        </div>
      ) : (
        <div className="d-flex flex-column">
          <EmptyDataIcon className="mx-auto pt-32" />
          <Typography variant="text" color="grey_additional_2" className="mt-16 mx-auto pb-32">
            Упс! Пока нет никаких курсов
          </Typography>
        </div>
      )}
      <div className="d-flex align-items-center justify-content-between">
        <Typography variant="h1" className="mb-24">Доступные</Typography>
        {availableCoursesTotal > 4 && (
          <Button type="link-underlined" to={`/${RouterPaths.AVAILABLE_COURSES}/`}>Показать все</Button>
        )}
      </div>
      {availableCourses.length > 0 ? (
        <div className="d-flex">
          {availableCourses.map(item => (
            <CardEducation
              id={item.id}
              key={item.id}
              progress={item.progress}
              image={item.imageUrl}
              title={item.name}
              rating={item.rating}
              players={item.numberOfViews}
              time={item.minutesToFinish}
              favorite={item.isFavorite}
              link={`/education/course/${item.id}`}
              size="small"
              type="course"
              variant={2}
              className="courses__available-courses"
              handleFavoriteClick={onFavoriteClick}
            />
          ))}
        </div>
      ) : (
        <div className="d-flex flex-column">
          <EmptyDataIcon className="mx-auto pt-32" />
          <Typography variant="text" color="grey_additional_2" className="mt-16 mx-auto pb-32">
            Упс! Пока нет никаких курсов
          </Typography>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  employment: state.employmentReducer.employment.data,
});

export const mapDispatchToProps = {
  addCourseToFavorite,
  deleteCourseFromFavorite,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(Courses);
