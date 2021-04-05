import React from 'react';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import Hint from 'src/components/atoms/Hint';
import Circle from 'src/components/atoms/Svg/Table/circle';

export const tableHeader = [
  {
    key: 'name',
    name: 'Имя, Роль',
    localSort: (a: any, b: any) => a.name.localeCompare(b.name),
    render: (n: any) => (
      <div
        className="d-flex align-items-center"
      >
        <Image
          className="table__content-image"
          src={n.image}
          alt={n.name}
        />
        <div className="d-flex flex-column">
          <Typography variant="subtext">{n.name}</Typography>
          <Typography
            color="grey_additional_2"
            variant="xsmall"
          >
            {n.position}
          </Typography>
        </div>
      </div>
    ),
  },
  {
    key: 'email',
    name: 'Email',
    localSort: (a: any, b: any) => a.email.localeCompare(b.email),
    render: (n: any) => (
      <Typography variant="subtextmed">{n.email}</Typography>
    ),
  },
  {
    key: 'subCompany',
    name: 'Филиал',
    render: (n: any) => (
      <Typography variant="subtext">{n.subCompany}</Typography>
    ),
  },
  {
    key: 'groups',
    name: 'Группа',
    render: (n: any) => (
      n.groups.length === 1 ?
        <Typography variant="subtext">{n.groups[0]}</Typography>
        :
        <Hint
          showOnClick
          placement="top"
          hint={
            <Typography color="blacker" variant="subtext">{n.groups}</Typography>
          }
        >
          <Typography
            className="text-decoration_underline"
            variant="subtext"
          >
            {n.groups.length} групп
          </Typography>
        </Hint>
    ),
  },
  {
    key: 'registrationDate',
    name: 'Регистрация',
    render: (n: any) => (
      <Typography variant="subtext">{n.registrationDate}</Typography>
    ),
  },
  {
    key: 'status',
    name: 'Статус',
    render: (n: any) => (
      <div
        className="d-flex align-items-center"
      >
        <Circle status={n.status}/>
        {n.status ?
          <Typography className="ml-8" variant="subtext">Активен</Typography>
          :
          <Typography className="ml-8" variant="subtext">Заблокирован</Typography>
        }
      </div>
    ),
  },
];

export const tableBody = [
  {
    image: '',
    name: 'Алихан Кудабаев',
    position: 'Контент-редактор',
    email: 'AAAA@gmail.com',
    subCompany: 'Очень длинный филиал',
    groups: ['Разработчики', 'Дизайнеры', 'Бакэндеры', 'Менеджеры'],
    registrationDate: '24.02.2019',
    status: true,
  },
  {
    image: '',
    name: 'c Алихан Кудабаев',
    position: 'Контент-редактор',
    email: 'GGGG@gmail.com',
    subCompany: 'Очень длинный филиал',
    groups: ['Разработчики'],
    registrationDate: '24.02.2019',
    status: true,
  },
  {
    image: '',
    name: 'a Алихан Кудабаев',
    position: 'Контент-редактор',
    email: 'ZZZZ@gmail.com',
    subCompany: 'Очень длинный филиал',
    groups: ['Разработчики'],
    registrationDate: '24.02.2019',
    status: true,
  },
  {
    image: '',
    name: 'b Алихан Кудабаев',
    position: 'sКонтент-редактор',
    email: 'FFFF@gmail.com',
    subCompany: 'Очень длинный филиал',
    groups: ['Разработчики', 'Дизайнеры', 'Бакэндеры', 'Менеджеры'],
    registrationDate: '24.02.2019',
    status: false,
  },
];
