import React from 'react';
import { Provider } from 'react-redux';
import GithubCorner from 'react-github-corner';

import store from './store';

import Main from './pages/Main';

const App = () => (
  <Provider store={store}>
    <Main />
    <GithubCorner href="https://github.com/viniciusmeneses/map-github-users" />
  </Provider>
);

export default App;
