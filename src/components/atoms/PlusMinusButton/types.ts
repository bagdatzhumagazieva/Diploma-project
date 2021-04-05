export namespace PlusMinusButtonTypes {
  export interface IProps {
    value: number;
    className?: string;
    maxValue?: number;
    addValue?(): void;
    delValue?(): void;
  }
}
