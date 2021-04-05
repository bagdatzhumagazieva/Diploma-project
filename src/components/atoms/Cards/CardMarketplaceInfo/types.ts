import React from 'react';

export declare namespace MarketplaceInfo {
  export interface IProps {
    children?: React.ReactFragment;
    className?: string;
    title: string;
    text: string;
    price: string | number;
    stars?:  number;
    headTitle: string;
    isBought: boolean;
    entityId?: number;
    entityType?: string;
  }
}
