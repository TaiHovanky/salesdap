export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const SELECT_DOCUMENT = 'SELECT_DOCUMENT';
export const CHANGE_COMPARISON_COLUMN = 'CHANGE_COMPARISON_COLUMN';
export const CHANGE_RESULT_COLUMNS = 'CHANGE_RESULT_COLUMNS';
export const PIN_FILE_SUCCESS = 'PIN_FILE_SUCCESS';
export const SET_FILE_SOURCE = 'SET_FILE_SOURCE';
export const SET_FILE_STRUCTURE = 'SET_FILE_STRUCTURE';
export const SET_COMPARISON_COLUMNS_ERROR = 'SET_COMPARISON_COLUMNS_ERROR';
export const SET_ALL_COLUMNS = 'SET_ALL_COLUMNS';
export const CHANGE_UNFORMATTED_DATA = 'CHANGE_UNFORMATTED_DATA';
export const CHANGE_PARTNER_NAME = 'CHANGE_PARTNER_NAME';
export const CHANGE_PARTNER_COMPANY = 'CHANGE_PARTNER_COMPANY';
export const SELECT_PINNED_FILE = 'SELECT_PINNED_FILE';

// Constants for file structure
export const UNFORMATTED_DATA = 'UNFORMATTED_DATA';
export const FORMATTED_DATA = 'FORMATTED_DATA';

export const uploadDocumentSuccess = (duplicatesData: any) => ({
  type: UPLOAD_DOCUMENT_SUCCESS,
  payload: duplicatesData
});

export const selectDocument = (
  document: any,
  index: number,
  name: string,
  eventFile: any
) => {
  return {
    type: SELECT_DOCUMENT,
    payload: document,
    index,
    name,
    columnChooserGridData: document.length > 2 ?
      document.slice(0, 2) :
      document,
    fileBlob: eventFile
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

export const setFileStructure = (index: number, value: string) => ({
  type: SET_FILE_STRUCTURE,
  index,
  payload: value
});

export const changeUnformattedData = (index: number, value: string) => ({
  type: CHANGE_UNFORMATTED_DATA,
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

export const changePartnerName = (value: string) => ({
  type: CHANGE_PARTNER_NAME,
  payload: value
});

export const changePartnerCompany = (value: string) => ({
  type: CHANGE_PARTNER_COMPANY,
  payload: value
});

export const selectPinnedFile = (value: string) => ({
  type: SELECT_PINNED_FILE,
  payload: value
});