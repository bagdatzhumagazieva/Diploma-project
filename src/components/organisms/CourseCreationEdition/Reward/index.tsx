import React, { useContext } from 'react';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import ButtonImageUpload from 'src/components/organisms/ButtonImageUpload';
import CourseCreationContext from 'src/components/organisms/CourseCreationEdition/CourseCreationContext';

import { RewardTypes } from 'src/components/organisms/CourseCreationEdition/Reward/types';
import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';
import { Status } from 'src/store/course/types';
import 'src/components/organisms/CourseCreationEdition/Reward/index.scss';

function Reward(props: RewardTypes.IProps) {
  const { setStep, setCourseData, courseData } = useContext(CourseCreationContext);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({ ...courseData, [event.target.name]: event.target.value.length < 1 ? null : event.target.value });
  };

  const handleImageUpload = (image: ButtonImageUploadTypes.IImage) => {
    setCourseData({ ...courseData, certificateImageUrl: image.imageUrl,
      certificateImageThumbnailUrl: image.imageThumbnailUrl });
  };

  const onRewardInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', 'e', '.'].includes(e.key) || courseData.rewardAmount === 0 ||
      (+((courseData.rewardAmount || '') + e.key) > 100000)) e.preventDefault();
  };

  const onCerExpirationDateInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((courseData.certificateExpirationDate === 0) || ['-', 'e', '.'].includes(e.key) ||
    (+((courseData.certificateExpirationDate || '') + e.key) > 100)) e.preventDefault();
  };

  return (
    <div className="reward d-flex flex-column">
      <div className="reward__content px-24 py-32 d-flex flex-column">
        <Typography variant="h1" className="mb-32">Вознаграждения</Typography>
        <Typography variant="textmed" className="mb-24">Сертификат</Typography>
        <Input
          disabled={courseData.status === Status.PUBLISHED}
          name="certificateExpirationDate"
          type="number"
          label="Длительность действия сертификата"
          placeholder="В днях"
          prompt="По истечению данного срока сертификат становится не действительным"
          classNames="reward__input mb-32"
          value={courseData.certificateExpirationDate || undefined}
          onKeyPress={onCerExpirationDateInputKeyPress}
          onChange={onInputChange}
        />
        <ButtonImageUpload
          title="Изображение сертификата"
          description="JPG и PNG до 10 МБ"
          disabled={courseData.status === Status.PUBLISHED}
          image={{
            imageUrl: courseData.certificateImageUrl || '',
            imageThumbnailUrl: courseData.certificateImageThumbnailUrl || '',
          }}
          handleImageUpload={handleImageUpload}
        />
        <div className="line my-24" />
        <Typography variant="textmed" className="mb-24">Монеты</Typography>
        <Input
          disabled={courseData.status === Status.PUBLISHED}
          name="rewardAmount"
          type="number"
          label="Кол-во монет"
          placeholder="Введите кол-во монет"
          prompt="Сколько монет пользователь получит за прохождение данного курса"
          classNames="reward__input"
          value={courseData.rewardAmount || undefined}
          onKeyPress={onRewardInputKeyPress}
          onChange={onInputChange}
        />
      </div>
      <div className="align-self-end d-flex align-items-center mt-32">
        <Button
          variant="textmed"
          type="link-black"
          onClick={() => setStep(0)}
        >
          Назад
        </Button>
        <Button
          variant="textmed"
          className="next-button ml-24"
          onClick={() => setStep(2)}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}

export default Reward;
