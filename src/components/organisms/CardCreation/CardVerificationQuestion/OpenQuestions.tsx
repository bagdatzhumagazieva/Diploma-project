import React, { useContext, useEffect } from 'react';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import Editor from 'src/components/molecules/Editor';
import CardCreationContext from 'src/components/organisms/CardCreation/CardCreationContext';
import { OpenQuestionsTypes } from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';

function OpenQuestions(props: OpenQuestionsTypes.IProps) {
  const { isQuizCard } = useContext(CardCreationContext);
  const { openQuestion, onOpenQuestionQuestionChange, errors, onErrorsChange } = props;

  const { answer, timeToAnswer, instruction, question, appendix } = openQuestion;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onOpenQuestionQuestionChange({ ...openQuestion, [event.target.name]: event.target.value });
    onErrorsChange({
      ...errors,
      [event.target.name]: '',
    });
  };
  useEffect(() => {
    isQuizCard && !openQuestion.answer &&
    onOpenQuestionQuestionChange({ ...openQuestion, answer: 'open quiz' });
  },        [openQuestion]);

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
        onDataChange={data => onOpenQuestionQuestionChange({ ...openQuestion, appendix: data })}
      />

      {!isQuizCard && (
        <Input
          type="text"
          label="Ответ"
          name="answer"
          value={answer}
          onChange={onInputChange}
          errorMessage={errors.answer}
          classNames="mt-48"
          placeholder="Введите ответ"
          prompt="Ответ засчитывается при совпадении текста на 95% (регистр не имеет значения)"
        />
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
    </>
  );
}

export default OpenQuestions;
