import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mediaActions from 'src/store/media/actions';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import DropZone from 'src/components/molecules/DropZone';
import { IMAGE_ATTACHMENT_TABS } from 'src/components/organisms/ModalImageAttachment/consts';
import { imageFileExtensions } from 'src/components/molecules/DropZone/types';
import ModalImageAttachmentGallery from 'src/components/organisms/ModalImageAttachment/ModalImageAttachmentGallery.index';
import { ModalImageAttachmentTypes } from 'src/components/organisms/ModalImageAttachment/types';
import IconUpload from 'src/assets/img/icons/upload.svg';
import 'src/components/organisms/ModalImageAttachment/index.scss';

function ModalImageAttachment(props: ModalImageAttachmentTypes.IProps) {
  const {
    uploadCompanyFile,
    uploadedCompanyFileData,
    onUploadFileSuccess,
    clearAddedCompanyFiles,
    onDiscard,
    onAttachImage,
  } = props;

  const { data: uploadedCompanyFile, errorMessage } = uploadedCompanyFileData || {};
  const [selectedTab, setSelectedTab] = useState<string>(IMAGE_ATTACHMENT_TABS[0].value);

  useEffect(
    () => {
      uploadedCompanyFile && onUploadFileSuccess && onUploadFileSuccess(uploadedCompanyFile);
      uploadedCompanyFile && clearAddedCompanyFiles && clearAddedCompanyFiles();
    },
    [uploadedCompanyFile],
  );

  const onTabChange = (tab: string) => () => {
    setSelectedTab(tab);
  };

  const onImageSuccessfullyUpload = (image: File) => {
    uploadCompanyFile && uploadCompanyFile(image);
  };

  return (
    <div className="modal-image-attachment">
      <div className="modal-image-attachment__header pt-24 d-flex flex-column">
        <Typography
          variant="h1"
          className="ml-24 mb-24"
        >
          Прикрепление изображения
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
        <DropZone
          correctFormatsDesc={imageFileExtensions.join(', ')}
          className="modal-image-attachment__drop-zone"
          multipleFileUploadError="Только 1 изображение может быть загружено за один раз"
          correctFileExtensions={imageFileExtensions}
          icon={IconUpload}
          error={errorMessage}
          onFileSuccessfullyUpload={onImageSuccessfullyUpload}
        />
      )}

      {selectedTab === IMAGE_ATTACHMENT_TABS[1].value && (
        <ModalImageAttachmentGallery
          onDiscard={onDiscard}
          onAttachImage={onAttachImage}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  uploadedCompanyFileData: state.mediaReducer.uploadedCompanyFile,
});

const mapDispatchToProps = {
  uploadCompanyFile: mediaActions.uploadCompanyFile,
  clearAddedCompanyFiles: mediaActions.clearAddedCompanyFiles,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(ModalImageAttachment);
