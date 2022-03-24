export const validateRequiredTextField = (value: string): boolean => {
  let isValidField: boolean = true;
  if (!value) {
    isValidField = false;
  }
  return isValidField;
}
