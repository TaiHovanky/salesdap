import { UPDATE_EMAIL_TEMPLATE } from '../../actions/email-template';

const EMAIL_DEFAULT_TEXT = `[insert name],

Thanks for sending over your account list.

Attached you’ll find a list that maps both our account teams to one another. 

Regards,

[insert your signature]
`;

const initialState = {
  template: EMAIL_DEFAULT_TEXT
};

export const emailTemplateReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case UPDATE_EMAIL_TEMPLATE:
      return { ...state, template: action.payload };
    default:
      return state;
  }
}