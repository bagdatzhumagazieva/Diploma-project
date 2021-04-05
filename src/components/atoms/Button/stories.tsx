import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Button from 'src/components/atoms/Button/index';
import Image from 'src/components/atoms/Image';
import FilterIcon from 'src/assets/img/icons/filter.svg';

storiesOf('Button', module)
  .add('basic', () => (
      <Router>
        <div className="container">
          <div className="d-flex flex-column p-5 w-50">
            <Button
              type="main"
              variant="headline"
              className="mb-5"
            >
              Main Type of Button, variant: Headline
            </Button>
            <Button
              disabled
              type="main"
              variant="h1"
              className="mb-5"
            >
              Main Type of Button Disabled, variant: H1
            </Button>
            <Button
              type="link"
              variant="h2"
              className="mb-5"
            >
              Text Type of Button, variant: H2
            </Button>
            <Button
              disabled
              type="link"
              variant="text"
              className="mb-5"
            >
              Text Type of Button disable, variant: text
            </Button>
            <Button
              type="outlined"
              variant="textmed"
              className="mb-5"
            >
              Outlined Type of Button, variant: textmed
            </Button>
            <Button
              disabled
              type="outlined"
              variant="subtext"
              className="mb-5"
            >
              Outlined Type of Button Disabled, variant: subtext
            </Button>
            <Button
              type="black-icon"
              variant="text"
              className="mb-5"
            >
              <Image
                alt="filter button image"
                className="mr-16"
                src={FilterIcon}
              />
              Button with Icon color black, type='black-icon'
            </Button>
            <Button
              disabled
              type="black-icon"
              variant="text"
              className="mb-5"
            >
              <Image
                alt="filter button image"
                className="mr-16"
                src={FilterIcon}
              />
              Button with Icon color black, type='black-icon', disabled
            </Button>
          </div>
        </div>
      </Router>
  ));
