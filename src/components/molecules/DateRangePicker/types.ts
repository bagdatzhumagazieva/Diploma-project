export namespace DateRangePickerTypes {
  export interface IProps {
    // This component will have only static width
    // because of static length of the content '24.03.2020 — 16.04.2020'
    // default width 288, you can assign width by className or with prop
    width?: number;
    className?: string;
    date?: any;
    setDate?(date?: any): void;
  }
}
