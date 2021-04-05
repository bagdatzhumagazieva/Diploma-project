import React, { useState } from 'react';
import moment from 'moment';
import { mapPropsToAttributes } from 'src/core/components';

import Button from 'src/components/atoms/Button';
import ImageCertificate from 'src/components/atoms/ImageCertificate';
import Image from 'src/components/atoms/Image';
import ModalCertificate from 'src/components/atoms/ModalCertificate';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';

import { CardCertificateTypes } from 'src/components/molecules/Cards/CardCertificate/types';
import DownloadIcon from 'src/assets/img/icons/download.svg';
import 'src/components/molecules/Cards/CardCertificate/index.scss';
import certificateActions from 'src/store/certificate/actions';
import { connect } from 'react-redux';

function CardCertificate(props: CardCertificateTypes.IProps) {
  const { dueDate, taskIcon, gameName, userName, bgImage, getCertificateDownload, certificateId } = props;
  const attributes = mapPropsToAttributes<CardCertificateTypes.IProps>(
    props, 'card-certificate', 'd-flex flex-column', 'p-16',
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const onCloseModalClick = () => setShowModal(false);

  const onClickDownload = (id: number) => {
    getCertificateDownload && getCertificateDownload(id);
  };

  return (
    <div {...attributes}>
      <div onClick={() => setShowModal(true)}>
        <ImageCertificate userName={userName} gameName={gameName} bgImage={bgImage} />
      </div>
      <div className="card-certificate__content mt-32">
        <div className="card-certificate__game mb-24 d-flex">
          <Image
            alt="game image"
            src={taskIcon}
            classNames="game__image mr-12"
          />
          <Typography
            classNames="game__name cursor-pointer"
            variant="textmed"
            onClick={() => setShowModal(true)}
          >
            "{gameName}"
          </Typography>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Typography
            variant="subtext"
            color="grey_additional_2"
          >
            Действует до: {moment(dueDate).format('DD.MM.YYYY')}
          </Typography>
          <Button
            variant="xsmallmed"
            onClick={() => onClickDownload(certificateId)}
            className="px-8 py-4 text-white d-flex"
          >
            <Image
              alt="download icon"
              src={DownloadIcon}
              classNames="mr-4"
            />
            Скачать
          </Button>
        </div>
      </div>
      {showModal && (
        <Modal width={496} onCloseClick={onCloseModalClick}>
          <ModalCertificate {...props} />
        </Modal>
      )}
    </div>
  );
}

export const mapDispatchToProps = {
  getCertificateDownload: certificateActions.getCertificateDownload,
};

export default connect<any, any>(
  null,
  mapDispatchToProps,
)(CardCertificate);
