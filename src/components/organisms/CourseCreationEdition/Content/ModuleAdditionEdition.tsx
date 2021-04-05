import React, { useContext, useState } from 'react';
import { generateId } from 'src/utils/generation';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Input from 'src/components/molecules/Input';
import ButtonImageUpload from 'src/components/organisms/ButtonImageUpload';
import CourseCreationContext from 'src/components/organisms/CourseCreationEdition/CourseCreationContext';

import { ModuleAdditionEditionTypes } from 'src/components/organisms/CourseCreationEdition/Content/types';
import { ModuleStatus, ModuleTypes } from 'src/store/module/types';
import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';
import 'src/components/organisms/CourseCreationEdition/Content/index.scss';

function ModuleAdditionEdition(props: ModuleAdditionEditionTypes.IProps) {
  const { onCancelClick, data: propsData, setModuleData, type, index } = props;
  const [data, setData] = useState<ModuleTypes.IRenderProps>(propsData);
  const [titleErrorMes, setTitleErrorMes] = useState<string>('');
  const [descErrorMes, setDescErrorMes] = useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.name === 'name' ? setTitleErrorMes('') : setDescErrorMes('');
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const { modules } = useContext(CourseCreationContext);

  const handleImageUpload = (image: ButtonImageUploadTypes.IImage) => {
    setData({ ...data, imageThumbnail: image.imageThumbnailUrl, image: image.imageUrl });
  };

  const isNameExist = (name: string) => modules.some(item => item.name === name && item.id !== data.id);

  const onAddClick = () => {
    let isDataValid = true;
    if (data.name.length < 1) {
      setTitleErrorMes('Введтие название модуля');
      isDataValid = false;
    } else {
      if (isNameExist(data.name)) {
        setTitleErrorMes('Модуль с таким названием уже существует');
        isDataValid = false;
      }
    }
    if (data.description.length < 1) {
      setDescErrorMes('Введите описание модуля');
      isDataValid = false;
    }
    if (isDataValid) {
      setModuleData && setModuleData(type, {
        ...data,
        ...(type === 'create' ?
          { id: generateId(), status: ModuleStatus.NEW, orderIndex: index }
          : data.status !== ModuleStatus.NEW && {
            status: ModuleStatus.EDITED,
          }),
      });
    }
  };

  return (
    <div className="module-addition-edition px-24 py-24">
      <div className="module-addition-edition__content px-24 py-24 d-flex flex-column">
        <Typography variant="textmed" className="mb-24">
          { type === 'create' ? 'Добавление модуля' : 'Изменение модуля'  }
        </Typography>
        <Input
          name="name"
          type="text"
          label="Название"
          placeholder="Желательно использовать не более 7 слов в названии"
          classNames="module-addition-edition__input mb-24"
          errorMessage={titleErrorMes}
          value={data.name}
          onChange={onInputChange}
        />
        <Input
          name="description"
          type="text"
          label="Описание"
          placeholder="Введите описание"
          classNames="module-addition-edition__input mb-24"
          errorMessage={descErrorMes}
          value={data.description}
          onChange={onInputChange}
        />
        <ButtonImageUpload
          title="Обложка"
          description="JPG и PNG до 10 МБ"
          image={{ imageUrl: data.image || '', imageThumbnailUrl: data.imageThumbnail || '' }}
          handleImageUpload={handleImageUpload}
        />
        <div className="d-flex align-items-center align-self-end mt-24">
          <Button
            type="link-black"
            className="mr-16"
            variant="textmed"
            onClick={onCancelClick}
          >
            Отмена
          </Button>
          <Button
            variant="textmed"
            className="module-addition-edition__add-button"
            onClick={() => onAddClick()}
          >
            {type === 'create' ? 'Добавить' : 'Изменить'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModuleAdditionEdition;
