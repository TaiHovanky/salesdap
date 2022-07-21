import { combineReducers } from 'redux';
import { documentReducer } from './document';
import { stepProgressReducer } from './step-progress';
import { userReducer } from './user';
import { emailTemplateReducer } from './email-template';
import { alertReducer } from './alert';
import { loadingReducer } from './loading';
import { userSearchReducer } from './user-search';

export const rootReducer = combineReducers({
  stepProgress: stepProgressReducer,
  document: documentReducer,
  user: userReducer,
  emailTemplate: emailTemplateReducer,
  alert: alertReducer,
  loading: loadingReducer,
  userSearch: userSearchReducer
});