import {
  UPLOAD_DOCUMENT_SUCCESS,
  SELECT_DOCUMENT,
  CHANGE_COMPARISON_COLUMN,
  CHANGE_RESULT_COLUMNS,
  SET_FILE_SOURCE,
  SET_COMPARISON_COLUMNS_ERROR,
  SET_ALL_COLUMNS
} from '../../actions/document';

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
  comparisonColumns1Error: string;
  comparisonColumns2Error: string;
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
      let errorMsg: Array<string> = [];
      let comparisonColumns1Error = state.comparisonColumns1Error;
      let comparisonColumns2Error = state.comparisonColumns2Error;
      const { payload } = action;
      if (!payload || !payload.length) {
        errorMsg.push('Required');
      } else if (payload.length > 3) {
        errorMsg.push('Can only compare 3 columns in spreadsheet.');
      }
      if (action.index === 0) {
        if (payload.length && state.comparisonColumns2.length && payload.length !== state.comparisonColumns2.length) {
          errorMsg.push(' Number of comparison columns need to match.');
        } else if (payload.length && state.comparisonColumns2.length && payload.length === state.comparisonColumns2.length) {
          errorMsg = errorMsg.slice(0, 1);
          const cc2ErrorArr = state.comparisonColumns2Error.split('. ');
          const matchErrorIndex = cc2ErrorArr.indexOf(' Number of comparison columns need to match.');
          comparisonColumns2Error = cc2ErrorArr.slice(0, matchErrorIndex).join('. ');
          console.log('comparison errors', comparisonColumns2Error, errorMsg);
        }
        return { ...state, comparisonColumns1Error: errorMsg.join('. '), comparisonColumns2Error: comparisonColumns2Error };
      } else {
        if (payload.length && state.comparisonColumns1.length && payload.length !== state.comparisonColumns1.length) {
          errorMsg.push(' Number of comparison columns need to match.');
        } else if (payload.length && state.comparisonColumns2.length && payload.length === state.comparisonColumns2.length) {
          errorMsg = errorMsg.slice(0, 1);
          const cc1ErrorArr = state.comparisonColumns1Error.split('. ');
          const matchErrorIndex = cc1ErrorArr.indexOf(' Number of comparison columns need to match.');
          comparisonColumns1Error = cc1ErrorArr.slice(0, matchErrorIndex).join('. ');
        }
        return { ...state, comparisonColumns2Error: errorMsg.join('. '), comparisonColumns1Error: comparisonColumns1Error };
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