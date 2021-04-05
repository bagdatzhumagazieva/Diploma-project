import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import Button from 'src/components/atoms/Button';
import { useOutsideClick } from 'src/hooks/useOutsideClick';
import { GroupOptionsTypes } from 'src/components/molecules/GroupOptions/types';
import 'src/components/molecules/GroupOptions/index.scss';

function GroupOptions(props: GroupOptionsTypes.IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOptionsViewOpen, setOptionsView] = useState<boolean>(false);

  const {
    onEditGroupClick,
    onDownloadReportClick,
    onDeleteGroupClick,
    isLast,
  } = props;

  useOutsideClick(ref, () => {
    if (isOptionsViewOpen) setOptionsView(false);
  });

  const options = [
    {
      name: 'Изменить', callback: onEditGroupClick,
    },
    {
      name: 'Скачать отчет', callback: onDownloadReportClick,
    },
    {
      name: 'Удалить', callback: onDeleteGroupClick,
    },
  ];

  const onOptionClick = (callback?: () => void) => {
    setOptionsView(false);
    callback && callback();
  };

  return (
    <div
      className="group-options d-flex justify-content-around"
      onClick={() => setOptionsView(prevState => !prevState)}
    >
      <div
        className={classNames(
          'group-options__dots d-flex flex-column',
          { 'group-options__dots--active' : isOptionsViewOpen })}
      >
        <div className="dots__item mr-4" />
        <div className="dots__item mr-4" />
        <div className="dots__item" />
      </div>
      {isOptionsViewOpen && (
        <div ref={ref} className={classNames(
          'group-options__select d-flex flex-column',
          `group-options__select${isLast ? '--last' : '--firsts'}`)}>
          {options.map((n, i) => n.callback && (
            <Button
              key={i}
              type="plain"
              variant="text"
              className="group-options__select__item"
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

export default GroupOptions;
