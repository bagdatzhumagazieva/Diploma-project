import { CompaniesTypes } from 'src/store/company/types';
import { ILoadTypes } from 'src/core/store/types';

export namespace CompanyChoiceTypes {
  export interface IProps {
    companies?: ILoadTypes<CompaniesTypes.IRenderProps[]>;
    getCompanies?(): void;
    logout?(): void;
  }
}
