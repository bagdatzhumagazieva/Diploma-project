import React from 'react';

import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Table from 'src/components/molecules/Table';
import Input from 'src/components/molecules/Input';
import Layout from 'src/components/organisms/Layout';

import IconPlus from 'src/assets/img/icons/plus.svg';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import 'src/pages/AdminPages/NotificationDistribution/index.scss';

function NotificationDistribution() {
  return (
    <Layout
      isAdminRouting
      className="notification-page"
      childrenClassName="pos_relative"
    >
      <div className="d-flex flex-column py-48 grid">
        <Typography
          variant="headline"
        >
          Рассылка уведомлений
        </Typography>
        <Typography variant="subtext" color="grey_additional_2" className="mt-24">
          В данном разделе вы можете создавать, удалять и редактировать <br/> сообщения.
        </Typography>
      </div>
      <div className="color_grey__bg">
        <div className="grid pb-64">
          <Typography variant="headline" className="mt-32">Сообщения</Typography>
          <Typography
            variant="text"
            className="ml-8"
          >
            ({11})
          </Typography>
          <div className="d-flex mt-24 justify-content-between">
            <div className="d-flex flex-column">
              <Typography
                variant="subtext"
                className="mb-4"
              >
                Поиск сообщения
              </Typography>
              <Input
                type="text"
                placeholder="Название"
                classNames="notification-page__input-searcher"
                icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
              />
            </div>
            <div className="d-flex align-items-end">
              <Button
                className="d-flex align-items-center px-24"
                variant="textmed"
                to={`${addAdminSlash(AdminRouterPaths.NOTIFICATION_CREATION)}`}
              >
                <Image
                  src={IconPlus}
                  alt="add button"
                  className="mr-8"
                />
                Создать сообщение
              </Button>
            </div>
          </div>
          {/*// TODO: add Table after appearance of back*/}
          <Table
            checkbox
            headerData={[]}
            bodyData={[]}
            wrapperClassName="mt-16"
          />
        </div>
      </div>
    </Layout>
  );
}

export default NotificationDistribution;
