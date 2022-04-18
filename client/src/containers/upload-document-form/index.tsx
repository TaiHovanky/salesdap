import React from 'react';
import axios from 'axios';
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
  const {
    selectedDocument1,
    selectedDocument2,
    comparisonColumns1,
    comparisonColumns2,
    resultColumns1,
    resultColumns2
  } = document;
  /**
   * Puts the selected file and column name into a FormData instance,
   * sends it to the server, and then changes to the next step where
   * the duplicates will be displayed
   */
   const handleUploadAndCompare = () => {
    setIsLoading(true);
    const formData = new FormData();
    if (selectedDocument1 && selectedDocument1.name) {
      const docBlob1 = new Blob([JSON.stringify(selectedDocument1.data)], { type: 'application/json' });
      formData.append("sales_file1", docBlob1, selectedDocument1.name);
    }

    if (selectedDocument2 && selectedDocument2.name) {
      const docBlob2 = new Blob([JSON.stringify(selectedDocument2.data)], { type: 'application/json' });
      formData.append("sales_file2", docBlob2, selectedDocument2.name);
    }
    // let resultColumns1;
    // let resultColumns2;
    // if (dataGrid1 && dataGrid1.current && dataGrid1.current.instance) {
    //   resultColumns1 = dataGrid1.current.instance.getVisibleColumns().map((col: any) => col.dataField);
    // }
    // if (dataGrid1 && dataGrid2.current && dataGrid2.current.instance) {
    //   resultColumns2 = dataGrid2.current.instance.getVisibleColumns().map((col: any) => col.dataField);
    // }
    formData.append('comparisonColumns1', comparisonColumns1.join());
    formData.append('comparisonColumns2', comparisonColumns2.join());
    formData.append('resultColumns1', resultColumns1.join());
    formData.append('resultColumns2', resultColumns2.join());

    axios.post('http://localhost:3001/api/v1/uploadfile', formData)
      .then((res: any) => {
        hideError();
        uploadDocumentSuccess(res.data);
        setIsLoading(false);
        changeStep(activeStep += 1);
      })
      .catch((err: any) => {
        setIsLoading(false);
        showError(`File upload and comparison failed. ${err}`);
      });
  };

  return (
    <UploadDocumentForm
      document={document}
      handleUploadAndCompare={handleUploadAndCompare}
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