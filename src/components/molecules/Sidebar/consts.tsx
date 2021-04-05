import * as SidebarDataIcons from 'src/components/atoms/Svg/Sidebar';
import { INavItem } from 'src/components/molecules/Nav/types';
import { AdminRouterPaths, RouterPaths } from 'src/core/enum';

export const cntAdminTopNavItems = 6;

export const fillElementsNames:string[] = ['shop', 'admin/shop', 'dashboard', 'admin/notification-distribution', 'admin/reports'];

export const SidebarData:INavItem[] = [
  {
    name: RouterPaths.DASHBOARD,
    path: RouterPaths.DASHBOARD,
    title: 'Главная',
    icon: SidebarDataIcons.Dashboard(),
  },
  {
    name: RouterPaths.TASKS_FEED,
    path: RouterPaths.TASKS_FEED,
    title: 'Задания',
    icon: SidebarDataIcons.Tasks(),
  },
  {
    name: RouterPaths.EDUCATION,
    path: RouterPaths.EDUCATION,
    title: 'Обучение',
    icon: SidebarDataIcons.Education(),
  },
  {
    name: RouterPaths.KNOWLEDGE_BASE,
    path: RouterPaths.KNOWLEDGE_BASE,
    title: 'База знаний',
    icon: SidebarDataIcons.Knowledge(),
  },
  {
    name: RouterPaths.BATTLES,
    path: RouterPaths.BATTLES,
    title: 'Баттлы',
    icon: SidebarDataIcons.Shield(),
  },
  {
    name: RouterPaths.RATING,
    path: RouterPaths.RATING,
    title: 'Рейтинг',
    icon: SidebarDataIcons.Rating(),
  },
  {
    name: RouterPaths.SHOP,
    path: RouterPaths.SHOP,
    title: 'Магазин',
    icon: SidebarDataIcons.Shop(),
  },
  {
    name: RouterPaths.ADMIN_PANEL,
    path: `admin/${AdminRouterPaths.COMPANY}`,
    title: 'Админ панель',
    icon: SidebarDataIcons.Admin(),
  },
  // TODO uncomment when back will be
  // {
  //   name: RouterPaths.FAQ,
  //   path: RouterPaths.FAQ,
  //   title: 'Помощь',
  //   icon: SidebarDataIcons.Help(),
  // },
];

export const SidebarAdminData:INavItem[] = [
  {
    name: `admin/${AdminRouterPaths.COMPANY}`,
    path: `admin/${AdminRouterPaths.COMPANY}`,
    title: 'Компания',
    icon: SidebarDataIcons.Company(),
  },
  {
    name: `admin/${AdminRouterPaths.CONTENT}`,
    path: `admin/${AdminRouterPaths.CONTENT}`,
    title: 'Контент',
    icon: SidebarDataIcons.Content(),
  },
  // TODO uncomment when back will be
  // {
  //   name: `admin/${AdminRouterPaths.NOTIFICATION_DISTRIBUTION}`,
  //   path: `admin/${AdminRouterPaths.NOTIFICATION_DISTRIBUTION}`,
  //   title: 'Рассылка',
  //   icon: SidebarDataIcons.Notification(),
  // },
  {
    name: `admin/${AdminRouterPaths.SHOP}`,
    path: `admin/${AdminRouterPaths.SHOP}`,
    title: 'Магазин',
    icon: SidebarDataIcons.Shop(),
  },
  {
    name: `admin/${AdminRouterPaths.KNOWLEDGE_BASE}`,
    path: `admin/${AdminRouterPaths.KNOWLEDGE_BASE}`,
    title: 'База знаний',
    icon: SidebarDataIcons.Knowledge(),
  },
  {
    name: `admin/${AdminRouterPaths.MARKETPLACE}`,
    path: `admin/${AdminRouterPaths.MARKETPLACE}`,
    title: 'Marketplace',
    icon: SidebarDataIcons.Marketplace(),
  },
  {
    name: `admin/${RouterPaths.REPORTS}`,
    path: `admin/${AdminRouterPaths.REPORTS}`,
    title: 'Отчеты',
    icon: SidebarDataIcons.Reports(),
  },
  {
    name: `admin/${RouterPaths.DASHBOARD}`,
    path: RouterPaths.DASHBOARD,
    title: 'Вернуться',
    icon: SidebarDataIcons.Return(),
  },
  // TODO uncomment when back will be
  // {
  //   name: RouterPaths.FAQ,
  //   path: RouterPaths.FAQ,
  //   title: 'Помощь',
  //   icon: SidebarDataIcons.Help(),
  // },
];
