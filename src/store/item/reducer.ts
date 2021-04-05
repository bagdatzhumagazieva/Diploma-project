import { combineReducers } from 'redux';
import { ActionType, ILoadTypes, ResponseCodes } from 'src/core/store/types';
import { IRenderBody, IResponseBody } from 'src/core/components/types';
import { NotificationType } from 'src/components/molecules/Notification/types';

import {
  CREATE_ITEM,
  GET_ITEM,
  GET_PRIZES,
  ShopPrizesTypes,
  ItemTypes,
  ShopGamePrizeTypes,
  GET_GAME_PRIZES,
  UPDATE_ITEM,
  GET_ITEM_BY_ADMIN,
  GET_ITEM_BUYERS,
  ItemBuyerTypes,
  CREATE_SHOP_ORDER,
  ShopOrderTypes,
  GET_MY_ORDERS,
  ShopAdminOrderTypes,
  GET_ADMIN_ORDERS, GET_ORDER_STATUSES, GET_DETAIL_SHOP, DetailShopTypes,
} from 'src/store/item/types';
import {
  parseAggregatorPrizes,
  parseItemData,
  parseGamePrizes,
  parseAggregatorPrize,
  parseItemBuyers,
  parseMyOrderList,
  parseAdminOrders,
  parseDetailShop,
} from 'src/store/item/parsers';

const createdItemState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case CREATE_ITEM.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_ITEM.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_ITEM.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, data } = action.data;

      const responseStatus: IRenderBody<any> = {
        data,
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? 'Приз создан успешно'
          : (description || 'Error'),
      };
      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const prizes = (
  state = { data: null, loading: false },
  action: ActionType<ShopPrizesTypes.IResponseProps>,
): ILoadTypes<ShopPrizesTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_PRIZES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_PRIZES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_PRIZES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { data } = action;
      const parsed = parseAggregatorPrizes(data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const gamePrizes = (
  state = { data: null, loading: false },
  action: ActionType<ShopGamePrizeTypes.IResponseProps>,
): ILoadTypes<ShopGamePrizeTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_GAME_PRIZES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_GAME_PRIZES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_GAME_PRIZES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { data } = action;
      const parsed = parseGamePrizes(data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const item = (
  state = { data: null, loading: true },
  action: ActionType<ItemTypes.IResponseProps>,
): ILoadTypes<ItemTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_ITEM.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ITEM.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ITEM.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseItemData(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const updatedItemState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case UPDATE_ITEM.started:
      return {
        data: null,
        loading: true,
      };
    case UPDATE_ITEM.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPDATE_ITEM.success:
      return {
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};

const createdOrdersState = (
  state = { data: null, loading: false },
  action: ActionType<ShopOrderTypes.IResponseProps[]>,
): ILoadTypes<ShopOrderTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case CREATE_SHOP_ORDER.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_SHOP_ORDER.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_SHOP_ORDER.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { data } = action;
      const parser = data.map(e => ({
        amount: e.amount,
        id: e.id,
        price: e.price,
        status: e.status,
        description: e.item.description,
        name: e.item.name,
        imageUrl: e.item.images[0]?.image_url || '',
        imageThumbnailUrl: e.item.images[0]?.image_thumbnail_url || '',
      }));
      return {
        data: parser,
        loading: false,
      };
    default:
      return state;
  }
};

const myOrdersState = (
  state = { data: null, loading: false },
  action: ActionType<ShopOrderTypes.IMyOrderResponseProps>,
): ILoadTypes<ShopOrderTypes.IMyOrderRenderProps | null> => {
  switch (action.type) {
    case GET_MY_ORDERS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_MY_ORDERS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_MY_ORDERS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseMyOrderList(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const itemByAdmin = (
  state = { data: null, loading: true },
  action: ActionType<ShopPrizesTypes.IResponseItem>,
): ILoadTypes<ShopPrizesTypes.IRenderItem | null> => {
  switch (action.type) {
    case GET_ITEM_BY_ADMIN.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ITEM_BY_ADMIN.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ITEM_BY_ADMIN.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseAggregatorPrize(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const itemBuyers = (
  state = { data: null, loading: false },
  action: ActionType<ItemBuyerTypes.IResponseProps>,
): ILoadTypes<ItemBuyerTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_ITEM_BUYERS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ITEM_BUYERS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ITEM_BUYERS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { data } = action;
      const parsed = (parseItemBuyers(data));
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const adminOrders = (
  state = { data: null, loading: false },
  action: ActionType<ShopAdminOrderTypes.IResponseProps>,
): ILoadTypes<ShopAdminOrderTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_ADMIN_ORDERS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ADMIN_ORDERS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ADMIN_ORDERS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseAdminOrders(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const orderStatuses = (
  state = { data: null, loading: false },
  action: ActionType<ShopAdminOrderTypes.IResponseOrderStatus>,
): ILoadTypes<ShopAdminOrderTypes.IRenderOrderStatus | null> => {
  switch (action.type) {
    case GET_ORDER_STATUSES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ORDER_STATUSES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ORDER_STATUSES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parser = {
        allCount: action.data.all_count,
        pendingCount: action.data.pending_count,
        finishedCount: action.data.finished_count,
      };
      return {
        data: parser,
        loading: false,
      };
    default:
      return state;
  }
};

const detailShop = (
  state = { data: null, loading: false },
  action: ActionType<DetailShopTypes.IResponseProps>,
): ILoadTypes<DetailShopTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_DETAIL_SHOP.started:
      return {
        data: null,
        loading: true,
      };
    case GET_DETAIL_SHOP.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_DETAIL_SHOP.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parser = parseDetailShop(action?.data);
      return {
        data: parser,
        loading: false,
      };
    default:
      return state;
  }
};

const itemReducer = combineReducers({
  createdItemState,
  prizes,
  gamePrizes,
  item,
  updatedItemState,
  createdOrdersState,
  myOrdersState,
  adminOrders,
  itemByAdmin,
  itemBuyers,
  orderStatuses,
  detailShop,
});

export default itemReducer;
