import React, { cloneElement } from 'react';
import { Link } from 'react-router-dom';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import ArrowRight from 'src/assets/img/icons/arrow-right.svg';
import { ReportRedirectCardTypes } from './types';
import './index.scss';

function ReportRedirectCard(props: ReportRedirectCardTypes.IProps) {
  const { name, icon, link, background } = props;

  return (
    <Link
      to={link}
      className="report-redirect-card"
      style={{ background }}
    >
      <div className="report-redirect-card__img-wrap">
        {cloneElement(icon, { className: 'report-redirect-card__img' })}
      </div>
      <Typography variant="subtextmed" className="ml-24 mr-32">
        {name}
      </Typography>
      <Image
        src={ArrowRight}
        alt="arrow"
      />
    </Link>
  );
}

export default ReportRedirectCard;
