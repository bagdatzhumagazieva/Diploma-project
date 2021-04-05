import React from 'react';
import { mapPropsToAttributes } from 'src/core/components';
import { ReactComponent as IconDone } from 'src/assets/img/icons/done.svg';
import { ReactComponent as IconClose } from 'src/assets/img/icons/close.svg';
import { MarkTypes } from 'src/components/atoms/Mark/types';
import 'src/components/atoms/Mark/index.scss';

export const markSize = 30;

function Mark(props: MarkTypes.IProps) {
  const { state = 'default' } = props;

  const attributes = mapPropsToAttributes<MarkTypes.IProps>(
    props,
    'mark',
    { 'mark--success': state === 'success' },
    { 'mark--failed': state === 'failed' },
  );

  return (
    <div {...attributes}>
      {state === 'success' && <IconDone className="mark__icon" />}
      {state === 'failed' && <IconClose className="mark__icon" />}
    </div>
  );
}

export default Mark;
