import React from 'react';

export declare namespace CardTypes {
  export interface IProps {
    children: React.ReactFragment;
    classNames?: string;
    backLink?: string;
    hasBoxShadow?: boolean;
    onClick?(): void;
  }
}
