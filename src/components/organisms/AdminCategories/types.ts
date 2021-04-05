import { CategoryTypes } from 'src/store/category/types';
import { IRenderBody } from 'src/core/components/types';

export namespace AdminCategoriesTypes {
  export interface IProps {
    companyId: number;
    createdCategoryState?: IRenderBody;
    updatedCategoryState?: IRenderBody;
    deletedCategoryState?: IRenderBody;
    categories?: CategoryTypes.ICategoryRenderProps[];
    category?: CategoryTypes.ICategoryRenderProps;

    getCategories?(companyId: number, page?: number, pageSize?: number, callbacks?: any): void;
    createCategory?(companyId: number, data: CategoryTypes.ICreateCategoryBody, callbacks?: any): void;
    updateCategory?(companyId: number, data: CategoryTypes.IEditCategoryBody, callbacks?: any): void;
    deleteCategory?(companyId: number, data: CategoryTypes.IDeleteCategoryData, callbacks?: any): void;
    getCategoryById?(companyId: number, categoryId: number): void;
    clearCategoriesState?(): void;
    clearChangedCreatedCategoryState?(): void;
  }
}

export namespace EmptyTitleTypes {
  export interface IProps {
    curPrevId?: string;
    level: number;
    onCreateClick?(): void;
  }
}
