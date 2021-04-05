export namespace TabsTypes {
  export interface IProps {
    tabOptions: ITabOption[];
    children?: any | any[];
    activeId: string;
    className?: string;
    contentClassName?: string;
    pathname?: string;
    setActiveTabId?(id: string): void;
    hideLine?: boolean;
  }
}

export interface ITabOption {
  /**
   * Id for handling active tab
   */
  id: string;
  /**
   * Label for showing tabs titles
   */
  label: string;
}
