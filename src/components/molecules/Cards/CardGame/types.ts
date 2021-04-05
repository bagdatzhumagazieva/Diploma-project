export namespace CardGameTypes {
  export interface IProps extends ICardGame {
    className?: string;
  }
}

export interface ICardGame {
  id: number;
  name: string;
  description: string;
  createdAt?: string;
  cntPassedLevels?: number;
  cntLevels?: number;
  numberOfViews?: number;
  rewardAmount: number;
  templateId: number | string;
  template?: string;
  passedLevels?: ILevel[];
  leaders?: ILeader[];
  imageUrl?: string;
  imageThumbnailUrl?: string;
  isFavorite?: boolean;
  minutesToFinish?: number;
  link?: string;
  types?: string[];
  rating?: number;
  groups?: IGroup[];
  status?: string;
  isFinished?: boolean;
  progress?: number;
  hasCertificate?: boolean;
  levelsData?: {
    finishedLevelsCount: number,
    total: number,
  };
}

interface IGroup {
  name: string;
  value: string;
}
interface ILevel {
  levelNum: number;
  title: string;
  link: string;
}

interface ILeader {
  /**
   * Player rank example: "Профи", "Новичок", "Продолжающий"
   */
  rank: string;
  userName: string;
  userImage: string;
  coins: number;
}
