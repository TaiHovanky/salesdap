import { SET_USER_FOR_PROFILE_PAGE } from "../../actions/profile";
import { UserState, initialState } from "../user";

interface ProfileState {
  userProfile: UserState;
};

const initialProfileState: ProfileState = {
  userProfile: initialState
};

export const profileReducer = (state: ProfileState = initialProfileState, action: any) => {
  switch(action.type) {
    case SET_USER_FOR_PROFILE_PAGE:
      return { userProfile: action.payload };
    default:
      return state;
  }
}