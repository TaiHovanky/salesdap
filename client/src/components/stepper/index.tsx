import * as React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Container
} from '@mui/material';

import UploadDocumentFormContainer from '../../containers/upload-document-form';
import DuplicatesTableContainer from '../../containers/duplicates-table';
import EmailTemplateContainer from '../../containers/email-template';
import StepperFooterContainer from '../../containers/stepper-footer';

const steps = ['Upload document', 'View duplicates', 'Email customers'];

interface Props {
  activeStep: number;
}

const HorizontalLinearStepper = ({ activeStep }: Props) => {
  return (
    <>
      <Box sx={{ width: '100%', height: '100%', marginTop: '3.5vh' }}>
        <Stepper nonLinear={true} activeStep={activeStep} sx={{ marginLeft: '25%', marginRight: '25%'}}>
          {steps.map((label: string) => {
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
        {activeStep === 0 &&
          <React.Fragment>
            <Container sx={{ height: '100%' }}>
              <UploadDocumentFormContainer />
            </Container>
          </React.Fragment>
        }
        {activeStep === 1 &&
          <React.Fragment>
            <Container sx={{ height: '100%', width: '100%', maxWidth: '100%' }} maxWidth={false}>
              <DuplicatesTableContainer />
            </Container>
          </React.Fragment>
        }
        {activeStep === 2 &&
          <React.Fragment>
            <Container sx={{ height: '100%', width: '100%' }}>
              <EmailTemplateContainer />
            </Container>
          </React.Fragment>
        }
      </Box>
      <StepperFooterContainer steps={steps} />
    </>
  );
}

export default HorizontalLinearStepper;