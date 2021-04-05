export namespace CardRateTypes {
  export interface IProps {
    rate?: number;
    className?: string;
    handleRate?(rate: number): void;
  }
}
