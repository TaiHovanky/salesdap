import { UPLOAD_DOCUMENT, UPLOAD_DOCUMENT_FAILURE, UPLOAD_DOCUMENT_SUCCESS } from "../../actions/upload-document";

interface DocumentState {
  documentData: Array<any>;
  loading: boolean;
  hasErrors: boolean;
}

const initialState: DocumentState = {
  documentData: [],
  loading: false,
  hasErrors: false
};

export const documentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT:
      return { ...state, loading: true };
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        documentData: action.payload
      };
    case UPLOAD_DOCUMENT_FAILURE:
      return { ...state, loading: false, hasErrors: true }
    default:
      return state;
  }
}