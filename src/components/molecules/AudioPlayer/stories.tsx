import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import AudioPlayer from 'src/components/molecules/AudioPlayer/index';
import { ExampleAudioPlayer, ExampleGroupAudioPlayer } from 'src/components/molecules/AudioPlayer/mocks';
import GroupAudioPlayer from 'src/components/molecules/AudioPlayer/GroupAudioPlayer';

storiesOf('Audio Player', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <div className="container" style={{ height: '700px' }}>
      <div className="p-40">
        <AudioPlayer {...ExampleAudioPlayer} className="mb-20" />
        <GroupAudioPlayer audioRecordings={ExampleGroupAudioPlayer} />
      </div>
    </div>
  ));
