import {
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_FAILURE,
  UPLOAD_DOCUMENT_SUCCESS,
  SELECT_DOCUMENT,
  CHANGE_COMPARISON_COLUMN,
  CHANGE_RESULT_COLUMNS,
  VALIDATE_DOCUMENT_TYPE_FAILURE,
  VALIDATE_DOCUMENT_TYPE_SUCCESS
} from '../../actions/document';

interface DocumentState {
  documentData: Array<any>;
  selectedDocument1: any;
  selectedDocument2: any;
  comparisonColumn1: string;
  comparisonColumn2: string;
  resultColumns1: string;
  resultColumns2: string;
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
}

const initialState: DocumentState = {
  documentData: [],
  selectedDocument1: null,
  selectedDocument2: null,
  comparisonColumn1: '',
  comparisonColumn2: '',
  resultColumns1: '',
  resultColumns2: '',
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
        return { ...state, selectedDocument1: action.payload };
      } else {
        return { ...state, selectedDocument2: action.payload}
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
    case UPLOAD_DOCUMENT:
      return { ...state, loading: true };
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
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