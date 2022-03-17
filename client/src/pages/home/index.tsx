import React from 'react';
import { connect } from 'react-redux';
import Stepper from '../../components/stepper';
import NavBar from '../../components/nav-bar';


const Home = ({ dispatch, loading, document, hasErrors, stepProgress}: any) => {
  return (
    <>
      <NavBar />
      <Stepper />
    </>
  );
}

const mapStateToProps = (state: any) => ({
  loading: state.document.loading,
  documentData: state.document.documentData,
  hasErrors: state.document.hasErrors,
  stepProgress: state.stepProgress.step
});

export default connect(mapStateToProps)(Home);