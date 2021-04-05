import React from 'react';
import { ITag } from 'src/components/organisms/AdminTags/types';

export namespace SearchChipsTypes {
  export interface IProps {
    companyId: number;
    results?: IData[];
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    lastItemRef?: React.Ref<any>;
    initialValues?: IData[];

    onSearchValueChange?(value: string): void;
    setSelectedIds?(tags: ITag[]): void;
    createTag?(companyId: number, tagName: string, callbacks?: any): void;
  }

  export interface IData {
    id: number;
    name: string;
  }
}
