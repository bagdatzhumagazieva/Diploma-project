export namespace BattleModalTypes {
  export interface IProps {
    type: string;
    firstEmployeeName?: string;
    secondEmployeeName?: string;
    firstUserRole?: string;
    secondUserRole?: string;
    avatar1?: string;
    avatar2?: string;
    time?: number;
    donePercent?: number;
  }
}
export interface IOption {
  title: string;
  image: string;
  coins?: any;
  description: any;
  time?: any;
  grade?: any;
}
