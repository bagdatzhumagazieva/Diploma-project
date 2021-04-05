import { useState, useEffect } from 'react';
import { UseAudioPlayerTypes } from 'src/components/molecules/AudioPlayer/types';

function useAudioPlayer(props: UseAudioPlayerTypes.IProps) {
  const [duration, setDuration] = useState<number | null>();
  const [curTime, setCurTime] = useState<number | null>();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<number | null>();

  useEffect(() => {
    const audio = document.getElementById(props.audioId) as HTMLAudioElement;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };
    const setAudioTime = () => setCurTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  });

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
  };
}

export default useAudioPlayer;
