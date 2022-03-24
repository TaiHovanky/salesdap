import { validatePasswordField } from './validate-password-field';

export const validatePasswordConfirmation = (value: string, passwordFieldVal: string): boolean => {
  let isPasswordConfirmationValid: boolean = validatePasswordField(value);;
  if (value !== passwordFieldVal) {
    isPasswordConfirmationValid = false;
  }
  return isPasswordConfirmationValid;
}