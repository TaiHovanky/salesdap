import { SET_IS_LOADING } from '../../actions/loading';

export interface LoadingState {
  isLoading: boolean;
};

const initialState = {
  isLoading: false
}

export const loadingReducer = (state: LoadingState = initialState, action: any) => {
  switch(action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}