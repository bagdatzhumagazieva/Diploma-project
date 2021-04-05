import { LoaderTypes } from 'src/components/atoms/Loader/types';

export namespace PreloaderTypes {
  export interface IProps extends LoaderTypes.IProps {
    // Indicates if loading children is visible or hidden.
    loading: boolean;
    label?: string;
    // Children that will be displayed when loading is finished.
    children: any;
  }
}
