export namespace MicroLearningQuizTypes {
  export interface IProps extends IQuestion {
    index?: number;
    className?: string;
    showAnswer: boolean;
    showButtonPressed?: boolean;
    handleSelectedAnswer?(question: IQuestionWithResult): void;
  }
}

export namespace GroupMicroLearningQuizTypes {
  export interface IProps {
    questions: IQuestion[];
  }
}

export interface IQuestion {
  id: string;
  title: string;
  options: IOption[];
  correctAnswerId: string;
}

export interface IQuestionWithResult {
  id: string;
  selectedAnswerId: string;
  correctAnswerId: string;
}

export interface IOption {
  id: string;
  title: string;
}

export interface IOptionWithResult {
  id: string;
  title: string;
  isCorrect: boolean;
}
