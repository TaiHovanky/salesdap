import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import UploadDocumentForm from '../../components/upload-document-form';
import { DocumentState } from '../../state/reducers/document';
import { uploadDocumentSuccess, setAllColumns, changeComparisonColumn } from '../../state/actions/document';
import { changeStep } from '../../state/actions/step-progress';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { updateComparisonColumns } from '../../utils/update-comparison-columns';
import { getAccessToken } from '../../utils/access-token.utils';

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
  /**
   * When the user selects a column (by clicking a checkbox next to the column name in the data grid
   * or using the autocomplete), this function updates the array of column names
   * @param col Column in the selected file. Is represented in the DataGrid and
   * can be selected by clicking the checkbox next to the column name
   * @param index Number that indicates which file is the user selecting columns for
   */
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

  /**
   * Puts the selected file and column name into a FormData instance,
   * sends it to the server, and then changes to the next step where
   * the duplicates will be displayed
   */
  const handleUploadAndCompare = () => {
    const {
      selectedDocument1,
      selectedDocument2,
      comparisonColumns1,
      comparisonColumns2,
      fileStructure1,
      fileStructure2,
      unformattedData1,
      unformattedData2
    } = document;
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

    formData.append('comparisonColumns1', comparisonColumns1.join());
    formData.append('comparisonColumns2', comparisonColumns2.join());
    formData.append('fileStructure1', fileStructure1);
    formData.append('fileStructure2', fileStructure2);
    formData.append('unformattedData1', unformattedData1);
    formData.append('unformattedData2', unformattedData2);

    axios.post('http://localhost:3001/api/v1/uploadfile', formData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
      .then((res: any) => {
        hideError();
        uploadDocumentSuccess(res.data);
        setIsLoading(false);
        changeStep(activeStep += 1);
      })
      .catch((err: any) => {
        console.log('err', err);
        setIsLoading(false);
        showError('File upload and comparison failed.');
        setTimeout(() => {
          hideError();
        }, 5000)
      });
  };

  return (
    <UploadDocumentForm
      document={document}
      setAllColumns={setAllColumns}
      handleColumnClick={handleColumnClick}
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
  setAllColumns: (columns: Array<string>, index: number) => dispatch(setAllColumns(columns, index)),
  changeComparisonColumn: (newValue: Array<string>, index: number) => dispatch(changeComparisonColumn(newValue, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocumentFormContainer);