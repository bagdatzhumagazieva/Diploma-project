import React from 'react';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Layout from 'src/components/organisms/Layout';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import EatIcon from 'src/assets/img/icons/eatting-point.svg';
import FlagIcon from 'src/assets/img/icons/admin-flag.svg';
import 'src/pages/AdminPages/NotificationDistribution/NotificationDetailPage/index.scss';

function NotificationDetailPage() {

  return (
    <Layout isAdminRouting className="color_grey__bg">
      <div className="grid">
        <Breadcrumb
          items={[
            { label: 'Рассылка уведомлений', link: addAdminSlash(AdminRouterPaths.NOTIFICATION_DISTRIBUTION) },
            // TODO: change after appearance back
            { label: 'Новый курс “Акулы бизнеса” для всех ' },
          ]}
          className="mt-48"
        />
        <div className="notification-detail mt-32 px-32 py-40">
          <div className="d-flex justify-content-between align-items-center">
            <span className="d-flex align-items-center">
              <Image alt="eat icon" src={EatIcon} className="notification-detail__icon mr-16" />
              <Typography variant="h2">Новая игра “Акулы бизнеса” для всех </Typography>
            </span>
            <span className="d-flex flex-column">
              <span className="d-flex align-items-center">
                <Image alt="eat icon" src={FlagIcon} />
                <Typography variant="subtext" className="ml-16">Важные</Typography>
              </span>
              <Typography variant="subtext" className="mt-8">Сегодня, 11:00</Typography>
            </span>
          </div>
          <div className="mt-32 d-flex flex-column ml-64">
            <Typography variant="subtext">Всего пользователей получили: 532</Typography>
            <Typography variant="subtext" className="mt-8">Филиал: Алматинский</Typography>
            <Typography variant="subtext" className="mt-8 mb-16">Группа: Разработчики</Typography>
            <Typography variant="subtext" color="grey_additional_1">
              Кому: samplelogin@bk.com, samplelogin@bk.com, simplesmile@mail.ru
              <Typography variant="xsmall" color="main_50" className="ml-8 cursor-pointer">смотреть все</Typography>
            </Typography>
            <Typography variant="text" className="mt-32 pr-64">
              Учебный курс состоит из 10-ти модулей, каждый модуль из 5 задач. Учебный курс состоит
              из 10-ти модулей, каждый модуль из 5 задач.
              Учебный курс состоит из 10-ти модулей, каждый модуль из 5 задач.
            </Typography>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotificationDetailPage;
