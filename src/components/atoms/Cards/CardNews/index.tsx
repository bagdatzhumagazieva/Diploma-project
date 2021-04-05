import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CardNewsTypes } from 'src/components/atoms/Cards/CardNews/types';
import Image from 'src/components/atoms/Image';
import 'src/components/atoms/Cards/CardNews/index.scss';
import Typography from 'src/components/atoms/Typography';

function CardNews(props: CardNewsTypes.IProps) {
  const {
    icon, type, userName, description,
    className, title, date, link,
  } = props;

  return (
    <div className={classNames('card-news d-flex', className)}>
      {link ? (
        <Link to={link}>
          <div className="card-news__image mr-16">
            <Image alt={title} src={icon} className="fill" />
          </div>
        </Link>
      ) : (
        <div className="card-news__image mr-16">
          <Image alt={title} src={icon} className="fill" />
        </div>
      )}
      <div className="d-flex flex-column">
        <Typography variant="subtext" color="main_50" className="card-news__description">
          {`${type === 'own' ? 'Вы' : userName} `}
          <Typography
            variant="xsmall"
            color="grey_additional_2"
            className="d-inline ml-4"
          >
            {description}
          </Typography>
        </Typography>
        <Typography className="card-news__title" variant="subtextunderlined">{title}</Typography>
        <Typography className="card-news__date" variant="xsmall" color="grey_additional_2 mt-8">{date}</Typography>
      </div>
    </div>
  );
}

export default CardNews;
