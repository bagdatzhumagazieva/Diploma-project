export namespace ButtonImageUploadTypes {
  export interface IProps {
    handleImageUpload?(image: IImage): void;
    handleImagesUpload?(images: IImage[]): void;
    image?: IImage;
    images?: IImage[];
    disabled?: boolean;
    title?: string;
    isRequired?: boolean;
    description?: string;
    className?: string;
    errorMessage?: string;
    isMultiple?: boolean;
  }

  export interface IImage {
    imageUrl: string;
    imageThumbnailUrl: string;
  }
}
