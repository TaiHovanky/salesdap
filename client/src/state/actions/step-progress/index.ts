export const CHANGE_STEP = 'CHANGE_STEP';

export const changeStep = (newStep: number) => ({
  type: CHANGE_STEP,
  payload: newStep
});