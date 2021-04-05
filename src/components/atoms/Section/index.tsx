import React from 'react';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import { CardGroupTypes } from 'src/components/atoms/Section/types';
import './index.scss';

function Section(props: CardGroupTypes.IProps) {
  const { className, title, link } = props;
  return (
    <div className={className ? `section ${className}` : 'section'}>
      <div className="d-flex justify-content-between align-items-center mb-24">
        <Typography variant="h1">{title}</Typography>
        {link && <Button to={link} type="link-underlined" variant="xsmallunderlined">Весь список</Button>}
      </div>
      {props.children}
    </div>
  );
}

export default Section;
