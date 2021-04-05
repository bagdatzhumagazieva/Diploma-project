import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import Modal from 'src/components/molecules/Modal';
import ModalImageAttachment from 'src/components/organisms/ModalImageAttachment';

import { MediaTypes } from 'src/store/media/types';
import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';
import { DEFAULT_IMAGE_DATA } from 'src/components/organisms/ButtonImageUpload/consts';
import ImageIcon from 'src/assets/img/icons/image.svg';
import 'src/components/organisms/ButtonImageUpload/index.scss';

function ButtonImageUpload(props: ButtonImageUploadTypes.IProps) {
  const {
    handleImageUpload, image: propsImage, disabled,
    title, isRequired = false, description, className,
    errorMessage: propsErrorMessage, isMultiple, handleImagesUpload,
    images: propsImages,
  } = props;
  const [image, setImage] = useState<ButtonImageUploadTypes.IImage>(DEFAULT_IMAGE_DATA);
  const [images, setImages] = useState<ButtonImageUploadTypes.IImage[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isImageAttachmentModalOpen, setImageAttachmentModal] = useState<boolean>(false);

  const onAttachImage = (image: MediaTypes.IRenderProps) => {
    setImageAttachmentModal(false);
    if (isMultiple) {
      const newImages = [...images, { imageUrl: image.url, imageThumbnailUrl: image.thumbnail }];
      setImages(newImages);
      handleImagesUpload && handleImagesUpload(newImages);
    } else {
      setImage({ imageUrl: image.url, imageThumbnailUrl: image.thumbnail });
      handleImageUpload && handleImageUpload({ imageUrl: image.url, imageThumbnailUrl: image.thumbnail });
    }
  };

  const onCancelImage = () => {
    setImage(DEFAULT_IMAGE_DATA);
    handleImageUpload && handleImageUpload(DEFAULT_IMAGE_DATA);
  };

  const onCancelImageFrom = (id: number) => {
    const newImages = images.filter((e, i) => i !== id);
    setImages(newImages);
    handleImagesUpload && handleImagesUpload(newImages);
  };

  useEffect(
    () => {
      if (!propsImage) return;
      setImage(propsImage);
    },
    [propsImage],
  );

  useEffect(() => {
    if (!propsImages) return;
    setImages(propsImages);
  }, [propsImages]);

  useEffect(
    () => {
      setErrorMessage(propsErrorMessage);
    },
    [propsErrorMessage],
  );

  return (
    <div className={classNames('button-image-upload', className)}>
      {title && (
        <Typography variant="subtext" className="mb-8 d-block">
          {title}
          {isRequired && (
            <Typography variant="tag" color="main_50" className="ml-2">- необязательно</Typography>
          )}
        </Typography>
      )}
      {description && (
        <Typography
          variant="xsmall"
          color="grey_additional_1"
          className="mb-16 d-block"
        >
          {description}
        </Typography>
      )}
      <div className="pos_relative">
        {isMultiple ? (
          <>
            <div className="d-flex flex-wrap">
              {images.map((e, i) => (
                <div key={i} className="mr-40">
                  <Image alt="user image" classNames="button-image-upload__image" src={e.imageUrl} />
                  {!disabled && (
                    <CancelIcon
                      color="#7A7B82"
                      className="pos_absolute ml-8"
                      onClick={() => onCancelImageFrom(i)}
                    />
                  )}
                </div>
              ))}
            </div>
            {images.length < 5 && (
              <Button
                disabled={disabled}
                type="black-icon"
                variant="textmed"
                className="mt-16"
                onClick={() => setImageAttachmentModal(true)}
              >
                <Image alt="image icon" className="mr-8" src={ImageIcon} />
                Добавить изображение
              </Button>
            )}
          </>
        ) : (
          image.imageUrl.length < 1 ? (
              <Button
                disabled={disabled}
                type="black-icon"
                variant="textmed"
                onClick={() => setImageAttachmentModal(true)}
              >
                <Image alt="image icon" className="mr-8" src={ImageIcon} />
                Добавить изображение
              </Button>
            ) :
            <>
              <Image alt="user image" classNames="button-image-upload__image" src={image.imageUrl} />
              {!disabled && (
                <CancelIcon
                  color="#7A7B82"
                  className="pos_absolute ml-8"
                  onClick={onCancelImage}
                />
              )}
          </>
        )}
      </div>
      {errorMessage && (
        <Typography
          className="color_red text-left mt-8 d-block"
          variant="xsmall"
        >
          {errorMessage}
        </Typography>
      )}
      {isImageAttachmentModalOpen && (
        <Modal
          width={976}
          onCloseClick={() => setImageAttachmentModal(false)}
        >
          <ModalImageAttachment
            onDiscard={() => setImageAttachmentModal(false)}
            onAttachImage={onAttachImage}
            onUploadFileSuccess={onAttachImage}
          />
        </Modal>
      )}
    </div>
  );
}

export default ButtonImageUpload;
