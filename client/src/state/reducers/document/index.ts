import {
  UPLOAD_DOCUMENT_SUCCESS,
  SELECT_DOCUMENT,
  CHANGE_COMPARISON_COLUMN,
  CHANGE_RESULT_COLUMNS,
  SET_FILE_SOURCE,
  SET_COMPARISON_COLUMNS_ERROR
} from '../../actions/document';

interface SelectedDocument {
  data: Array<any>;
  name: string;
}

export interface DocumentState {
  duplicatesData: Array<any>;
  selectedDocument1: SelectedDocument;
  selectedDocument2: SelectedDocument;
  comparisonColumns1: Array<string>;
  comparisonColumns2: Array<string>;
  resultColumns1: Array<string>;
  resultColumns2: Array<string>;
  fileSource1: string;
  fileSource2: string;
  comparisonColumns1Error: string;
  comparisonColumns2Error: string;
}

const initialState: DocumentState = {
  duplicatesData: [],
  selectedDocument1: { data: [], name: '' },
  selectedDocument2: { data: [], name: '' },
  comparisonColumns1: [],
  comparisonColumns2: [],
  resultColumns1: [],
  resultColumns2: [],
  fileSource1: 'upload',
  fileSource2: 'upload',
  comparisonColumns1Error: '',
  comparisonColumns2Error: '',
};

export const documentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_COMPARISON_COLUMN:
      if (action.index === 0) {
        return {
          ...state,
          comparisonColumns1: action.payload,
          resultColumns1: action.payload,
        };
      } else {
        return {
          ...state,
          comparisonColumns2: action.payload,
          resultColumns2: action.payload,
        };
      }
    case SET_COMPARISON_COLUMNS_ERROR:
      if (action.index === 0) {
        return { ...state, comparisonColumns1Error: action.payload };
      } else {
        return { ...state, comparisonColumns2Error: action.payload}
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
    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        duplicatesData: action.payload
      };
    default:
      return state;
  }
}