declare module 'ckeditor4-react' {
  import * as React from 'react';

  export interface CKEditorProps {
    data: string;
    type?: string;
    onChange?(event: any): void;
    config?: any;
    onFileUploadRequest?(event: any): void;
    onfileUploadResponse?(event: any): void;
  }

  export default class CKEditor extends React.Component<CKEditorProps, any> {
  }
}
