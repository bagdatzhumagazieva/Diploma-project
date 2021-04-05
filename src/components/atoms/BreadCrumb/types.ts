export namespace BreadcrumbTypes {
  export interface IProps {
    items: IBreadCrumbItem[];
    className?: string;
    itemsLoading?: boolean;
    /**
     * adds arrow (>) between breadcrumbs
     */
    withTrail?: boolean;
    loading?: boolean;
  }

  export interface IBreadCrumbItem {
    label: string | null;
    link?: string;
  }
}
