import React, { useContext, useState } from 'react';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Input from 'src/components/molecules/Input';
import { IOption } from 'src/components/molecules/Select/types';
import Select from 'src/components/molecules/Select';
import NotificationContext from 'src/components/organisms/NotificationCreationEdition/NotificationContext';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import 'src/components/organisms/NotificationCreationEdition/Receiver/index.scss';

function Receiver() {

  const [selectedGroups, setSelectedGroups] = useState<IOption[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<IOption[]>([]);

  const { setStep } = useContext(NotificationContext);

  return (
    <div className="notification-receiver d-flex flex-column">
      <div className="notification-receiver__info py-32 pl-24">
        <Typography variant="h1">
          Получатели
        </Typography>
        <Select
          staticWidth
          withCheckbox
          withChips
          options={selectedBranches}
          className="mt-32 notification-receiver__info__select"
          label="Выбор Филиала"
          onCheckboxChanges={setSelectedBranches}
          selectedOption={{} as IOption}
          customTitle="Выбор Филиала"
        />
        <Select
          staticWidth
          withCheckbox
          withChips
          options={selectedGroups}
          className="mt-32 notification-receiver__info__select"
          label="Выбор группы"
          onCheckboxChanges={setSelectedGroups}
          selectedOption={{} as IOption}
          customTitle="Выбор группы"
        />
        <Typography variant="h2" className="mt-48">
          {/*// TODO: add count after back*/}
          Выбрано пользователей: 0
        </Typography>
        <div className="d-flex flex-column mt-24">
          <Typography
            variant="subtext"
            className="mb-4"
          >
            Поиск пользователя
          </Typography>
          <div className="d-flex align-items-center">
            <Input
              type="text"
              placeholder="Имя Фамилия"
              classNames="notification-receiver__searcher-input"
              icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
            />
          </div>
        </div>

        {/*// TODO: add Table after appearance of back*/}
      </div>
      <Button
        variant="textmed"
        className="next-button align-self-end mt-32 mb-32"
        onClick={() => setStep(1)}
      >
        Далее
      </Button>
    </div>
  );
}

export default Receiver;
