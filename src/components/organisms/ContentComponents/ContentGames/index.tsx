import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router';
import useDebounce from 'src/hooks/useDebounce';

import { getGroups } from 'src/store/group/actions';
import { getTemplates } from 'src/store/game/template/actions';
import { deleteGame, gameToPublish, getAdminGames, gameToDraft } from 'src/store/game/actions';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import { DEFAULT_DATE_FORMAT } from 'src/core/store/values';

import Image from 'src/components/atoms/Image';
import Pagination from 'src/components/atoms/Pagination';
import Typography from 'src/components/atoms/Typography';
import Table, { TableWithCheckboxes } from 'src/components/molecules/Table';
import Button from 'src/components/atoms/Button';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import ModalLoading from 'src/components/atoms/ModalLoading';
import useNotification from 'src/components/molecules/Notification/useNotification';
import Select from 'src/components/molecules/Select';
import DateRangePicker from 'src/components/molecules/DateRangePicker';
import Input from 'src/components/molecules/Input';
import GameDetail from 'src/components/molecules/GameDetail';
import Modal from 'src/components/molecules/Modal';
import TableOptions from 'src/components/molecules/TableOptions';

import {
  DEFAULT_GAMES_FILTERS,
  GAME_STATUSES,
  parserGameResponse,
  TABLE_HEADER,
} from 'src/components/organisms/ContentComponents/ContentGames/consts';
import { CONVERT_GROUPS_TO_OPTIONS } from 'src/components/organisms/CourseCreationEdition/GeneralInformation/consts';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { ICardGame } from 'src/components/molecules/Cards/CardGame/types';
import { GroupTypes } from 'src/store/group/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ContentGamesTypes } from 'src/components/organisms/ContentComponents/ContentGames/types';
import { GameAdminTypes } from 'src/store/game/types';
import { SortDirection } from 'src/components/molecules/Table/types';
import { Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import IconPlus from 'src/assets/img/icons/plus.svg';

import 'src/components/organisms/ContentComponents/ContentGames/index.scss';

function ContentGames(props: ContentGamesTypes.IProps) {

  const { getGroups, companyId, groups, getAdminGames,
    games: propsGames, deleteGame, getTemplates, templates: propsTemplates,
    gamesLoading, gameToPublish, gameToDraft } = props;

  const location = useLocation();
  const pageSize = 10;
  const notification = useNotification();
  const { page } = queryString.parse(location.search);
  const defaultBodyParams = {
    page: page ? +page : 1, page_size: pageSize,
  };
  const history = useHistory();

  const [searchName, setSearchName] = useState<string>('');
  const [showFilter, setShowFilter] = useState<boolean>();
  const [isResetFilters, setResetFilters] = useState<boolean>();
  const [filters, setFilters] = useState<ContentGamesTypes.IFilter>(DEFAULT_GAMES_FILTERS);
  const [games, setGames] = useState<TableWithCheckboxes<ICardGame>[]>([]);
  const [showGameDetailModal, setShowGameDetailModal] = useState<boolean>(true);
  const [selectedGameIndex, setSelectedGameIndex] = useState<number>(-1);
  const [bodyParams, setBodyParams] = useState<GameAdminTypes.IQueryProps>(defaultBodyParams);
  const [dateRange, setDateRange] = useState<any>();
  const [selectedData, setSelectedData] = useState<ContentGamesTypes.ISelectedData>();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const debounceSearchValue = useDebounce(searchName, 500);

  const onNameClick = (id: number) => {
    setSelectedGameIndex(games.findIndex(item => item.id === id));
    setShowGameDetailModal(true);
  };

  const getGames = (params: GameAdminTypes.IQueryProps, callback?: any) => {
    getAdminGames && getAdminGames(companyId, params, callback);
  };

  const tableHeader = [
    ...TABLE_HEADER(onNameClick),
    {
      key: 'option',
      name: '',
      width: '72px',
      render: () => (
        <TableOptions />
      ),
    },
  ];

  useEffect(
    () => {
      const groupsQueryParams: GroupTypes.IQueryParams = {
        companyId,
        page: 1,
        pageSize: 100,
      };
      getGroups && getGroups(groupsQueryParams);
      getTemplates && getTemplates();
    },
    [],
  );

  useEffect(() => {
    if (propsGames) {
      setGames(parserGameResponse(propsGames?.games));
    }
  },        [propsGames]);

  useEffect(() => {
    if (propsTemplates) {
      setFilters({
        ...filters,
        shells: propsTemplates.map(e => ({ id: `${e.id}`, value: `g_${e.id}`, name: e.name })),
      });
    }
  },        [propsTemplates]);

  useEffect(
    () => {
      setBodyParams((prevState) => {
        const newFilterData =  { ...prevState, keyword: debounceSearchValue };
        getGames(newFilterData);
        return newFilterData;
      });
    },
    [debounceSearchValue],
  );

  useEffect(
    () => {
      if (!groups) return;
      setFilters(prevState => ({ ...prevState, groups: CONVERT_GROUPS_TO_OPTIONS(groups) }));
    },
    [groups],
  );

  const onSelectGroups = (options: IOption[]) => {
    setFilters(prevState => ({ ...prevState, groups: options }));
    setBodyParams((prevState) => {
      const newBodyParams = { ...prevState, groupIds: options.filter(n => n.checkboxChecked).map(e => +e.value) };
      getGames(newBodyParams);
      return newBodyParams;
    });
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onDateRangeChange = (dateRange: any) => {
    setDateRange(dateRange);
    const newParam = {
      ...bodyParams,
      startTime: dateRange?.start?.format(DEFAULT_DATE_FORMAT),
      endTime: dateRange?.end?.format(DEFAULT_DATE_FORMAT),
    };
    setBodyParams(newParam);
    getGames(newParam);
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const updateData = (description: string) => {
    // Data in the search service does not have enough time to update
    setPageLoading(true);
    setBodyParams({ ...bodyParams, page: 1 });
    history.push(`${location.pathname}`);
    const timeId = setTimeout(
      () => {
        getGames({ ...bodyParams, page: 1 }, {
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

  const onDeleteGame = (id: number) => {
    setSelectedData(undefined);
    setShowGameDetailModal(false);
    setPageLoading(true);
    deleteGame && deleteGame(id, {
      onSuccess: () => {
        updateData('Игра успешно удалена!');
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const onDraftPublishGame = () => {
    setSelectedData(undefined);
    setPageLoading(true);
    if (selectedData?.action === Action.PUBLISH) {
      gameToPublish && gameToPublish([selectedData.id], companyId, {
        onSuccess: () => {
          updateData('Изменения успешно сохранены.');
          setPageLoading(false);
        },
        onError: () => {
          setPageLoading(false);
        },
      });
    } else if (selectedData?.action === Action.DRAFT) {
      gameToDraft && gameToDraft([selectedData.id], companyId, {
        onSuccess: (response: any) => {
          if (!response || typeof response.id !== 'number') {
            return;
          }
          updateData('Изменения успешно сохранены.');
          setPageLoading(false);
        },
        onError: () => {
          setPageLoading(false);
        },
      });
    }
  };

  const onSelectStatus = (option: IOption) => {
    const newParam = {
      ...bodyParams,
      status: option.value,
    };
    setFilters({ ...filters, status: option });
    setBodyParams(newParam);
    getGames(newParam);
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onSelectShell = (option: IOption) => {
    const newParam = {
      ...bodyParams,
      templateId: option.id ? +option.id : 0,
    };
    setFilters({ ...filters, template: option.name });
    setBodyParams(newParam);
    getGames(newParam);
    if (!isResetFilters) {
      setResetFilters(true);
    }
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    const newBodyParams = {
      ...bodyParams,
      sortBy: (sortDirection !== SortDirection.Default) ? label : undefined,
      desc: sortDirection === SortDirection.Descend,
      page: 1,
    };
    setBodyParams(newBodyParams);
    getGames(newBodyParams);
  };

  const onPaginationPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page });
    getGames({ ...bodyParams, page });
  };

  const onResetFilter = () => {
    setDateRange(undefined);
    setBodyParams(defaultBodyParams);
    getGames(defaultBodyParams);
    setFilters(DEFAULT_GAMES_FILTERS);
    setResetFilters(false);
  };

  const modeActions = (mode: Action, id: number, name: string) => {
    if (mode === Action.CHANGE) {
      history.push(addAdminSlash(`${AdminRouterPaths.GAME_EDITION}/${id}`));
    } else {
      setSelectedData({ id, name, action: mode });
    }
  };

  return (
    <div className="content-games py-24">
      <div className="d-flex align-items-center mb-24">
        <Typography variant="h1">
          Игры
        </Typography>
        <Typography
          variant="text"
          className="ml-8"
        >
          ({propsGames?.total || '0'})
        </Typography>
      </div>
      <div className="content-games__content">
        <div className="d-flex justify-content-between">
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
                classNames="content-games__input-searcher"
                value={searchName}
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
              className="align-items-center ml-5 mt-3"
              onClick={onResetFilter}
            >
              Очистить фильтры
            </Button>
          </div>
          <Button
            className="align-self-end d-flex align-items-center py-12 px-24"
            variant="textmed"
            to={addAdminSlash(AdminRouterPaths.GAME_CREATION)}
          >
            <Image
              src={IconPlus}
              alt="add button"
              className="mr-8"
            />
            Создать игру
          </Button>
        </div>
        {showFilter && (
          <div className="d-flex mt-24 justify-content-between">
            <Select
              staticWidth
              width={216}
              label="Оболочки"
              options={filters.shells || []}
              setSelectedOption={onSelectShell}
              customTitle={filters.template || 'Выберите оболочку'}
              classNames="color_grey__bg"
            />
            <Select
              staticWidth
              withCheckbox
              width={288}
              label="Группы"
              options={filters?.groups || []}
              onCheckboxChanges={onSelectGroups}
              customTitle="Выберите группы"
              classNames="color_grey__bg"
            />
            <div>
              <Typography
                variant="subtext"
                className="mb-4"
              >
                Дата создания
              </Typography>
              <DateRangePicker setDate={onDateRangeChange} date={dateRange} />
            </div>
            <Select
              staticWidth
              width={288}
              options={GAME_STATUSES}
              label="Статус"
              customTitle={filters.status?.name || 'Выберите статус'}
              className="color_grey__bg"
              setSelectedOption={onSelectStatus}
            />
          </div>
        )}
        <Table
          checkbox
          loading={gamesLoading}
          headerData={tableHeader}
          bodyData={games}
          onSort={onSort}
          onCheckboxChange={data => setGames(data)}
          wrapperClassName="content-games__table mt-16"
        />
      </div>
      <Pagination
        pageSize={pageSize}
        total={propsGames?.total || pageSize}
        className="mt-16"
        page={bodyParams.page}
        onGetPage={onPaginationPageClick}
      />
      {selectedGameIndex >= 0 && showGameDetailModal && (
        <Modal
          width={900}
          onCloseClick={() => setShowGameDetailModal(false)}
          closeColor="white"
        >
          <GameDetail {...games[selectedGameIndex]} modeActions={modeActions} variant="admin" />
        </Modal>
      )}
      {selectedData !== undefined && (
        <Modal
          width={422}
          title={selectedData.action === Action.DELETE ? 'Удаление игры' : 'Изменение статуса'}
          deleteLabel={selectedData.action === Action.DELETE ? 'Удалить' : undefined}
          cancelLabel="Отмена"
          saveLabel={selectedData.action === Action.DRAFT ? 'В черновик' :
            selectedData.action === Action.PUBLISH ? 'Опубликовать' : ''}
          onCloseClick={() => setSelectedData(undefined)}
          onDeleteClick={() => selectedData.action === Action.DELETE && onDeleteGame(selectedData?.id)}
          onSaveClick={() => selectedData.action === Action.DELETE ?
            onDeleteGame(selectedData?.id) : onDraftPublishGame()}
        >
          <div className="mx-32">
            <Typography
              variant="text"
            >
              Вы действительно хотите
              {selectedData.action === Action.DELETE ? ' удалить '
                :selectedData.action === Action.PUBLISH ? ' опубликовать ' : ' перенести в черновик '}
              игру - <Typography variant="h2" color="blacker">"{selectedData.name || ''}"</Typography>
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
  groups: state.groupReducer.groups.data,
  games: state.gameReducer.adminGames.data,
  gamesLoading: state.gameReducer.adminGames.loading,
  templates: state.gameTemplateReducer.templates.data,
});

const mapDispatchToProps = {
  getGroups,
  getAdminGames,
  deleteGame,
  getTemplates,
  gameToDraft,
  gameToPublish,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(ContentGames);
