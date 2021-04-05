import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { useLocation, withRouter } from 'react-router';
import useDebounce from 'src/hooks/useDebounce';
import useNotification from 'src/components/molecules/Notification/useNotification';
import ModalLoading from 'src/components/atoms/ModalLoading';

import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Pagination from 'src/components/atoms/Pagination';
import Button from 'src/components/atoms/Button';
import Modal from 'src/components/molecules/Modal';
import Table from 'src/components/molecules/Table';
import Select from 'src/components/molecules/Select';
import Input from 'src/components/molecules/Input';

import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import groupActions from 'src/store/group/actions';
import shopAction from 'src/store/item/actions';

import { PrizeTableData } from 'src/pages/AdminPages/Shop/Tabs/Prize/const';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { PrizeTypes } from 'src/pages/AdminPages/Shop/Tabs/Prize/types';
import { ShopPrizesTypes } from 'src/store/item/types';
import { IOption } from 'src/components/molecules/Select/types';
import { GroupTypes } from 'src/store/group/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import IconPlus from 'src/assets/img/icons/plus.svg';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import { ReactComponent as IconDelete } from 'src/assets/img/icons/delete.svg';
import 'src/pages/AdminPages/Shop/Tabs/Prize/index.scss';
import { SortDirection } from 'src/components/molecules/Table/types';

function Prize(props: PrizeTypes.IProps) {

  const { getGroups, groups, companyId, getAdminPrizes, prizes, deletePrizes, history, prizesLoading } = props;

  const pageSize = 10;
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>([]);
  const [searchName, setSearchName] = useState('');
  const [selectedDelItem, setSelectedDelItem] = useState<number>();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const debounceSearchValue = useDebounce(searchName, 500);
  const notification = useNotification();
  const location = useLocation();
  const { page } = queryString.parse(location.search);
  const [bodyParams, setBodyParams] = useState<ShopPrizesTypes.IQueryProps>(
    { page: page ? +page : 1, page_size: pageSize, keyword: '' });

  const headerData = [
    ...PrizeTableData,
    {
      key: 'delete',
      name: '',
      width: '72px',
      render: (n: ShopPrizesTypes.IRenderItem) => (
        <IconDelete
          className="shop-prize__item__icon"
          onClick={() => { setSelectedDelItem(n.id); }}
        />
      ),
    },
  ];

  useEffect(
    () => {
      getGroups && getGroups({ companyId });
      getAdminPrizes && getAdminPrizes(bodyParams, companyId);
    },
    [companyId],
  );

  useEffect(
    () => {
      setBodyParams((prevState) => {
        const newFilterData =  { ...prevState, keyword: debounceSearchValue };
        getAdminPrizes && getAdminPrizes(newFilterData, companyId);
        return newFilterData;
      });
    },
    [debounceSearchValue],
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

  const onSelectGroupsChange = (options: IOption[]) => {
    setSelectedGroups(options);
    const newParams = {
      ...bodyParams,
      groupIds: options.filter(n => n.checkboxChecked).map(e => +e.value),
    };
    setBodyParams(newParams);
    getAdminPrizes && getAdminPrizes(newParams, companyId);
  };

  const onDeletePrize = (id: number) => {
    setPageLoading(true);
    setSelectedDelItem(undefined);
    deletePrizes && deletePrizes(companyId, id, {
      onSuccess: () => {
        const timeId = setTimeout(
          () => {
            getAdminPrizes && getAdminPrizes({ ...bodyParams, page: 1 }, companyId, {
              onSuccess: () => {
                notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Приз успешно удален' });
                setPageLoading(false);
              },
            });
            clearTimeout(timeId);
          },
          1500,
        );
      },
      onError: () => {
        notification.add({
          ...DEFAULT_NOTIFICATION_DATA,
          description: 'Товар удалить невозможно так как у него есть покупатели. ' +
            'Вы можете уменьшить кол-во товаров в настроках товара, для того чтобы скрыть товар.',
          type: NotificationType.Danger,
        });
        setPageLoading(false);
      },
    });
  };

  const onPaginationPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page });
    history.push(`${location.pathname}?page=${page}`);
    getAdminPrizes && getAdminPrizes({ ...bodyParams, page }, companyId);
  };

  const handleTableSort = (label: string, sortDirection: SortDirection) => {
    const descValue = sortDirection === 'desc';
    setBodyParams({ ...bodyParams, sortBy: label, desc: descValue });
    getAdminPrizes && getAdminPrizes({ ...bodyParams, sortBy: label, desc: descValue }, companyId);
  };

  return (
    <div className="shop-prize grid pb-64">
      <Typography variant="h1" className="mt-32 d-flex align-items-center">
        Список призов
        <Typography variant="text" className="ml-8">
          ({prizes?.total || 0})
        </Typography>
      </Typography>
      <div className="d-flex mt-24 justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <Typography variant="subtext" className="mb-4">
              Поиск призов
            </Typography>
              <Input
                type="text"
                placeholder="Название"
                classNames="shop-prize__searcher-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
                icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
              />
          </div>
          <Select
            staticWidth
            withCheckbox
            width={288}
            label="Группы"
            options={selectedGroups}
            onCheckboxChanges={onSelectGroupsChange}
            customTitle="Выберите группы"
            classNames="color_grey__bg ml-32"
          />
        </div>
        <div className="d-flex">
          <Button
            className="d-flex align-items-center shop-prize__btn"
            variant="textmed"
            to={`${addAdminSlash(AdminRouterPaths.SHOP_CREATION)}`}
          >
            <Image src={IconPlus} alt="add button" className="mr-8" />
            Создать приз
          </Button>
        </div>
      </div>
      <Table
        checkbox
        headerData={headerData}
        bodyData={prizes?.prizes || []}
        wrapperClassName="mt-16"
        loading={prizesLoading}
        onSort={handleTableSort}
      />
      <Pagination
        pageSize={pageSize}
        total={prizes?.total || pageSize}
        className="mt-16"
        page={bodyParams.page}
        onGetPage={onPaginationPageClick}
      />
      {selectedDelItem !== undefined && (
        <Modal
          width={422}
          title="Удаление приза"
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          closeColor="#7A7B82"
          onCloseClick={() => setSelectedDelItem(undefined)}
          onDeleteClick={() => onDeletePrize(selectedDelItem)}
        >
          <Typography
            variant="text"
            className="px-32 mt-8"
          >
            Вы действительно хотите удалить данный приз?
          </Typography>
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
  prizes: state.itemReducer.prizes.data,
  prizesLoading: state.itemReducer.prizes.loading,
});

const mapDispatchToProps = {
  getAdminPrizes: shopAction.getAdminPrizes,
  deletePrizes: shopAction.deletePrizes,
  getGroups: groupActions.getGroups,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Prize));
