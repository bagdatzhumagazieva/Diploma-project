import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { EmployeeOptionsTypes } from 'src/components/molecules/EmployeeOptions/types';
import 'src/components/molecules/EmployeeOptions/index.scss';
import { useOutsideClick } from 'src/hooks/useOutsideClick';
import Button from 'src/components/atoms/Button';

function EmployeeOptions(props: EmployeeOptionsTypes.IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOptionsViewOpen, setOptionsView] = useState<boolean>(false);

  const {
    onGroupClick,
    onSendPasswordClick,
    onTransferBranchClick,
    onUpdateActiveClick,
    onDeleteEmployeeClick,
    isLast,
  } = props;

  useOutsideClick(ref, () => {
    if (isOptionsViewOpen) setOptionsView(false);
  });

  const options = [
    {
      name: 'Активировать/Блокировать', callback: onUpdateActiveClick,
    },
    {
      name: 'Перевести в филиал', callback: onTransferBranchClick,
    },
    {
      name: 'Группирование', callback: onGroupClick,
    },
    {
      name: 'Отправить логин/пароль', callback: onSendPasswordClick,
    },
    {
      name: 'Удалить пользователя', callback: onDeleteEmployeeClick,
    },
  ];

  const onOptionClick = (callback?: () => void) => {
    setOptionsView(false);
    callback && callback();
  };

  return (
    <div
      className="employee-options d-flex justify-content-around"
      onClick={() => setOptionsView(prevState => !prevState)}
    >
      <div
        className={classNames(
          'employee-options__dots d-flex flex-column',
          { 'employee-options__dots--active' : isOptionsViewOpen })}
      >
        <div className="dots__item mr-4" />
        <div className="dots__item mr-4" />
        <div className="dots__item" />
      </div>
      {isOptionsViewOpen && (
        <div ref={ref} className={classNames(
          `group-options__select${isLast ? '--last' : '--firsts'}`,
          'employee-options__select d-flex flex-column')}>
          {options.map((n, i) => n.callback && (
            <Button
              key={i}
              type="plain"
              variant="text"
              className="employee-options__select__item"
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

export default EmployeeOptions;
