export namespace CardContentTypes {
  export interface IProps {
    content: IContent;
    onBackClick?(): void;
    onContentStepCompleted(content: IContent): void;
  }

  export interface IContent {
    description: string;
    article: string;
    timeToStudy: number | undefined;
  }
}
