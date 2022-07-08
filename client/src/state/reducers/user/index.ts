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
  pinnedFiles: Array<any>;
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
  freeComparisons: 0,
  pinnedFiles: []
}

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_USER:
      const {
        email,
        firstname,
        lastname,
        company,
        pinnedFiles,
        active_subscription,
        subscription_type,
        free_comparisons
      } = action.payload;
      return {
        ...state,
        email: email || state.email,
        firstname: firstname || state.firstname,
        lastname: lastname || state.lastname,
        company: company || state.company,
        activeSubscription: active_subscription || state.activeSubscription,
        subscriptionType: subscription_type || state.subscriptionType,
        freeComparisons: free_comparisons || state.freeComparisons,
        pinnedFiles: pinnedFiles || state.pinnedFiles,
      };
    case PIN_FILE_SUCCESS:
      const newPinnedFile = action.payload;
      const pinnedFileIndex = state.pinnedFiles.findIndex((file) => file.pinned_file_id === newPinnedFile.pinned_file_id);
      let newPinnedFiles = [...state.pinnedFiles];
      if (pinnedFileIndex > -1) {
        newPinnedFiles.splice(pinnedFileIndex, 1, newPinnedFile);
      } else {
        newPinnedFiles.push(newPinnedFile);
      }
      return {
        ...state,
        pinnedFiles: newPinnedFiles
      };
    default:
      return state;
  }
}