import { ITabOption } from 'src/components/molecules/Tabs/types';

export const INVITATION_TABS = [
  {
    value: 'manual',
    title: 'Вручную',
  },
  {
    value: 'excel',
    title: 'С помощью Excel файла',
  },
];

export const MANUAL_INVITATION_TABS: ITabOption[] = [
  {
    id: 'mail',
    label: 'Через Email',
  },
  {
    id: 'phone',
    label: 'Через телефон',
  },
];
