import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import RoutesContainer from './containers/routes';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './state/reducers';
import 'devextreme/dist/css/dx.material.blue.light.css';
import './index.css';
import './App.css';

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <RoutesContainer />
  </Provider>,
  document.getElementById('root')
);
