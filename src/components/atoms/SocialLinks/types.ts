export namespace SocialLinksTypes {
  export interface IProps {
    onSendToken?(data: ISocialToken): void;
  }

  export interface ISocialToken {
    token: string;
    type: string;
  }
}
