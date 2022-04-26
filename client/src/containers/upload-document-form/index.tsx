import React from 'react';
import UploadDocumentForm from '../../components/upload-document-form';
import { connect } from 'react-redux';
import { DocumentState } from '../../state/reducers/document';
import { uploadDocumentSuccess, setAllColumns, changeComparisonColumn } from '../../state/actions/document';
import { changeStep } from '../../state/actions/step-progress';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { updateComparisonColumns } from '../../utils/update-comparison-columns';

interface Props {
  activeStep: number;
  document: DocumentState;
  showError: any;
  hideError: any;
  uploadDocumentSuccess: any;
  setIsLoading: any;
  changeStep: any;
  setAllColumns: any;
  changeComparisonColumn: any;
}

const UploadDocumentFormContainer = ({
  activeStep,
  document,
  showError,
  hideError,
  uploadDocumentSuccess,
  setIsLoading,
  changeStep,
  setAllColumns,
  changeComparisonColumn
}: Props) => {
  const handleColumnClick = (col: any, index: number) => {
    const { comparisonColumns1, comparisonColumns2 } = document;
    let newValue: Array<string> = [];
    if (index === 0) {
      newValue = updateComparisonColumns(comparisonColumns1, col);
    } else {
      newValue = updateComparisonColumns(comparisonColumns2, col);
    }

    changeComparisonColumn(newValue, index);
  };

  return (
    <UploadDocumentForm
      document={document}
      showError={showError}
      hideError={hideError}
      uploadDocumentSuccess={uploadDocumentSuccess}
      setIsLoading={setIsLoading}
      changeStep={changeStep}
      activeStep={activeStep}
      setAllColumns={setAllColumns}
      handleColumnClick={handleColumnClick}
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
  setAllColumns: (columns: Array<string>, index: number) => dispatch(setAllColumns(columns, index)),
  changeComparisonColumn: (newValue: Array<string>, index: number) => dispatch(changeComparisonColumn(newValue, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocumentFormContainer);