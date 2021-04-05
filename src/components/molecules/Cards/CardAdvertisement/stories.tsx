import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Section from 'src/components/atoms/Section';
import { ExampleCardAdvertisement } from 'src/components/molecules/Cards/CardAdvertisement/mock';
import CardAdvertisement from 'src/components/molecules/Cards/CardAdvertisement/index';

storiesOf('Card Advertisement', module)
  .add('basic', () => (
    <Router>
      <div style={{ padding: '40px', backgroundColor: '#F4F5F9' }}>
        <div style={{ width: '1176px' }}>
          <Section title="Рекомендуемое" link="link">
            <div className="d-flex justify-content-between">
              {ExampleCardAdvertisement.map(item => (
                <div key={item.title} style={{ width: '376px' }}>
                  <CardAdvertisement {...item} />
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </Router>
  ));
