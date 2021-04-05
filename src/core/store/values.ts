import { ILoadTypes } from 'src/core/store/types';

export const LOCAL_STORAGE = {
  COMPANY_ID: 'company_id',
  COMPANY_UUID: 'company_uuid',
  ACCOUNTS: 'accounts',
  TOKEN: 'token',
  CUR_LANGUAGE: 'i18n_language',
  SHOP_BASKET_ITEMS: 'shop_basket_items',
  LAST_PATHNAME: 'last_pathname',
  BATTLE_FINISHED: 'battle_finished',
};

export const ROLES = {
  EMPLOYEE: 'employee',
  CONTENT_REDACTOR: 'content_redactor',
  ADMIN: 'admin',
};

export const ROLES_OPTIONS = [
  {
    value: ROLES.EMPLOYEE,
    name: 'Пользователь',
  },
  {
    value: ROLES.CONTENT_REDACTOR,
    name: 'Контент редактор',
  },
  {
    value: ROLES.ADMIN,
    name: 'Админ',
  },
];

export const LOAD_DEFAULT_STATE: ILoadTypes<any> = {
  data: null,
  loading: false,
};

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export const COLORS = [
  '#52D726', '#FFEC00', '#FF7300', '#FF0000', '#007ED6',
  '#377B2B', '#7CDDDD', '#9552EA', '#003F5C', '#58508D',
  '#FF6361', '#FFF1C9', '#F7B7A3', '#EA5F89', '#9B3192',
  '#2B0B3F', '#00529B', '#FDBB2F', '#868686', '#C1C1C1',
  '#3D3D3D', '#C608D1', '#FF00FE', '#FFA9FD', '#2900A5',
  '#881850', '#B1270B', '#D2630D', '#E7CFA1', '#85A328',
  '#693F29', '#8BD5CB', '#FFE07D', '#FFFADD', '#F9A9AC',
  '#8E5C98', '#CE82A1', '#DCAAB0', '#F0D8C1', '#4F9884',
  '#FADA5F', '#FCE882', '#FAF0BF', '#F5F5DD', '#F5E4CC',
  '#1C2B40', '#333856', '#7D4F56', '#D68273', '#E7B280',
];
