import { GroupTypes } from 'src/store/group/types';

export const CONVERT_GROUPS_TO_OPTIONS = (groups: GroupTypes.IRenderProps[]) =>
  (groups.map(item => ({ name: item.name || '', value: `${item.id}`, checkboxChecked: item.checkboxChecked })));
