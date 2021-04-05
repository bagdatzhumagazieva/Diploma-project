import React from 'react';
import moment from 'moment';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import ImageCertificate from 'src/components/atoms/ImageCertificate';
import Typography from 'src/components/atoms/Typography';

import { ModalCertificateTypes } from 'src/components/atoms/ModalCertificate/types';
import DownloadIcon from 'src/assets/img/icons/download.svg';
import './index.scss';

function ModalCertificate(props: ModalCertificateTypes.IProps) {
  const {
    gameName, userName, startDate, dueDate,
    certificateId, bgImage, courseId,
  } = props;

  return (
    <>
      <div className="px-32 mt-32 mb-20">
        <Typography variant="h1" className="pb-32">Поздравляем!</Typography>
        <Typography
          className="mb-16"
          variant="text"
        >
          Вы успешно прошли {courseId ? 'все модули курса' : 'игру'} "{gameName}"
        </Typography>
        <ImageCertificate userName={userName} gameName={gameName} bgImage={bgImage} />
      </div>
      <div className="modal-certificate__bottom px-32 py-24 d-flex justify-content-between color_main_50__bg">
        <div className="d-flex flex-column">
          <Typography color="whiter" variant="xsmall" className="mb-8">
            Получен: {moment(startDate).format('DD.MM.YYYY')}
          </Typography>
          <Typography
            color="whiter"
            variant="xsmall"
          >
            Действителен до: {moment(dueDate).format('DD.MM.YYYY')}
          </Typography>
        </div>
        <div className="d-flex flex-column align-items-end">
          <Button
            type="link"
            variant="xsmall"
            color="whiter"
            className="d-flex mb-8"
          >
            <Image
              alt="download icon"
              src={DownloadIcon}
              classNames="mr-4"
            />
            Скачать
          </Button>
          <Typography
            color="whiter"
            variant="xsmall"
            className="modal-certificate__id"
          >
            № Серитфиката: {certificateId}
          </Typography>
        </div>
      </div>
    </>
  );
}

export default ModalCertificate;
