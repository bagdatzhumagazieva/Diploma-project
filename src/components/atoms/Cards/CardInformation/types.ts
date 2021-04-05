export namespace CardInformationTypes {
  export interface IProps {
    type: 'games' | 'battles' | 'knowledge-set' | 'courses';
    descriptions: string[];
    className?: string;
  }
}
