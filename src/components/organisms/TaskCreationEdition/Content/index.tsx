import React, { useContext, useEffect, useState } from 'react';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import TestQuizContent from 'src/components/organisms/TaskCreationEdition/Content/TestQuizContent';
import ArticleAudioVideoContent from 'src/components/organisms/TaskCreationEdition/Content/ArticleAudioVideoContent';
import TaskCreationContext, { isTestPollType } from 'src/components/organisms/TaskCreationEdition/TaskCreationContext';

import { TaskContentTypes } from 'src/components/organisms/TaskCreationEdition/Content/types';

import 'src/components/organisms/TaskCreationEdition/Content/index.scss';

function Content(props: TaskContentTypes.IProps) {

  const { cards, setCard, handleCardCreateClick, companyId, setCurrentEditCard } = props;
  const { setStep, publication } = useContext(TaskCreationContext);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorMessage('');
  },        [cards]);

  const nextStep = () => {
    !cards.length ? setErrorMessage('Выберите основную карточку') : setStep(2);
  };

  return (
    <div className="d-flex flex-column task-creation-content">
      <div className="task-creation-content__body pt-32 pl-24 pb-32 d-flex flex-column">
        <Typography variant="h1">Контент</Typography>
        {isTestPollType(publication)
          ?
          <TestQuizContent
            companyId={companyId}
            setCard={setCard}
            cards={cards}
            handleCardCreateClick={handleCardCreateClick}
            setCurrentEditCard={setCurrentEditCard}
          />
          :
          <ArticleAudioVideoContent
            companyId={companyId}
            setCard={setCard}
            cards={cards}
            handleCardCreateClick={handleCardCreateClick}
            setCurrentEditCard={setCurrentEditCard}
          />
        }
        {errorMessage && (
          <Typography
            variant="xsmall"
            color="red"
            className="align-self-start mt-8"
          >
            {errorMessage}
          </Typography>
        )}
      </div>
      <div className="align-self-end d-flex align-items-center mt-32 mb-32">
        <Button
          variant="textmed"
          onClick={() => setStep(0)}
          type="link-black"
        >
          Назад
        </Button>
        <Button
          variant="textmed"
          onClick={nextStep}
          className="next-button ml-24"
        >
          Далее
        </Button>
      </div>
    </div>
  );
}

export default Content;
