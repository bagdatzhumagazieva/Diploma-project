import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CardInputSearcher from 'src/components/atoms/Cards/CardInputSearcher/index';
import { ExampleCardInputSearcher2 } from 'src/components/atoms/Cards/CardInputSearcher/mocks';

storiesOf('Card Input Searcher', module)
  .add('basic', () => (
    <div className="container">
      <div className="d-flex flex-column p-5 w-50">
        {ExampleCardInputSearcher2.map(card => (
          <CardInputSearcher
            classNames="stories_card-input-searcher"
            type={card.type}
            link={card.link}
            title={card.title}
            imgSrc={card.imgSrc}
          />
        ))}
      </div>
    </div>
  ));
