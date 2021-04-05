import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactCrop, { Crop, PercentCrop } from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

import { clearAddedCompanyFiles } from 'src/store/media/actions';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import DropZone from 'src/components/molecules/DropZone';
import ModalImageAttachmentGallery from 'src/components/organisms/ModalImageAttachment/ModalImageAttachmentGallery.index';

import { imageFileExtensions } from 'src/components/molecules/DropZone/types';
import { ModalImageAttachmentCropTypes } from 'src/components/organisms/ModalImageAttachment/types';
import { IMAGE_ATTACHMENT_TABS } from 'src/components/organisms/ModalImageAttachment/consts';
import IconUpload from 'src/assets/img/icons/upload.svg';
import { MediaTypes } from 'src/store/media/types';
import 'src/components/organisms/ModalImageAttachment/index.scss';

function ModalImageAttachmentCrop(props: ModalImageAttachmentCropTypes.IProps) {
  const {
    onSaveCroppedImage,
    onSaveCroppedImageFromGallery,
    onDiscard,
    title,
    error,
    aspect,
  } = props;

  const [selectedTab, setSelectedTab] = useState<string>(IMAGE_ATTACHMENT_TABS[0].value);
  const [image, setImage] = useState<MediaTypes.IRenderProps>();
  const [rawImage, setRawImage] = useState<File>();
  const [crop, setCrop] = useState<Crop>({ aspect: aspect || 1, unit: 'px' });
  const [errorImage, setErrorImage] = useState<string>(error || '');

  useEffect(() => {
    error && setErrorImage(error);
  },        [error]);
  const onTabChange = (tab: string) => () => {
    setSelectedTab(tab);
  };

  const onImageSuccessfullyUpload = (image: File) => {
    setRawImage(image);
  };

  const handleCropChange = (crop: Crop, perc: PercentCrop) => {
    setCrop(perc);
    setErrorImage('');
  };

  const onSaveCroppedImageClick = (type: 'rawImage' | 'fromGallery') => {
    if (type === 'rawImage') {
      onSaveCroppedImage && rawImage && onSaveCroppedImage(rawImage, crop);
    } else if (type === 'fromGallery') {
      onSaveCroppedImageFromGallery && image &&
        onSaveCroppedImageFromGallery(image, crop);
    }
  };

  return (
    <div className="modal-image-attachment">
      <div className="modal-image-attachment__header pt-24 d-flex flex-column">
        <Typography
          variant="h1"
          className="ml-24 mb-24"
        >
          {title}
        </Typography>
        <div className="modal-image-attachment__tabs d-flex align-self-start">
          {IMAGE_ATTACHMENT_TABS.map(tab => (
            <Button
              key={tab.value}
              variant={selectedTab === tab.value ? 'textmed' : 'text'}
              classNames={[
                'tabs__button px-24 py-12',
                { 'tabs__button--active': selectedTab === tab.value },
              ]}
              onClick={onTabChange(tab.value)}
            >
              {tab.title}
            </Button>
          ))}
        </div>
      </div>

      {selectedTab === IMAGE_ATTACHMENT_TABS[0].value && (
        <>
          {rawImage
            ? <div className="modal-image-attachment__cropper">
              <Typography
                variant="subtext"
                className="p-24"
              >
                Чтобы кадрировать изображение, выделите нужную область и нажмите кнопку "Сохранить"
              </Typography>
              <div className="d-flex">
                <ReactCrop
                  crop={crop}
                  src={rawImage.name}
                  className="modal-image-attachment__cropper_img"
                  renderComponent={
                    <Image
                      alt="image"
                      src={URL.createObjectURL(rawImage)}
                    />
                  }
                  onChange={handleCropChange}
                />
              </div>
              {errorImage && (
                <Typography
                  variant="text"
                  color="red"
                  className="text-center p-24"
                >
                  {errorImage}
                </Typography>
              )}
              <div className="d-flex p-24">
                <Button
                  type="link"
                  variant="text"
                  className="mr-16 ml-auto"
                  onClick={() => setRawImage(undefined)}
                >
                  Отмена
                </Button>
                <Button
                  variant="textmed"
                  className="px-36"
                  onClick={() => onSaveCroppedImageClick('rawImage')}
                >
                  Сохранить
                </Button>
              </div>
            </div>
            : <DropZone
              correctFormatsDesc={imageFileExtensions.join(', ')}
              className="modal-image-attachment__drop-zone"
              multipleFileUploadError="Только 1 изображение может быть загружено за один раз"
              correctFileExtensions={imageFileExtensions}
              icon={IconUpload}
              onFileSuccessfullyUpload={onImageSuccessfullyUpload}
            />
          }
        </>
      )}

      {selectedTab === IMAGE_ATTACHMENT_TABS[1].value && (
        <>
          {image ? (
            <div className="modal-image-attachment__cropper">
              <Typography
                variant="subtext"
                className="p-24"
              >
                Чтобы кадрировать изображение, выделите нужную область и нажмите кнопку "Сохранить"
              </Typography>
              <div className="d-flex">
                <ReactCrop
                  crop={crop}
                  src={image.url}
                  className="modal-image-attachment__cropper_img"
                  renderComponent={
                    <Image
                      alt="image"
                      src={image.url}
                    />
                  }
                  onChange={handleCropChange}
                />
              </div>
              {errorImage && (
                <Typography
                  variant="text"
                  color="red"
                  className="text-center p-24"
                >
                  {errorImage}
                </Typography>
              )}
              <div className="d-flex p-24">
                <Button
                  type="link"
                  variant="text"
                  className="mr-16 ml-auto"
                  onClick={() => setImage(undefined)}
                >
                  Отмена
                </Button>
                <Button
                  variant="textmed"
                  className="px-36"
                  onClick={() => onSaveCroppedImageClick('fromGallery')}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          ) :
            <ModalImageAttachmentGallery
              onDiscard={onDiscard}
              onAttachImage={setImage}
            />
          }
        </>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  clearAddedCompanyFiles,
};

export default connect<any>(
  null,
  mapDispatchToProps,
)(ModalImageAttachmentCrop);
