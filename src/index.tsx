import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'src/components/AppTemplate';
import { registerServiceWorker } from 'src/serviceWorker';
import 'src/assets/scss/main.scss';
import 'src/i18n';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
