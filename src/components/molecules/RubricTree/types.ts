export namespace RubricTreeTypes {
  export interface IProps {
    rubric: IRubric;
    className?: string;
  }
}

export namespace GroupRubricTreeTypes {
  export interface IProps {
    rubrics: IRubric[];
    loading?: boolean;
    className?: string;
    lastItemRef?: any;
    onRubricChange?(categoryId: number): void;
  }
}

export interface IRubric {
  id: string;
  title: string;
  amount: number;
  subRubrics?: IRubric[];
}
