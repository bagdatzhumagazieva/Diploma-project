export namespace ProgressBarTypes {
  export interface IProps {
    /**
     * Percent of progress bar,
     * min value: 0,
     * max value: 100
     */
    percent: number;
    /**
     * Label of progress bar
     */
    label?: string;
    /**
     * Position of progress percent,
     * default position: bottom
     */
    position?: 'bottom' | 'right' | 'top';
    /**
     * Doesn't show percent and title
     */
    regular?: boolean;
    className?: string;
  }
}
