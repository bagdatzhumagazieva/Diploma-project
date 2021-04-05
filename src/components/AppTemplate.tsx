import React from 'react';
import { Provider } from 'react-redux';
import { initStore } from 'src/store';
import MainRouting from 'src/routers/MainRouting';

function App() {

  return (
    <React.Suspense fallback="Loading">
      <Provider store={initStore()}>
          <MainRouting/>
      </Provider>
    </React.Suspense>
  );
}

export default App;
