import React, { useEffect, useState } from 'react';
import { generateId } from 'src/utils/generation';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import OpenQuestions from 'src/components/organisms/CardCreation/CardVerificationQuestion/OpenQuestions';
import OneOfList from 'src/components/organisms/CardCreation/CardVerificationQuestion/OneOfList';
import ImageFromList from 'src/components/organisms/CardCreation/CardVerificationQuestion/ImageFromList';
import FewFromList from 'src/components/organisms/CardCreation/CardVerificationQuestion/FewFromList';

import {
  defaultMarkPosition,
  VerificationQuestions,
  VerificationQuestionsTypes,
} from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import {
  CardVerificationQuestionTypes,
  FewFromListTypes,
  ImageFromListTypes,
  OneOfListTypes,
  OpenQuestionsTypes,
  QuestionPhotoTagTypes,
  SequenceFromListTypes,
} from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';
import 'src/components/organisms/CardCreation/CardVerificationQuestion/index.scss';
import QuestionPhotoTag from 'src/components/organisms/CardCreation/CardVerificationQuestion/QuestionPhotoTag';
import SequenceFromList from 'src/components/organisms/CardCreation/CardVerificationQuestion/SequenceFromList';
import { MediaTypes } from 'src/store/media/types';

function CardVerificationQuestion(props: CardVerificationQuestionTypes.IProps) {
  const { onBackClick, onQuestionStepCompleted, verificationQuestions, selectedType: propsSelectedType } = props;
  const {
    oneOfList: propsOneOfList,
    openQuestion: propsOpenQuestion,
    fewFromList: propsFewFromList,
    imagesFromList: propsImagesFromList,
    questionPhotoTag: propsQuestionPhotoTag,
    sequenceFromList: propsSequenceFromList,
  } = verificationQuestions;

  const [selectedType, setSelectedType] = useState(propsSelectedType);

  useEffect(
    () => {
      propsSelectedType && setSelectedType(propsSelectedType);
    },
    [propsSelectedType],
  );

  // Открытый вопрос
  const [openQuestion, setOpenQuestion] = useState<OpenQuestionsTypes.IOpenQuestion>(propsOpenQuestion);
  const [openQuestionErrors, setOpenQuestionErrors] = useState({ question: '', answer: '', timeToAnswer: '' });

  useEffect(
    () => {
      propsOpenQuestion && setOpenQuestion(propsOpenQuestion);
    },
    [propsOpenQuestion],
  );

  // Один из списка
  const [list, setList] = useState<OneOfListTypes.IOneOfList>(propsOneOfList);
  const [listErrors, setListErrors] = useState({ question: '', timeToAnswer: '', answerOptions: '' });

  useEffect(
    () => {
      propsOneOfList && setList(propsOneOfList);
    },
    [propsOneOfList],
  );

  const onNewOptionAdd = (isDefaultOtherOptions?: boolean) => {
    const id = generateId();
    setList({
      ...list,
      answerOptions: {
        ...list.answerOptions,
        options: [...list.answerOptions.options, { id, isDefaultOtherOptions, label: isDefaultOtherOptions ? 'Другое' : '' }],
        selectedOption: list.answerOptions.options.length ? list.answerOptions.selectedOption : id,
      },
    });
  };

  const onOptionDelete = (id: string) => {
    const { options, selectedOption } = list.answerOptions;

    // handles selected variant delete
    const updatedSelectedOption = options[0].id !== id
      ? options[0].id
      : options[1] ? options[1].id : '';

    setList({
      ...list,
      answerOptions: {
        ...options,
        options: options.filter(n => n.id !== id),
        selectedOption: selectedOption === id
          ? updatedSelectedOption
          : selectedOption,
      },
    });
  };

  // Изображение из списка
  const [imagesFromList, setImagesFromList] = useState<ImageFromListTypes.IImageFromList>(propsImagesFromList);
  const [imagesFromListErrors, setImagesFromListErrors] = useState({ question: '', timeToAnswer: '', images: '' });

  const onNewImageAdd = (image: MediaTypes.IRenderProps) => {
    setImagesFromList({
      ...imagesFromList,
      images: {
        imagesList: { ...imagesFromList.images.imagesList, [image.uuid]: image },
        selectedImage: imagesFromList.images.selectedImage || image.uuid,
      },
    });
  };

  const onImageDelete = (id: string) => {
    const newImagesFromList = Object.assign({}, imagesFromList);

    const firstValue = newImagesFromList.images.imagesList[Object.keys(newImagesFromList.images.imagesList)[0]];
    const secondValue = newImagesFromList.images.imagesList[Object.keys(newImagesFromList.images.imagesList)[1]];

    // handles selected image delete
    const updatedSelectedImage = firstValue.uuid !== id
      ? firstValue.uuid
      : secondValue ? secondValue.uuid : '';

    delete newImagesFromList.images.imagesList[id];
    newImagesFromList.images.selectedImage = updatedSelectedImage;
    setImagesFromList(newImagesFromList);
  };

  // Несколько из списка
  const [fewFromList, setFewFromList] = useState<FewFromListTypes.IFewFromList>(propsFewFromList);
  const [fewFromListErrors, setFewFromListErrors] = useState({ question: '', timeToAnswer: '', answerOptions: '' });

  const onNewMultipleOptionAdd = (isDefaultOtherOptions?: boolean) => {
    const id = generateId();
    setFewFromList({
      ...fewFromList,
      answerOptions: {
        ...fewFromList.answerOptions,
        options: [...fewFromList.answerOptions.options, { id, isDefaultOtherOptions, label: isDefaultOtherOptions ? 'Другое' : '' }],
        selectedOptions: fewFromList.answerOptions.options.length ? fewFromList.answerOptions.selectedOptions : [id],
      },
    });
  };

  const onMultipleOptionDelete = (id: string) => {
    const { options, selectedOptions } = fewFromList.answerOptions;

    setFewFromList({
      ...fewFromList,
      answerOptions: {
        options: options.filter(n => n.id !== id),
        selectedOptions: selectedOptions ? selectedOptions.filter(n => n !== id) : [],
      },
    });
  };

  // Фотометка
  const [
    questionPhotoTag,
    setQuestionPhotoTag,
  ] = useState<QuestionPhotoTagTypes.IQuestionPhotoTag>(propsQuestionPhotoTag);
  const [
    questionPhotoTagErrors,
    setQuestionPhotoTagErrors,
  ] = useState({ question: '', timeToAnswer: '', photoTag: '' });

  const onNewPhotoTagImageAdd = (image: MediaTypes.IRenderProps) => {
    setQuestionPhotoTag({
      ...questionPhotoTag,
      photoTag: {
        image,
        imageNatureHeight: 0,
        imageNatureWidth: 0,
        marks: [{ ...defaultMarkPosition, id: generateId() }],
      },
    });
  };

  const onChangeImageDimension = (height: number, width: number) => {
    setQuestionPhotoTag({
      ...questionPhotoTag,
      photoTag: {
        image: questionPhotoTag.photoTag?.image || {} as MediaTypes.IRenderProps,
        marks: questionPhotoTag.photoTag?.marks || [],
        imageNatureWidth: width,
        imageNatureHeight: height,
      },
    });
  };

  const onPhotoTagImageDelete = () => {
    setQuestionPhotoTag({
      ...questionPhotoTag,
      photoTag: undefined,
    });
  };

  // Последовательность из списка
  const [
    sequenceFromList,
    setSequenceFromList,
  ] = useState<SequenceFromListTypes.ISequenceFromList>(propsSequenceFromList);
  const [
    sequenceFromListErrors,
    setSequenceFromListErrors,
  ] = useState({ question: '', timeToAnswer: '', correctSequence: '', inCorrectSequence: '' });

  const onNextStepClick = () => {
    const verificationQuestions: CardVerificationQuestionTypes.IVerificationQuestionsTypes = {
      openQuestion,
      imagesFromList,
      fewFromList,
      questionPhotoTag,
      sequenceFromList,
      oneOfList: list,
    };
    if (selectedType.value === VerificationQuestions.OpenQuestion) {
      const { question, answer, timeToAnswer } = openQuestion;
      if (openQuestion && answer && timeToAnswer && timeToAnswer > 0) {
        onQuestionStepCompleted(verificationQuestions, selectedType);
      } else {
        setOpenQuestionErrors({
          question: question ? '' : 'Введите вопрос ',
          answer: answer ? '' : 'Введите ответ ',
          timeToAnswer: timeToAnswer ? (timeToAnswer <= 0 ? 'Недопустимое время ' : '') : 'Введите время ',
        });
      }
    } else if (selectedType.value === VerificationQuestions.OneOfList) {
      const { question, timeToAnswer, answerOptions } = list;
      const hasExistOption = answerOptions.options.filter(e => !e.label).length;
      if (question && timeToAnswer && timeToAnswer > 0 && answerOptions.selectedOption && !hasExistOption) {
        onQuestionStepCompleted(verificationQuestions, selectedType);
      } else {
        setListErrors({
          question: question ? '' : 'Введите вопрос ',
          timeToAnswer: timeToAnswer ? (timeToAnswer <= 0 ? 'Недопустимое время ' : '') : 'Введите время ',
          answerOptions: (answerOptions.selectedOption && !hasExistOption) ? '' :
            hasExistOption ? 'Заполните варианты сверху' : 'Введите варианты',
        });
      }
    } else if (selectedType.value === VerificationQuestions.ImageFromList) {
      const { question, timeToAnswer, images } = imagesFromList;
      const imagesCount = Object.keys(images.imagesList).length;
      const isImagesCountValid = images.imagesList && imagesCount >= 2 && imagesCount <= 4;

      if (question && timeToAnswer && timeToAnswer > 0 && images) {
        onQuestionStepCompleted(verificationQuestions, selectedType);
      } else {
        setImagesFromListErrors({
          question: question ? '' : 'Введите вопрос ',
          timeToAnswer: timeToAnswer ? (timeToAnswer <= 0 ? 'Недопустимое время ' : '') : 'Введите время ',
          images: isImagesCountValid ? (images.selectedImage ? '' : 'Введите изображения') : 'От 2 до 4 правильных вариантов',
        });
      }
    } else if (selectedType.value === VerificationQuestions.FewFromList) {
      const { question, timeToAnswer, answerOptions, answerOptions: { selectedOptions } } = fewFromList;
      const isAnswerOptionValid = selectedOptions && selectedOptions.length > 0;
      const hasExistOptionLabel = answerOptions.options.filter(e => !e.label).length;

      if (question && timeToAnswer && timeToAnswer > 0 && isAnswerOptionValid && !hasExistOptionLabel) {
        onQuestionStepCompleted(verificationQuestions, selectedType);
      } else {
        setFewFromListErrors({
          question: question ? '' : 'Введите вопрос ',
          timeToAnswer: timeToAnswer ? (timeToAnswer <= 0 ? 'Недопустимое время ' : '') : 'Введите время ',
          answerOptions: (isAnswerOptionValid && !hasExistOptionLabel) ? '' :
            hasExistOptionLabel ? 'Заполните варианты сверху' : 'Выберите правильный вариант',
        });
      }
    } else if (selectedType.value === VerificationQuestions.QuestionPhotoTag) {
      const { question, timeToAnswer, photoTag } = questionPhotoTag;
      const isPhotoTagOptionValid = photoTag && photoTag.marks.length > 0 && photoTag.marks.length < 7;

      if (question && timeToAnswer && timeToAnswer > 0 && isPhotoTagOptionValid) {
        onQuestionStepCompleted(verificationQuestions, selectedType);
      } else {
        setQuestionPhotoTagErrors({
          question: question ? '' : 'Введите вопрос ',
          timeToAnswer: timeToAnswer ? (timeToAnswer <= 0 ? 'Недопустимое время ' : '') : 'Введите время ',
          photoTag: photoTag ? (isPhotoTagOptionValid ? '' : 'Пожалуйста, выберите метки') : 'Введите изображения',
        });
      }
    } else if (selectedType.value === VerificationQuestions.SequenceFromList) {
      const { question, timeToAnswer, sequenceAnswerOptions } = sequenceFromList;
      const { correct, inCorrect } = sequenceAnswerOptions;
      const isSequencesAreEqual = correct.length === inCorrect.length
        && correct.every((n, i) => n.text === inCorrect[i].text);

      const isInCorrectSequenceValid = inCorrect.length ? !isSequencesAreEqual : true;
      if (question && timeToAnswer && timeToAnswer > 0 && correct.length && isInCorrectSequenceValid) {
        onQuestionStepCompleted(verificationQuestions, selectedType);
      } else {
        setSequenceFromListErrors({
          question: question ? '' : 'Введите вопрос ',
          timeToAnswer: timeToAnswer ? (timeToAnswer <= 0 ? 'Недопустимое время ' : '') : 'Введите время ',
          correctSequence: correct.length ? '' : 'Введите последовательность',
          inCorrectSequence: isInCorrectSequenceValid ? '' : 'Неправильные варианты совпадают',
        });
      }
    }
  };

  return (
    <>
      <div className="card-verification-question">
        <Typography
          variant="h1"
          className="mb-32 d-block"
        >
          Проверочный вопрос
        </Typography>

        <Typography
          variant="subtext"
          className="mb-4"
        >
          Тип вопроса
        </Typography>
        <Select
          staticWidth
          options={VerificationQuestionsTypes}
          selectedOption={selectedType}
          className="card-verification-question__type mb-32"
          setSelectedOption={setSelectedType}
        />
        {selectedType.value === VerificationQuestions.OpenQuestion && (
          <OpenQuestions
            errors={openQuestionErrors}
            openQuestion={openQuestion}
            onErrorsChange={setOpenQuestionErrors}
            onOpenQuestionQuestionChange={setOpenQuestion}
          />
        )}
        {selectedType.value === VerificationQuestions.OneOfList && (
          <OneOfList
            list={list}
            errors={listErrors}
            onListChange={setList}
            onErrorsChange={setListErrors}
            onNewOptionAdd={onNewOptionAdd}
            onOptionDelete={onOptionDelete}
          />
        )}
        {selectedType.value === VerificationQuestions.ImageFromList && (
          <ImageFromList
            imagesFromList={imagesFromList}
            errors={imagesFromListErrors}
            onErrorsChange={setImagesFromListErrors}
            onImagesFromListChange={setImagesFromList}
            onImageDelete={onImageDelete}
            onNewImageAdd={onNewImageAdd}
          />
        )}
        {selectedType.value === VerificationQuestions.FewFromList && (
          <FewFromList
            errors={fewFromListErrors}
            list={fewFromList}
            onErrorsChange={setFewFromListErrors}
            onListChange={setFewFromList}
            onNewOptionAdd={onNewMultipleOptionAdd}
            onOptionDelete={onMultipleOptionDelete}
          />
        )}
        {selectedType.value === VerificationQuestions.QuestionPhotoTag && (
          <QuestionPhotoTag
            errors={questionPhotoTagErrors}
            questionPhotoTag={questionPhotoTag}
            onErrorsChange={setQuestionPhotoTagErrors}
            onQuestionPhotoTagChange={setQuestionPhotoTag}
            onNewPhotoTagImageAdd={onNewPhotoTagImageAdd}
            onPhotoTagImageDelete={onPhotoTagImageDelete}
            onChangeImageDimension={onChangeImageDimension}
          />
        )}
        {selectedType.value === VerificationQuestions.SequenceFromList && (
          <SequenceFromList
            errors={sequenceFromListErrors}
            sequence={sequenceFromList}
            onErrorsChange={setSequenceFromListErrors}
            onSequenceChange={setSequenceFromList}
          />
        )}
      </div>
      <div className="d-flex align-items-center mt-32">
        <Button
          type="link"
          color="blacker"
          variant="textmed"
          className="ml-auto mr-24"
          onClick={onBackClick}
        >
          Назад
        </Button>
        <Button
          variant="textmed"
          className="card-creation__next-btn"
          onClick={onNextStepClick}
        >
          Далее
        </Button>
      </div>
    </>
  );
}

export default CardVerificationQuestion;
