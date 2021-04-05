import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addCourseToFavorite, deleteCourseFromFavorite } from 'src/store/course/actions';

import Typography from 'src/components/atoms/Typography';
import Loader from 'src/components/atoms/Loader';
import Pagination from 'src/components/atoms/Pagination';
import Select from 'src/components/molecules/Select';
import CardEducation from 'src/components/molecules/Cards/CardEducation';
import FilterTags from 'src/components/organisms/FilterTags';

import { CoursesContainerTypes } from 'src/components/organisms/CoursesContainer/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { COURSES_FILTER_OPTIONS } from 'src/components/organisms/CoursesContainer/consts';
import 'src/components/organisms/CoursesContainer/index.scss';
// todo delete mock data
import { ExampleAlphabetEnglish } from 'src/components/organisms/FilterTags/mocks';

function CoursesContainer(props: CoursesContainerTypes.IProps) {
  const {
    courses, loading, total, pageSize = 9,
    setCoursesParams, companyId, title,
    deleteCourseFromFavorite, addCourseToFavorite,
  } = props;

  const [selectedFilter, setSelectedFilter] = useState<IOption>(COURSES_FILTER_OPTIONS[0]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const onGetPage = (page: number) => {
    setCoursesParams(page, selectedFilter, selectedTags);
  };

  const handleSelectedFilter = (option: IOption) => {
    setSelectedFilter(option);
    setCoursesParams(1, option, selectedTags);
  };

  const onFavoriteClick = (id: number, favorite: boolean) => {
    favorite ? (
      deleteCourseFromFavorite && deleteCourseFromFavorite(id)
    ) : (
      addCourseToFavorite && addCourseToFavorite(id)
    );
  };

  const handleSelectedTags = (tags: ITag[]) => {
    const tagIds = tags.map(item => item.id);
    setSelectedTags(tagIds);
    setCoursesParams(1, selectedFilter, tagIds);
  };

  return (
    <>
      <div className="courses-container__header pt-48 pb-20 grid">
        <div className="d-flex justify-content-between mt-36">
          <Typography variant="headline">{title}</Typography>
          <div className="d-flex align-items-center ml-auto">
            <FilterTags
              alphabet={ExampleAlphabetEnglish}
              companyId={companyId}
              handleTags={handleSelectedTags}
            />
            <Typography
              variant="subtext"
              className="ml-20 mr-8"
              color="grey_additional_2"
            >
              Фильтрация:
            </Typography>
            <Select
              staticWidth
              classNames="courses-container__filter"
              options={COURSES_FILTER_OPTIONS}
              selectedOption={selectedFilter}
              setSelectedOption={handleSelectedFilter}
            />
          </div>
        </div>
      </div>
      <div className="courses-container__content flex-grow-1 pt-32 pb-48">
        <div className="courses-container__content-inner grid">
          {!loading && courses && courses.length > 0 && (
            <div className="d-flex flex-wrap">
              {courses.map(item => (
                <CardEducation
                  key={item.id}
                  id={item.id}
                  progress={item.progress}
                  image={item.imageUrl}
                  title={item.name}
                  rating={item.rating}
                  players={item.numberOfViews}
                  time={item.minutesToFinish}
                  favorite={item.isFavorite}
                  tags={item.tags}
                  link={`/education/course/${item.id}`}
                  type="course"
                  variant={2}
                  className="courses-container__card mb-24"
                  handleFavoriteClick={onFavoriteClick}
                />
              ))}
            </div>
          )}
          {loading && (
            <Loader className="my-32" />
          )}
          <Pagination
            pageSize={pageSize}
            total={total || pageSize}
            onGetPage={onGetPage}
          />
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = {
  addCourseToFavorite,
  deleteCourseFromFavorite,
};

export default connect<any>(null, mapDispatchToProps)(CoursesContainer);
