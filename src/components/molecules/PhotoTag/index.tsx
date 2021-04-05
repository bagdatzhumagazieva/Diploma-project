import React, { useState } from 'react';
import classNames from 'classnames';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import IconPlus from 'src/components/atoms/Svg/Plus';
import Typography from 'src/components/atoms/Typography';
import { PhotoTagTypes } from 'src/components/molecules/PhotoTag/types';
import { ReactComponent as IconDelete } from 'src/assets/img/icons/delete.svg';
import 'src/components/molecules/PhotoTag/index.scss';

function PhotoTag(props: PhotoTagTypes.IProps) {
  const { marksCount, marks, onMarksChange, onMarkAdd, onMarkDelete, image, className, getImageDimensions } = props;
  const [selectedMark, setSelectedMark] = useState<string>();
  const [isPromptShown, setPromptShown] = useState<boolean>(true);

  const handleTagMouseDown = (id: string) => () => {
    setSelectedMark(id);
    setPromptShown(false);
  };

  const handleStop = (id: string) => (e: DraggableEvent, ui: DraggableData) => {
    onMarksChange && onMarksChange(marks.map(n => n.id === id ? { ...n, x: ui.lastX, y: ui.lastY } : n));
  };

  const handleMarkDelete = () => {
    onMarkDelete && selectedMark && onMarkDelete(selectedMark);
    setSelectedMark(undefined);
  };

  const handleMarkAdd = () => {
    onMarkAdd && onMarkAdd();
    setPromptShown(true);
  };

  return (
    <div className={`photo-tag ${className}`}>
      <div className="photo-tag__image-wrap pos_relative">
        <Image
          src={image}
          className="photo-tag__image"
          alt="photo tag image"
          getImageDimensions={getImageDimensions}
        />
        {marks.map(n => (
          <Draggable
            key={n.id}
            bounds="parent"
            onMouseDown={handleTagMouseDown(n.id)}
            defaultPosition={{ x: n.x, y: n.y }}
            handle={`.handle--${n.id}`}
            onStop={handleStop(n.id)}
          >
            <div className={classNames(
              `photo-tag__mark handle--${n.id}`,
              { 'photo-tag__mark--selected': n.id === selectedMark },
            )} />
          </Draggable>
        ))}
        {isPromptShown && (
          <Typography
            variant="text"
            color="whiter"
            className="photo-tag__prompt"
          >
            Расположите метку в нужном месте
          </Typography>
        )}
        {marks.length === 0 && (
          <Typography
            variant="text"
            color="red"
            className="photo-tag__prompt"
          >
            Пожалуйста, выберите метки
          </Typography>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-between photo-tag__actions">
        <Typography
          variant="xsmall"
          color="grey_additional_1"
        >
          От 1 до {marksCount} меток
        </Typography>
        <div className="d-flex align-items-center">
          {marks.length < marksCount ?
            <Button
              variant="subtext"
              type="link"
              className="d-flex align-items-center"
              onClick={handleMarkAdd}
            >
              <IconPlus className="photo-tag__add-btn mr-8" />
              Добавить новую
            </Button> :
            <Typography
              variant="xsmall"
              classNames="text-center d-block my-8"
              color="red"
            >
              Превышено максимальное количество меток
            </Typography>
          }
          <Button
            variant="subtext"
            type="link"
            classNames={[
              'd-flex align-items-center ml-24 photo-tag__delete-btn',
              { 'photo-tag__delete-btn--disabled' : !selectedMark },
            ]}
            onClick={handleMarkDelete}
          >
            <IconDelete className="photo-tag__delete-icon mr-8" />
            Удалить метку
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PhotoTag;
