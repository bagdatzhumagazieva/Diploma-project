import React, { useEffect } from 'react';
import Typography from 'src/components/atoms/Typography';
import { ModalResponseModuleTypes } from 'src/components/molecules/ModalResponseModule/types';
import Image from 'src/components/atoms/Image';
function ModalResponseModule(props: ModalResponseModuleTypes.IProps) {
  const { title, messageTitle, isSuccess, moduleImage, statistics, isModuleOpen } = props;
  const successAudio = require('src/assets/sound/success-sound.mp3');
  const errorAudio = require('src/assets/sound/error-sound.mp3');
  useEffect(
    () => {
      if (isModuleOpen) {
        if (isSuccess) {
          const audioSuccess = new Audio(successAudio);
          audioSuccess.play();
        } else {
          const audioError = new Audio(errorAudio);
          audioError.play();
        }
      }
    },
    [isModuleOpen],
  );
  return (
    <div className="d-flex flex-column px-32 pt-24">
      <Typography variant="headline">{title}</Typography>
      <Image className="fill_w px-40" src={moduleImage} alt="response image"/>
      <Typography className="mb-16" variant="h2">{messageTitle}</Typography>
      {statistics.map((statisticData: ModalResponseModuleTypes.MessageStatistics, index) => {
        return (
          <div key={index}>
            <Typography
              className="color_grey_additional_2 mb-12"
              variant="subtext"
            >
              {statisticData.field}:
            </Typography>
            <Typography
              className="color_main_50 ml-2"
              variant="text"
            >
              {statisticData.data}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}

export default ModalResponseModule;
