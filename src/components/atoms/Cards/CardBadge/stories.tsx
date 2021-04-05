import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CardBadge from 'src/components/atoms/Cards/CardBadge/index';
import StarIcon from 'src/assets/img/icons/star.svg';

storiesOf('Card Badge', module)
  .add('basic', () => (
    <div className="container p-40">
      <CardBadge icon={StarIcon} title="5,0"/>
    </div>
  ));
