import React from 'react';
import { connect } from 'react-redux';
import Stepper from '../../components/stepper';

const Home = ({ dispatch, loading, document, hasErrors, stepProgress}: any) => {
  return (
    <>
      <h3>salesdap</h3>
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