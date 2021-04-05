import React from 'react';
import classNames from 'classnames';

import Arrow from 'src/components/atoms/Svg/Table/filterArrow';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import { CardCompanyChoiceTypes } from 'src/components/molecules/Cards/CardCompanyChoice/types';
import 'src/components/molecules/Cards/CardCompanyChoice/index.scss';

function CardCompanyChoice(props: CardCompanyChoiceTypes.IProps) {
  const { imageSrc, name, slug, className, handleCompanyClick } = props;

  return (
    <div
      onClick={handleCompanyClick}
      className={classNames(
        'card-company-choice d-flex align-items-center justify-content-between cursor-pointer',
        className,
      )}
    >
      <div className="d-flex align-items-center">
        <Image alt="company logo" src={imageSrc} className="card-company-choice__image mr-24" />
        <div className="d-flex flex-column align-items-start">
          <Typography variant="header1" className="mb-4">{name}</Typography>
          <Typography variant="xsmall">{slug}</Typography>
        </div>
      </div>
      <Arrow className="card-company-choice___arrow" />
    </div>
  );
}

export default CardCompanyChoice;
