import { WithTranslation } from 'react-i18next';
import { IBaseProps } from 'src/core/components/types';

export namespace AuthFooterTypes {
  export interface IProps extends WithTranslation, IBaseProps {
    color?: string;
  }
}
