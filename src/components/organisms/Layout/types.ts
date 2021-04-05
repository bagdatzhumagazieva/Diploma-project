import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IBaseProps } from 'src/core/components/types';
import { ILoadTypes } from 'src/core/store/types';
import { CompaniesTypes } from 'src/store/company/types';
import { EmploymentTypes } from 'src/store/employment/types';
import { ProfileTypes } from 'src/store/profile/types';
import { MyTasks } from 'src/store/task/types';
import { NotificationsTypes } from 'src/store/notifications/types';
import { CourseCountTypes } from 'src/store/course/types';

export namespace LayoutTypes {
  export interface IProps extends IBaseProps, RouteComponentProps {
    companyId?: number;
    children?: React.ReactFragment;
    isAdminRouting?: boolean;
    unauthorized?: boolean;
    companies?: ILoadTypes<CompaniesTypes.IRenderProps[]>;
    employment?: EmploymentTypes.IRenderProps;
    profile?: ILoadTypes<ProfileTypes.IRenderProps>;
    childrenClassName?: string;
    myExercisesTotal?: MyTasks.IRenderProps;
    notifications?: NotificationsTypes.IRenderProps[];
    company?: CompaniesTypes.IRenderProps;
    coursesCount?: CourseCountTypes.IRenderProps;

    leaveBattle?(battleId: number, companyId: number): void;
    getCompanies?(callbacks?: any): void;
    goToGamePage?(): void;
    setCompanyId?(companyId: string): void;
    getNotification?(params: NotificationsTypes.IQueryParams): void;
    getEmploymentByCompanyId?(companyId: number): void;
    getProfile?(): void;
    getMyExercises?(params: MyTasks.IQueryProps): void;
    getCompanyById?(companyId: number): void;
    getCoursesCount?(companyId: number): void;
  }
}
