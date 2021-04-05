import React from 'react';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import Editor from 'src/components/molecules/Editor';
import SequenceChips from 'src/components/molecules/SequenceChips';
import { SequenceFromListTypes } from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';
import { SequenceChipsTypes } from 'src/components/molecules/SequenceChips/types';

function SequenceFromList(props: SequenceFromListTypes.IProps) {
  const { sequence, onSequenceChange, errors, onErrorsChange } = props;

  const { timeToAnswer, instruction, question, appendix, sequenceAnswerOptions } = sequence;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSequenceChange({ ...sequence, [event.target.name]: event.target.value });
    onErrorsChange({
      ...errors,
      [event.target.name]: '',
    });
  };

  const onSequenceChipsChange = (type: string) => (sequenceChips: SequenceChipsTypes.ISequence[]) => {
    onSequenceChange({
      ...sequence,
      sequenceAnswerOptions: { ...sequence.sequenceAnswerOptions, [type]: sequenceChips },
    });
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
        onDataChange={data => onSequenceChange({ ...sequence, appendix: data })}
      />

      <Typography
        variant="subtext"
        className="mt-48 mb-8"
      >
        Варианты ответа
      </Typography>
      <Typography
        variant="subtext"
        color="grey_additional_1"
        className="d-block"
      >
        Порядок правильных и непрвильных слов перемешаются после отправки
      </Typography>

      <Typography
        variant="subtext"
        classNames="mt-32 mb-4 d-block"
      >
        Правильная последовательность
      </Typography>
      <SequenceChips
        sequence={sequenceAnswerOptions.correct}
        onSequenceChange={onSequenceChipsChange('correct')}
      />
      {errors.correctSequence && (
        <Typography
          className="color_red mt-8 d-block"
          variant="xsmall"
        >
          {errors.correctSequence}
        </Typography>
      )}
      <Typography
        variant="xsmall"
        color="grey_additional_1"
        classNames="mt-8 d-block"
      >
        Для разделения слов на элементы последовательности, используйте кнопку 'Enter'
      </Typography>

      <Typography
        variant="subtext"
        classNames="mt-32 mb-4 d-block"
      >
        Неправильные варианты
        <Typography
          variant="xxsmall"
          color="main_50"
          classNames="ml-4 text_uppercase"
        >
          - Необязательно
        </Typography>
      </Typography>
      <SequenceChips
        sequence={sequenceAnswerOptions.inCorrect}
        onSequenceChange={onSequenceChipsChange('inCorrect')}
      />
      {errors.inCorrectSequence && (
        <Typography
          className="color_red mt-8 d-block"
          variant="xsmall"
        >
          {errors.inCorrectSequence}
        </Typography>
      )}
      <Typography
        variant="xsmall"
        color="grey_additional_1"
        classNames="mt-8"
      >
        Неправильные варианты слов не должны совпадать с правильными
      </Typography>

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

export default SequenceFromList;
