import React from 'react';
import { mapPropsToAttributes } from 'src/core/components';

import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';

import { ImageCertificateTypes } from 'src/components/atoms/ImageCertificate/types';
import BackgroundImage from 'src/assets/img/certificate/certificate_bg.svg';
import './index.scss';

function ImageCertificate(props: ImageCertificateTypes.IProps) {
  const { userName, gameName, bgImage, courseId } = props;
  const attributes = mapPropsToAttributes<ImageCertificateTypes.IProps>(
    props, 'image-certificate', 'pos_relative',
  );

  return (
    <div {...attributes}>
      {!bgImage && (
        <div className="image-certificate__side-columns pos_absolute fill_h d-flex">
          <div className="side-columns__item side-columns__item--left mr-4 fill_h" />
          <div className="side-columns__item side-columns__item--right fill_h" />
        </div>
      )}
      <Image
        alt="certificate image"
        src={!bgImage ? BackgroundImage : undefined}
        className="image-certificate__image fill"
      />
      <div className="image-certificate__block">
        <div className="image-certificate__content d-flex flex-column align-items-center">
          {!bgImage && <h3 className="content__title mb-2">Сертификат</h3>}
          {userName && gameName && (
            <>
              <Typography variant="xxsmall" color="brown" classNames="mb-10">выдается</Typography>
              <Typography variant="textmed" classNames="mb-10">{userName}</Typography>
              <Typography
                variant="xxsmall"
                color="brown"
                classNames="mb-2"
              >
                за прохождение {courseId ? 'курса' : 'игры'}
              </Typography>
              <Typography variant="xsmall" classNames="content__game-name text-center">"{gameName}"</Typography>
            </>
          )}
        </div>
      </div>
        <p className="image-certificate__author pos_absolute">By gamisoft.com</p>
    </div>
  );
}

export default ImageCertificate;
