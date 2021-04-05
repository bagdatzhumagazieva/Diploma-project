export namespace AnswerOptionsTypes {
  export interface IProps {
    isPollAnswer?: boolean;
    withMultipleSelect?: boolean;
    answerOptions: IAnswerOptionWithSelectedOne;
    isDefaultOtherOptionAddable?: boolean;
    isOpenQuestion?: boolean;
    onAnswerOptionsChange(options: IAnswerOptionWithSelectedOne): void;
    onNewOptionAdd(isDefaultOtherOptions?: boolean): void;
    onOptionDelete(id: string): void;
  }

  export interface IAnswerOption {
    id: string;
    label: string;
    isDefaultOtherOptions?: boolean;
  }

  export interface IAnswerOptionWithSelectedOne {
    options: IAnswerOption[];
    selectedOption?: string;
    selectedOptions?: string[];
  }
}
