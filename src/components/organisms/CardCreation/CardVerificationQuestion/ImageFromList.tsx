import React, { useContext, useState } from 'react';
import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import RadioButton from 'src/components/atoms/RadioButton';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import Input from 'src/components/molecules/Input';
import Modal from 'src/components/molecules/Modal';
import Editor from 'src/components/molecules/Editor';
import ModalImageAttachment from 'src/components/organisms/ModalImageAttachment';
import IconImage from 'src/assets/img/icons/image.svg';
import CardCreationContext from 'src/components/organisms/CardCreation/CardCreationContext';
import { ImageFromListTypes } from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';
import { MediaTypes } from 'src/store/media/types';

function ImageFromList(props: ImageFromListTypes.IProps) {
  const {
    imagesFromList,
    errors,
    onErrorsChange,
    onImagesFromListChange,
    onNewImageAdd,
    onImageDelete,
  } = props;
  const { timeToAnswer, instruction, question, appendix, images } = imagesFromList;
  const { isQuizCard } = useContext(CardCreationContext);

  const [isImageAttachmentModalOpen, setImageAttachmentModal] = useState<boolean>(false);
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onImagesFromListChange({ ...imagesFromList, [event.target.name]: event.target.value });
    onErrorsChange({
      ...errors,
      [event.target.name]: '',
    });
  };

  const onAttachImage = (image: MediaTypes.IRenderProps) => {
    setImageAttachmentModal(false);
    onNewImageAdd && onNewImageAdd(image);
  };

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onImagesFromListChange({
      ...imagesFromList,
      images: { ...imagesFromList.images, selectedImage: event.target.value },
    });
  };

  const onTimeInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', 'e', '.'].includes(event.key)) event.preventDefault();
  };

  return (
    <div className="image-from-list">
      <Input
        type="text"
        label="Вопрос"
        name="question"
        value={question}
        onChange={onInputChange}
        errorMessage={errors.question}
        placeholder="Введите вопрос"
      />

      <Typography
        variant="subtext"
        className="mt-32 mb-4"
      >
        Инструкция к вопросу
        <Typography
          variant="xxsmall"
          color="main_50"
          classNames="ml-4 text_uppercase"
        >
          - Необязательно
        </Typography>
      </Typography>
      <Input
        type="text"
        name="instruction"
        value={instruction}
        onChange={onInputChange}
        placeholder="Не более 100 знаков"
        prompt="Небольшая инструкция, которая поможет пользователям понять суть вопроса."
      />

      <Typography
        variant="subtext"
        className="mt-32 mb-8"
      >
        Приложение к вопросу
        <Typography
          variant="xxsmall"
          color="main_50"
          classNames="ml-4 text_uppercase"
        >
          - Необязательно
        </Typography>
      </Typography>
      <Typography
        variant="xsmall"
        color="grey_additional_1"
        className="d-block mb-8"
      >
        Дополнительная информация к вопросу
      </Typography>
      <Editor
        data={appendix || ''}
        onDataChange={data => onImagesFromListChange({ ...imagesFromList, appendix: data })}
      />

      <Typography
        variant="subtext"
        className="mt-48 mb-8"
      >
        Варианты ответа
      </Typography>
      <Typography
        variant="xsmall"
        color="grey_additional_1"
        className="d-block mb-24"
      >
        Только один правильный вариант ответа
      </Typography>

      {images.imagesList && Object.keys(images.imagesList).length > 0 && (
        <div className="d-flex flex-wrap image-from-list__preview-list">
          {Object.values(images.imagesList).map(n => (
            <div className="mr-32 mb-24" key={n.uuid}>
              <div className="image-from-list__preview d-flex">
                <Image
                  src={n.thumbnail}
                  alt={n.name}
                  classNames="image-from-list__preview__image"
                />
                <CancelIcon
                  color="#7A7B82"
                  className="ml-8 pointer"
                  onClick={() => onImageDelete(n.uuid)}
                />
              </div>
              {!isQuizCard && (
                <div className="d-flex mt-8">
                  <RadioButton
                    name="selectedImage"
                    value={n.uuid}
                    setClicked={radioButtonHandler}
                    isChecked={n.uuid === images.selectedImage}
                    classNames="answer-option__radio"
                    label="Правильный ответ"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {errors.images && (
        <Typography
          className="color_red"
          variant="xsmall"
        >
          {errors.images}
        </Typography>
      )}

      {Object.keys(images.imagesList).length < 4 ?
        <Button
          variant="textmed"
          type="black-icon"
          className="d-flex align-items-center mt-24"
          onClick={() => setImageAttachmentModal(true)}
        >
          <Image
            alt="add image option"
            className="mr-8"
            src={IconImage}
          />
          Добавить вариант
        </Button> :
        <Typography
          variant="xsmall"
          classNames="mt-24"
          color="main_50"
        >
          Максимальное количество ответов не может превышать 4
        </Typography>
      }

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

      <Input
        type="number"
        label="Время на ответ"
        name="timeToAnswer"
        value={timeToAnswer}
        onChange={onInputChange}
        onKeyPress={onTimeInputKeyPress}
        errorMessage={errors.timeToAnswer}
        classNames="mt-32"
        placeholder="В секундах"
        prompt="Отведенное время для ответа на вопрос (для тестов и экзаменов)"
      />
    </div>
  );
}

export default ImageFromList;
