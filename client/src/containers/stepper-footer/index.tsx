import React from 'react';
import StepperFooter from '../../components/stepper-footer';
import { connect } from 'react-redux';
import { changeStep } from '../../state/actions/step-progress';

interface Props {
  steps: Array<string>;
  activeStep: number;
  changeStep: any;
}

const StepperFooterContainer = ({ steps, activeStep, changeStep }: Props) => {
  const handleNext = () => {
    changeStep(activeStep += 1);
  };

  const handleBack = () => {
    changeStep(activeStep -= 1);
  };

  return (
    <StepperFooter
      activeStep={activeStep}
      steps={steps}
      handleNext={handleNext}
      handleBack={handleBack}
    />
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step
});

const mapDispatchToProps = (dispatch: any) => ({
  changeStep: (newStep: number) => dispatch(changeStep(newStep))
});

export default connect(mapStateToProps, mapDispatchToProps)(StepperFooterContainer);