import { CompaniesTypes } from 'src/store/company/types';

export namespace CardCompanyChoiceTypes {
  export interface IProps extends ICompanyChoice {
    loading: boolean;
    className?: string;
    handleCompanyClick?(): void;
  }
}

export namespace GroupCardCompanyChoiceTypes {
  export interface IProps {
    loading: boolean;
    companies: CompaniesTypes.IRenderProps[];
    handleCompanyClick?(id: number, uuid: string): void;
  }
}

export interface ICompanyChoice {
  id: number;
  imageSrc?: string;
  name: string;
  slug: string;
}
