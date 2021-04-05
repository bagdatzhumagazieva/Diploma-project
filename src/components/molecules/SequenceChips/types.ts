export namespace SequenceChipsTypes {
  export interface IProps {
    className?: string;
    sequence: ISequence[];
    onSequenceChange(sequence: ISequence[]): void;
  }

  export interface ISequence {
    id: string;
    text: string;
  }
}
