import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import { CommentTypes, GET_ROOT_COMMENTS } from 'src/store/comment/types';
import { parseCommentData } from 'src/store/comment/parsers';
import { combineReducers } from 'redux';

const rootComments = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ comments: CommentTypes.IResponse[] }>>,
): ILoadTypes<CommentTypes.IRender[] | null> => {
  switch (action.type) {
    case GET_ROOT_COMMENTS.clear:
      return {
        data: null,
        loading: false,
      };
    case GET_ROOT_COMMENTS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ROOT_COMMENTS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ROOT_COMMENTS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { comments, total } = action.data;
      const parsed = Array.isArray(comments) ? comments.map(n => parseCommentData(n)) : [];

      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const commentReducer = combineReducers(
  {
    rootComments,
  });

export default commentReducer;
