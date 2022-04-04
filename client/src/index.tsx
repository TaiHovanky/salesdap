import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import 'devextreme/dist/css/dx.light.css';
import Routes from './Routes';
import { rootReducer } from './state/reducers';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
