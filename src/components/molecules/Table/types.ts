export declare namespace TableTypes {
  export interface IProps<T> {
    headerData: IHeaderData[];
    bodyData: T[];
    checkbox?: boolean;
    radio?: boolean;
    classNames?: string;
    loading?: boolean;
    wrapperClassName?: string;
    emptyDataDescription?: string;
    onCheckboxChange?(data: T[]): void;
    onRadioChange?(data: T[]): void;
    onSort?(label: string, sortDirection: SortDirection): void;
    lastItemRef?: any;
  }

  export interface IHeaderData {
    key: string;
    name: string;
    /**
     * Width of table column
     * for ex: '200px', '40%,
     */
    width?: string;
    textAlign?: 'left' | 'right' | 'center';
    fixed?: CSSPositionOffsets;
    sort?: boolean;
    localSort?(a: any, b: any): any;
    render?(n: any): JSX.Element;
  }

  export interface IActiveSort {
    index?: number;
    value?: string;
    sortDirection: SortDirection;
  }

  interface CSSPositionOffsets {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    /**
     * Adds box shadow
     */
    final?: 'left' | 'right' | string;
  }
}

export enum SortDirection {
  Default = 'default',
  Ascend = 'asc',
  Descend = 'desc',
}
