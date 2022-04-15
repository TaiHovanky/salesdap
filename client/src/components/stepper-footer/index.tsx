import React from 'react';
import {
  Box,
  Button,
  Paper
} from '@mui/material';
import { connect } from 'react-redux';

import { changeStep } from '../../state/actions/step-progress';

interface StepperFooterProps {
  steps: Array<string>;
  activeStep: number;
  dispatch: any;
}

const StepperFooter = ({ steps, activeStep, dispatch }: StepperFooterProps) => {
  const handleNext = () => {
    dispatch(changeStep(activeStep += 1));
  };

  const handleBack = () => {
    dispatch(changeStep(activeStep -= 1));
  };

  return (
    <Paper sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1060,
      display: 'flex',
      flexDirection: 'row',
      padding: '0.75rem'
    }} elevation={3}>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button
        disabled={activeStep === steps.length - 1}
        onClick={handleNext}
      >
        Next
      </Button>
    </Paper>
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step
});

export default connect(mapStateToProps)(StepperFooter);