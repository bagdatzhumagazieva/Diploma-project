import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import { TemplateTypes, GET_GAME_TEMPLATE } from 'src/store/game/template/types';
import { parseTemplateData } from 'src/store/game/template/parsers';
import { combineReducers } from 'redux';

const templates = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ game_templates: any }>>,
): ILoadTypes<TemplateTypes.ITemplate[] | null> => {
  switch (action.type) {
    case GET_GAME_TEMPLATE.started:
      return {
        data: null,
        loading: true,
      };
    case GET_GAME_TEMPLATE.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_GAME_TEMPLATE.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { game_templates, total } = action.data;
      const parsedTemplates = game_templates.map((item: any) => parseTemplateData(item));
      return {
        total,
        data: parsedTemplates,
        loading: false,
      };
    default:
      return state;
  }
};

const gameTemplateReducer = combineReducers({
  templates,
});

export default gameTemplateReducer;
