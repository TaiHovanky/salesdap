import { UserState } from "../../reducers/user";

export const SET_USER_FOR_PROFILE_PAGE = 'SET_USER_FOR_PROFILE_PAGE';

export const setUserForProfilePage = (user: UserState) => ({
  type: SET_USER_FOR_PROFILE_PAGE,
  payload: user
});