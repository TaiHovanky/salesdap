import * as React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Container
} from '@mui/material';
import { connect } from 'react-redux';

import UploadDocumentForm from '../upload-document-form';
import DuplicatesTable from '../duplicates-table';
import { changeStep } from '../../state/actions/step-progress';

const steps = ['Upload document', 'View duplicates'];

const HorizontalLinearStepper = ({ dispatch, activeStep }: any) => {
  // const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch(changeStep(activeStep += 1));
  };

  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
    dispatch(changeStep(activeStep -= 1));
  };

  const handleReset = () => {
    // setActiveStep(0);
    dispatch(changeStep(0));
  };

  return (
    <Box sx={{ width: '100%', height: '83.5vh', marginTop: '3.5vh' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <React.Fragment>
          <DuplicatesTable />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Container>
            <UploadDocumentForm handleNext={handleNext} />
          </Container>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step
});

export default connect(mapStateToProps)(HorizontalLinearStepper);