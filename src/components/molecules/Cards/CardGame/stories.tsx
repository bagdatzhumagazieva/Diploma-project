import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ExampleCardGames } from 'src/components/molecules/Cards/CardGame/mock';
import CardGame from 'src/components/molecules/Cards/CardGame/index';
import GameDetail from 'src/components/molecules/GameDetail';

storiesOf('Card Game', module)
  .add('basic', () => (
    <Router>
      <div style={{ backgroundColor: '#F4F5F9', padding: '20px' }}>
        <div className="d-flex justify-content-between" style={{ width: '1176px' }}>
          {ExampleCardGames.map(item => (
            <div style={{ width: '276px' }}>
              <CardGame {...item} />
            </div>
          ))}
        </div>
        <div>
          <div style={{ width: '900px', margin: '0 auto', marginTop: '40px' }}>
            <GameDetail {...ExampleCardGames[0]} variant="web" />
          </div>
        </div>
      </div>
    </Router>
  ));
