import { SHOW_ERROR, HIDE_ERROR, SHOW_SUCCESS, HIDE_SUCCESS } from '../../actions/alert';
import { CHANGE_STEP } from '../../actions/step-progress';

export interface AlertState {
  isOpen: boolean;
  alertType: any;
  message: string;
};

const initialState = {
  isOpen: false,
  alertType: '',
  message: ''
}

export const alertReducer = (state: AlertState = initialState, action: any) => {
  switch(action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        isOpen: true,
        alertType: 'error',
        message: action.payload
      };
    case HIDE_ERROR:
    case CHANGE_STEP:
      return {
        ...state,
        isOpen: false,
        alertType: '',
        message: ''
      };
    case SHOW_SUCCESS:
      return {
        ...state,
        isOpen: true,
        alertType: 'success',
        message: action.payload
      };
    case HIDE_SUCCESS:
      return {
        ...state,
        isOpen: false,
        alertType: '',
        message: ''
      };
    default:
      return state;
  }
}