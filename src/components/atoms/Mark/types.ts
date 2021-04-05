import { IBaseProps } from 'src/core/components/types';

export namespace MarkTypes {
  export interface IProps extends IBaseProps {
    state?: 'default' | 'success' | 'failed';
  }
}
