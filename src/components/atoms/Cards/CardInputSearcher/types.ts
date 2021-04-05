import { IBaseProps } from 'src/core/components/types';

export namespace CardInputSearcherTypes {
  export interface IProps extends IBaseProps {
    imgSrc?: string;
    type?: string;
    title: string;
    link: string;
  }
}
