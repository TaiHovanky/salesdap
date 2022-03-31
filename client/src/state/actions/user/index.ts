export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (user: any) => ({
  type: UPDATE_USER,
  payload: user
});