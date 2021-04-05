import { combineReducers } from 'redux';

import authReducer from 'src/store/auth/reducer';
import profileReducer from 'src/store/profile/reducer';
import companyReducer from 'src/store/company/reducer';
import branchReducer from 'src/store/branch/reducer';
import employmentReducer from 'src/store/employment/reducer';
import groupReducer from 'src/store/group/reducer';
import ratingReducer from 'src/store/rate/reducer';
import invitationReducer from 'src/store/invitation/reducer';
import searchReducer from 'src/store/search/reducer';
import categoryReducer from 'src/store/category/reducer';
import tagReducer from 'src/store/tag/reducer';
import mediaReducer from 'src/store/media/reducer';
import cardReducer from 'src/store/card/reducer';
import achievementReducer from 'src/store/achievement/reducer';
import activitiesReducer from 'src/store/activities/reducer';
import certificateReducer from 'src/store/certificate/reducer';
import courseReducer from 'src/store/course/reducer';
import moduleReducer from 'src/store/module/reducer';
import taskReducer from 'src/store/task/reducer';
import notificationReducer from 'src/store/notifications/reducer';
import commentReducer from 'src/store/comment/reducer';
import utilsReducer from 'src/store/utils/reducer';
import gameTemplateReducer from 'src/store/game/template/reducer';
import gameReducer from 'src/store/game/reducer';
import itemReducer from 'src/store/item/reducer';
import itemCategoriesReducer from 'src/store/item/category/reducer';
import battlesReducer from 'src/store/battles/reducer';
import marketplaceReducer from 'src/store/marketplace/reducer';
import statisticsReducer from 'src/store/statistics/reducer';

const rootReducer = combineReducers(
  {
    authReducer,
    activitiesReducer,
    profileReducer,
    branchReducer,
    companyReducer,
    employmentReducer,
    groupReducer,
    utilsReducer,
    invitationReducer,
    searchReducer,
    categoryReducer,
    tagReducer,
    mediaReducer,
    cardReducer,
    notificationReducer,
    taskReducer,
    achievementReducer,
    certificateReducer,
    courseReducer,
    ratingReducer,
    moduleReducer,
    commentReducer,
    gameTemplateReducer,
    gameReducer,
    itemReducer,
    itemCategoriesReducer,
    battlesReducer,
    marketplaceReducer,
    statisticsReducer,
  },
);

export default (state: any, action: any) =>
  rootReducer(action.type === 'LOGOUT' ? undefined : state, action);
