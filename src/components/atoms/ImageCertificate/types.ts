import { IBaseProps } from 'src/core/components/types';

export namespace ImageCertificateTypes {
  export interface IProps extends IBaseProps {
    /**
     * Full name of the person to
     * whom the certificate is issued
     */
    userName?: string;
    /**
     * The game name for which the
     * certificate is used
     */
    gameName?: string;
    bgImage?: string;
    gameId?: number;
    courseId?: number;
  }
}
