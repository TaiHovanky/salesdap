import { validateRequiredTextField } from './validate-required-text-field';

export const validateEmailField = (value: string): boolean => {
  let isEmailValid: boolean = validateRequiredTextField(value);
  const mailformat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (!value.match(mailformat)) {
    isEmailValid = false;
  }
  return isEmailValid;
};