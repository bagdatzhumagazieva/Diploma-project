export namespace RewardTypes {
  export interface IProps {
  }

  export interface IData {
    days: number | null;
    image: string | null;
    coins: number | null;
  }

  export interface IDataErrorMessages {
    days: string;
    coins: string;
  }
}
