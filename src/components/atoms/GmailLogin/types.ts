import { SocialLinksTypes } from 'src/components/atoms/SocialLinks/types';

export namespace GmailLoginTypes {
  export interface IProps {
    onGetToken?(token: SocialLinksTypes.ISocialToken): void;
  }
}
