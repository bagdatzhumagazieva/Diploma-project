import { ITag } from 'src/components/organisms/AdminTags/types';

export namespace CardEducationTypes {
  export interface IProps {
    id: number;
    image?: string;
    title: string;
    rating: number;
    /**
     * The number of players who play this game
     */
    players?: number;
    /**
     * Time spent on passing this game
     * in minutes
     */
    time: number;
    /**
     * Link to the game
     */
    link: string;
    /**
     * Currently by know only two types 'course' and 'game'
     * If will be more please add and change the logic
     */
    type: 'course' | 'game';
    progress: number;
    className?: string;
    favorite?: boolean;
    variant?: 1 | 2;
    tags?: ITag[];
    size?: 'small' | 'normal';
    handleFavoriteClick?(id: number, favorite: boolean): void;
  }
}
