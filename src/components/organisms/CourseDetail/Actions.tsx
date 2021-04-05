import React from 'react';
import { IActionData } from 'src/components/organisms/CourseDetail/types';
import { ReactComponent as IconEdit } from 'src/assets/img/icons/edit.svg';
import { ReactComponent as IconDelete } from 'src/assets/img/icons/delete.svg';
import { ReactComponent as ArchiveIcon } from 'src/assets/img/icons/archive.svg';
import { ReactComponent as Publish } from 'src/assets/img/icons/send.svg';
import { Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';
import 'src/components/organisms/CourseDetail/actions.scss';

export const ACTIONS = (isDraft: boolean, name?: string): IActionData[] => [
  {
    title: `Отредактировать ${name || ''}`,
    iconJSX: <IconEdit width="16" height="16" className="action-icon--yellow" />,
    color: 'main_50',
    mode: Action.CHANGE,
  },
  (isDraft ? {
    title: 'Опубликовать',
    iconJSX: <Publish />,
    color: 'main_50',
    mode: Action.PUBLISH,
  } : {
    title: 'В черновик',
    iconJSX: <ArchiveIcon />,
    color: 'main_50',
    mode: Action.DRAFT,
  }),
  {
    title: 'Удалить',
    iconJSX: <IconDelete width="17" height="17" className="action-icon--red" />,
    color: 'red',
    mode: Action.DELETE,
  },
];
