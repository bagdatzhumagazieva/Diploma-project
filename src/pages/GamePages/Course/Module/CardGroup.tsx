import React from 'react';
import CardMicroLearning from 'src/components/molecules/Cards/CardMicroLearning';
import Typography from 'src/components/atoms/Typography';
import { ModulePageTypes } from 'src/pages/GamePages/Course/Module/types';

function CardGroup(props: ModulePageTypes.ICardGroup) {
  const { cards, courseId, moduleId } = props;

  const getTextFromStringHtml = (description: string): string => {
    const span = document.createElement('span');
    span.innerHTML = description;
    return span.textContent || span.innerText || '';
  };

  return (
    <div className="d-flex flex-column">
      <Typography variant="h1" className="mb-24">Уроки</Typography>
      <div>
        {cards.map((item, index) => (
          <CardMicroLearning
            link={`/education/course/${courseId}/module/${moduleId}/card/${item.id}`}
            id={item.id}
            key={index}
            title={item.name}
            description={getTextFromStringHtml(item.description).replace(/\.(?![\s.])(?!$)/g, '. ')}
            date={item.createdAt}
            favorite={item.isFavorite}
            time={item.minutesToFinish}
            rating={item.rating}
            image={item.imageUrl}
            processStatus={item.status}
            className="mb-24"
          />
        ))}
      </div>
    </div>
  );
}

export default CardGroup;
