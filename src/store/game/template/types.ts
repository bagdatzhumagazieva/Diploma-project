export declare namespace TemplateTypes {
  export interface ITemplate {
    id: number;
    name: string;
    description: string;
    companyIds: number[];
    imageUrl: string;
    imageThumbnailUrl: string;
    engine: string;
    width: number;
    height: number;
    createdAt: string;
    updatedAt: string;
    uuid: string;
  }

  export interface IQueryParams {
    page: number;
    pageSize: number;
  }
}

export const GET_GAME_TEMPLATE = {
  started: 'GET_GAME_TEMPLATE_START',
  success: 'GET_GAME_TEMPLATE_SUCCESS',
  failed: 'GET_GAME_TEMPLATE_FAILED',
};
