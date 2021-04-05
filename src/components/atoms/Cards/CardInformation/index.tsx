import React from 'react';
import classNames from 'classnames';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Icons from 'src/components/atoms/Cards/CardInformation/consts';
import { CardInformationTypes } from 'src/components/atoms/Cards/CardInformation/types';
import 'src/components/atoms/Cards/CardInformation/index.scss';

function CardInformation(props: CardInformationTypes.IProps) {
  const { type, descriptions, className } = props;

  const getData = () => {
    switch (type) {
      case 'battles': return { image: Icons.Battles, title: 'Баттлы' } ;
      case 'games': return { image: Icons.Games, title: 'Игры' } ;
      case 'knowledge-set': return { image: Icons.KnowledgeSet, title: 'База знаний' };
      default: return { image: Icons.Courses, title: 'Курсы' };
    }
  };

  return (
    <div
      className={classNames(
        'card-information', 'd-flex align-items-center justify-content-between',
        'px-24', className,
      )}
    >
      <Image
        alt="card information"
        src={getData().image}
        className="card-information__image"
      />
      <div className="card-information__content d-flex flex-column">
        <Typography variant="h1" className="mb-12">{getData().title}</Typography>
        {descriptions.map((item, index) => (
          <Typography
            key={index}
            variant="subtext"
            color="grey_additional_2"
            className="card-information__description"
          >
            {item}
          </Typography>
        ))}
      </div>
    </div>
  );
}

export default CardInformation;
