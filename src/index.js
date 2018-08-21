import React from 'react';
import ReactDOM from 'react-dom';

import config from './config'
import App from './containers/app';
import Provider from './containers/provider';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider config={ config }>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
