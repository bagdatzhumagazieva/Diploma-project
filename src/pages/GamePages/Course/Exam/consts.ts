import { ModuleTypes } from 'src/store/module/types';

export const getCourseFistModuleData = (modules?: ModuleTypes.IModuleListItem[]) => {
  if (!Array.isArray(modules) || modules.length < 1) return { firstModuleId: undefined, firstCardId: undefined };
  const firstModule = modules[0];
  if (firstModule.cardIds.length < 1) return { firstModuleId: +firstModule?.id, firstCardId: undefined };
  return {
    firstModuleId: +firstModule?.id,
    firstCardId: firstModule.cardIds[0],
  };
};
