import { useState, useCallback, ChangeEvent } from 'react';
import { validateEmailField } from '../utils/validate-email-field';
import { validatePasswordConfirmation } from '../utils/validate-password-confirmation';
import { validatePasswordField } from '../utils/validate-password-field';

export interface FormField {
  value: string;
  error: boolean;
  onChange: any;
}

export const useFormField = (initialValue: string = '', fieldType: string): FormField => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>, passwordConfirmationVal?: string) => {
    if (fieldType === 'email') {
      setError(!validateEmailField(event.target.value));
    } else if (fieldType === 'password') {
      setError(!validatePasswordField(event.target.value));
      if (passwordConfirmationVal) {
        setError(!validatePasswordConfirmation(event.target.value, passwordConfirmationVal));
      }
    }
    setValue(event.target.value);
  }, [fieldType]);
  return { value, onChange, error };
}