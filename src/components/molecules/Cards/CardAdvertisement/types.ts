export namespace CardAdvertisementTypes {
  export interface IProps {
    title: string;
    image?: string;
    /**
     * Rating, type double, whose value is from 0,0 to 5,0
     */
    rating: number;
    coins: number;
    link: string;
    favorite?: boolean;
    className?: string;
  }
}
