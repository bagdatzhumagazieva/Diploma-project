import React, { useContext } from 'react';
import GameDetail from 'src/components/molecules/GameDetail';
import GameContext from 'src/components/organisms/GameCreationEdition/GameContext';
import Button from 'src/components/atoms/Button';
import 'src/components/organisms/GameCreationEdition/Preview/index.scss';
import Typography from 'src/components/atoms/Typography';

function Preview() {
  const { setStep, gameData, levels } = useContext(GameContext);

  return (
    <div className="preview d-flex flex-column">
      <div className="preview__content">
      <div className="preview__game-detail-wrapper p-24">
        <Typography variant="h1" className="mb-32">Предпросмотр</Typography>
        <GameDetail
          id={gameData.id || -1}
          template={gameData.template || ''}
          name={gameData.name || '-'}
          description={gameData.description || '-'}
          cntLevels={levels.length}
          rewardAmount={gameData?.rewardAmount || 0}
          templateId={gameData.templateId || -1}
          status={gameData.status}
          variant="preview"
          link={''}
        />
      </div>
      </div>
      <Button
        variant="textmed"
        type="link-black"
        className="align-self-end mt-48 mr-24"
        onClick={() => setStep(2)}
      >
        Назад</Button>
    </div>
  );
}

export default Preview;
