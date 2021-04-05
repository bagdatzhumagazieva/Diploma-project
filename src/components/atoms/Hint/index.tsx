import * as React from 'react';
import Tippy from '@tippy.js/react';
import { HintTypes } from './types';
import 'tippy.js/dist/tippy.css';
import './index.scss';

function Hint(props: HintTypes.IProps) {
  return (
    <Tippy
      className={props.className}
      placement={props.placement || 'top'}
      content={props.hint}
      arrow={props.hasArrow}
      trigger={props.showOnClick ? 'click' : 'mouseenter'}
      theme={props.theme || 'light'}
      interactive={props.interactive}
    >
      <span>
        {props.children}
      </span>
    </Tippy>
  );
}

export default Hint;
