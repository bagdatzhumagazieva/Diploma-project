import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CardTotalAmountBranches from 'src/components/atoms/Cards/CardTotalAmountBranches/index';
import { ExampleCardTotalAmountBranches } from 'src/components/atoms/Cards/CardTotalAmountBranches/mocks';

storiesOf('Card Total Amount Branches', module)
  .add('basic', () => (
    <div className="container" style={{ padding: '50px', backgroundColor: 'grey' }}>
      <div style={{ width: '276px' }}>
        <CardTotalAmountBranches branches={ExampleCardTotalAmountBranches}/>
      </div>
    </div>
  ));
