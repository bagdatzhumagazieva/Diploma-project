import React from 'react';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import { EmptyTitleTypes } from 'src/components/organisms/AdminCategories/types';

function EmptyTitle(props: EmptyTitleTypes.IProps) {
  const { curPrevId, level, onCreateClick } = props;

  return (
    <div className="item__content flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      {(curPrevId || level === 1) ? (
        <>
          <Typography color="grey_additional_2" variant="subtext">Данная рубрика пуста </Typography>
          <Button
            underlined
            type="link"
            variant="subtext"
            onClick={onCreateClick}
          >
            Cоздать
          </Button>
        </>
      ) : (
        <Typography color="grey_additional_2" variant="subtext">
          Выберите рубрику {level === 2 ? 'первого' : 'второго'} уровня
        </Typography>
      )}
    </div>
  );
}

export default EmptyTitle;
