export const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT';
export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const UPLOAD_DOCUMENT_FAILURE = 'UPLOAD_DOCUMENT_FAILURE';
export const SELECT_DOCUMENT = 'SELECT_DOCUMENT';
export const CHANGE_COMPARISON_COLUMN = 'CHANGE_COMPARISON_COLUMN';
export const CHANGE_RESULT_COLUMNS = 'CHANGE_RESULT_COLUMNS';
export const VALIDATE_DOCUMENT_TYPE_FAILURE = 'VALIDATE_DOCUMENT_TYPE_FAILURE';
export const VALIDATE_DOCUMENT_TYPE_SUCCESS = 'VALIDATE_DOCUMENT_TYPE_SUCCESS';
export const PIN_FILE = 'PIN_FILE';
export const PIN_FILE_FAILURE = 'PIN_FILE_FAILURE';
export const PIN_FILE_SUCCESS = 'PIN_FILE_SUCCESS';
export const SET_FILE_SOURCE = 'SET_FILE_SOURCE';

export const uploadDocument = () => ({
  type: UPLOAD_DOCUMENT
});

export const uploadDocumentSuccess = (documentData: any) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  payload: documentData
});

export const uploadDocumentFailure = (errorMessage: any) => ({
  type: UPLOAD_DOCUMENT_FAILURE,
  payload: errorMessage
});

export const selectDocument = (document: any, index: number) => ({
  type: SELECT_DOCUMENT,
  payload: document,
  index
});

export const changeComparisonColumn = (value: string, index: number) => ({
  type: CHANGE_COMPARISON_COLUMN,
  payload: value,
  index
});

export const changeResultColumns = (value: string, index: number) => ({
  type: CHANGE_RESULT_COLUMNS,
  payload: value,
  index
});

export const validateDocumentTypeFailure = () => ({
  type: VALIDATE_DOCUMENT_TYPE_FAILURE,
  payload: 'Invalid file type. Only .xls, .xlsx, or .csv files can be processed.'
});

export const validateDocumentTypeSuccess = () => ({
  type: VALIDATE_DOCUMENT_TYPE_SUCCESS
});

export const pinFile = (index: number) => ({
  type: PIN_FILE,
  index
});

export const pinFileFailure = () => ({
  type: PIN_FILE_FAILURE,
  payload: 'Failed to pin file'
});

export const pinFileSuccess = (filename: string) => ({
  type: PIN_FILE_SUCCESS,
  payload: filename
});

export const setFileSource = (index: number, value: string) => ({
  type: SET_FILE_SOURCE,
  index,
  payload: value
});