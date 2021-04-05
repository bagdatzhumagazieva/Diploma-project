import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ICheckedOption, MultipleTypes } from 'src/components/molecules/Questions/types';
import Typography from 'src/components/atoms/Typography';
import Checkbox from 'src/components/molecules/Checkbox';
import 'src/components/molecules/Questions/index.scss';

function Multiple(props: MultipleTypes.IProps) {
  const {
    options: propsOptions, title, handleSelectedAnswers,
    appendix, instruction, initValues, correctAnswerIds,
    isChecked,
  } = props;

  const [options, setOptions] = useState<ICheckedOption[]>(
    propsOptions.map((item:any) => ({ id: item.id, state: false, text: item.text })),
  );

  const handleCheckboxState = (state: boolean, id: string) => {
    const curOptions = options.map(item => ({ id: item.id, state: item.state, text: item.text }));
    const curOption = curOptions.find(item => item.id === +id);
    if (curOption) curOption.state = state;
    setOptions(curOptions);
  };

  useEffect(
    () => {
      if (initValues && initValues.length > 0) {
        const curOptions = options.map(item => initValues.findIndex(e => e === item.id) >= 0 ?
          { ...item, state: true } : item);
        setOptions(curOptions);
      }
    },
    [initValues],
  );

  useEffect(
    () => {
      handleSelectedAnswers && handleSelectedAnswers(options.filter(item => item.state).map(item => item.id));
    },
    [options],
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
            <Checkbox
              isClicked={initValues?.includes(+item.id)}
              id={item.id.toString()}
              titleVariant="textmed"
              className={classNames(
                'multiple__checkbox',
                { 'multiple__checkbox--active' : item.state && !isChecked },
                { 'question--error' : item.state && correctAnswerIds &&
                    !correctAnswerIds?.includes(+item.id) && isChecked },
                { 'question--correct' : correctAnswerIds?.includes(+item.id) && isChecked },
              )}
              title={item.text}
              setClicked={handleCheckboxState}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Multiple;
