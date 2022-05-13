import {
  UPLOAD_DOCUMENT_SUCCESS,
  SELECT_DOCUMENT,
  CHANGE_COMPARISON_COLUMN,
  SET_FILE_SOURCE,
  SET_COMPARISON_COLUMNS_ERROR,
  SET_ALL_COLUMNS,
  SET_FILE_STRUCTURE,
  CHANGE_UNSTRUCTURED_DATA
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
  fileSource1: string;
  fileSource2: string;
  comparisonColumns1Error: Array<string>;
  comparisonColumns2Error: Array<string>;
  fileStructure1: string;
  fileStructure2: string;
  unstructuredData1: string;
  unstructuredData2: string;
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
  fileSource1: 'upload',
  fileSource2: 'upload',
  comparisonColumns1Error: [],
  comparisonColumns2Error: [],
  fileStructure1: 'structured',
  fileStructure2: 'structured',
  unstructuredData1: '',
  unstructuredData2: ''
};

export const COMPARISON_COLUMNS_LIMIT: number = 5;
export const MISMATCHED_COLUMNS_ERR: string = 'The number of selected columns for each file needs to match.';
export const TOO_MANY_COLUMNS_ERR: string = `Limit of ${COMPARISON_COLUMNS_LIMIT} columns exceeded.`;
export const REQUIRED_ERR: string = 'At least 1 column is required';

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
        if (payload.length > COMPARISON_COLUMNS_LIMIT) {
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
        if (payload.length > COMPARISON_COLUMNS_LIMIT) {
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
          comparisonColumns1Error: errorMsg1,
          comparisonColumns2Error: errorMsg2
        };
      } else {
        return {
          ...state,
          comparisonColumns2: action.payload,
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
    case SET_FILE_STRUCTURE:
      if (action.index === 0) {
        if (action.payload === 'structured') {
          return {
            ...state,
            fileStructure1: action.payload,
            unstructuredData1: '' 
          };
        } else {
          return {
            ...state,
            fileStructure1: action.payload,
            comparisonColumns1: [],
            selectedDocument1: { ...initialState.selectedDocument1 }
          }
        }
      } else {
        if (action.payload === 'structured') {
          return {
            ...state,
            fileStructure2: action.payload,
            unstructuredData2: '' 
          };
        } else {
          return {
            ...state,
            fileStructure2: action.payload,
            comparisonColumns2: [],
            selectedDocument2: { ...initialState.selectedDocument2 }
          }
        }
      }
    case CHANGE_UNSTRUCTURED_DATA:
      if (action.index === 0) {
        return {
          ...state,
          unstructuredData1: action.payload
        };
      } else {
        return {
          ...state,
          unstructuredData2: action.payload
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