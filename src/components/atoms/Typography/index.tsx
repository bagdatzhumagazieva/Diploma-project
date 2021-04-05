import * as React from 'react';
import { mapPropsToAttributes } from 'src/core/components';
import { IBaseAttributes } from 'src/core/components/types';
import { eraseFromObject } from 'src/utils/serialization';
import { ITypographyProps, TypographyVariants } from 'src/components/atoms/Typography/types';

function Typography(props: ITypographyProps): JSX.Element {
  return React.createElement<IBaseAttributes>(
    props.element ? props.element : TypographyVariants[props.variant] || TypographyVariants.text,
    {
      ...eraseFromObject(props, 'variant', 'classNames', 'element', 'covered', 'color'),
      ...mapPropsToAttributes<ITypographyProps>(props, 'typography', {
        [`typography__variant-${props.variant}`]: props.variant,
        [`color_${props.color}`]: props.color,
      }),
    },
    props.children);
}

export default Typography;
