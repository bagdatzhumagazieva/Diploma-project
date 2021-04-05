import { RouteComponentProps } from 'react-router';
import { INavItem } from 'src/components/molecules/Nav/types';
import { IBaseProps } from 'src/core/components/types';

export namespace SidebarTypes {
  export interface IProps extends IBaseProps, RouteComponentProps {
    navItems: INavItem[];
    /**
     * The number of top nav items
     */
    cntTopNavItems: number;
    isUserAdmin?: boolean;
    /**
     * Specific props that contains elements names which
     * svg <path> have style fill
     * (Also we have elements that have svg <path> style stroke(default)
     */
    fillElementsNames?: string[];
    isWindowSmall?: boolean;
    companyLogo?: string;
    getCollapsed?(collapsed: boolean): void;
  }
}
