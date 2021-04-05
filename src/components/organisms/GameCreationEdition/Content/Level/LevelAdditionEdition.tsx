import React, { useContext, useState } from 'react';
import { generateId } from 'src/utils/generation';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import GameContext from 'src/components/organisms/GameCreationEdition/GameContext';
import Editor from 'src/components/molecules/Editor';

import { LevelAdditionEditionTypes } from 'src/components/organisms/GameCreationEdition/Content/Level/types';
import 'src/components/organisms/GameCreationEdition/Content/Level/index.scss';

function LevelTrialAdditionEdition(props: LevelAdditionEditionTypes.IProps) {
  const {
    onActionClick,
    data: propsData = { id: '', description: '', name: '' },
    isLevel,
    levelIndex,
    isHw,
  } = props;
  const { levels } = useContext(GameContext);
  const [data, setData] = useState<LevelAdditionEditionTypes.IData>(propsData);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'name') setNameErrorMessage('');
    setData(prevState => ({ ...prevState, [event.target.name] : event.target.value }));
  };

  const ifLevelExist = () => {
    if (isLevel) return levels.some(item => item.name === data.name && item.id !== data.id);
    return levelIndex && levels[levelIndex].tests.some(item => item.name === data.name && item.id !== data.id);
  };

  const onSubmitClick = () => {
    if (ifLevelExist()) {
      setNameErrorMessage(`${isLevel ? 'Уровень' : 'Испытание'} с таким названием уже существует`);
    } else {
      onActionClick(
        'submit',
        { ...data,  ...(data.id ? {} : { id: generateId(10) }) },
        data.id ? 'edit' : 'create',
      );
    }
  };

  const renderData = (
    <div className="level-addition-edition p-24 d-flex flex-column">
        {
          isHw ? <Typography
            variant="textmed"
            className="mb-24">
            Добавление домашнего задания
          </Typography> :
        <Typography variant="textmed" className="mb-24">Добавление {isLevel ? 'уровня' : 'испытания'}</Typography>
        }
        <Input
          name="name"
          type="text"
          label="Название"
          placeholder="Желательно использовать не более 7 слов в названии"
          classNames="level-addition-edition__name mb-24"
          errorMessage={nameErrorMessage}
          value={data.name}
          onChange={onInputChange}
        />
        {
          isHw ?
            <div className="mb-24">
              <Typography
              variant="subtext"
              className="mb-8"
            >
              Описание (синопсис)
            </Typography>
            <Editor
              data={data.description}
              onDataChange={(dat) => {
                setData({ ...data, description:  dat });
              }}
            />
            </div> :
            <Input
              name="description"
              type="text"
              label="Описание"
              placeholder="Введите описание"
              classNames="mb-32"
              value={data.description}
              onChange={onInputChange}
            />
      }
      <div className="align-self-end">
        <Button
          variant="textmed"
          type="link-black"
          onClick={() => onActionClick('cancel')}
        >
          Отмена
        </Button>
        <Button
          variant="textmed"
          className="level-addition-edition__submit-button ml-16"
          disabled={data.name.length < 1 || data.description.length < 1 }
          onClick={onSubmitClick}
        >
          Добавить
        </Button>
      </div>
    </div>
  );

  return (
    isLevel ? renderData : <div className="trial-addition-edition__wrapper p-24 mt-24">{renderData}</div>
  );
}

export default LevelTrialAdditionEdition;
