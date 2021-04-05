import React, { useState } from 'react';
import AudioPlayer from 'src/components/molecules/AudioPlayer/index';
import { GroupAudioPlayerTypes } from 'src/components/molecules/AudioPlayer/types';

function GroupAudioPlayer(props: GroupAudioPlayerTypes.IProps) {
  const [curAudioId, setCurAudioId] = useState<string | null>(null);
  const { audioRecordings } = props;

  return (
    <div className="group-audio-player">
      {audioRecordings.map(item => (
        <AudioPlayer
          id={item.id}
          curId={curAudioId}
          title={item.title}
          src={item.src}
          stopPlaying={curAudioId === item.id}
          handleAudioId={setCurAudioId}
          className="group-audio-player__item mb-16"
        />
      ))}
    </div>
  );
}

export default GroupAudioPlayer;
