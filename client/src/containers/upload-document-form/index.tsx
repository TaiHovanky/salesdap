import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import UploadDocumentForm from '../../components/upload-document-form';
import { DocumentState } from '../../state/reducers/document';
import {
  changeComparisonColumn,
  uploadDocumentSuccess,
  selectDocument,
  setFileSource
} from '../../state/actions/document';
import { changeStep } from '../../state/actions/step-progress';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { checkIsValidFileType } from '../../utils/validate-file-type';
import {
  createJSONFromSpreadsheet,
  createFileLink,
  getPinnedFile
} from '../../utils/spreadsheet.utils';
import { UserState } from '../../state/reducers/user';

interface Props {
  activeStep: number;
  document: DocumentState;
  user: UserState;
  changeComparisonColumns: any;
  showError: any;
  hideError: any;
  uploadDocumentSuccess: any;
  setIsLoading: any;
  changeStep: any;
  selectDocument: any;
  setFileSource: any;
}

const UploadDocumentFormContainer = ({
  activeStep,
  document,
  user,
  changeComparisonColumns,
  showError,
  hideError,
  uploadDocumentSuccess,
  setIsLoading,
  changeStep,
  selectDocument,
  setFileSource,
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

    axios.post('/api/v1/uploadfile', formData)
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

  /**
   * When the user selects a document, validate the file type
   * @param event 
   */
   const validateAndSetFileSelection = async (event: any, index: number) => {
    setIsLoading(true);
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    const isValidDocType: boolean = document && document.name ?
      checkIsValidFileType(document.name) : false;

    if (isValidDocType) {
      hideError();
      const wsDataObj: Array<any> = await createJSONFromSpreadsheet(document);
      selectDocument(wsDataObj, index, document.name);
      setIsLoading(false);
    } else {
      showError('Invalid file type. Only .xls, .xlsx, or .csv files can be processed.');
    }
  };

  const handleFileTypeChange = async (event: any, index: number) => {
    setFileSource(index, event.target.value);
    if (event.target.value === 'pinned') {
      setIsLoading(true);
      try {
        const pinnedFileBlob = await getPinnedFile(user.pinnedFile);
        const wsDataObj: Array<any> = await createJSONFromSpreadsheet(pinnedFileBlob.data);
        selectDocument(wsDataObj, index, user.pinnedFile);
        setIsLoading(false);
      } catch (err: any) {
        console.log('err', err);
        showError('Failed to get pinned file for user.');
        setIsLoading(false);
      }
    } else {
      selectDocument([], index, '');
    }
  }

  return (
    <UploadDocumentForm
      document={document}
      handleUploadAndCompare={handleUploadAndCompare}
      validateAndSetFileSelection={validateAndSetFileSelection}
      handleFileTypeChange={handleFileTypeChange}
      user={user}
    />
  );
}

const mapStateToProps = (state: any) => ({
  activeStep: state.stepProgress.step,
  document: state.document,
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  changeComparisonColumns: (newValue: Array<string>, index: number) => dispatch(changeComparisonColumn(newValue, index)),
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  uploadDocumentSuccess: (data: any) => dispatch(uploadDocumentSuccess(data)),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  changeStep: (activeStep: number) => dispatch(changeStep(activeStep)),
  selectDocument: (wsDataObj: any, index: number, filename: string) => dispatch(selectDocument(wsDataObj, index, filename)),
  setFileSource: (index: number, value: any) => dispatch(setFileSource(index, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocumentFormContainer);