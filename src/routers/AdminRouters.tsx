import * as React from 'react';
import CompanyPage from 'src/pages/AdminPages/Company';
import { AdminRouterPaths } from 'src/core/enum';
import CompanySettings from 'src/pages/AdminPages/CompanySettings';
import BranchPage from 'src/pages/AdminPages/Branch';
import GroupDetailPage from 'src/pages/AdminPages/GroupDetailPage';
import CardCreationPage from 'src/pages/AdminPages/Card/CardCreationPage';
import CardAdminViewPage from 'src/pages/AdminPages/Card/CardAdminViewPage';
import CardEditPage from 'src/pages/AdminPages/Card/CardEditPage';
import KnowledgeBaseAdmin from 'src/pages/AdminPages/KnowledgeBase';
import ContentPage from 'src/pages/AdminPages/Content';
import CourseCreationChoicePage from 'src/pages/AdminPages/Course/CourseCreationChoicePage';
import CourseDetailPage from 'src/pages/AdminPages/Course/CourseDetailPage';
import CourseCreationPage from 'src/pages/AdminPages/Course/CourseCreationPage';
import CourseEditionPage from 'src/pages/AdminPages/Course/CourseEditionPage';
import TaskCreationPage from 'src/pages/AdminPages/Task/TaskCreationPage';
import TaskEditionPage from 'src/pages/AdminPages/Task/TaskEditionPage';
import TaskDetailPage from 'src/pages/AdminPages/Task/TaskDetailPage';
import NotificationDistribution from 'src/pages/AdminPages/NotificationDistribution';
import NotificationCreation from 'src/pages/AdminPages/NotificationDistribution/NotificationCreation';
import GameCreationPage from 'src/pages/AdminPages/Game/GameCreationPage';
import GameEditionPage from 'src/pages/AdminPages/Game/GameEditionPage';
import NotificationDetailPage from 'src/pages/AdminPages/NotificationDistribution/NotificationDetailPage';
import Shop from 'src/pages/AdminPages/Shop';
import ShopCreation from 'src/pages/AdminPages/Shop/ShopCreation';
import MarketPlace from 'src/pages/AdminPages/MarketPlace';
import PaymentPage from 'src/pages/AdminPages/MarketPlace/PaymentPage';
import MarketplaceDetailedPage from 'src/pages/AdminPages/MarketPlace/MaketplaceDetailed';
import MarketplaceEducationDetailedPage from 'src/pages/AdminPages/MarketPlace/MarketplaceEducationDetail';
import ShopDetailPage from 'src/pages/AdminPages/Shop/ShopDetailPage';
import ShopEdition from 'src/pages/AdminPages/Shop/ShopEdition';
import Reports from 'src/pages/AdminPages/Reports';
import ReportPerformance from 'src/pages/AdminPages/ReportPerformance';
import ReportPerformanceDetail from 'src/pages/AdminPages/ReportPerformanceDetail';
import ReportError from 'src/pages/AdminPages/ReportError';
import ReportErrorDetail from 'src/pages/AdminPages/ReportErrorDetail';
import ReportZeal from 'src/pages/AdminPages/ReportZeal';

export const addAdminSlash = (path: string):string => `/admin/${path}`;
const ADMIN_ROUTERS = [
  { component: <CompanyPage />, path: addAdminSlash(AdminRouterPaths.COMPANY), exact: true },
  { component: <CompanySettings />, path: addAdminSlash(AdminRouterPaths.COMPANY_SETTINGS), exact: true },
  { component: <BranchPage />, path: `${addAdminSlash(AdminRouterPaths.COMPANY)}/:id` },
  { component: <GroupDetailPage />, path: `${addAdminSlash(AdminRouterPaths.GROUP_INFO)}/:id` },
  { component: <CardCreationPage />, path: `${addAdminSlash(AdminRouterPaths.CARD_CREATION)}`, exact: true },
  { component: <CardAdminViewPage />, path: `${addAdminSlash(AdminRouterPaths.CARD_VIEW)}/:id` },
  { component: <CardEditPage />, path: `${addAdminSlash(AdminRouterPaths.CARD_EDIT)}/:id` },
  { component: <KnowledgeBaseAdmin />, path: `${addAdminSlash(AdminRouterPaths.KNOWLEDGE_BASE)}`, exact: true },
  { component: <ContentPage />, path: `${addAdminSlash(AdminRouterPaths.CONTENT)}`, exact: true },
  {
    component: <NotificationDistribution />,
    path: `${addAdminSlash(AdminRouterPaths.NOTIFICATION_DISTRIBUTION)}`,
    exact: true,
  },
  {
    component: <NotificationCreation />,
    path: `${addAdminSlash(AdminRouterPaths.NOTIFICATION_CREATION)}`,
    exact: true,
  },
  {
    component: <NotificationDetailPage />,
    path: `${addAdminSlash(AdminRouterPaths.NOTIFICATION_DETAIL)}/:id`,
    exact: true,
  },
  {
    component: <CourseCreationChoicePage />,
    path: `${addAdminSlash(AdminRouterPaths.COURSE_CREATION_CHOICE)}`,
    exact: true,
  },
  {
    component: <CourseEditionPage />,
    path: `${addAdminSlash(AdminRouterPaths.COURSE_EDITION)}/:id`,
    exact: true,
  },
  {
    component: <CourseCreationPage />,
    path: `${addAdminSlash(AdminRouterPaths.COURSE_CREATION)}`,
    exact: true,
  },
  { component: <CourseDetailPage />, path: `${addAdminSlash(AdminRouterPaths.COURSE_INFO)}/:id`, exact: true },
  { component: <TaskCreationPage />, path: addAdminSlash(AdminRouterPaths.TASK_CREATION), exact: true },
  { component: <TaskEditionPage />, path: `${addAdminSlash(AdminRouterPaths.TASK_EDITION)}/:id`, exact: true },
  { component: <TaskDetailPage />, path: `${addAdminSlash(AdminRouterPaths.TASK_DETAIL)}/:id`, exact: true },
  { component: <GameCreationPage/>, path: addAdminSlash(AdminRouterPaths.GAME_CREATION), exact: true },
  { component: <GameEditionPage/>, path: `/admin/${AdminRouterPaths.GAME_EDITION}/:id`, exact: true },
  { component: <Shop />, path: addAdminSlash(AdminRouterPaths.SHOP), exact: true },
  { component: <ShopCreation />, path: `${addAdminSlash(AdminRouterPaths.SHOP_CREATION)}`, exact: true },
  { component: <ShopEdition />, path: `${addAdminSlash(AdminRouterPaths.SHOP_EDITION)}/:id`, exact: true },
  {
    component: <ShopDetailPage />,
    path: `${addAdminSlash(AdminRouterPaths.SHOP)}/:id`,
    exact: true,
  },
  { component: <MarketPlace />, path: `${addAdminSlash(AdminRouterPaths.MARKETPLACE)}`, exact: true },
  { component: <PaymentPage />, path: `${addAdminSlash(AdminRouterPaths.PAYMENT)}/:id`, exact: true },
  {
    component: <MarketplaceDetailedPage/>,
    path: `${addAdminSlash(AdminRouterPaths.MARKETPLACE_DETAILED)}/:id`,
    exact:true,
  },
  {
    component: <MarketplaceEducationDetailedPage/>,
    path: `${addAdminSlash(AdminRouterPaths.MARKETPLACE_EDUCATION_DETAIL)}/:id`,
    exact:true,
  },
  {
    component: <ReportPerformanceDetail/>,
    path: `${addAdminSlash(AdminRouterPaths.REPORT_PERFORMANCE)}/:id/:type`,
  },
  {
    component: <ReportPerformance />,
    path: `${addAdminSlash(AdminRouterPaths.REPORT_PERFORMANCE)}`,
  },
  {
    component: <ReportErrorDetail/>,
    path: `${addAdminSlash(AdminRouterPaths.REPORT_ERROR)}/:id/:type`,
  },
  {
    component: <ReportError />,
    path: `${addAdminSlash(AdminRouterPaths.REPORT_ERROR)}`,
  },
  {
    component: <ReportZeal />,
    path: `${addAdminSlash(AdminRouterPaths.REPORT_ZEAL)}`,
  },
  {
    component: <Reports/>,
    path: `${addAdminSlash(AdminRouterPaths.REPORTS)}`,
  },
];

export default ADMIN_ROUTERS;
