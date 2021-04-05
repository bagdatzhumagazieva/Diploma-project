import React from 'react';
import Typography from 'src/components/atoms/Typography';
import { HomeworkTypes } from 'src/components/organisms/GameCreationEdition/Content/Level/HomeWork/types';
import { ReactComponent as EditIcon } from 'src/assets/img/icons/edit.svg';
import { ReactComponent as DeleteIcon } from 'src/assets/img/icons/delete.svg';
import 'src/components/organisms/GameCreationEdition/Content/Level/HomeWork/index.scss';

function Homework(props: HomeworkTypes.IProps) {
  const {
    index, name,
  } = props;
  return(
    <div className="homework d-flex align-items-center justify-content-between p-24 mt-24">
        <div className="d-flex align-items-center">
          <Typography variant="textmed">Домашнее задание {index + 1}:</Typography>
          <Typography variant="text" className="mx-8">"{name}"</Typography>
          <EditIcon className="title__icon game-creation-edition__icon mr-16" />
          <DeleteIcon className="title__icon game-creation-edition__icon"/>
        </div>
    </div>
  );
}

export default Homework;
