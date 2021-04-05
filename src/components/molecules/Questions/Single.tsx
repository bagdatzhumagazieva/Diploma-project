import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Typography from 'src/components/atoms/Typography';
import RadioButton from 'src/components/atoms/RadioButton';
import 'src/components/molecules/Questions/index.scss';
import { SingleTypes } from 'src/components/molecules/Questions/types';

function Single(props: SingleTypes.IProps) {
  const {
    title, instruction, appendix, options, correctAnswerId,
    handleClickedAnswer, selectedVal: propSelectedVal, isChecked,
  } = props;
  const [selectedVal, setSelectedVal] = useState<number | string>('');

  useEffect(
    () => {
      propSelectedVal && setSelectedVal(propSelectedVal);
    },
    [propSelectedVal],
  );

  useEffect(
    () => {
      if (!selectedVal) return;
      handleClickedAnswer && handleClickedAnswer(selectedVal);
    },
    [selectedVal],
  );

  return (
    <div className="question">
      <Typography variant="h2">{title}</Typography>
      {appendix && <div dangerouslySetInnerHTML={{ __html: appendix }} className="inner-html my-8" />}
      <Typography
        variant="text"
        color="grey_additional_2"
        className="my-16 d-block"
      >
        {instruction}
      </Typography>
      <div className="mt-16">
        {options.map(item => (
          <div
            key={item.id}
            className="mb-16"
          >
            <RadioButton
              label={item.text}
              labelVariant="textmed"
              name={`question-${item.id}`}
              value={`${item.id}`}
              isChecked={selectedVal === item.id}
              setClicked={() => setSelectedVal(item.id)}
              className={classNames(
                'single__radio-button',
                { 'single__radio-button--active': selectedVal === item.id && !correctAnswerId },
                { 'question--error' : selectedVal === item.id && correctAnswerId &&
                    selectedVal !== correctAnswerId && isChecked },
                { 'question--correct' : correctAnswerId === item.id && isChecked },
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Single;
