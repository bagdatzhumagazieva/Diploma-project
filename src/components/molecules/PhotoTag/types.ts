export namespace PhotoTagTypes {
  export interface IProps {
    className?: string;
    marksCount: number;
    marks: IMark[];
    onMarksChange?(marks: IMark[]): void;
    onMarkAdd?(): void;
    onMarkDelete?(markId: string): void;
    getImageDimensions?(height: number, width: number): void;
    image: string;
  }

  export interface IMark {
    id: string;
    x: number;
    y: number;
  }
}
