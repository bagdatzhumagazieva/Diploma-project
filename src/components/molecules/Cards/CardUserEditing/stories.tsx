import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CardUserEditing from 'src/components/molecules/Cards/CardUserEditing/index';
import { ExampleCardUserEditing } from 'src/components/molecules/Cards/CardUserEditing/mocks';

storiesOf('Card User Editing', module)
  .add('basic', () => (
    <div className="container" style={{ backgroundColor: '#E5E5E5', padding: '20px' }}>
      <div style={{ width: '700px' }}>
        <CardUserEditing { ...ExampleCardUserEditing } />
      </div>
    </div>
  ));
