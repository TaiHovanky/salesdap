import { CHANGE_STEP } from '../../actions/step-progress';

interface StepProgressState {
  step: number;
}

const initialState: StepProgressState = {
  step: 0
}

export const stepProgressReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_STEP:
      return {
        ...state,
        step: action.payload
      }
    default:
      return state;
  }
}