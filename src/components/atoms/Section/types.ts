import React from 'react';

export namespace CardGroupTypes {
  export interface IProps {
    title: string;
    children?: React.ReactFragment;
    link?: string;
    className?: string;
  }
}
