import { IBaseProps } from 'src/core/components/types';
import { Month } from 'src/components/molecules/DatePicker/enum';

export namespace DatePickerTypes {
  export interface IProps extends IBaseProps {
    /**
     * Don't know how will came day and
     * year maybe number maybe string
     * let for now just number
     */
    day: number;
    year: number;
    month: Month;
    onChange?(date: IDatePicker): void;
    errorMessage?: string;
  }
}

export interface IDatePicker {
  day: number;
  year: number;
  month: Month;
}
