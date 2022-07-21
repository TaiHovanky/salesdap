import { UPDATE_SEARCH_RESULTS } from "../../actions/user-search";

export interface UserSearchState {
  users: Array<any>;
}

export const initialUserSearchState = {
  users: []
}

export const userSearchReducer = (state: UserSearchState = initialUserSearchState, action: any) => {
  switch(action.type) {
    case UPDATE_SEARCH_RESULTS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}