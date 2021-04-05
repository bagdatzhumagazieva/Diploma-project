import React, { useContext } from 'react';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import ButtonImageUpload from 'src/components/organisms/ButtonImageUpload';
import GameContext from 'src/components/organisms/GameCreationEdition/GameContext';

import { Status } from 'src/store/course/types';
import { RewardTypes } from 'src/components/organisms/GameCreationEdition/Reward/types';
import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';

function Reward(props: RewardTypes.IProps) {
  const { gameData, setGameData, setStep } = useContext(GameContext);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGameData({ ...gameData, [name]: +value });
  };

  const handleImageUpload = (image: ButtonImageUploadTypes.IImage) => (
    setGameData(
      { ...gameData, certificateImageUrl: image.imageUrl, certificateImageThumbnailUrl: image.imageThumbnailUrl },
    ));

  const onSuccessLimitInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', 'e', '.'].includes(event.key) ||
      (+((gameData.certificateEarnMinPercent || '') + event.key)) > 100) event.preventDefault();
  };

  const onCerExpirationDateInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', 'e', '.'].includes(e.key) ||
      (+((gameData.certificateExpirationDays || '') + e.key) > 100)) e.preventDefault();
  };

  const onRewardInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', 'e', '.'].includes(e.key) ||
      (+((gameData.rewardAmount || '') + e.key) > 100000)) e.preventDefault();
  };

  return (
    <div className="reward d-flex flex-column">
      <div className="reward__content px-24 py-32 d-flex flex-column">
        <Typography variant="h1" className="mb-32">Вознаграждения</Typography>
        <Typography variant="textmed" className="mb-24">Сертификат</Typography>
        <Input
          disabled={gameData.status === Status.PUBLISHED}
          name="certificateExpirationDays"
          type="number"
          label="Длительность действия сертификата"
          placeholder="В днях"
          prompt="По истечению данного срока сертификат становится не действительным"
          classNames="reward__input mb-32"
          value={gameData.certificateExpirationDays || undefined}
          onKeyPress={onCerExpirationDateInputKeyPress}
          onChange={onInputChange}
        />
        <Input
          disabled={gameData.status === Status.PUBLISHED}
          name="certificateEarnMinPercent"
          type="number"
          label="Порог вручения сертификата"
          placeholder="число от 0 - 100"
          prompt="Сколько баллов нужно набрать пользователю, чтобы получить сертификат"
          classNames="reward__input mb-32"
          value={gameData.certificateEarnMinPercent || undefined}
          onKeyPress={onSuccessLimitInputKeyPress}
          onChange={onInputChange}
        />
        <ButtonImageUpload
          title="Изображение сертификата"
          description="JPG и PNG до 10 МБ"
          disabled={gameData.status === Status.PUBLISHED}
          image={{
            imageUrl: gameData.certificateImageUrl || '',
            imageThumbnailUrl: gameData.certificateImageThumbnailUrl || '',
          }}
          handleImageUpload={handleImageUpload}
        />
        <div className="game-creation-edition__line my-24" />
        <Typography variant="textmed" className="mb-24">Монеты</Typography>
        <Input
          disabled={gameData.status === Status.PUBLISHED}
          name="rewardAmount"
          type="number"
          label="Кол-во монет"
          placeholder="Введите кол-во монет"
          prompt="Сколько монет пользователь получить за прохождение данной игры"
          classNames="reward__input--wide"
          value={gameData.rewardAmount || undefined}
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
