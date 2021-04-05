import { IOption } from 'src/components/molecules/Select/types';

export const IMAGE_ATTACHMENT_TABS = [
  {
    value: 'upload',
    title: 'Загрузить',
  },
  {
    value: 'gallery',
    title: 'Галерея',
  },
];

export const UploadedImagesSortOptions:IOption[] = [
  {
    value: 'name',
    name: 'По алфавиту, А - Я',
  },
  {
    value: '-name',
    name: 'По алфавиту, Я - А',
  },
  {
    value: 'datetime',
    name: 'По дате загрузки, вниз',
  },
  {
    value: '-datetime',
    name: 'По дате загрузки, вверх',
  },
];
