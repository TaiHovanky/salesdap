import React from 'react';
import UploadDocumentForm from '../../components/upload-document-form';
import { connect } from 'react-redux';
import { DocumentState } from '../../state/reducers/document';
import { uploadDocumentSuccess } from '../../state/actions/document';
import { changeStep } from '../../state/actions/step-progress';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';

interface Props {
  activeStep: number;
  document: DocumentState;
  showError: any;
  hideError: any;
  uploadDocumentSuccess: any;
  setIsLoading: any;
  changeStep: any;
}

const UploadDocumentFormContainer = ({
  activeStep,
  document,
  showError,
  hideError,
  uploadDocumentSuccess,
  setIsLoading,
  changeStep,
}: Props) => {
  return (
    <UploadDocumentForm
      document={document}
      showError={showError}
      hideError={hideError}
      uploadDocumentSuccess={uploadDocumentSuccess}
      setIsLoading={setIsLoading}
      changeStep={changeStep}
      activeStep={activeStep}
    />
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  document: state.document
});

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  uploadDocumentSuccess: (data: any) => dispatch(uploadDocumentSuccess(data)),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  changeStep: (activeStep: number) => dispatch(changeStep(activeStep)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocumentFormContainer);