export namespace CardNewsTypes {
  export interface IProps {
    type: 'own' | 'others';
    icon: string;
    title: string;
    description: string;
    date: string;
    userName?: string;
    className?: string;
    link?: string;
  }
}
