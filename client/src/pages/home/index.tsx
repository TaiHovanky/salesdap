import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { uploadDocument } from '../../state/actions/upload-document';
import Stepper from '../../components/stepper';

const Home = ({ dispatch, loading, document, hasErrors, stepProgress}: any) => {
  useEffect(() => {
    dispatch(uploadDocument());
  }, [dispatch]);
  
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