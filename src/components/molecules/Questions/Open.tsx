import React from 'react';
import classNames from 'classnames';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import { OpenTypes } from 'src/components/molecules/Questions/types';
import 'src/components/molecules/Questions/index.scss';

function Open(props: OpenTypes.IProps) {
  const {
    title, instruction, appendix, className = '',
    onChange, initialValue: propInitVal, isChecked, isCorrect,
  } = props;

  return (
    <div className={`question ${className || ''}`}>
      <Typography variant="h2">{title}</Typography>
      {appendix && <div dangerouslySetInnerHTML={{ __html: appendix }} className="inner-html my-8" />}
      <Typography
        variant="text"
        color="grey_additional_2"
        className="my-16 d-block"
      >
        {instruction}
      </Typography>
      <Input
        type="text"
        classNames={classNames(
          'my-16 open__answer',
          { 'question__open--error' : isCorrect === false && isChecked },
          { 'question__open--correct' : isCorrect && isChecked },
        )}
        placeholder="Введите ответ"
        value={propInitVal || ''}
        onChange={onChange}
      />
    </div>
  );
}

export default Open;
