import {
  ItemTypes,
  ShopGamePrizeTypes,
  ShopPrizesTypes,
  ShopOrderTypes,
  ShopAdminOrderTypes,
  ItemBuyerTypes, DetailShopTypes,
} from 'src/store/item/types';
import { parseItemCategoryData } from 'src/store/item/category/parsers';

export const parseItemBody = (bodyParams: ItemTypes.IBodyProps) => ({
  name: bodyParams.name,
  description: bodyParams.description,
  price: bodyParams.price,
  amount: bodyParams.amount,
  branch_ids: bodyParams.branchIds,
  group_ids: bodyParams.groupIds,
  category_id: bodyParams.categoryId,
  images: bodyParams.images?.map((img, index) => ({
    image_url: img.imageUrl,
    image_thumbnail_url: img.imageThumbnailUrl,
    order: index,
  })),
});

export const parseItemData = (raw: ItemTypes.IResponseProps) => ({
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  id: raw.id,
  uuid: raw.uuid,
  name: raw.name,
  description: raw.description,
  price: raw.price,
  amount: raw.amount,
  branchIds: raw.branch_ids,
  groupIds: raw.group_ids,
  boughtAmount: raw.bought_amount,
  category: parseItemCategoryData(raw.category),
  images: raw.images.map(i => parseItemImage(i)),
  isActive: raw.is_active,
});

export const parseItemImage = (raw: ItemTypes.ImageResponseProps): ItemTypes.ImageRenderProps => ({
  imageUrl: raw.image_url,
  imageThumbnailUrl: raw.image_thumbnail_url,
  order: raw.order,
});

export const parseAggregatorPrizes = (data: ShopPrizesTypes.IResponseProps): ShopPrizesTypes.IRenderProps => ({
  total: data.total,
  prizes: data.items.map(e => ({
    amount: e.amount,
    categoryId: e.category_id,
    categoryName: e.category_name,
    description: e.description,
    id: e.entity_id,
    uuid: e.entity_uuid,
    groupIds: e.group_ids,
    imageUrl: e.image_url,
    imageThumbnailUrl: e.image_thumbnail_url,
    groups: e.groups?.map(g => ({
      id: g.entity_id,
      uuid: g.entity_uuid,
      groupType: g.group_type,
      name: g.name,
    })) || [],
    name: e.name,
    numberOfSold: e.number_of_sold,
    price: e.price,
    images: e.images?.map(n => ({
      id: n.entity_id,
      uuid: n.entity_uuid,
      imageUrl: n.image_url,
      imageThumbnailUrl: n.image_thumbnail_url,
      order: n.order,
    })) || [],
  })),
});

export const parseGamePrizes = (raw: ShopGamePrizeTypes.IResponseProps): ShopGamePrizeTypes.IRenderProps => ({
  total: raw.total,
  prizes: raw.items.map(e => ({
    id: e.entity_id,
    uuid: e.entity_uuid,
    name: e.name,
    price: e.price,
    rating: e.rating,
    amount: e.amount,
    categoryName: e.category_name,
    description: e.description,
    images: e.images.map(n => ({
      id: n.entity_id,
      uuid: n.entity_uuid,
      imageUrl: n.image_url,
      imageThumbnailUrl: n.image_thumbnail_url,
      order: n.order,
    })),
  })),
  categories: raw.categories.map(n => ({
    categoryName: n.category_name,
    total: n.total,
    categoryId: n.category_id,
  })),
  userInfo: {
    rewardAmount: raw.me.reward_amount,
    rewardAvailable: raw.me.reward_available,
  },
});

export const parseMyOrderList = (raw: ShopOrderTypes.IMyOrderResponseProps): ShopOrderTypes.IMyOrderRenderProps => ({
  total: raw.total,
  totalPrice: raw.total_price,
  myOrders: raw.item_orders.map(e => ({
    amount: e.amount,
    createdAt: e.created_at,
    id: e.item.id,
    status: e.status,
    uuid: e.item.uuid,
    itemAmount: e.item.amount,
    boughtAmount: e.item.bought_amount,
    categoryName: e.item.category.name,
    description: e.item.description,
    images: e.item.images.map(m => ({
      imageUrl: m.image_url,
      imageThumbnailUrl: m.image_thumbnail_url,
    })),
    name: e.item.name,
    price: e.item.price,
  })),
});

export const parseAdminOrders = (raw: ShopAdminOrderTypes.IResponseProps): ShopAdminOrderTypes.IRenderProps => ({
  total: raw.total,
  orders: raw.orders.map(e => ({
    id: e.entity_id,
    uuid: e.entity_uuid,
    updatedAt: e.updated_at,
    item: e.item && {
      id: e.item?.entity_id,
      uuid: e.item?.entity_uuid,
      name: e.item?.name,
      description: e.item?.description,
      categoryName: e.item?.category_name,
      price: e.item?.price,
      rating: e.item?.rating,
      images: e.item?.images.map(n => ({
        id: n.entity_id,
        uuid: n.entity_uuid,
        imageUrl: n.image_url,
        imageThumbnailUrl: n.image_thumbnail_url,
      })),
    },
    itemId: e.item_id,
    status: e.status,
    amount: e.amount,
    createdAt: e.created_at,
    employee: {
      avatarThumbnailUrl: e.employee.avatar_thumbnail_url,
      avatarUrl: e.employee.avatar_url,
      email: e.employee.email,
      firstName: e.employee.first_name,
      lastName: e.employee.last_name,
      rewardAmount: e.employee.reward_amount,
      rewardAvailable: e.employee.reward_available,
      userId: e.employee.user_id,
      username: e.employee.username,
    },
  })),
});

export const parseAggregatorPrize = (raw: ShopPrizesTypes.IResponseItem): ShopPrizesTypes.IRenderItem => ({
  amount: raw.amount,
  categoryId: raw.category_id,
  categoryName: raw.category_name,
  description: raw.description,
  id: raw.entity_id,
  uuid: raw.entity_uuid,
  groupIds: raw.group_ids,
  imageThumbnailUrl: raw.image_thumbnail_url,
  imageUrl: raw.image_url,
  groups: raw.groups?.map(g => ({
    id: g.entity_id,
    uuid: g.entity_uuid,
    groupType: g.group_type,
    name: g.name,
  })),
  name: raw.name,
  numberOfSold: raw.number_of_sold,
  price: raw.price,
  rating: raw.rating,
  images: raw.images.map(n => ({
    id: n.entity_id,
    uuid: n.entity_uuid,
    imageUrl: n.image_url,
    imageThumbnailUrl: n.image_thumbnail_url,
    order: n.order,
  })),
});

export const parseItemBuyer = (raw: ItemBuyerTypes.IResponseItemBuyer): ItemBuyerTypes.IRenderItemBuyer => ({
  entityId: raw.entity_id,
  entityUuid: raw.entity_uuid,
  companyId: raw.company_id,
  employee: parseEmployee(raw.employee),
  status: raw.status,
  createdAt: raw.created_at,
});

export const parseEmployee = (raw: ItemBuyerTypes.IResponseEmployee): ItemBuyerTypes.IRenderEmployee => ({
  employmentId: raw.employment_id,
  userId: raw.user_id,
  firstName: raw.first_name,
  lastName: raw.last_name,
  username: raw.username,
  email: raw.email,
  avatarUrl: raw.avatar_url,
  avatarThumbnailUrl: raw.avatar_thumbnail_url,
  rewardAvailable: raw.reward_available,
  rewardAmount: raw.reward_amount,
});

export const parseItemBuyers = (raw: ItemBuyerTypes.IResponseProps): ItemBuyerTypes.IRenderProps => ({
  total: raw.total,
  page: raw.page,
  pageSize: raw.page_size,
  orders: raw.orders.map(o => parseItemBuyer(o)),
});

export const parseDetailShop = (raw: DetailShopTypes.IResponseProps): DetailShopTypes.IRenderProps => ({
  amount: raw.amount,
  branchIds: raw.branch_ids,
  categoryId: raw.category_id,
  categoryName: raw.category_name,
  commentsAmount: raw.comments_amount,
  description: raw.description,
  id: raw.entity_id,
  uuid: raw.entity_uuid,
  groupIds: raw.group_ids,
  images: raw.images.map(img => ({
    id: img.entity_id,
    imageThumbnailUrl: img.image_thumbnail_url,
    imageUrl: img.image_url,
  }
  )),
  name: raw.name,
  price: raw.price,
  rating: raw.rating,
});
