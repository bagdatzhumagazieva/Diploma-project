import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import tagsActions from 'src/store/tag/actions';
import { connect } from 'react-redux';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import Button from 'src/components/atoms/Button';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import Image from 'src/components/atoms/Image';
import Loader from 'src/components/atoms/Loader';
import Typography from 'src/components/atoms/Typography';
import Pagination from 'src/components/atoms/Pagination';
import Input from 'src/components/molecules/Input';
import Modal from 'src/components/molecules/Modal';

import { TagsTypes } from 'src/store/tag/types';
import { DELETE_TAG_ERROR, DELETE_TAG_SUCCESS } from 'src/components/organisms/AdminTags/consts';
import { IRenderBody } from 'src/core/components/types';
import { AdminTagsTypes, IKeyword, ITag } from 'src/components/organisms/AdminTags/types';
import IconPlus from 'src/assets/img/icons/plus.svg';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import './index.scss';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';

function AdminTags(props: AdminTagsTypes.IProps) {
  const {
    getTags, tags: propsTags, companyId,
    alphabet, createTag, createdTagState,
    clearTagsState, getTagsByKeyword,
    tagsByKeyword, deleteTag, editTag,
  } = props;

  // todo make one modal for three actions
  const [isShowCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isShowDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isShowEditModal, setShowEditModal] = useState<boolean>(false);
  const [createdName, setCreatedName] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<ITag>();
  const [total , setTotal] = useState<number>(0);
  const pageSize = 40;
  const [keyWord, setKeyword] = useState<IKeyword>({ letter: '', input: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const defaultQueryParams:TagsTypes.IQueryParams = {
    companyId,
    pageSize,
    page: 1,
  };
  const notification = useNotification();
  const [curTags, setCurTags] = useState<TagsTypes.IRenderProps[]>([]);

  useEffect(
    () => {
      createdTagState && addNotification(createdTagState);
    },
    [createdTagState],
  );

  const addNotification = (notificationBody: IRenderBody) => {
    notification.addStateNotification(notificationBody);
    clearTagsState && clearTagsState();
  };

  useEffect(
    () => {
      if (!keyWord.input && !keyWord.letter) {
        getTags && getTags(defaultQueryParams);
      } else {
        const searchedVal = keyWord.letter || keyWord.input;
        getTagsByKeyword && getTagsByKeyword({ ...defaultQueryParams, keyword: searchedVal, page: 1 });
      }
    },
    [keyWord],
  );
  useEffect(
    () => {
      if (propsTags && propsTags.total && propsTags.total !== total) {
        setTotal(propsTags.total);
      }
      setLoading(propsTags?.loading);
      setCurTags(propsTags?.data || []);
    },
    [propsTags],
  );

  useEffect(
    () => {
      if (tagsByKeyword && tagsByKeyword.total && tagsByKeyword.total !== total) {
        setTotal(tagsByKeyword.total);
      }
      setLoading(propsTags?.loading);
      setCurTags(tagsByKeyword?.data || []);
    },
    [tagsByKeyword],
  );

  useEffect(
    () => {
      getTags && getTags(defaultQueryParams);
    },
    [],
  );

  const onShowDeleteModal = (event: React.MouseEvent<SVGElement>) => (tag: ITag) => {
    event.stopPropagation();
    event.preventDefault();
    setShowDeleteModal(true);
    setSelectedTag(tag);
  };

  const onEditClick = (event: React.MouseEvent<HTMLDivElement>) => (tag: ITag) => {
    event.stopPropagation();
    event.preventDefault();
    setShowEditModal(true);
    setSelectedTag(tag);
    setCreatedName(tag.name);
  };

  const onCreateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCreatedName(event.target.value);
  };

  const onCreateCancelButtonClick = () => {
    setCreatedName('');
    setShowCreateModal(false);
  };

  const onCreateSubmitButtonClick = () => {
    if (createdName.length < 1) return;
    setShowCreateModal(false);
    createTag && createTag(companyId, createdName, {
      onSuccess: () => {
        getTags && getTags(defaultQueryParams);
        setCreatedName('');
      },
      onError: () => {
        setCreatedName('');
      },
    });
  };

  const onPaginationPageClick = (page: number) => {
    if (!keyWord.input && !keyWord.letter) {
      const queryParams = { ...defaultQueryParams, page };
      getTags && getTags(queryParams);
    } else {
      const queryParams = {
        ...defaultQueryParams,
        page: page - 1,
        keyWord: keyWord.letter || keyWord.input,
      };
      getTagsByKeyword && getTagsByKeyword(queryParams);
    }
  };

  const onInputSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword({ letter: '', input: event.target.value });
  };

  const onLetterClick = (letter: string) => {
    setKeyword({ letter, input: '' });
  };

  const onDeleteButtonClick = (tagId: number) => {
    deleteTag && deleteTag(+companyId, tagId, {
      onSuccess: () => {
        getTags && getTags(defaultQueryParams);
        setSelectedTag(undefined);
        addNotification(DELETE_TAG_SUCCESS);
      },
      onError: () => {
        setSelectedTag(undefined);
        addNotification(DELETE_TAG_ERROR);
      },
    });
    setShowDeleteModal(false);
  };

  const onDeleteCancelButtonClick = () => {
    setShowDeleteModal(false);
    setSelectedTag(undefined);
  };

  const onEditCancelButtonClick = () => {
    setShowEditModal(false);
    setSelectedTag(undefined);
    setCreatedName('');
  };

  const onEditSubmitButtonClick = (tag: ITag) => {
    setShowEditModal(false);
    editTag && editTag(tag.id, createdName, {
      onSuccess: () => {
        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Тег успешно изменен' });
        getTags && getTags(defaultQueryParams);
        setSelectedTag(undefined);
        setCreatedName('');
      },
      onError: () => {
        setSelectedTag(undefined);
        setCreatedName('');
      },
    });
  };

  return (
    <div className="admin-tags d-flex flex-column pt-32">
      <div className="d-flex align-items-baseline mb-24">
        <Typography variant="headline" className="mr-8">Теги</Typography>
        <Typography variant="text">({total})</Typography>
      </div>
      <div className="d-flex justify-content-between align-items-end mb-16">
        <Input
          type="text"
          label="Поиск тега"
          placeholder="Название"
          classNames="admin-tags__input-searcher"
          onChange={onInputSearchChange}
          value={keyWord.input}
          icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
        />
        <Button
          className="d-flex align-items-center py-14 px-24"
          variant="textmed"
          onClick={() => setShowCreateModal(true)}
        >
          <Image
            src={IconPlus}
            alt="add button"
            className="mr-8"
          />
          Создать тег
        </Button>
      </div>
      <div className="admin-tags__content px-32 pt-32 pb-10">
        <div className="admin-tags__alphabet d-flex flex-wrap pt-8">
          <Button
            key="all"
            type="link"
            variant="subtext"
            className={classNames(
              'alphabet__letter mr-24 mb-16',
              { 'alphabet__letter--active': !keyWord.letter && !keyWord.input },
            )}
            onClick={() => setKeyword({ letter: '', input: '' })}
          >
            Все
          </Button>
          {alphabet.map((item, index) => (
            <Button
              key={index}
              type="link"
              variant="subtext"
              className={classNames(
                'alphabet__letter mr-24 mb-16',
                { 'alphabet__letter--active': keyWord.letter === item },
              )}
              onClick={() => onLetterClick(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="admin-tags__list-block pt-32">
          <Typography variant="h2">Все теги</Typography>
          <div
            className={classNames(
              'admin-tags__list mt-24 d-flex flex-wrap align-content-start',
              { 'align-content-center': loading },
            )}
          >
            {curTags && curTags.map(item => (
              <div
                key={item.id}
                className="list__item mr-8 py-4 px-12 d-flex align-items-center"
                onClick={e => onEditClick(e)({ id: item.id, name: item.name })}
              >
                <Typography variant="text" className="mr-8">#{item.name}</Typography>
                <CancelIcon
                  className="item__delete-icon"
                  color="#7A7B82"
                  onClick={(e: React.MouseEvent<SVGElement>) => onShowDeleteModal(e)({ id: item.id, name: item.name })}
                />
              </div>
            ))}
            {loading && <Loader className="mx-auto"/>}
          </div>
        </div>
      </div>
      <Pagination
        pageSize={pageSize}
        total={total || pageSize}
        className="mt-16"
        onGetPage={onPaginationPageClick}
      />
      {isShowCreateModal && (
        <Modal
          width={422}
          isSaveButtonDisable={createdName.length < 1}
          title="Создание тега"
          saveLabel="Создать"
          cancelLabel="Отмена"
          onCloseClick={onCreateCancelButtonClick}
          onSaveClick={onCreateSubmitButtonClick}
        >
          <div className="px-32 pt-8">
            <Input
              type="text"
              label="Название"
              placeholder="Введите название"
              value={createdName}
              onChange={onCreateInputChange}
            />
          </div>
        </Modal>
      )}
      {isShowDeleteModal && (
        <Modal
          width={422}
          title="Удаление тега"
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          closeColor="#7A7B82"
          onCloseClick={onDeleteCancelButtonClick}
          onDeleteClick={selectedTag?.id ? () => onDeleteButtonClick(selectedTag.id) : undefined}
        >
          <Typography
            variant="text"
            className="px-32 mt-8"
          >
            Вы действительно хотите удалить данный тег?
          </Typography>
        </Modal>
      )}
      {selectedTag && isShowEditModal && (
        <Modal
          width={422}
          isSaveButtonDisable={createdName === selectedTag.name}
          title="Редактирование тега"
          saveLabel="Изменить"
          cancelLabel="Отмена"
          onCloseClick={onEditCancelButtonClick}
          onSaveClick={() => onEditSubmitButtonClick(selectedTag)}
        >
          <div className="px-32 pt-8">
            <Typography variant="text" className="mb-28">
              При редактировании тега, все карточки можно будет найти только по новым, измененным названиям
            </Typography>
            <Input
              type="text"
              label="Название"
              placeholder="Введите название"
              value={createdName}
              onChange={onCreateInputChange}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  tags: state.tagReducer.tags,
  tagsByKeyword: state.tagReducer.tagsByParams,
  createdTagState: state.tagReducer.createdTagState.data,
});

const mapDispatchToProps = {
  getTags: tagsActions.getTags,
  createTag: tagsActions.createTag,
  clearTagsState: tagsActions.clearTagsState,
  getTagsByKeyword: tagsActions.getTagsByParams,
  deleteTag: tagsActions.deleteTag,
  editTag: tagsActions.editTag,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(AdminTags));
