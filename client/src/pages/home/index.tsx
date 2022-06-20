import React, { useEffect } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Container,
} from '@mui/material';

import UploadDocumentFormContainer from '../../containers/upload-document-form';
import DuplicatesTableContainer from '../../containers/duplicates-table';
import EmailTemplateContainer from '../../containers/email-template';
import StepperFooterContainer from '../../containers/stepper-footer';

const steps: Array<string> = ['Upload document', 'View results', 'Email customers'];

interface Props {
  activeStep: number;
  changeStep: any;
  user: any;
}

const Home = ({ activeStep, changeStep, user }: Props) => {
  return (
    <>
      <Box sx={{ width: '100%', height: '100%', marginTop: '3.5vh' }}>
        <Stepper nonLinear={true} activeStep={activeStep} sx={{ marginLeft: '25%', marginRight: '25%'}}>
          {steps.map((label: string, index: number) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepButton onClick={() => changeStep(index)} {...labelProps}>{label}</StepButton>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 &&
          <React.Fragment>
            <Container sx={{ height: '100%', paddingBottom: '2rem' }}>
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

export default Home;