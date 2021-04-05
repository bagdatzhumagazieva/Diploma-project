export namespace RateTypes {
  export interface IProps {
    value?: number;
    className?: string;
    count?: number;
    disabled?: boolean;
    onChange?(rating: number): void;
    small?: boolean;
  }
}
