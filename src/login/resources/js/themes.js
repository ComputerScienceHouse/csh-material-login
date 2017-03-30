import React from 'react';
import { render } from 'react-dom';
import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';

import Themes from './components/Themes';
import reducer from './reducers';

const enhancer = compose(
  persistState(undefined, {
    key: 'loginThemes'
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let store = createStore(reducer, enhancer);

render(
  <Provider store={store}>
    <Themes />
  </Provider>,
  document.getElementById('themes')
);
