import { SearchTypes } from 'src/store/search/types';

export namespace EmployeeSuggestionTypes {
  export interface IProps {
    email: string;
    avatarUrl: string;
    role: string;
    className?: string;
    onSuggestClick?(): void;
  }
}

export namespace EmployeeSuggestionListTypes {
  export interface IProps {
    employees: SearchTypes.ISearchRenderProps[];
    currentPosition: number;
    onSuggestClick(employee: SearchTypes.ISearchRenderProps): void;
  }
}
