import { UPDATE_USER } from '../../actions/user';
import { PIN_FILE_SUCCESS } from '../../actions/document';

export interface UserState {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  pinnedFileName: string;
  pinnedFileId: string;
}

export const initialState: UserState = {
  firstname: '',
  lastname: '',
  email: '',
  company: '',
  pinnedFileName: '',
  pinnedFileId: ''
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        email: action.payload.email,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        company: action.payload.company,
        pinnedFileName: action.payload.pinned_filename,
        pinnedFileId: action.payload.pinned_file_id
      };
    case PIN_FILE_SUCCESS:
      return {
        ...state,
        pinnedFile: action.payload
      };
    default:
      return state;
  }
}