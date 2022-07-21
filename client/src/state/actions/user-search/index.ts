export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';

export const updateSearchResults = (users: Array<any>) => ({
  type: UPDATE_SEARCH_RESULTS,
  payload: users
});