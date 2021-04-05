import React from 'react';
import Typography from 'src/components/atoms/Typography';
import { getMicroLearningTitle } from 'src/components/atoms/MicroLearningText/consts';
import { MicroLearningTextTypes } from 'src/components/atoms/MicroLearningText/types';
import './index.scss';

function MicroLearningText(props: MicroLearningTextTypes.IProps) {
  return (
    <Typography
      variant="subtext"
      color="blacker"
      className={`micro-learning-text micro-learning-text--${props.type?.toLowerCase()}`}
    >
      {getMicroLearningTitle(props.type)}
    </Typography>
  );
}

export default MicroLearningText;
