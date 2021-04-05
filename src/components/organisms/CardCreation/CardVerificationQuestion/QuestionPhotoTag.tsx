import React, { useState } from 'react';
import { generateId } from 'src/utils/generation';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import Modal from 'src/components/molecules/Modal';
import PhotoTag from 'src/components/molecules/PhotoTag';
import Editor from 'src/components/molecules/Editor';
import { PhotoTagTypes } from 'src/components/molecules/PhotoTag/types';
import { QuestionPhotoTagTypes } from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';
import ModalImageAttachment from 'src/components/organisms/ModalImageAttachment';
import { defaultMarkPosition } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { MediaTypes } from 'src/store/media/types';
import IconImage from 'src/assets/img/icons/image.svg';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';

function QuestionPhotoTag(props: QuestionPhotoTagTypes.IProps) {
  const {
    questionPhotoTag,
    errors,
    onErrorsChange,
    onQuestionPhotoTagChange,
    onNewPhotoTagImageAdd,
    onPhotoTagImageDelete,
    onChangeImageDimension,
  } = props;

  const { timeToAnswer, instruction, question, appendix, photoTag } = questionPhotoTag;

  const [isImageAttachmentModalOpen, setImageAttachmentModal] = useState<boolean>(false);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionPhotoTagChange({ ...questionPhotoTag, [event.target.name]: event.target.value });
    onErrorsChange({
      ...errors,
      [event.target.name]: '',
    });
  };

  const onAttachImage = (image: MediaTypes.IRenderProps) => {
    setImageAttachmentModal(false);
    onNewPhotoTagImageAdd && onNewPhotoTagImageAdd(image);
  };

  const onMarksChange = (marks: PhotoTagTypes.IMark[]) => {
    questionPhotoTag.photoTag && onQuestionPhotoTagChange({
      ...questionPhotoTag,
      photoTag: {
        ...questionPhotoTag.photoTag,
        marks,
      },
    });
  };

  const onPhotoTagMarksAdd = () => {
    if (questionPhotoTag.photoTag) {
      const { marks } = questionPhotoTag.photoTag;
      const newMarks = [...marks, { ...defaultMarkPosition, id: generateId() }];
      onMarksChange(newMarks);
    }
  };

  const onPhotoTagMarksDelete = (markId: string) => {
    if (questionPhotoTag.photoTag) {
      const { marks } = questionPhotoTag.photoTag;
      onMarksChange(marks.filter(n => n.id !== markId));
    }
  };

  const onTimeInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', 'e', '.'].includes(event.key)) event.preventDefault();
  };

  return (
    <div className="question-photo-tag">
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
        onDataChange={data => onQuestionPhotoTagChange({ ...questionPhotoTag, appendix: data })}
      />

      <Typography
        variant="subtext"
        className="mt-48 d-block"
      >
        Изображение для меток
      </Typography>

      {errors.photoTag && (
        <Typography
          className="color_red mt-8"
          variant="xsmall"
        >
          {errors.photoTag}
        </Typography>
      )}

      {photoTag ?
        <div className="question-photo-tag__content">
          <PhotoTag
            className="mt-40"
            image={photoTag.image.url}
            marksCount={6}
            marks={photoTag.marks}
            onMarksChange={onMarksChange}
            onMarkAdd={onPhotoTagMarksAdd}
            onMarkDelete={onPhotoTagMarksDelete}
            getImageDimensions={onChangeImageDimension}
          />
          <CancelIcon
            color="#7A7B82"
            className="question-photo-tag__content__remove-btn cursor-pointer"
            onClick={onPhotoTagImageDelete}
          />
        </div> :
        <div className="mt-8">
          <Typography
            variant="xsmall"
            color="grey_additional_1"
          >
            JPG и PNG до 10 МБ
          </Typography>
          <Button
            variant="textmed"
            type="black-icon"
            className="d-flex align-items-center mt-16"
            onClick={() => setImageAttachmentModal(true)}
          >
            <Image
              alt="add image option"
              className="mr-8"
              src={IconImage}
            />
            Добавить вариант
          </Button>
        </div>
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

export default QuestionPhotoTag;
