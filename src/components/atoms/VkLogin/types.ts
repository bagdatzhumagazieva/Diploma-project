import { RouteComponentProps } from 'react-router';
import { GmailLoginTypes } from 'src/components/atoms/GmailLogin/types';

export namespace VkLoginTypes {
  export interface IProps extends GmailLoginTypes.IProps, RouteComponentProps{
  }
}
