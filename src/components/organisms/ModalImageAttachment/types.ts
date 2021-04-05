import { MediaTypes } from 'src/store/media/types';
import { ILoadTypes } from 'src/core/store/types';
import { Crop } from 'react-image-crop';

export namespace ModalImageAttachmentTypes {
  export interface IProps {
    uploadedCompanyFileData?: ILoadTypes<MediaTypes.IRenderProps>;
    uploadCompanyFile?(image: File): void;
    clearAddedCompanyFiles?(): void;
    onDiscard?(): void;
    onAttachImage?(image: MediaTypes.IRenderProps): void;
    onUploadFileSuccess?(image: MediaTypes.IRenderProps): void;
  }
}

export namespace ModalImageAttachmentGalleryTypes {
  export  interface IProps {
    className?: string;
    companyFilesData?: ILoadTypes<MediaTypes.IRenderProps[]>;
    onDiscard?(): void;
    onAttachImage?(image: MediaTypes.IRenderProps): void;
    getCompanyFiles?(params: MediaTypes.ICompanyFilesBodyParams): void;
  }
}

export namespace ModalImageAttachmentCropTypes {
  export interface IProps {
    title: string;
    aspect?: number;
    error?: string;
    onDiscard?(): void;
    onSaveCroppedImage?(image: File, crop: Crop): void;
    onSaveCroppedImageFromGallery?(image: MediaTypes.IRenderProps, crop: Crop): void;
  }
}
