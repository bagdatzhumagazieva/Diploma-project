import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import commentActions from 'src/store/comment/actions';
import { parseCreatedCommentData } from 'src/store/comment/parsers';

import Button from 'src/components/atoms/Button';
import CardCommentContainer from 'src/components/organisms/Comments/CardComment';
import Typography from 'src/components/atoms/Typography';
import CommentContext from 'src/components/organisms/Comments/CommentsContext';
import { GroupTypes } from 'src/components/organisms/Comments/types';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { CommentTypes } from 'src/store/comment/types';

function Comments(props: GroupTypes.IProps) {
  const {
    rootComments: propsRootComments, className, createComment, profile,
    uuid, type, getRootComments, totalRootComments: propsTotalRootComments = 0, isAdmin,
    clearComments,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [curParentId, setCurParentId] = useState<number>(-1);
  const [totalRootComments, setTotalRootComments] = useState<number>(-1);
  const value = { curParentId, setCurParentId };
  const [showAddDelBtns, setShowAddDelBtns] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [rootComments, setRootComments] = useState<CommentTypes.IRender[]>([]);
  const [newRootComments, setNewRootComments] = useState<CommentTypes.IRender[]>([]);
  const [curPage, setCurPage] = useState(1);
  const createDefaultBody = {
    entityType: type,
    entityUuid: uuid,
    text: '',
  };
  const commentParams = {
    companyId,
    page: 1,
    pageSize: 8,
  };

  const onTextareaPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 13) {
      const element = document.getElementById('course-id') as HTMLTextAreaElement;
      if (element) {
        const { value } = element;
        if (value.length < 1) {
          event.preventDefault();
          return;
        }
        onCreateComment();
      }
      event.preventDefault();
    }
  };

  const onCreateComment = () => {
    if (createComment && commentText.length > 0) {
      createComment(companyId, { ...createDefaultBody, text: commentText }, {
        onSuccess: (response: any) => {
          if (!response || !response.data || !response.data.id) return;
          setNewRootComments(prevState => [parseCreatedCommentData(response.data, profile), ...prevState]);
          setCommentText('');
        },
      });
      setShowAddDelBtns(false);
    }
  };

  const onRefreshRootComments = (id: number, isNewRoot?: boolean) => {
    isNewRoot
      ? setNewRootComments(newRootComments.filter(e => e.id !== id))
      : setRootComments(rootComments?.filter(e => e.id !== id));
    !isNewRoot && setTotalRootComments(totalRootComments - 1);
  };

  useEffect(
    () => {
      if (!uuid) return;
      getRootComments && getRootComments(uuid, commentParams);
      setRootComments([]);
    },
    [uuid],
  );

  useEffect(
    () => {
      if (propsTotalRootComments) setTotalRootComments(propsTotalRootComments);
    },
    [propsTotalRootComments],
  );

  useEffect(
    () => {
      if (!Array.isArray(propsRootComments)) return;
      setRootComments(propsRootComments);
    },
    [propsRootComments],
  );

  useEffect(
    () => {
      return () => {
        clearComments && clearComments();
      };
    },
    [],
  );

  const getNextComments = () => {
    getRootComments && getRootComments(uuid, { ...commentParams, page: curPage + 1 }, {
      onSuccess: () => {
        setCurPage(prevState => prevState + 1);
      },
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setCommentText(value);
  };

  const onCreateCommentCancel = () => {
    setShowAddDelBtns(false);
    setCommentText('');
  };

  return (
    <CommentContext.Provider value={value}>
      <div className={classNames('d-flex flex-column', className)}>
        <Typography variant="h2" className="mb-16">Обсуждение</Typography>
        <hr className="comments__line" />
        <textarea
          id={'course-id'}
          rows={1}
          placeholder="Оставить комментарий..."
          className="comments__textarea font my-24"
          onKeyDown={onTextareaPress}
          onChange={handleInputChange}
          value={commentText}
          onFocus={() => setShowAddDelBtns(true)}
        />
        {showAddDelBtns && (
          <div className="d-flex align-self-end">
            <Button type="link-black" variant="textmed" className="p-8 mr-64" onClick={onCreateCommentCancel}>
              Отмена
            </Button>
            <Button variant="textmed" className="py-10 px-40" onClick={onCreateComment}>Добавить</Button>
          </div>
        )}
        {newRootComments.length > 0 && (
          <div>
            {newRootComments.map(item => (
              <CardCommentContainer
                isNewRoot
                key={item.id}
                courseUuid={uuid}
                companyId={companyId}
                onRefreshRootComments={onRefreshRootComments}
                {...item}
                isAdmin={isAdmin}
                rootId={item.id}
                parentId={item.id}
                profile={profile}
              />
            ))}
          </div>
        )}
        {rootComments.length > 0 && (
          <div>
            {rootComments.map(item => (
              <CardCommentContainer
                key={item.id}
                courseUuid={uuid}
                companyId={companyId}
                onRefreshRootComments={onRefreshRootComments}
                {...item}
                isAdmin={isAdmin}
                rootId={item.id}
                parentId={item.id}
                profile={profile}
              />
            ))}
          </div>
        )}
        {rootComments.length > 0 && totalRootComments > rootComments.length && (
          <Button
            type="link"
            variant="subtext"
            className="align-self-start mt-32"
            onClick={getNextComments}
          >
            Показать другие комментарии ({totalRootComments - rootComments.length})
          </Button>
        )}
      </div>
    </CommentContext.Provider>
  );
}

const mapStateToProps = (state: any) => ({
  rootComments: state.commentReducer.rootComments.data,
  totalRootComments: state.commentReducer.rootComments.total,
  rootCommentsNextPage: state.commentReducer.rootComments.nextPage,
  profile: state.profileReducer.profile.data,
});

export const mapDispatchToProps = {
  createComment: commentActions.createComment,
  getRootComments: commentActions.getRootComments,
  clearComments: commentActions.clearComments,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(Comments);
