import React from 'react';
import { ShopType } from 'src/pages/GamePages/Shop/ShopDetailPage/types';

const ShopBasketContext = React.createContext({
  basketItems: [] as ShopType.IBasketItem[], setBasketItems: (item: ShopType.IBasketItem[]) => {},
},
);

export default ShopBasketContext;
