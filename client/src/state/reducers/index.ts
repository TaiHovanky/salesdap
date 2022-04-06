import { combineReducers } from 'redux';
import { documentReducer } from './document';
import { stepProgressReducer } from './step-progress';
import { userReducer } from './user';
import { emailTemplateReducer } from './email-template';

export const rootReducer = combineReducers({
  stepProgress: stepProgressReducer,
  document: documentReducer,
  user: userReducer,
  emailTemplate: emailTemplateReducer
});