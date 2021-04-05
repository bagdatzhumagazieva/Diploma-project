import * as React from 'react';
import { addSlash } from 'src/core/components/router';
import { RouterPaths } from 'src/core/enum';

import RatingPage from 'src/pages/GamePages/Rating';
import ProfilePage from 'src/pages/GamePages/Profile';
import TasksFeedPage from 'src/pages/GamePages/TasksFeed';
import MicroLearningPage from 'src/pages/GamePages/TasksFeed/MicroLearning';
import DashboardPage from 'src/pages/GamePages/Dashboard';
import EducationPage from 'src/pages/GamePages/Education';
import KnowledgeBase from 'src/pages/GamePages/KnowledgeBase';
import CardViewPage from 'src/pages/GamePages/Card/CardViewPage';
import CoursePage from 'src/pages/GamePages/Course/Course';
import UserCoursesPage from 'src/pages/GamePages/Course/UserCourses';
import AvailableCoursesPage from 'src/pages/GamePages/Course/AvailableCourses';
import ModulePage from 'src/pages/GamePages/Course/Module';
import CardPage from 'src/pages/GamePages/Course/Lesson';
import ModuleTest from 'src/pages/GamePages/Course/Test';
import Exam from 'src/pages/GamePages/Course/Exam';
import Shop from 'src/pages/GamePages/Shop';
import Battles from 'src/pages/GamePages/Battles';
import BattleInvitation from 'src/pages/GamePages/Battles/BattleInvitation';
import BattlePage from 'src/pages/GamePages/Battles/Battle';
import ShopDetailGame from 'src/pages/GamePages/Shop/ShopDetailPage';
import PlayGame from '../pages/GamePages/PlayGame';

const GAME_ROUTERS = [
  { component: <RatingPage />, path: addSlash(RouterPaths.RATING), exact: true },
  { component: <ProfilePage />, path: addSlash(RouterPaths.PROFILE), exact: true },
  { component: <TasksFeedPage />, path: addSlash(RouterPaths.TASKS_FEED), exact: true },
  { component: <MicroLearningPage />, path: addSlash(`${RouterPaths.TASKS_FEED}/:id`), exact: true },
  { component: <DashboardPage />, path: addSlash(RouterPaths.DASHBOARD), exact: true },
  { component: <EducationPage />, path: addSlash(RouterPaths.EDUCATION), exact: true },
  { component: <KnowledgeBase />, path: addSlash(RouterPaths.KNOWLEDGE_BASE), exact: true },
  { component: <CardViewPage />, path: addSlash(`${RouterPaths.CARD_VIEW}/:id`), exact: true },
  { component: <UserCoursesPage />, path: addSlash(RouterPaths.MY_COURSES), exact: true },
  { component: <AvailableCoursesPage />, path: addSlash(RouterPaths.AVAILABLE_COURSES), exact: true },
  { component: <CoursePage />, path: addSlash(`${RouterPaths.COURSE}/:id`), exact: true },
  { component: <ModulePage />, path: addSlash(RouterPaths.COURSE_MODULE), exact: true },
  { component: <CardPage />, path: addSlash(RouterPaths.MODULE_CARD), exact: true },
  { component: <ModuleTest />, path: addSlash(RouterPaths.MODULE_TEST), exact: true },
  { component: <Exam />, path: addSlash(RouterPaths.COURSE_TEST), exact: true },
  { component: <Shop />, path: addSlash(RouterPaths.SHOP), exact: true },
  {
    component: <ShopDetailGame />,
    path: `${addSlash(RouterPaths.SHOP_DETAIL)}/:id`,
    exact: true,
  },
  { component: <Battles />, path: addSlash(RouterPaths.BATTLES), exact: true },
  { component: <BattleInvitation />, path: addSlash(RouterPaths.BATTLE_INVITATION), exact: true },
  { component: <BattlePage />, path: `${addSlash(RouterPaths.BATTLE)}/:id`, exact: true },
  { component: <PlayGame />, path: `${addSlash(RouterPaths.PLAY_GAME)}/:id`, exact: true },
];

export default GAME_ROUTERS;
