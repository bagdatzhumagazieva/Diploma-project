export declare namespace DropZoneTypes {
  export interface IProps {
    className?: string;
    loading?: boolean;
    error?: string;
    desc?: string;
    icon?: string;
    correctFileExtensions: string[];
    correctFormatsDesc?: string;
    multipleFileUploadError?: string;
    onFileSuccessfullyUpload?(file: File): void;
  }
}

export const excelFileExtensions = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '.xlsx', '.xls'];
export const imageFileExtensions = ['image/jpeg', 'image/png', '.jpg', '.jpeg', '.png'];
