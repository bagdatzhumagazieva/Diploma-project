import { IEditOrCreateModule } from 'src/components/organisms/CourseCreationEdition/Content/types';
import { ModuleStatus } from 'src/store/module/types';

export const MODULE_DEFAULT_DATA2: IEditOrCreateModule = {
  module: {
    id: '-1',
    imageThumbnail: '',
    description: '',
    name: '',
    status: ModuleStatus.NEW,
  },
  type: 'create',
};
