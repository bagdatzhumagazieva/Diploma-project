import { CourseDetailTypes } from 'src/store/course/types';

export enum QuestionStatus  {
  InProcess = 'InProcess',
  Answered = 'Answered',
  TimeIsUp = 'TimeIsUp',
  Correct = 'Right',
  Wrong = 'Wrong',
}

export const getCurrentAndNextModule = (moduleId: string, course:  CourseDetailTypes.IRenderProps) => {
  if (!course) return { currentModule: undefined, nextModule: undefined };
  let currentModule = { name: '', id: '', isFinalModule: false };
  let nextModule = { name: '', id: '' };
  const { modules } = course;
  for (let i = 0; i < modules.length; i += 1) {
    if (modules[i].id === moduleId) {
      const isFinalModule = i === modules.length - 1;
      currentModule = { isFinalModule, name: modules[i].name, id: modules[i].id };
      if (!isFinalModule) {
        nextModule = { name: modules[i + 1].name, id: modules[i + 1].id };
      }
      break;
    }
  }
  return {
    currentModule,
    nextModule,
  };
};
