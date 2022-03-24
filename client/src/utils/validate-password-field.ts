import { validateRequiredTextField } from './validate-required-text-field';


export const validatePasswordField = (value: string): boolean => {
  let isPasswordValid: boolean = validateRequiredTextField(value);;
  if (value.length < 8) {
    isPasswordValid = false;
  }
  return isPasswordValid;
}