import { Status } from 'src/store/course/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';
import { GameTypes } from 'src/store/game/types';

export namespace GameCreationEditionTypes {
  export interface IProps {
    companyId: number;
    gameId?: number;
    type: 'create' | 'edit';
    state?: any;
    game?: GameTypes.Game;

    updateGame?(id: number, params: GameTypes.GameUpdate, callbacks?: any): void;
    getGameById?(id: number, companyId: number, callbacks?: any): void;
    createGame?(params: GameTypes.Game, callbacks?: any): void;
  }

  export interface IGame {
    id: number;
    status: Status;
    name: string;
    description?: string;
    imageUrl?: string;
    imageThumbnailUrl?: string;
    tags?: ITag[] | null;
    groupIds?: number[];
    isModifiersIncluded?: boolean;
    certificateExpirationDays?: number;
    certificateImageUrl?: string;
    certificateImageThumbnailUrl?: string;
    rewardAmount?: number;
    certificateEarnMinPercent?: number;
    template?: string;
    templateId: number;
  }

  export interface ILevel {
    id: string;
    name: string;
    description: string;
    tests: ITask[];
    homeworks?: IHomework[];
  }

  export interface ITask {
    id: string;
    name: string;
    description: string;
    cards?: ICard[];
    cardIds?: number[];
  }

  export interface IHomework {
    id: string;
    name: string;
    description: string;
  }
}
