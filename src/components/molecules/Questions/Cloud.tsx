import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReactSortable } from 'react-sortablejs';
import Typography from 'src/components/atoms/Typography';
import { CloudTypes, IAnswerOption } from 'src/components/molecules/Questions/types';
import 'src/components/molecules/Questions/index.scss';

function Cloud(props: CloudTypes.IProps) {
  const {
    title, instruction, appendix, className = '',
    options, handleSelectedAnswers, initValues,
    isChecked, isCorrect,
  } = props;

  const [sequence, setSequence] = useState<IAnswerOption[]>(options);
  const [sequenceAnswer, setSequenceAnswer] = useState<IAnswerOption[]>([]);

  useEffect(
    () => {
      handleSelectedAnswers && handleSelectedAnswers(sequenceAnswer.map(e => +e.id));
    },
    [sequenceAnswer],
  );

  useEffect(
    () => {
      if (initValues) {
        const initSequence = initValues.map(e => ({ id: e, text: options.find(el => el.id === e)?.text || '' }));
        const newSequence = options.filter(e => initValues.findIndex(el => el === e.id) === -1);
        setSequenceAnswer(initSequence);
        setSequence(newSequence);
      }
    },
    [initValues],
  );

  return (
    <div className={`question ${className}`}>
      <Typography variant="h2">{title}</Typography>
      <Typography
        variant="text"
        color="grey_additional_2"
        className="my-16 d-block"
      >
        {instruction}
      </Typography>
      {appendix && <div dangerouslySetInnerHTML={{ __html: appendix }} className="inner-html" />}

      <div className={classNames(
        'cloud__droppable',
      )}>
        <ReactSortable
          list={sequenceAnswer}
          setList={setSequenceAnswer}
          animation={150}
          group="cloud"
          ghostClass="cloud__droppable-placeholder"
          className="cloud__droppable__content"
        >
          {sequenceAnswer.map(item => (
            <Typography
              variant="subtext"
              key={item.id}
              className={classNames(
                'cloud__chip cloud__droppable__chip',
                { 'cloud__droppable__chip--error' : isCorrect === false && isChecked },
                { 'cloud__droppable__chip--correct' : isCorrect && isChecked },
              )}
            >
              {item.text}
            </Typography>
          ))}
        </ReactSortable>
      </div>

      <ReactSortable
        list={sequence}
        setList={setSequence}
        animation={150}
        ghostClass="cloud__droppable-placeholder"
        group="cloud"
        className="d-flex align-items-center flex-wrap mt-40"
      >
        {sequence.map(item => (
          <Typography
            variant="subtext"
            key={item.id}
            className="cloud__chip"
          >
            {item.text}
          </Typography>
        ))}
      </ReactSortable>
    </div>
  );
}

export default Cloud;
