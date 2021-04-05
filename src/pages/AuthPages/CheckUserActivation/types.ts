import { ProfileTypes } from 'src/store/profile/types';
import { RouteComponentProps } from 'react-router';

export namespace CheckUserActivationTypes {
  export interface IProps extends RouteComponentProps {
    loading?: boolean;
    token?: string;
    error?: string;
    isNew?: boolean;
    profile?: ProfileTypes.IRenderProps;
    getUserActivationToken?:(uuid: string, code: string, callback?: any) => void;
    getProfile?(callback?: any): void;
  }
}
