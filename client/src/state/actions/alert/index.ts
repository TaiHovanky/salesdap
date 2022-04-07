export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const SHOW_SUCCESS = 'SHOW_SUCCESS';
export const HIDE_SUCCESS = 'HIDE_SUCCESS';

export const showError = (errorMessage: string) => ({
  type: SHOW_ERROR,
  payload: errorMessage
});

export const hideError = () => ({
  type: HIDE_ERROR
});

export const showSucess = (successMessage: string) => ({
  type: SHOW_SUCCESS,
  payload: successMessage
});

export const hideSuccess = () => ({
  type: HIDE_ERROR
});