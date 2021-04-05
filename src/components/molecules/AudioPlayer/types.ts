export namespace AudioPlayerTypes {
  export interface IProps extends IAudio {
    className?: string;
    stopPlaying?: boolean;
    curId?: string | null;
    handleAudioId?(id: string): void;
  }
}

export namespace UseAudioPlayerTypes {
  export interface IProps {
    audioId: string;
  }
}

export namespace GroupAudioPlayerTypes {
  export interface IProps {
    audioRecordings: IAudio[];
  }
}

export namespace BarTypes {
  export interface IProps {
    curTime: number;
    duration: number;
    onTimeUpdate?(time: number): void;
    className?: string;
  }
}

export interface IAudio {
  id: string;
  title: string;
  src: string;
}
