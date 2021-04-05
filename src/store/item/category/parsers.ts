import { ItemCategoryTypes } from 'src/store/item/category/types';

export const parseItemCategoryData = (raw: ItemCategoryTypes.IResponseProps): ItemCategoryTypes.IRenderProps => ({
  id: raw.id,
  name: raw.name,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  uuid: raw.uuid,
  isActive: raw.is_active,
  companyId: raw.company_id,
  checkboxChecked: false,
});
