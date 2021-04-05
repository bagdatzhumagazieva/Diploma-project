import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';

import commentActions from 'src/store/comment/actions';
import { parseCommentData, parseCreatedCommentData } from 'src/store/comment/parsers';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import CommentsContext from 'src/components/organisms/Comments/CommentsContext';
import Modal from 'src/components/molecules/Modal';

import { ReactComponent as Arrow } from 'src/assets/img/icons/rounded-arrow-right.svg';
import { ReactComponent as DeleteIcon } from 'src/assets/img/icons/delete.svg';
import { CardCommentTypes } from 'src/components/organisms/Comments/types';
import { CommentTypes } from 'src/store/comment/types';
import 'src/components/organisms/Comments/index.scss';

function CardComment(props: CardCommentTypes.IProps) {
  const {
    id, employee, createdAt, text, className, rootCommentsCnt,
    getRootSubComments, companyId, courseUuid, rootId, createComment,
    type, profile, deleteComment, isNewRoot, parentId, isAdmin, onRefreshRootComments: onRefreshRootCommentsProps,
  } = props;

  const { setCurParentId, curParentId } = useContext(CommentsContext);
  const [subComments, setSubComments] = useState<CommentTypes.IRender[]>();
  const [newSubComments, setNewSubComments] = useState<CommentTypes.IRender[]>([]);
  const [newSubCommentsIds, setNewSubCommentIds] = useState<Set<number>>(new Set<number>());
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState<boolean>(false);
  const commentParams = {
    companyId,
    page: 1,
    pageSize: 20,
    rootCommentId: id,
  };
  const createDefaultBody: CommentTypes.ICreateBody = {
    rootId,
    entityType: type,
    entityUuid: courseUuid,
    text: '',
  };

  const onTextareaChange = () => {
    const element = document.getElementById(`${id}`);
    if (element) {
      element.style.height = '';
      element.style.height = `${Math.min(element.scrollHeight + 2)}px`;
    }
  };

  const onTextareaPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 27) {
      setCurParentId(-1);
      return;
    }
    if (event.keyCode === 13) {
      if (event.preventDefault) event.preventDefault();
    }
  };

  useEffect(
    () => {
      const element = document.getElementById(`${id}`) as HTMLTextAreaElement;
      if (element) {
        element.focus();
        element.selectionStart = element.textLength;
        element.selectionEnd = element.textLength;
      }
    },
    [curParentId],
  );

  const onCreateCommentClick = () => {
    const element = document.getElementById(`${id}`) as HTMLTextAreaElement;
    if (!element || !curParentId) return;
    const { value } = element;
    setCurParentId(-1);
    createComment && createComment(companyId, { ...createDefaultBody, text: value, parentCommentId: curParentId }, {
      onSuccess: (response: any) => {
        if (!response || !response.data || !response.data.id) return;
        setNewSubComments(prevState => [parseCreatedCommentData(response.data, profile), ...prevState]);
        const newSubCommentsIdsTmp = new Set<number>(newSubCommentsIds);
        newSubCommentsIdsTmp.add(response.data.id);
        setNewSubCommentIds(newSubCommentsIdsTmp);
      },
    });
  };

  const getSubComments = () => {
    getRootSubComments && getRootSubComments(courseUuid, commentParams, {
      onSuccess: (response: any) => {
        if (!response || !response.data || !response.data.comments || !Array.isArray(response.data.comments)) return;
        setSubComments(response.data.comments
                         .filter((item: CommentTypes.IResponse) => !newSubCommentsIds.has(item.entity_id))
                         .map((item: CommentTypes.IResponse) => parseCommentData(item)));
      },
    });
  };

  const onCloseDeleteModalButtonClick = () => {
    setShowDeleteCommentModal(false);
  };

  const onDeleteModalButtonClick = () => {
    setShowDeleteCommentModal(false);
    deleteComment && deleteComment(companyId, id, {
      onSuccess: () => {
        onRefreshRootCommentsProps && onRefreshRootCommentsProps(id, isNewRoot);
      },
    });
  };

  const onRefreshRootComments = (id: number, isNewRoot?: boolean) => {
    isNewRoot
      ? setNewSubComments(newSubComments.filter(e => e.id !== id))
      : setSubComments(subComments?.filter(e => e.id !== id));
  };

  return (
    <>
      <div className={classNames('card-comment d-flex flex-column mt-16', className)}>
        <div className="d-flex">
          <Image alt="user image" src={employee?.avatarThumbnailUrl} className="card-comment__image mr-16"/>
          <div className="d-flex flex-column fill_w">
            <div className="d-flex align-items-center">
              <Typography variant="textmed" className="mb-2">{employee?.fullName || '-'}</Typography>
              {(employee.userId === profile?.id || isAdmin) && (
                <DeleteIcon
                  width={16}
                  height={16}
                  className="ml-8 cursor-pointer"
                  onClick={() => setShowDeleteCommentModal(true)}
                />
              )}
            </div>
            <Typography variant="xsmall" className="mb-12">{moment(createdAt).format('DD.MM.YYYY')}</Typography>
            <Typography variant="subtext" className="mb-8">{text}</Typography>
            {curParentId !== id ? (
              <Button
                type="link-grey"
                variant="xsmall"
                className="align-self-start"
                onClick={() => setCurParentId(parentId)}
              >
                Ответить
              </Button>
            ) : (
              <div className="d-flex flex-column">
                <textarea
                  id={`${id}`}
                  rows={1}
                  className="card-comment-with-child__textarea align-self-end mt-16 fill_w"
                  onKeyDown={onTextareaPress}
                  onChange={onTextareaChange}
                />
                <div className="d-flex align-self-end mt-24">
                  <Button
                    type="link"
                    className="mr-64"
                    variant="textmed"
                    onClick={() => setCurParentId(-1)}
                  >
                    Отмена
                  </Button>
                  <Button
                    variant="textmed"
                    className="ml-8 py-10 px-40 card-comment-with-child__send-button"
                    onClick={() => onCreateCommentClick()}
                  >
                    Отправить
                  </Button>
                </div>
              </div>
            )}
            {subComments && subComments.length > 0 && (
              <div className="card-comment__replies">
                {subComments.map(item => (
                  <CardCommentContainer
                    key={item.id}
                    companyId={companyId}
                    courseUuid={courseUuid}
                    onRefreshRootComments={onRefreshRootComments}
                    {...item}
                    isAdmin={isAdmin}
                    profile={profile}
                    parentId={id}
                    rootId={rootId}
                  />
                ))}
              </div>
            )}
            {!subComments && rootCommentsCnt > 0 && (
              <div className="d-flex align-items-end">
                <Arrow className="mr-10" />
                <Button
                  type="link-black"
                  variant="xsmall"
                  onClick={getSubComments}
                >
                  {rootCommentsCnt} ответа
                </Button>
              </div>
            )}
            {newSubComments && newSubComments.length > 0 && (
              <div className="card-comment__replies">
                {newSubComments.map(item => (
                  <CardCommentContainer
                    isNewRoot
                    key={item.id}
                    companyId={companyId}
                    courseUuid={courseUuid}
                    isAdmin={isAdmin}
                    onRefreshRootComments={onRefreshRootComments}
                    {...item}
                    parentId={id}
                    profile={profile}
                    rootId={rootId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showDeleteCommentModal && (
        <Modal
          deleteLabel="Удалить"
          cancelLabel="Отмена"
          title="Удаление комментария"
          onCloseClick={onCloseDeleteModalButtonClick}
          onDeleteClick={onDeleteModalButtonClick}
        >
          <Typography variant="text" className="px-32" >
            Вы хотите удалить данный комментарий?
          </Typography>
        </Modal>
      )}
    </>
  );
}

export const mapDispatchToProps = {
  getRootSubComments: commentActions.getRootSubComments,
  createComment: commentActions.createComment,
  deleteComment: commentActions.deleteComment,
};

const CardCommentContainer = connect<any, any>(null, mapDispatchToProps)(CardComment);

export default CardCommentContainer;
