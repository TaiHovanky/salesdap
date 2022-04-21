import React from 'react';
import { connect } from 'react-redux';
import FileSelectionField from '../../components/file-selection-field';
import { selectDocument } from '../../state/actions/document';
import { showError, hideError } from '../../state/actions/alert';
import { setIsLoading } from '../../state/actions/loading';
import { checkIsValidFileType } from '../../utils/validate-file-type';
import { createJSONFromSpreadsheet } from '../../utils/spreadsheet.utils';

interface Props {
  selectedDocument: any;
  showError: any;
  hideError: any;
  setIsLoading: any;
  selectDocument: any;
  index: number;
}

const FileSelectionFieldContainer = ({
  selectedDocument,
  showError,
  hideError,
  setIsLoading,
  selectDocument,
  index
}: Props) => {

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
      const columns: Array<string> = wsDataObj && wsDataObj.length ?
        Array.from(Object.keys(wsDataObj[0])) : [];
      selectDocument(wsDataObj, index, document.name, columns);
      setIsLoading(false);
    } else {
      showError('Invalid file type. Only .xls, .xlsx, or .csv files can be processed.');
    }
  };

  return (
    <FileSelectionField
      selectedDocument={selectedDocument}
      validateAndSetFileSelection={validateAndSetFileSelection}
      index={index}
    />
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  showError: (message: string) => dispatch(showError(message)),
  hideError: () => dispatch(hideError()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  selectDocument: (wsDataObj: any, index: number, filename: string, columns: Array<string>) => dispatch(selectDocument(wsDataObj, index, filename, columns)),
});

export default connect(null, mapDispatchToProps)(FileSelectionFieldContainer);