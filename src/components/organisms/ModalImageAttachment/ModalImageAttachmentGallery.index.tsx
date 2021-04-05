import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import mediaActions from 'src/store/media/actions';
import { LOCAL_STORAGE } from 'src/core/store/values';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Preloader from 'src/components/atoms/Preloader';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import { UploadedImagesSortOptions } from 'src/components/organisms/ModalImageAttachment/consts';
import { ModalImageAttachmentGalleryTypes } from 'src/components/organisms/ModalImageAttachment/types';
import { MediaTypes } from 'src/store/media/types';

function ModalImageAttachmentGallery(props: ModalImageAttachmentGalleryTypes.IProps) {
  const { className, companyFilesData, getCompanyFiles, onDiscard, onAttachImage } = props;
  const { data: companyFiles, loading, errorMessage } = companyFilesData || {};

  const [selectedSort, setSelectedSort] = useState(UploadedImagesSortOptions[2]);
  const [selectedImage, setSelectedImage] = useState<MediaTypes.IRenderProps>();
  const companyUuid = localStorage.getItem(LOCAL_STORAGE.COMPANY_UUID);

  useEffect(
    () => {
      getCompanyFiles && companyUuid && getCompanyFiles({
        company_uuid: companyUuid,
        type: 'image',
        ordering: selectedSort.value,
      });
    },
    [companyUuid, selectedSort],
  );

  return (
    <div className={`modal-image-attachment__gallery ${className}`}>
      <div className="d-flex align-items-center mx-24 mt-24">
        <Typography
          variant="text"
          className="mr-auto"
        >
          Загруженные изображения
        </Typography>
        <Typography
          variant="subtext"
          className="mr-8"
          color="grey_additional_2"
        >
          Сортировка:
        </Typography>
        <Select
          options={UploadedImagesSortOptions}
          selectedOption={selectedSort}
          setSelectedOption={setSelectedSort}
        />
      </div>
      <Preloader loading={!!loading} className="my-16">
        {errorMessage && (
          <Typography
            variant="text"
            classNames="text-center d-block my-8"
            color="red"
          >
            {errorMessage}
          </Typography>
        )}
        {companyFiles && (
          <div className={classNames('mt-16 gallery d-flex flex-wrap', { 'gallery--with-drawer': selectedImage })}>
            {companyFiles.map(n => (
              <div
                key={n.uuid}
                className={classNames(
                  'gallery-item d-flex flex-column',
                  { 'gallery-item--active': selectedImage?.uuid === n.uuid  },
                )}
                onClick={() => setSelectedImage(n)}
              >
                <div className="gallery-item__image-wrap">
                  <Image
                    src={n.thumbnail}
                    alt={n.name}
                    classNames="gallery-item__image"
                  />
                </div>
                <div className="gallery-item__footer">
                  <Typography variant="subtext">
                    {n.name}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        )}
      </Preloader>
      {selectedImage && (
        <div className="d-flex modal-image-attachment__gallery__drawer">
          <Button
            type="link"
            variant="text"
            className="mr-16 ml-auto"
            onClick={onDiscard}
          >
            Отмена
          </Button>
          <Button
            variant="textmed"
            className="px-36"
            onClick={() => onAttachImage && onAttachImage(selectedImage)}
          >
            Прикрепить
          </Button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  companyFilesData: state.mediaReducer.companyFiles,
});

const mapDispatchToProps = {
  getCompanyFiles: mediaActions.getCompanyFiles,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(ModalImageAttachmentGallery);
