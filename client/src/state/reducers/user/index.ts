import { UPDATE_USER } from '../../actions/user';
import { PIN_FILE_SUCCESS } from '../../actions/document';

export const FREE = 'FREE';
export const FREE_DESCRIPTION = 'Free: Sign up now to be able to compare 10 lists';
export const PREMIUM = 'PREMIUM';
export const PREMIUM_DESCRIPTION = 'Premium: You can compare an unlimited amount of lists per month';
export const FREE_COMPARISONS_LIMIT: number = 3;

export interface UserState {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  pinnedFileName: string;
  pinnedFileId: string;
  activeSubscription: boolean;
  subscriptionType: string;
  freeComparisons: number;
}

export const initialState: UserState = {
  firstname: '',
  lastname: '',
  email: '',
  company: '',
  pinnedFileName: '',
  pinnedFileId: '',
  activeSubscription: false,
  subscriptionType: '',
  freeComparisons: 0
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        email: action.payload.email || state.email,
        firstname: action.payload.firstname || state.firstname,
        lastname: action.payload.lastname || state.lastname,
        company: action.payload.company || state.company,
        pinnedFileName: action.payload.pinned_filename || state.pinnedFileName,
        pinnedFileId: action.payload.pinned_file_id || state.pinnedFileId,
        activeSubscription: action.payload.active_subscription || state.activeSubscription,
        subscriptionType: action.payload.subscription_type || state.subscriptionType,
        freeComparisons: action.payload.free_comparisons || state.freeComparisons
      };
    case PIN_FILE_SUCCESS:
      return {
        ...state,
        pinnedFileName: action.payload.pinned_filename,
        pinnedFileId: action.payload.pinned_file_id
      };
    default:
      return state;
  }
}