export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const SELECT_DOCUMENT = 'SELECT_DOCUMENT';
export const CHANGE_COMPARISON_COLUMN = 'CHANGE_COMPARISON_COLUMN';
export const CHANGE_RESULT_COLUMNS = 'CHANGE_RESULT_COLUMNS';
export const PIN_FILE_SUCCESS = 'PIN_FILE_SUCCESS';
export const SET_FILE_SOURCE = 'SET_FILE_SOURCE';
export const SET_COMPARISON_COLUMNS_ERROR = 'SET_COMPARISON_COLUMNS_ERROR';
export const SET_ALL_COLUMNS = 'SET_ALL_COLUMNS';

export const uploadDocumentSuccess = (duplicatesData: any) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  payload: duplicatesData
});

export const selectDocument = (
  document: any,
  index: number,
  name: string
) => {
  return {
    type: SELECT_DOCUMENT,
    payload: document,
    index,
    name,
    columnChooserGridData: document.length > 2 ?
      document.slice(0, 2) :
      document
  };
}

export const changeComparisonColumn = (value: Array<string>, index: number) => ({
  type: CHANGE_COMPARISON_COLUMN,
  payload: value,
  index
});

export const pinFileSuccess = (fileMetadata: any) => ({
  type: PIN_FILE_SUCCESS,
  payload: fileMetadata
});

export const setFileSource = (index: number, value: string) => ({
  type: SET_FILE_SOURCE,
  index,
  payload: value
});

export const setComparisonColumnsError = (value: Array<string>, index: number) => {
  return {
    type: SET_COMPARISON_COLUMNS_ERROR,
    payload: value,
    index
  }
}

export const setAllColumns = (columns: Array<string>, index: number) => ({
  type: SET_ALL_COLUMNS,
  payload: columns,
  index
});