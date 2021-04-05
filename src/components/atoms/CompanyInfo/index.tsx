import React from 'react';
import moment from 'moment';
import { AdminRouterPaths } from 'src/core/enum';
import { addAdminSlash } from 'src/routers/AdminRouters';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import { CompanyInfoTypes } from 'src/components/atoms/CompanyInfo/types';
import 'src/components/atoms/CompanyInfo/index.scss';

function CompanyInfo(props: CompanyInfoTypes.IProps) {
  const { name, address, employees, logo, subscription, hasSettingsButton } = props;

  return (
    <div className="grid company-info py-48">
      <div className="d-flex align-items-center justify-content-between">
        <Typography
          variant="headline"
        >
          Компания
        </Typography>
        {hasSettingsButton && (
          <Button
            type="outlined"
            variant="textmed"
            classNames="company-info__settings"
            to={addAdminSlash(AdminRouterPaths.COMPANY_SETTINGS)}
          >
            Настройки
          </Button>
        )}
      </div>
      <div className="company-info__content d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Image
            alt="company logo"
            src={logo}
            className="company-info__logo"
          />
          <div className="d-flex flex-column">
            <Typography variant="textmed">
              {name}
            </Typography>
            <Typography variant="subtext" className="mt-8">
              {address}
            </Typography>
          </div>
        </div>
        <div className="d-flex flex-column">
          <Typography variant="textmed">
            Тариф
          </Typography>
          <Typography variant="subtext" className="mt-8">
            {subscription?.name}
          </Typography>
        </div>
        <div className="d-flex flex-column">
          <Typography variant="textmed">
            Пользователей
          </Typography>
          <Typography variant="subtext" className="mt-8">
            {employees?.count} / {employees?.maxLimit}
          </Typography>
        </div>
        <div className="d-flex flex-column">
          <Typography variant="textmed">
            Окончание подписки
          </Typography>
          <Typography variant="subtext" className="mt-8">
            {moment(subscription?.endDate).format('DD.MM.YYYY') || '-'}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;
