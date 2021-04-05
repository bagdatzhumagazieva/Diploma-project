export namespace StatisticsCardTypes {
  export interface IProps {
    name: string;
    total: number;
    reports: {
      name: string;
      count: number;
      color: string;
    }[];
  }
}
