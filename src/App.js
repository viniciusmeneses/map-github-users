import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import Panel from './components/Panel';
import Map from './components/Map';

const App = () => (
  <Provider store={store}>
    <Map />
    <Panel />
  </Provider>
);

export default App;
