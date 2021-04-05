import { BranchesTypes } from 'src/store/branch/types';
import { CompaniesTypes } from 'src/store/company/types';
import { GroupTypes } from 'src/store/group/types';
import { ILoadTypes } from 'src/core/store/types';
import { IRenderBody } from 'src/core/components/types';
import { EmploymentTypes, IEmploymentBodyParams } from 'src/store/employment/types';
import { TableTypes } from 'src/components/molecules/Table/types';
import { TaskTypes } from 'src/store/task/types';
import { CourseDetailTypes, CourseTypes } from 'src/store/course/types';

export declare namespace GroupDetailPageTypes {
  export interface IProps {
    company?: CompaniesTypes.IRenderProps;
    companyLoading?: boolean;
    branches?: BranchesTypes.IRenderProps[];
    groups?: GroupTypes.IRenderProps[];
    group?: GroupTypes.IRenderProps;
    updatedGroup?: ILoadTypes<CompaniesTypes.IRenderProps>;
    deletedGroup?: IRenderBody;
    getBranches?(companyId: number): void;
    getCompanyById?(companyId: number): void;
    getGroups?(groupsBodyParams: GroupTypes.IQueryParams): void;
    getGroupById?(groupId: number): void;
    employees?: EmploymentTypes.IRenderProps[];
    getEmployees?(params: IEmploymentBodyParams): void;
    clearFilteredEmployees?(): void;
    updateGroup?(groupId: number, data: GroupTypes.ICreateGroupResponse, callbacks?: any): void;
    deleteGroup?(groupId: number, inheritanceGroupId?: number, callbacks?: any): void;
    downloadGroupEmployees?(groupId: number): void;
  }

  export interface IGroupUpdateBody {
    name: string;
    description?: string;
    company_id?: number;
  }
}

export declare namespace TabContentTypes {
  export interface IProps {
    exerciseLoading?: boolean;
    // tasksTotal?: number;
    groupId: number;
    companyId?: number;
    exercises?: TaskTypes.IRenderAdmin;
    courses?: CourseDetailTypes.IRenderProps[];
    coursesTotal?: number;
    coursesLoading?: boolean;

    getExercises?(bodyParams: TaskTypes.IGetTaskBodyParams): void;
    setPageLoading(loading: boolean): void;
    updateTask?(bodyParams: TaskTypes.IBodyProps, taskId: number, callback?: any): void;
    updateCourse?(courseId: number, bodyParams: CourseTypes.IRenderProps, callbacks?: any): void;
    // getExercises?(getTaskBody: TaskTypes.IGetTaskBodyParams): void;
    getCoursesByAdmin?(companyId: number, params: CourseDetailTypes.IAdminQuery, callbacks?: any): void;
  }

  export interface ITag {
    id: number;
    name: string;
    headerData: TableTypes.IHeaderData[];
    bodyData: any;
    total: number;
    mode: Type;
    onPageClick?(page: number): void;
  }

  export interface ISelectedData {
    id: number;
    type: Type;
  }

  export interface IInputsError {
    name: string;
    description: string;
  }
}

export enum Type {
  EXERCISE,
  COURSE,
  GAME,
}
