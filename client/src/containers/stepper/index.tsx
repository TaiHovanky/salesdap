import React from 'react';
import { connect } from 'react-redux';
import Stepper from '../../components/stepper';

interface Props {
  activeStep: number;
}

const StepperContainer = ({ activeStep }: Props) => {
  return (
    <Stepper activeStep={activeStep} />
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step
});

export default connect(mapStateToProps)(StepperContainer);