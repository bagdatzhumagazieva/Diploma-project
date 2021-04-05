import React from 'react';
import { SITE_BACK_URL } from 'src/constants/server';
import { IOption } from 'src/components/molecules/Select/types';
import { CompanyColors } from 'src/pages/AdminPages/CompanySettings/types';

export const companyLogoThumb = (companyUuid: string, imageHash?: string) => `${SITE_BACK_URL}media/companies/${companyUuid}/logo-thumbnail.jpg${imageHash ? `?${imageHash}` : ''}`;
export const companyBannerFull = (companyUuid: string, imageHash?: string) => `${SITE_BACK_URL}media/companies/${companyUuid}/banner.jpg${imageHash ? `?${imageHash}` : ''}`;

export const CompanyLanguages:IOption[] = [
  {
    value: 'ru',
    name: 'Русский',
  },
];

export const CompanyColorsOptions:IOption[] = Object.entries(CompanyColors).map(([key, value]) => ({
  value,
  name: key,
  icon: <div className={`company-color company-color--${value}`} />,
}));
