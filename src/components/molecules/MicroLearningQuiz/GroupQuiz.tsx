import React, { useState } from 'react';
import Button from 'src/components/atoms/Button';
import MicroLearningQuiz from 'src/components/molecules/MicroLearningQuiz/index';
import { GroupMicroLearningQuizTypes, IQuestionWithResult } from 'src/components/molecules/MicroLearningQuiz/types';
import Typography from 'src/components/atoms/Typography';
import { mergeObjectsInUnique } from 'src/utils/merge';

function GroupMicroLearningQuiz(props: GroupMicroLearningQuizTypes.IProps) {
  const { questions } = props;
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answers, setAnswers] = useState<IQuestionWithResult[]>([]);
  const [showButtonPressed, setShowButtonPressed] = useState<boolean>(false);
  const handleQuestionsAnswer = (question: IQuestionWithResult) => {
    setAnswers(mergeObjectsInUnique([...answers, question], 'id'));
  };

  const getResults = (answers: IQuestionWithResult[]):number => {
    let cnt = 0;
    for (let i = 0; i < answers.length; i += 1) {
      if (answers[i].selectedAnswerId === answers[i].correctAnswerId) cnt += 1;
    }
    return cnt;
  };

  const onShowAnswerClicked = (answers: IQuestionWithResult[]) => {
    if (!showButtonPressed) setShowButtonPressed(true);
    if (answers.length === questions.length) setShowAnswer(true);
  };

  return (
    <div className="group-micro-learning-quiz">
      {questions.map((item, index) => (
        <MicroLearningQuiz
          key={item.id}
          id={item.id}
          index={index + 1}
          showAnswer={showAnswer}
          showButtonPressed={showButtonPressed}
          title={item.title}
          options={item.options}
          correctAnswerId={item.correctAnswerId}
          className="group-micro-learning-quiz__item mb-40"
          handleSelectedAnswer={handleQuestionsAnswer}
        />
      ))}
      {showAnswer ? (
        <Typography variant="h2" className="mt-10">
          Ваш результат: {getResults(answers)} из {questions.length}
        </Typography>
      ) : (
        <Button
          variant="textmed"
          className="py-10 px-24 mt-10"
          onClick={() => onShowAnswerClicked(answers)}
        >
          Показать результаты
        </Button>
      )}
    </div>
  );
}

export default GroupMicroLearningQuiz;
