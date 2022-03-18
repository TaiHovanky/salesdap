import {
  UPLOAD_DOCUMENT,
  UPLOAD_DOCUMENT_FAILURE,
  UPLOAD_DOCUMENT_SUCCESS,
  SELECT_DOCUMENT,
  CHANGE_COLUMN,
  VALIDATE_DOCUMENT_TYPE_FAILURE,
  VALIDATE_DOCUMENT_TYPE_SUCCESS
} from '../../actions/document';

interface DocumentState {
  documentData: Array<any>;
  selectedDocument: any;
  column: string;
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
}

const initialState: DocumentState = {
  documentData: [],
  selectedDocument: null,
  column: '',
  loading: false,
  hasError: false,
  errorMessage: ''
};

export const documentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_COLUMN:
      return { ...state, column: action.payload };
    case SELECT_DOCUMENT:
      return { ...state, selectedDocument: action.payload };
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