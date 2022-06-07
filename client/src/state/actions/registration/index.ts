import { RegistrationState } from "../../reducers/registration";

export const UPDATE_REGISTRATION_USER = 'UPDATE_REGISTRATION_USER';

export const updateRegistrationUser = (values: RegistrationState) => {
  return {
    type: UPDATE_REGISTRATION_USER,
    payload: values
  };
}