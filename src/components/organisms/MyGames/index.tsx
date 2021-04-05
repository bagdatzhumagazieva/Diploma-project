import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Button from 'src/components/atoms/Button';
import CardGame from 'src/components/molecules/Cards/CardGame';
import CardEducation from 'src/components/molecules/Cards/CardEducation';
import Pagination from 'src/components/atoms/Pagination';
import Loader from 'src/components/atoms/Loader';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import { getPopularGames, getPlayGame, getGames } from 'src/store/game/actions';
import { RouterPaths } from 'src/core/enum';
import { IOption } from 'src/components/molecules/Select/types';
import { MyGamesTypes } from 'src/components/organisms/MyGames/types';
import { GameWebTypes } from 'src/store/game/types';
import { StaticFilterOptions } from 'src/components/organisms/MyGames/consts';
import { ReactComponent as EmptyDataIcon } from 'src/assets/img/no-data.svg';
import 'src/components/organisms/MyGames/index.scss';

function MyGames(props: MyGamesTypes.IProps) {

  const { companyId, getGames, webGames, webGamesLoading,
    webPopularGames, webPopularGamesLoading, getPopularGames,
  } = props;

  const pageSize = 8;
  const [showAllFilters, setShowAllFilters] = useState<boolean>(false);
  const [tags, setTags] = useState<number[]>([]);
  const [staticFilterOption, setStaticFitterOption] = useState<IOption>(StaticFilterOptions[0]);
  const [bodyParams, setBodyParams] = useState<GameWebTypes.IQueryProps>({
    companyId, page: 1, page_size: pageSize, tagIds: tags,
  });
  const DEFAULT_POPULAR_PARAMS = { companyId, page: 1, page_size: 3, isPopular: true };

  useEffect(() => {
    getGames && getGames(bodyParams);
  },        [bodyParams]);

  useEffect(() => {
    getPopularGames && getPopularGames(DEFAULT_POPULAR_PARAMS);
  },        []);

  const addDeleteFilterTag = (tagId: number) => {
    const newTags = [...tags];
    if (newTags.includes(tagId)) {
      setTags(newTags.filter(item => item !== tagId));
      setBodyParams({ ...bodyParams, tagIds: newTags.filter(item => item !== tagId) });
    } else {
      setTags([...newTags, tagId]);
      setBodyParams({ ...bodyParams, tagIds: [...newTags, tagId] });
    }
  };

  const handleStaticFilterOption = (option: IOption) => {
    setStaticFitterOption(option);
    const newParams = {
      companyId,
      isFavorite: false,
      isFinished: false,
      isNew: false,
      inProgress: false,
      page: bodyParams.page,
      page_size: pageSize,
      tagIds: tags,
    };
    option.value === 'favorite' && setBodyParams({ ...newParams, isFavorite: true });
    option.value === 'completed' && setBodyParams({ ...newParams, isFinished: true });
    option.value === 'new' && setBodyParams({ ...newParams, isNew: true });
    option.value === 'in_progress' && setBodyParams({ ...newParams, inProgress: true });
    option.value === 'all' && setBodyParams({ ...newParams });
  };

  const onPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page, page_size: pageSize });
  };

  return (
    <div className="my-games__content">
      <Typography variant="h1 mb-16">Популярно на Gamisoft</Typography>
        { webPopularGamesLoading && <Loader className="mt-48" /> }
        { webPopularGames && !webPopularGamesLoading && (
          <div className="d-flex mb-44">
            {webPopularGames.games.map(item => (
              <CardEducation
                key={item.id}
                className="my-games__card-education mr-24"
                type="game"
                favorite={item.isFavorite}
                time={item.minutesToFinish}
                title={item.name}
                progress={item.progress}
                id={item.id}
                link={`${RouterPaths.PLAY_GAME}/${item.id}`}
                image={item.imageUrl}
                rating={item.rating}
              />
            ))}
          </div>
        )}
        { webGamesLoading && <Loader className="mt-48" /> }
        {webGames && !webGamesLoading && (
          <>
            <div className="my-games__filter d-flex align-items-start justify-content-between mb-32">
              <div className={classNames('filter__dynamic', { 'filter__dynamic--all': showAllFilters })}>
                <div className="dynamic__showed-content d-flex align-items-center">
                  {webGames && webGames.tags.slice(0, 5).map((tag, index) => (
                    <Button
                      key={index}
                      variant="subtext"
                      color="grey_additional_2"
                      className={classNames(
                        'dynamic__button py-8 px-20 mr-16',
                        { 'dynamic__button--active': tags.length && tags.includes(tag.tagId) },
                      )}
                      onClick={() => addDeleteFilterTag(tag.tagId)}
                    >
                      {tag.tagName} ({tag.total})
                    </Button>
                  ))}
                  {webGames && webGames.tags.length > 5 && (
                    <Button
                      type="link"
                      variant="subtext"
                      className="dynamic__hide-button"
                      onClick={() => setShowAllFilters(!showAllFilters)}
                    >
                      {showAllFilters ? 'Скрыть' : 'Все'}
                    </Button>
                  )}
                </div>
                {webGames && webGames.tags.length > 5 && (
                  <div className="dynamic__hide-content d-none">
                    {webGames.tags.slice(5).map(tag => (
                      <Button
                        key={tag.tagId}
                        variant="subtext"
                        color="grey_additional_2"
                        className={classNames(
                          'dynamic__button py-8 px-20 mr-16',
                          { 'dynamic__button--active': tags.length && tags.includes(tag.tagId) },
                        )}
                        onClick={() => addDeleteFilterTag(tag.tagId)}
                      >
                        {tag.tagName} ({tag.total})
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              <div className="filter__static d-flex align-items-center">
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
            {webGames.games.length < 1 ? (
              <div className="d-flex flex-column align-items-center">
                <EmptyDataIcon className="mx-auto pt-32" />
                <Typography variant="text" color="grey_additional_2" className="mt-16 mx-auto pb-32">
                  Упс! Пока нет никаких игр
                </Typography>
              </div>
              ) : (
                <>
                  <div className="d-flex flex-wrap">
                    {webGames.games.map((item, index) => (
                      <CardGame
                        key={index}
                        className="my-games__card-game mb-24 mr-24"
                        {...item}
                      />
                    ))}
                  </div>
                  <Pagination
                    total={webGames.total || pageSize}
                    page={bodyParams.page}
                    pageSize={pageSize}
                    onGetPage={onPageClick}
                  />
                </>
            )}
          </>
        )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  employment: state.employmentReducer.employment.data,
  webGames: state.gameReducer.webGames.data,
  webGamesLoading: state.gameReducer.loading,
  webPopularGames: state.gameReducer.webPopularGames.data,
  webPopularGamesLoading: state.gameReducer.webPopularGames.loading,
});

export const mapDispatchToProps = {
  getGames,
  getPopularGames,
  getPlayGame,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(MyGames);
