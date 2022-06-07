import { UPDATE_REGISTRATION_USER } from '../../actions/registration';

export interface RegistrationState {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  password: string;
  subscriptionType: string;
}

export const initialState: RegistrationState = {
  firstname: '',
  lastname: '',
  email: '',
  company: '',
  password: '',
  subscriptionType: ''
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_REGISTRATION_USER:
      return {
        ...state,
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        company: action.payload.company,
        password: action.payload.password,
        subscriptionType: action.payload.subscriptionType
      };
    default:
      return state;
  }
}