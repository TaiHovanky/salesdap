import {
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_FAILURE,
  UPLOAD_DOCUMENT_SUCCESS,
  SELECT_DOCUMENT,
  CHANGE_COMPARISON_COLUMN,
  CHANGE_RESULT_COLUMNS,
  VALIDATE_DOCUMENT_TYPE_FAILURE,
  VALIDATE_DOCUMENT_TYPE_SUCCESS,
  SET_FILE_SOURCE
} from '../../actions/document';

interface SelectedDocument {
  data: Array<any>;
  name: string;
}

interface DocumentState {
  documentData: Array<any>;
  selectedDocument1: SelectedDocument;
  selectedDocument2: SelectedDocument;
  comparisonColumn1: string;
  comparisonColumn2: string;
  resultColumns1: string;
  resultColumns2: string;
  isFilePinned1: boolean;
  isFilePinned2: boolean;
  fileSource1: string;
  fileSource2: string;
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
}

const initialState: DocumentState = {
  documentData: [],
  selectedDocument1: { data: [], name: '' },
  selectedDocument2: { data: [], name: '' },
  comparisonColumn1: '',
  comparisonColumn2: '',
  resultColumns1: '',
  resultColumns2: '',
  fileSource1: 'upload',
  fileSource2: 'upload',
  isFilePinned1: false,
  isFilePinned2: false,
  loading: false,
  hasError: false,
  errorMessage: ''
};

export const documentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_COMPARISON_COLUMN:
      if (action.index === 0) {
        return { ...state, comparisonColumn1: action.payload };
      } else {
        return { ...state, comparisonColumn2: action.payload}
      }
    case CHANGE_RESULT_COLUMNS:
      if (action.index === 0) {
        return { ...state, resultColumns1: action.payload };
      } else {
        return { ...state, resultColumns2: action.payload}
      }
    case SELECT_DOCUMENT:
      if (action.index === 0) {
        return {
          ...state,
          selectedDocument1: {
            data: action.payload,
            name: action.name
          }
        };
      } else {
        return {
          ...state,
          selectedDocument2: {
            data: action.payload,
            name: action.name
          }
        };
      }
    case VALIDATE_DOCUMENT_TYPE_FAILURE:
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload
      };
    case VALIDATE_DOCUMENT_TYPE_SUCCESS:
      return {
        ...state,
        hasError: false,
        errorMessage: ''
      };
    case SET_FILE_SOURCE:
      if (action.index === 0) {
        return {
          ...state,
          fileSource1: action.payload
        };
      } else {
        return {
          ...state,
          fileSource2: action.payload
        };
      }
    case UPLOAD_DOCUMENT:
      return { ...state, loading: true };
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        hasError: false,
        documentData: action.payload
      };
    case UPLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}