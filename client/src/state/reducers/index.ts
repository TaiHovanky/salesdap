import { combineReducers } from 'redux';
import { documentReducer } from './document';
import { stepProgressReducer } from './step-progress';

export const rootReducer = combineReducers({
  stepProgress: stepProgressReducer,
  document: documentReducer
});