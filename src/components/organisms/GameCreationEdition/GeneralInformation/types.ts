import { TemplateTypes } from 'src/store/game/template/types';
import { GroupTypes } from 'src/store/group/types';

export namespace GeneralInformationTypes {
  export interface IProps {
    companyId: number;
    templates?: TemplateTypes.ITemplate[];
    templatesNextPage?: number;
    groups?: GroupTypes.IRenderProps[];

    getGroups?(params: GroupTypes.IQueryParams): void;
    getTemplates?(params?: TemplateTypes.IQueryParams): void;
  }
}
