import React from 'react';
import { mapPropsToAttributes } from 'src/core/components';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';

import { CardInputSearcherTypes } from 'src/components/atoms/Cards/CardInputSearcher/types';
import 'src/components/atoms/Cards/CardInputSearcher/index.scss';

function CardInputSearcher(props: CardInputSearcherTypes.IProps) {
  const { imgSrc, type, title, link } = props;
  const attributes = mapPropsToAttributes<CardInputSearcherTypes.IProps>(
    props, 'card-input-searcher', 'px-16 py-8 ', 'd-flex align-items-center', 'fill_w',
  );

  return (
    <Button {...attributes} to={link}>
      {imgSrc && (
        <Image alt="card input searcher image" className="mr-16 card-input-searcher__img" src={imgSrc}/>
        )}
      <div className="d-flex flex-column align-items-center justify-content-start overflow_hidden">
        <Typography
          variant="subtext"
          color="grey_additional_1"
          className="mb-4 text-overflow fill_w"
        >
          {title}
        </Typography>
        {title &&  (
          <Typography
            variant="xsmall"
            color="main_60"
            className="align-self-start"
          >
            {type}
          </Typography>
        )}
      </div>
    </Button>
  );
}

export default CardInputSearcher;
