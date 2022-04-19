import React from 'react';
import Home from '../../pages/home';
import { connect } from 'react-redux';
import { changeStep } from '../../state/actions/step-progress';

interface Props {
  activeStep: number;
  changeStep: any;
}

const HomeContainer = ({ activeStep, changeStep }: Props) => {
  return (
    <Home activeStep={activeStep} changeStep={changeStep} />
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step
});

const mapDispatchToProps = (dispatch: any) => ({
  changeStep: (newStep: number) => dispatch(changeStep(newStep))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);