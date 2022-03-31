import { UPDATE_USER } from '../../actions/user';

export interface UserState {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
}

const initialState: UserState = {
  firstname: '',
  lastname: '',
  email: '',
  company: ''
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_USER:
      console.log('update ser reducer');
      return {
        ...state,
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        company: action.payload.company,
      }
    default:
      return state;
  }
}