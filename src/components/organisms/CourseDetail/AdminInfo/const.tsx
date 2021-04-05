import React from 'react';
import { ReactComponent as BookIcon } from 'src/assets/img/icons/book.svg';
import { ReactComponent as RewardIcon } from 'src/assets/img/icons/reward.svg';
import { ReactComponent as CertificateIcon } from 'src/assets/img/icons/certificate.svg';

export const COURSE_TABS = [
  {
    value: '0',
    title: 'Контент',
  },
  {
    value: '1',
    title: 'Статистика',
  },
];

export const COURSE_ADDITION_INFO = [
  {
    title: 'Собери монеты и обменяй их на призы',
    icon: <RewardIcon width="32" height="32" />,
  },
  {
    title: 'Получи именной сертификат об окончании курса',
    icon: <CertificateIcon color="#FF9800" width="32" height="32" />,
  },
  {
    title: 'Пройди учебный курс и сдай экзамен',
    icon: <BookIcon width="32" height="32" />,
  },
];
