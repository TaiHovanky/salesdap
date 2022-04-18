import React from 'react';
import {
  Box,
  Button,
  Paper
} from '@mui/material';

interface StepperFooterProps {
  steps: Array<string>;
  handleNext: any;
  handleBack: any;
  activeStep: number;
}

const StepperFooter = ({
  steps,
  activeStep,
  handleBack,
  handleNext
}: StepperFooterProps) => {
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

export default StepperFooter;