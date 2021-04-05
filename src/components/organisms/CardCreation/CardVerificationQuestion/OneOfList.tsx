import React, { useContext } from 'react';
import CardCreationContext from 'src/components/organisms/CardCreation/CardCreationContext';
import Typography from 'src/components/atoms/Typography';
import AnswerOptions from 'src/components/atoms/AnswerOptions';
import Input from 'src/components/molecules/Input';
import Checkbox from 'src/components/molecules/Checkbox';
import Editor from 'src/components/molecules/Editor';
import { AnswerOptionsTypes } from 'src/components/atoms/AnswerOptions/types';
import { OneOfListTypes } from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';

function OneOfList(props: OneOfListTypes.IProps) {
  const { list, onListChange, errors, onErrorsChange, onNewOptionAdd, onOptionDelete } = props;
  const { isIncludedInBase } = useContext(CardCreationContext);

  const { timeToAnswer, instruction, question, appendix } = list;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onListChange({ ...list, [event.target.name]: event.target.value });
    onErrorsChange({
      ...errors,
      [event.target.name]: '',
    });
  };

  const onAnswerOptionsChange = (answerOptions: AnswerOptionsTypes.IAnswerOptionWithSelectedOne) => {
    onListChange({ ...list, answerOptions });
    onErrorsChange({ ...errors, answerOptions: '' });
  };

  const onCheckInclude = (state: boolean) => {
    onListChange({ ...list, answerOptions: { ...list.answerOptions, isShuffled: state } });
  };

  const onTimeInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', 'e', '.'].includes(event.key)) event.preventDefault();
  };

  return (
    <>
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
        onDataChange={data => onListChange({ ...list, appendix: data })}
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
      <AnswerOptions
        isDefaultOtherOptionAddable={!isIncludedInBase}
        answerOptions={list.answerOptions}
        onAnswerOptionsChange={onAnswerOptionsChange}
        onNewOptionAdd={onNewOptionAdd}
        onOptionDelete={onOptionDelete}
      />
      {errors.answerOptions && (
        <Typography
          className="color_red mt-8"
          variant="xsmall"
        >
          {errors.answerOptions}
        </Typography>
      )}
      <Checkbox
        classNames="mt-32"
        isClicked={list.answerOptions.isShuffled}
        setClicked={onCheckInclude}
        title="Перемешать варианты"
        titleVariant="text"
      />

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
    </>
  );
}

export default OneOfList;
