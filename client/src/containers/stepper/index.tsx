import React from 'react';
import Stepper from '../../components/stepper';
import { connect } from 'react-redux';
import { changeStep } from '../../state/actions/step-progress';

interface Props {
  activeStep: number;
  changeStep: any;
}

const StepperContainer = ({ activeStep, changeStep }: Props) => {
  return (
    <Stepper activeStep={activeStep} changeStep={changeStep} />
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step
});

const mapDispatchToProps = (dispatch: any) => ({
  changeStep: (newStep: number) => dispatch(changeStep(newStep))
});

export default connect(mapStateToProps, mapDispatchToProps)(StepperContainer);