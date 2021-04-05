import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { secondsToTimeFormat } from 'src/utils/format';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import PlayIcon from 'src/components/atoms/Svg/Icons/play';
import Typography from 'src/components/atoms/Typography';
import Bar from 'src/components/molecules/AudioPlayer/Bar';
import UseAudioPlayer from 'src/components/molecules/AudioPlayer/UseAudioPlayer';

import { AudioPlayerTypes } from 'src/components/molecules/AudioPlayer/types';
import PauseIcon from 'src/assets/img/icons/pause.svg';
import './index.scss';

function AudioPlayer(props: AudioPlayerTypes.IProps) {
  const { id, src, title, className, handleAudioId, curId } = props;
  const [played, setPlayed] = useState<boolean>(false);
  const { curTime, duration, playing, setPlaying, setClickedTime } = UseAudioPlayer({ audioId: id });

  const startPlaying = () => {
    handleAudioId && handleAudioId(id);
    setPlaying(true);
    setPlayed(true);
  };

  const toggleButtonClick = () => {
    handleAudioId && handleAudioId(id);
    setPlaying(!playing);
  };

  useEffect(
    () => {
      if (curId !== id && playing)  setPlaying(false);
    },
    [curId],
  );

  return (
    <div className={classNames('audio-player', className)}>
      <div className="d-flex justify-content-between align-items-center mb-12">
        <div className="d-flex align-items-center">
          {played ? (
            <Button
              className="audio-player__toggle mr-12 d-flex align-items-center justify-content-center"
              onClick={toggleButtonClick}
            >
              {playing ? <Image alt="" src={PauseIcon} /> : <PlayIcon /> }
            </Button>
          ) : (
            <div
              className="audio-player__play-wrapper d-flex align-items-center justify-content-center"
              onClick={startPlaying}
            >
              <PlayIcon color="#FF9800" />
            </div>
          )}
          <Typography variant="h2" className="ml-2">{title}</Typography>
        </div>
        {!played && duration && (
          <Typography variant="subtext" color="grey_additional_2">{secondsToTimeFormat(duration)}</Typography>
        )}
      </div>
      {played && curTime && duration && (
        <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={setClickedTime}
        />
      )}
      <audio
        controls
        id={id}
        src={src}
        className="audio-player__audio"
      />
    </div>
  );
}

export default AudioPlayer;
