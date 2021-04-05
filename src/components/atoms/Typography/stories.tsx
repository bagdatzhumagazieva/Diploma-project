import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Typography from 'src/components/atoms/Typography/index';

storiesOf('Typography', module)
  .add('basic', () => (
    <div className="container">
      <div className="d-flex flex-column">
        <Typography color="red" className="mb-3" variant="headline">Headline</Typography>
        <Typography color="grey_divider" className="mb-3" variant="h1">Header 1</Typography>
        <Typography className="mb-3" variant="h2">Header 2</Typography>
        <Typography className="mb-3" variant="text">Text / Regular</Typography>
        <Typography className="mb-3" variant="textmed">Text / Medium</Typography>
        <Typography className="mb-3" variant="subtext">SubText / Regular</Typography>
        <Typography className="mb-3" variant="subtextmed">SubText / Medium</Typography>
        <Typography className="mb-3" variant="tag">tag</Typography>
        <Typography className="mb-3" variant="xsmall">xSmall</Typography>
        <Typography className="mb-3" variant="xsmallunderlined">xSmall Underline</Typography>
        <Typography className="mb-3" variant="xxsmall">xxSmall / Regular</Typography>
        <Typography className="mb-3" variant="xxsmallmed">xxSmall / Medium</Typography>
      </div>
    </div>
  ));
