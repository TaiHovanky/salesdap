import {
  UPLOAD_DOCUMENT_SUCCESS,
  SELECT_DOCUMENT,
  CHANGE_COMPARISON_COLUMN,
  CHANGE_RESULT_COLUMNS,
  SET_FILE_SOURCE,
  SET_COMPARISON_COLUMNS_ERROR,
  SET_ALL_COLUMNS
} from '../../actions/document';
import { addMessageToErrorList, removeMessageFromErrorList } from '../../../utils/update-comparison-columns';

interface SelectedDocument {
  data: Array<any>;
  name: string;
  allColumns: Array<string>;
  columnChooserGridData: Array<any>;
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
  comparisonColumns1Error: Array<string>;
  comparisonColumns2Error: Array<string>;
}

const initialState: DocumentState = {
  duplicatesData: [],
  selectedDocument1: {
    data: [],
    name: '',
    allColumns: [],
    columnChooserGridData: []
  },
  selectedDocument2: {
    data: [],
    name: '',
    allColumns: [],
    columnChooserGridData: []
  },
  comparisonColumns1: [],
  comparisonColumns2: [],
  resultColumns1: [],
  resultColumns2: [],
  fileSource1: 'upload',
  fileSource2: 'upload',
  comparisonColumns1Error: [],
  comparisonColumns2Error: [],
};

const MISMATCHED_COLUMNS_ERR = 'The number of selected columns for each file needs to match.';
const TOO_MANY_COLUMNS_ERR = 'Limit of 3 columns exceeded.';
const REQUIRED_ERR = 'At least 1 column is required';

export const documentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_COMPARISON_COLUMN:
      const { payload, index } = action;
      let errorMsg1 = [...state.comparisonColumns1Error];
      let errorMsg2 = [...state.comparisonColumns2Error];

      if (
        (index === 0 && !!state.comparisonColumns2.length && payload.length !== state.comparisonColumns2.length) ||
        (index === 1 && !!state.comparisonColumns1.length && payload.length !== state.comparisonColumns1.length)
      ) {
        addMessageToErrorList(errorMsg1, MISMATCHED_COLUMNS_ERR);
        addMessageToErrorList(errorMsg2, MISMATCHED_COLUMNS_ERR);
      } else if (
        (index === 0 && payload.length === state.comparisonColumns2.length) ||
        (index === 1 && payload.length === state.comparisonColumns1.length)
      ) {
        removeMessageFromErrorList(errorMsg1, MISMATCHED_COLUMNS_ERR);
        removeMessageFromErrorList(errorMsg2, MISMATCHED_COLUMNS_ERR);
      }
      if (index === 0) {
        if (payload.length > 3) {
          addMessageToErrorList(errorMsg1, TOO_MANY_COLUMNS_ERR);
        } else {
          removeMessageFromErrorList(errorMsg1, TOO_MANY_COLUMNS_ERR);
        }
        if (payload.length === 0) {
          addMessageToErrorList(errorMsg1, REQUIRED_ERR);
        } else {
          removeMessageFromErrorList(errorMsg1, REQUIRED_ERR);
        }
      } else if (index === 1) {
        if (payload.length > 3) {
          addMessageToErrorList(errorMsg2, TOO_MANY_COLUMNS_ERR);
        } else {
          removeMessageFromErrorList(errorMsg2, TOO_MANY_COLUMNS_ERR);
        }
        if (payload.length === 0) {
          addMessageToErrorList(errorMsg2, REQUIRED_ERR);
        } else {
          removeMessageFromErrorList(errorMsg2, REQUIRED_ERR);
        }
      }

      if (action.index === 0) {
        return {
          ...state,
          comparisonColumns1: action.payload,
          resultColumns1: action.payload,
          comparisonColumns1Error: errorMsg1,
          comparisonColumns2Error: errorMsg2
        };
      } else {
        return {
          ...state,
          comparisonColumns2: action.payload,
          resultColumns2: action.payload,
          comparisonColumns1Error: errorMsg1,
          comparisonColumns2Error: errorMsg2
        };
      }
    case SET_COMPARISON_COLUMNS_ERROR:
      const errorMsg = action.index === 0 ? [...state.comparisonColumns1Error] : [...state.comparisonColumns2Error];
      if (action.payload.length === 0) {
        addMessageToErrorList(errorMsg, REQUIRED_ERR);
      }
      if (action.index === 0) {
        return {
          ...state,
          comparisonColumns1Error: errorMsg
        };
      } else {
        return {
          ...state,
          comparisonColumns2Error: errorMsg
        }
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
            name: action.name,
            columnChooserGridData: action.columnChooserGridData
          }
        };
      } else {
        return {
          ...state,
          selectedDocument2: {
            data: action.payload,
            name: action.name,
            columnChooserGridData: action.columnChooserGridData
          }
        };
      }
    case SET_ALL_COLUMNS:
      if (action.index === 0) {
        return {
          ...state,
          selectedDocument1: {
            ...state.selectedDocument1,
            allColumns: action.payload
          }
        };
      } else {
        return {
          ...state,
          selectedDocument2: {
            ...state.selectedDocument2,
            allColumns: action.payload
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