import { Placement } from 'tippy.js';
import { IBaseProps } from 'src/core/components/types';

export namespace HintTypes {
  export interface IProps extends IBaseProps {
    hint: JSX.Element;
    children: JSX.Element;
    theme?: string;
    showOnClick?: boolean;
    placement?: Placement;
    hasArrow?: boolean;
    interactive?: boolean;
  }
}
