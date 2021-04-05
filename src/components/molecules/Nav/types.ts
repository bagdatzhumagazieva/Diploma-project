import React from 'react';
import { IBaseProps } from 'src/core/components/types';

export namespace NavTypes {
  export interface IProps {
    children: React.ReactNode;
  }
}

export namespace NavItemTypes {
  export interface IProps extends IBaseProps, INavItem {
    /**
     * Checks is current NavItem active
     */
    isActive?: boolean;
    collapsed?: boolean;
    onNavClick?(name: string): void;
    /**
     * Specific props that contains elements names which
     * svg <path> have style fill
     * (Also we have elements that have svg <path> style stroke(default)
     */
    fillElementsNames?: string[];
  }
}

export interface INavItem {
  /**
   * Unique name of the NavItem
   * Recommended set name of the path
   */
  name: string;
  /**
   * The source path
   */
  path: string;
  /**
   * Image source of NavItem
   */
  icon?: React.ReactElement<any>;
  /**
   * Title of NavItem
   */
  title: string;
  /**
   * Show the number of new notifications
   */
  notifications?: number;
}
