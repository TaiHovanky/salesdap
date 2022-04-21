export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const SELECT_DOCUMENT = 'SELECT_DOCUMENT';
export const CHANGE_COMPARISON_COLUMN = 'CHANGE_COMPARISON_COLUMN';
export const CHANGE_RESULT_COLUMNS = 'CHANGE_RESULT_COLUMNS';
export const PIN_FILE_SUCCESS = 'PIN_FILE_SUCCESS';
export const SET_FILE_SOURCE = 'SET_FILE_SOURCE';
export const SET_COMPARISON_COLUMNS_ERROR = 'SET_COMPARISON_COLUMNS_ERROR';
export const SET_VISIBLE_COLUMNS = 'SET_VISIBLE_COLUMNS';

export const uploadDocumentSuccess = (duplicatesData: any) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  payload: duplicatesData
});

export const selectDocument = (
  document: any,
  index: number,
  name: string,
  columns: Array<string>
) => {
  return {
    type: SELECT_DOCUMENT,
    payload: document,
    index,
    name,
    columns
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
  let payload = '';
  if (!value || !value.length) {
    payload = 'Required';
  } else if (value.length > 3) {
    payload = 'Can only compare 3 columns in spreadsheet';
  }
  return {
    type: SET_COMPARISON_COLUMNS_ERROR,
    payload,
    index
  }
}

export const setVisibleColumns = (columns: Array<string>, index: number) => ({
  type: SET_VISIBLE_COLUMNS,
  payload: columns,
  index
});