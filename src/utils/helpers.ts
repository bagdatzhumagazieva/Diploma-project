import React from 'react';
import { CategoryTypes } from 'src/store/category/types';
import { Crop } from 'react-image-crop';
import { CardTypes } from 'src/store/card/types';

export const onKeyDown = (callback: any, key = 'Enter') => (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === key) {
    event.preventDefault();
    event.stopPropagation();
    callback();
  }
};

const findCategory = (
  category: CategoryTypes.ICategoryRenderProps,
  id: number,
): CategoryTypes.ICategoryRenderProps | null => {
  if (category.id === id) {
    return category;
  }
  if (category.subCategories !== null) {
    let res = null;
    for (let i = 0; res === null && i < category.subCategories.length; i = i + 1) {
      res = findCategory(category.subCategories[i], id);
    }
    return res;
  }
  return null;
};

export const findCategoryFromArray = (categories: CategoryTypes.ICategoryRenderProps[], id: number) => {
  let res = null;
  for (let i = 0; res == null && i < categories.length; i = i + 1) {
    res = findCategory(categories[i], id);
  }
  return res;
};

export const findCategoryPath = (categories: CategoryTypes.ICategoryRenderProps[], id: number) => {
  const res = [];
  let cat = findCategoryFromArray(categories, id);
  res.push(cat);
  while (cat) {
    cat = findCategoryFromArray(categories, cat.parentId);
    cat && res.push(cat);
  }
  return res.reverse();
};

export const findCardCategoryPath = (categoryProp: CardTypes.IRenderCategory) => {
  const categoryPath: Omit<CardTypes.IRenderCategory, 'parentCategory'>[] = [];
  let category = categoryProp;

  const addCategoryToPath = (category: CardTypes.IRenderCategory) => {
    const { parentCategory, ...rest } = category;
    category && categoryPath.push(rest);
  };

  addCategoryToPath(category);
  while (category.parentCategory) {
    category = category.parentCategory;
    addCategoryToPath(category);
  }

  return categoryPath.reverse();
};

export const changeImageCropRatio = (image: File | string, crop: Crop, onSuccess?:(image: File | string, coords: number[]) => any) => {
  const { x = 0, y = 0, width = 0, height = 0 } = crop;
  const img = new Image();
  img.onload = function () {
    const cropX = Math.floor(x * img.width / 100);
    const cropY = Math.floor(y * img.height / 100);
    const cropWidth = Math.floor(width * img.width / 100);
    const cropHeight = Math.floor(height * img.height / 100);

    crop && onSuccess && onSuccess(
      image,
      [cropX, cropY, cropWidth + cropX, cropHeight + cropY],
    );
  };
  if (image instanceof File) {
    img.src = URL.createObjectURL(image);
  } else {
    img.src = image;
  }
};

export const isEqualArray = function (value: any, other: any) {

  // Get the value type
  const type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  const compare = (item1: any, item2: any): any => {

    // Get the object type
    const itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqualArray(item1, item2)) return false;
    } else {

      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }

    }
  };

  // Compare properties
  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i += 1) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }
  return true;
};
