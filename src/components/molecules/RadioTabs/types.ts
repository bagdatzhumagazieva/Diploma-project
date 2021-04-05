export namespace RadioTabsTypes {
  export interface IProps {
    tabOptions: ITabOptions[];
    activeIndex: string;
    children?: any[] | any;
    setActiveTabIndex?(index: string, value?: string): void;
  }

  export interface ITabOptions {
    value: string;
    name: string;
    label: string;
  }
}
