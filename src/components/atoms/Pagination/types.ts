export namespace PaginationTypes {
  export interface IProps {
    /**
     * params: total
     * description: Общее количество элементов
     */
    total: number;
    page?: number;
    onGetPage?(page: number): void;
    pageSize?: number;
    className?: string;
  }
}
