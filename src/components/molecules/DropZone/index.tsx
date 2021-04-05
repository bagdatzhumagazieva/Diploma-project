import React, { createRef, useEffect, useState } from 'react';
import classNames from 'classnames';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Loader from 'src/components/atoms/Loader';
import Typography from 'src/components/atoms/Typography';

import ErrorIcon from 'src/assets/img/icons/error.svg';
import { DropZoneTypes } from 'src/components/molecules/DropZone/types';
import './index.scss';

function DropZone(props: DropZoneTypes.IProps) {
  const {
    className,
    desc,
    icon,
    correctFormatsDesc,
    correctFileExtensions,
    multipleFileUploadError,
    onFileSuccessfullyUpload,
    loading: propsLoading = false,
    error: propsError,
  } = props;

  const fileInputRef = createRef<HTMLInputElement>();

  const [hover, setHover] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [file, setFile] = useState<File>();

  useEffect(
    () => {
      setLoading(propsLoading);
    },
    [propsLoading],
  );

  useEffect(
    () => {
      propsError && setError(propsError);
    },
    [propsError],
  );

  const openFileDialog = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const onFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setLoading(true);
    const target = event.target as HTMLInputElement;
    const file =  target.files && target.files[0];
    file && checkFile(file);
  };

  const checkFile = (file: File) => {
    if (checkFileType(file)) {
      setFile(file);
      onFileSuccessfullyUpload && onFileSuccessfullyUpload(file);
    } else {
      setError(`${file.type} - неподдерживаемый формат. Пожалуйста, используйте формат ${correctFormatsDesc}`);
    }
  };

  const checkFileType = (file: File) => correctFileExtensions.includes(file.type);
  const checkFileCount = (files: FileList) => files.length === 1;

  const onDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);
    const files = event.dataTransfer.files;
    if (files && checkFileCount(files)) {
      checkFile(files[0]);
    } else {
      setError(multipleFileUploadError);
    }
  };

  const onDragLeave = (event: React.DragEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setHover(false);
  };

  const onDragOver = (event: React.DragEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setHover(true);
  };

  const onReset = () => {
    setFile(undefined);
    setHover(false);
    setLoading(false);
    setError(undefined);
  };

  if (error) {
    return (
      <div className={classNames('drop-zone fill', className)}>
        <div className="drop-zone__error-block fill d-flex flex-column align-items-center justify-content-center">
          <div className="drop-zone__error-block-inner d-flex flex-column align-items-center justify-content-center">
            <Image alt="error-image" src={ErrorIcon} className="drop-zone__error-image align-self-center mb-40"/>
            <Typography
              color="red"
              variant="text"
              className="mb-16"
            >
              Файл не действителен!
            </Typography>
            <Typography
              variant="subtext"
              className="text-center mb-16"
            >
              {error}
            </Typography>
            <Typography
              variant="subtext"
              color="grey_additional_1"
              className="text-center mb-24"
            >
              Данный файл не удовлетворяет всем требованиям для загрузки. Вы можете
              <Button
                variant="subtext"
                color="grey_additional_1"
                type="link-underlined"
                className="mx-4"
              >
                скачать образец
              </Button>
              для корректного оформления файла.
            </Typography>
            <Button variant="subtext" type="link" onClick={onReset}>Попробовать еще раз</Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classNames('drop-zone fill', className)}>
        <div className="drop-zone__loading fill d-flex flex-column align-items-center justify-content-center">
          <Loader size={80} className="mb-40" />
          <Typography variant="text" className="mb-16">Загрузка файла...</Typography>
          <Typography variant="subtext" color="grey_additional_2">{file?.name}</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames('drop-zone fill', className)}>
      <div
        className={classNames(
          'drop-zone__content d-flex flex-column align-items-center justify-content-center fill',
          { 'drop-zone__content--hover' : hover },
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="drop-zone__input"
          accept={correctFileExtensions.join(', ')}
          onChange={onFileAdded}
        />
        {icon && (
          <Image
            alt="icon"
            src={icon}
            className="drop-zone__image align-self-center mb-32"
          />
        )}
        <Typography variant="text" className="text-center">
          Вы можете перенести свой файл в данную область  <br /> или
          <Button
            variant="text"
            type="link"
            onClick={openFileDialog}
            className="ml-4"
          >
            загрузить файл
          </Button>
        </Typography>
        {desc && (
          <Typography
            variant="subtext"
            color="grey_additional_2"
            className="mt-16"
          >
            {desc}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default DropZone;
