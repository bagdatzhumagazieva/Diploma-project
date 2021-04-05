import { SearchTypes } from 'src/store/search/types';
import { IValue } from 'src/components/molecules/Chips/types';

export namespace EmployeeSearchByEmailTypes {
  export interface IProps {
    className?: string;
    searchedEmployees?: SearchTypes.ISearchRenderProps[];
    clearSearchedEmployees?(): void;
    searchEmployees?(employee: SearchTypes.ISearchBodyParams): void;
    onEmployeesChange?(employeeIds: number[], isValid: boolean): void;
  }

  export interface ISearchedEmployee extends IValue {
    employeeId: number;
  }
}
