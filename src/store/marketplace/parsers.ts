import { MarketplaceOrderTypes, MarketplaceItemTypes, MarketplaceItemDetailTypes, MarketplaceCategoryTypes } from "src/store/marketplace/types";

export const parseOrderResponse = (raw: MarketplaceOrderTypes.IResponseProps): MarketplaceOrderTypes.IRenderProps => ({
  total: raw.total,
  itemOrders: raw.item_orders.map((el) => parseOrders(el)),
});

export const parseOrders = (raw: MarketplaceOrderTypes.IOrderResponse): MarketplaceOrderTypes.IOrderRender => ({
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  id: raw.id,
  uuid: raw.uuid,
  userId: raw.user_id,
  companyId: raw.company_id,
  employmentId: raw.employment_id,
  amount: raw.amount,
  item: parseOrderItem(raw.item),
  status: raw.status,
  isActive: raw.is_active,
})

export const parseMyOrderCategory = (raw: MarketplaceOrderTypes.ICategoryResponse): MarketplaceOrderTypes.ICategoryRender => ({
  name: raw.name,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  id: raw.id,
  uuid: raw.uuid,
  isActive: raw.is_active,
  companyId: raw.company_id,
});

export const parseOrderItem = (raw: MarketplaceOrderTypes.IOrderItemResponse): MarketplaceOrderTypes.IOrderItemRender => ({
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  id: raw.id,
  uuid: raw.uuid,
  name: raw.name,
  description: raw.description,
  entityId: raw.entity_id,
  entityUuid: raw.entity_uuid,
  type: raw.type,
  price: raw.price,
  amount: raw.amount,
  creatorName: raw.creator_name,
  creatorEmail: raw.creator_email,
  creatorAddress: raw.creator_address,
  category: parseMyOrderCategory(raw.category),
  images: raw.images?.map((el) => parseMyOrderImage(el)),
  isActive: raw.is_active,
});

export const parseMyOrderImage = (raw: MarketplaceOrderTypes.IImageResponse): MarketplaceOrderTypes.IImageRender => ({
  imageUrl: raw.image_url,
  imageThumbnailUrl: raw.image_thumbnail_url,
  order: raw.order,
});

export const parseItemResponse = (raw: MarketplaceItemTypes.IResponseProps): MarketplaceItemTypes.IRenderProps => ({
  total: raw.total,
  items: raw.items.map((item) => parseMarketplaceItem(item)),
});

export const parseItemImage = (raw: MarketplaceItemTypes.IImageResponse): MarketplaceItemTypes.IImageRender => ({
  entityId: raw.entity_id,
  entityUuid: raw.entity_uuid,
  imageUrl: raw.image_url,
  imageThumbnailUrl: raw.image_thumbnail_url,
  order: raw.order,
});

export const parseMarketplaceItem = (raw: MarketplaceItemTypes.IItemResponse): MarketplaceItemTypes.IItemRender => ({
  entityId: raw.entity_id,
  entityUuid: raw.entity_uuid,
  name: raw.name,
  description: raw.description,
  price: raw.price,
  categoryId: raw.category_id,
  categoryName: raw.category_name,
  amount: raw.amount,
  images: raw.images.map((i) => parseItemImage(i)),
  itemEntityId: raw.entity_id,
  itemEntityUuid: raw.entity_uuid,
  itemEntityType: raw.item_entity_type,
  rating: raw.rating,
  commentsAmount: raw.comments_amount,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  isBought: raw.is_bought,
});

export const parseFilterCategory = (raw:MarketplaceCategoryTypes.ICategoryResponse): MarketplaceCategoryTypes.ICategoryRender => ({
  categoryId: raw.category_id,
  categoryName: raw.category_name,
  amount: raw.amount,
});

export const parseMarketplaceItemDetail = (raw: MarketplaceItemDetailTypes.IResponseProps): MarketplaceItemDetailTypes.IRenderProps => ({
  entityId: raw.entity_id,
  entityUuid: raw.entity_uuid,
  name: raw.name,
  description: raw.description,
  price: raw.price,
  categoryId: raw.category_id,
  categoryName: raw.category_name,
  amount: raw.amount,
  images: raw.images.map((i) => parseItemImage(i)),
  itemEntityId: raw.item_entity_id,
  itemEntityUuid: raw.item_entity_uuid,
  itemEntityType: raw.item_entity_type,
  rating: raw.rating,
  commentsAmount: raw.comments_amount,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  isBought: raw.is_bought,
  creatorName: raw.creator_name,
  creatorEmail: raw.creator_email,
  creatorPhone: raw.creator_phone,
  creatorAddress: raw.creator_address,
  similarItems: raw.similar_items.map((item) => parseMarketplaceItem(item)),
});
