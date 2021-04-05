import { IOption } from 'src/components/molecules/Select/types';
import { GroupTypes } from 'src/store/group/types';
import { GameAdminTypes } from 'src/store/game/types';
import { Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';
import { TemplateTypes } from 'src/store/game/template/types';

export namespace ContentGamesTypes {
  export interface IProps {
    companyId: number;
    games?: GameAdminTypes.IRenderProps;
    templates?: TemplateTypes.ITemplate[];
    groups?: GroupTypes.IRenderProps[];
    gamesLoading?: boolean;

    gameToPublish?(gameIds: number[], companyId: number, callback?: any): void;
    gameToDraft?(gameIds: number[], companyId: number, callback?: any): void;
    deleteGame?(id: number, callback?: any): void;
    getTemplates?(params?: TemplateTypes.IQueryParams): void;
    getAdminGames?(companyId: number, params: GameAdminTypes.IQueryProps, callback?: any): void;
    getGroups?(params: GroupTypes.IQueryParams, callbacks?: any): void;
  }

  export interface IFilter {
    page?: number;
    pageSize?: number;
    endTime?: string;
    startTime?: string;
    groups?: IOption[];
    shells?: IOption[];
    template?: string;
    status?: IOption;
    keyword?: string;
  }

  export interface ISelectedData {
    id: number;
    action: Action;
    name: string;
  }
}
