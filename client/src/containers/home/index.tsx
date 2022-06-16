import React from 'react';
import Home from '../../pages/home';
import { connect } from 'react-redux';
import { changeStep } from '../../state/actions/step-progress';
import { UserState } from '../../state/reducers/user';

interface Props {
  activeStep: number;
  changeStep: any;
  user: UserState;
}

const HomeContainer = ({ activeStep, changeStep, user }: Props) => {
  return (
    <Home activeStep={activeStep} changeStep={changeStep} user={user} />
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  changeStep: (newStep: number) => dispatch(changeStep(newStep))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);