import { combineReducers } from 'redux';
import { documentReducer } from './document';
import { stepProgressReducer } from './step-progress';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  stepProgress: stepProgressReducer,
  document: documentReducer,
  user: userReducer
});