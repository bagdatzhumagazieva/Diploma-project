import React from 'react';
import { CourseTypes } from 'src/store/course/types';
import { ModuleTypes } from 'src/store/module/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';

export interface IProps {
  step: number;
  setStep(step: number): void;
  courseData: CourseTypes.IRenderProps;
  setCourseData(course: CourseTypes.IRenderProps): void;
  modules: ModuleTypes.IRenderProps[];
  setModules(modules: ModuleTypes.IRenderProps[]): void;
  deletedModuleIds: number[];
  setDeletedModuleIds(ids: number[]): void;
  mapCards: Map<string, ICard[]>;
  setMapCards(cards: Map<string, ICard[]>): void;
  nameErrorMessage: string;
  setNameErrorMessage(errorMessage: string): void;
  isCourseUpdated: boolean;
  setCourseUpdated(updated: boolean): void;
  isCourseDataUpdated: boolean;
  setCourseDataUpdated(updated: boolean): void;
}

const defaultValues: IProps = {
  step: 0,
  setStep: (step: number) => {},
  courseData: {
    name: null,
    id: null,
    description: null,
    companyId: null,
    groupIds: null,
    rewardAmount: null,
    imageUrl: null,
    imageThumbnailUrl: null,
    certificateExpirationDate: null,
    certificateImageUrl: null,
    certificateImageThumbnailUrl: null,
    tagIds: null,
    status: null,
    isActive: null,
    uuid: null,
  },
  setCourseData: (course: CourseTypes.IRenderProps) => {},
  modules: [],
  setModules: (modules: ModuleTypes.IRenderProps[]) => {},
  deletedModuleIds: [],
  setDeletedModuleIds: (ids: number[]) => {},
  mapCards: new Map<string, ICard[]>(),
  setMapCards: (mapCards: Map<string, ICard[]>) => {},
  nameErrorMessage: '',
  setNameErrorMessage: (errorMessage: string) => {},
  isCourseUpdated: false,
  setCourseUpdated: (updated: boolean) => {},
  isCourseDataUpdated: false,
  setCourseDataUpdated: (updated: boolean) => {},
};

const CourseCreationContext = React.createContext<IProps>(defaultValues);

export default CourseCreationContext;
