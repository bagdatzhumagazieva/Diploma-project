import { IBaseProps } from 'src/core/components/types';
import { SearchGlobalTypes } from 'src/store/search/types';

export namespace SearcherTypes {
  export interface IProps extends IBaseProps{
    searchedEntities?: SearchGlobalTypes.IRenderProps;
    searchGlobal?(companyId: number, keyword: string): void;
  }
}
