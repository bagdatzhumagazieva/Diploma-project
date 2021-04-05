import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useOutsideClick } from 'src/hooks/useOutsideClick';
import Button from 'src/components/atoms/Button';
import { TaskOptionsType } from 'src/components/molecules/TableOptions/types';
import 'src/components/molecules/TableOptions/index.scss';

function TableOptions(props: TaskOptionsType.IProps) {
  const { onDraft, onChangePublicationDate, onEdit, onDelete, status, position, onPublish } = props;

  const options = [
    { name: 'Редактировать', callback: onEdit },
    { name: 'Удалить', callback: onDelete },
  ];

  const draftOptions = [
    ...options,
    { name: 'В черновик', callback: onDraft },
  ];

  const scheduleOptions = [
    ...options,
    { name: 'Изменить дату публикации', callback: onChangePublicationDate },
    { name: 'В черновик', callback: onDraft },
    { name: 'Опубликовать', callback: onPublish },
  ];

  const publicOptions = [
    ...options,
    { name: 'Опубликовать', callback: onPublish },
  ];

  const ref = useRef<HTMLDivElement>(null);

  const [isOptionsViewOpen, setOptionsView] = useState<boolean>(false);

  const onOptionClick = (callback?: () => void) => {
    setOptionsView(false);
    callback && callback();
  };

  useOutsideClick(ref, () => {
    setOptionsView(false);
  });

  return (
    <div
      className="table-options d-flex justify-content-around"
      onClick={() => setOptionsView(prevState => !prevState)}
    >
      <div
        className={classNames(
          'table-options__dots d-flex flex-column',
          { 'table-options__dots--active': isOptionsViewOpen },
        )}
      >
        <div className="dots__item" />
        <div className="dots__item" />
        <div className="dots__item" />
      </div>
      {isOptionsViewOpen && (
        <div ref={ref} className={classNames(
          `table-options__select${position && `--${position}`}`,
          'table-options__select d-flex flex-column',
        )}>
          {(status === 'SCHEDULED' ? scheduleOptions :
            status === 'DRAFT' ? publicOptions :
              draftOptions).map((n, i) => n.callback && (
            <Button
              key={i}
              type="plain"
              variant="text"
              className="select__item"
              onClick={() => onOptionClick(() => n.callback && n.callback())}
            >
              {n.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TableOptions;
