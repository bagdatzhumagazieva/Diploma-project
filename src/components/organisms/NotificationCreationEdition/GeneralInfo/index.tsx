import React, { useContext, useState } from 'react';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Input from 'src/components/molecules/Input';
import Checkbox from 'src/components/molecules/Checkbox';
import DateCalendar from 'src/components/molecules/DateCalendar';
import NotificationContext from 'src/components/organisms/NotificationCreationEdition/NotificationContext';
import { ReactComponent as ClockIcon } from 'src/assets/img/icons/clock.svg';
import { GENERAL_DATA } from 'src/components/organisms/NotificationCreationEdition/GeneralInfo/const';
import { GeneralInfoTypes } from 'src/components/organisms/NotificationCreationEdition/GeneralInfo/types';

function GeneralInformation(props: GeneralInfoTypes.IProps) {

  const [isPlan, setIsPlan] = useState<boolean>(false);
  const [dataInfo, setDataInfo] = useState<GeneralInfoTypes.IData>(GENERAL_DATA);

  const { setStep } = useContext(NotificationContext);

  const onTextareaPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 27) {
      return;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setDataInfo({ ...dataInfo, [name]: value });
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setDataInfo({ ...dataInfo, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setDataInfo({ ...dataInfo, date });
  };

  const clockMask = 'ab:cd';
  const formatChars = {
    a: '[0-2]',
    b: dataInfo.time && dataInfo.time[0] < '2' ? '[0-9]' : '[0-3]',
    c: '[0-5]',
    d: '[0-9]',
  };

  return (
    <div className="d-flex flex-column">
      <div className="notification-creation-edition__gen-info pt-32 pl-24 pb-32 d-flex flex-column">
        <Typography variant="h1">
          Общая информация
        </Typography>
        <Input
          type="text"
          name="title"
          value={dataInfo.title}
          placeholder="Желательно использовать не более 7 слов в названии"
          label="Тема"
          onChange={handleInputChange}
          prompt="Тема письма должна давать представление о его содержимом"
          classNames="notification-creation-edition__input mt-32"
        />

        <Typography variant="subtext" className="mt-32">Текст сообщения</Typography>
        <textarea
          rows={1}
          placeholder="Введите сообщение"
          value={dataInfo.message}
          className="notification-creation-edition__gen-info__msg font px-12 py-16 mt-4"
          onKeyDown={onTextareaPress}
          name="message"
          onChange={handleTextAreaChange}
        />
        <Checkbox
          title="Запланировать рассылку"
          prompt="Выберите дату и время, когда вы хотите отправить рассылку"
          className="mt-32"
          setClicked={setIsPlan}
        />
        {isPlan && (
          <div className="mt-32 d-flex">
            <DateCalendar setDate={handleDateChange} date={dataInfo.date} />
            <Input
              type="text"
              name="time"
              variant="subtext"
              placeholder="12:00"
              classNames="notification-creation-edition__gen-info__time ml-24"
              mask={clockMask}
              formatChars={formatChars}
              value={dataInfo.time}
              onChange={handleInputChange}
              icon={<ClockIcon className="modal-publish-setting__icon ml-16"/>}
            />
          </div>
        )}
        <Checkbox
          title="Важное сообщение"
          prompt="В них содержится важная информация, которую нельзя пропустить"
          className="mt-32"
          setClicked={e => setDataInfo({ ...dataInfo, isImportant: e })}
        />
      </div>
      <div className="align-self-end d-flex align-items-center mt-32 mb-32">
        <Button variant="textmed" type="link-black" onClick={() => setStep(0)}>Назад</Button>
        <Button
          disabled
          variant="textmed"
          className="next-button ml-24"
        >
          Отправить
        </Button>
      </div>
    </div>
  );
}

export default GeneralInformation;
