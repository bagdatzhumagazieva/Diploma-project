import { IBaseAttributeProps } from 'src/core/components/types';

export namespace ImageTypes {
  export interface IProps extends IBaseAttributeProps<HTMLImageElement> {
    src?: string;
    alt: string;
    fallbackImage?: string;
    onImageLoadSuccess?(blob: Blob): void;
    getImageDimensions?(height: number, width: number): void;
  }
}
