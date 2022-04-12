import * as React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Container
} from '@mui/material';
import { connect } from 'react-redux';

import UploadDocumentForm from '../upload-document-form';
import DuplicatesTable from '../duplicates-table';
import EmailTemplate from '../email-template';
import StepperFooter from '../stepper-footer';

const steps = ['Upload document', 'View duplicates', 'Email customers'];

interface Props {
  activeStep: number;
}

const HorizontalLinearStepper = ({ activeStep }: Props) => {
  return (
    <>
      <Box sx={{ width: '100%', height: '85vh', marginTop: '3.5vh' }}>
        <Stepper activeStep={activeStep} sx={{ marginLeft: '25%', marginRight: '25%'}}>
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
              <UploadDocumentForm />
            </Container>
          </React.Fragment>
        }
        {activeStep === 1 &&
          <React.Fragment>
            <Container sx={{ height: '100%', width: '100%', maxWidth: '100%' }} maxWidth={false}>
              <DuplicatesTable />
            </Container>
          </React.Fragment>
        }
        {activeStep === 2 &&
          <React.Fragment>
            <Container sx={{ height: '100%', width: '100%' }}>
              <EmailTemplate />
            </Container>
          </React.Fragment>
        }
      </Box>
      <StepperFooter steps={steps} />
    </>
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step
});

export default connect(mapStateToProps)(HorizontalLinearStepper);