import { IBaseProps } from 'src/core/components/types';

export namespace CardCertificateTypes {
  export interface IProps extends IBaseProps {
    /**
     * Full name of the person to
     * whom the certificate is issued
     */
    userName: string;
    /**
     * Image source of the specific task
     * Such as games, audios, videos and etc
     */
    taskIcon: string;
    /**
     * The name of the game
     */
    gameName: string;
    /**
     * Certificate expiration date
     */
    dueDate: string;
    /**
     * Date of receipt of certificate
     */
    startDate: string;
    certificateId: number;
    bgImage?: string;
    gameId: number | null;
    courseId: number | null;
    getCertificateDownload?:(id: number) => void;
  }
}
