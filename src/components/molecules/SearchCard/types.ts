import React from 'react';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';

export namespace SearchCardTypes {
  export interface IProps {
    title?: string;
    options: ICard[];
    getSearchedKeyword?(keyword: string): void;
    getSelectedCard?(card: ICard): void;
    lastItemCardRef: React.Ref<HTMLDivElement>;
    loading: boolean;
  }
}
