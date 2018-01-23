import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage';
import Raven from "raven-js";
import createRavenMiddleware from "raven-for-redux";

import Themes from './components/Themes';
import reducer from './reducers';
import migrate from './migrate';

const RAVEN_DSN = 'https://5672ee5945634745ad84d4a8470d08bc@sentry.io/153480';
Raven.config(RAVEN_DSN).install();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  persistState(undefined, {
    key: 'loginThemes'
  }),
  applyMiddleware(
      createRavenMiddleware(Raven),
  ),
);

let store = createStore(reducer, enhancer);

render(
  <Provider store={store}>
    <Themes />
  </Provider>,
  document.getElementById('themes')
);

// Inject migration tool
migrate();
