import React, { useEffect, useState } from 'react';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import Editor from 'src/components/molecules/Editor';

import { CardContentTypes } from 'src/components/organisms/CardCreation/CardContent/types';
import 'src/components/organisms/CardCreation/CardContent/index.scss';

function CardContent(props: CardContentTypes.IProps) {
  const { content: propsContent, onContentStepCompleted, onBackClick } = props;

  const [content, setContent] = useState(propsContent);
  const [errors, setErrors] = useState({ timeToStudy: '', description: '' });

  useEffect(
    () => {
      propsContent && setContent(propsContent);
    },
    [propsContent],
  );

  const onTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent({ ...content, timeToStudy: event.target.value.length < 1 ? undefined : +event.target.value });
    setErrors({
      ...errors,
      timeToStudy: '',
    });
  };

  const onNextStepClick = () => {
    if (content.timeToStudy && content.timeToStudy > 0 && content.description) {
      onContentStepCompleted && onContentStepCompleted(content);
    } else {
      setErrors({
        timeToStudy: content.timeToStudy ? (content.timeToStudy < 0 ? 'Недопустимое время ' : '')  : 'Введите время ',
        description: content.description ? '' : 'Введите описание(синопсис) ',
      });
    }
  };

  const onTimeInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', 'e', '.'].includes(event.key)) event.preventDefault();
  };

  return (
    <>
      <div className="card-content">
        <Typography
          variant="h1"
          className="mb-32 d-block"
        >
          Контент
        </Typography>
        <Typography
          variant="subtext"
          className="mb-8"
        >
          Описание (синопсис)
        </Typography>
        <Editor
          data={content.description}
          onDataChange={(data: string) => {
            setContent({ ...content, description: data });
            setErrors({ ...errors, description: '' });
          }}
        />
        {errors.description && (
          <Typography
            className="color_red text-left mt-8"
            variant="xsmall"
          >
            {errors.description}
          </Typography>
        )}
        <Typography
          variant="subtext"
          className="mt-32 mb-8 d-block"
        >
          Статья
        </Typography>
        <Editor
          data={content.article}
          onDataChange={data => setContent({ ...content, article: data })}
        />
        <Input
          name="timeToStudy"
          type="number"
          label="Время на изучение"
          value={content.timeToStudy}
          onChange={onTimeChange}
          onKeyPress={onTimeInputKeyPress}
          errorMessage={errors.timeToStudy}
          classNames="card-content__time mt-32"
          placeholder="В минутах"
          prompt="Приблизительное время изучения данного контента."
        />
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

export default CardContent;
