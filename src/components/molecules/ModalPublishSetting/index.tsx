import React, { useState } from 'react';
import RadioButton from 'src/components/atoms/RadioButton';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import DateCalendar from 'src/components/molecules/DateCalendar';
import Input from 'src/components/molecules/Input';

import { ModalPublishTypes } from 'src/components/molecules/ModalPublishSetting/types';
import { ReactComponent as ClockIcon } from 'src/assets/img/icons/clock.svg';
import 'src/components/molecules/ModalPublishSetting/index.scss';

function ModalPublishSetting(props: ModalPublishTypes.IProps) {

  const { setDate, onCancelClick, onSaveClick,
    setTime, time, date, setStatus, status } = props;
  const [timeError, setTimeError] = useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTime && setTime(value);
    setTimeError('');
  };

  const handleSave = () => {
    if (status === 'SCHEDULED') {
      if (time && time[0] !== '_' && time[1] !== '_' && time[3] !== '_' && time[4] !== '_') {
        onSaveClick && onSaveClick();
        setTimeError('');
      } else {
        setTimeError('Введите время');
      }
    } else {
      onSaveClick && onSaveClick();
    }
  };

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus && setStatus(event.target.value);
  };

  const clockMask = 'ab:00';
  const formatChars = {
    a: '[0-2]',
    b: time && time[0] < '2' ? '[0-9]' : '[0-3]',
  };

  return (
    <div className="ml-24 modal-publish-setting">
      <RadioButton
        name="status"
        value="DRAFT"
        label="Сохранить как черновик"
        setClicked={radioButtonHandler}
        isChecked={status === 'DRAFT'}
      />
      <Typography
        variant="xsmall"
        color="grey_additional_1"
        className="ml-16"
      >
        Данная задача не будет опубликована, но будет сохранена
      </Typography>
      <RadioButton
        name="status"
        value="SCHEDULED"
        label="Запланировать публикацию"
        setClicked={radioButtonHandler}
        className="mt-24"
        isChecked={status === 'SCHEDULED'}
      />
      <Typography
        variant="xsmall"
        color="grey_additional_1"
        className="ml-16"
      >
        Выберите дату и время, когда вы хотите разместить задачу
      </Typography>
      <div className="mt-32 d-flex">
        <DateCalendar setDate={setDate} date={date} />
        <Input
          type="text"
          name="clock"
          variant="subtext"
          placeholder="12:00"
          classNames=" modal-publish-setting__clock ml-24"
          mask={clockMask}
          formatChars={formatChars}
          value={time}
          onChange={onInputChange}
          errorMessage={timeError}
          icon={<ClockIcon className="modal-publish-setting__icon ml-16"/>}
        />
      </div>
      <RadioButton
        name="status"
        value="PUBLISHED"
        label="Опубликовать сразу"
        className="mt-24"
        setClicked={radioButtonHandler}
        isChecked={status === 'PUBLISHED'}
      />
      <Typography
        variant="xsmall"
        color="grey_additional_1"
        className="ml-16"
      >
        Данное задание будет доступно сразу же после его публикации
      </Typography>
      <div className="d-flex justify-content-end m-32 mb-24 mr-24">
        <Button
          className=" modal-publish-setting__btn"
          color="blacker"
          variant="textmed"
          type="link"
          onClick={onCancelClick}
        >
          Отмена
        </Button>
        <Button
          className=" modal-publish-setting__btn"
          variant="textmed"
          onClick={handleSave}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default ModalPublishSetting;
