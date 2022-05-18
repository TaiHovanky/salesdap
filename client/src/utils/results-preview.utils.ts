import { FORMATTED_DATA, UNFORMATTED_DATA } from '../state/actions/document';
import { SelectedDocument } from '../state/reducers/document';

export const createDocumentSampleRows = (
  selectedDocument: SelectedDocument,
  fileStructure: string,
  unformattedData: string
) => {
  let docSampleData: Array<any>;
  if (fileStructure === FORMATTED_DATA) {
    if (selectedDocument.data.length && selectedDocument.data.length > 10) {
      docSampleData = selectedDocument.data.slice(0, 10);
    } else {
      docSampleData =  selectedDocument.data;
    }
  } else {
    if (unformattedData.length && unformattedData.length > 10) {
      docSampleData = unformattedData.split('\n').slice(0, 10);
    } else {
      docSampleData =  unformattedData.split('\n');
    }
  }
  return docSampleData;
}

export const updateColumnsForDocument = (
  fileStructure: string,
  comparisonColumns: Array<string>,
  documentNumber: number
) => {
  let columns: Array<string> = [];
  if (fileStructure === FORMATTED_DATA) {
    columns = columns.concat([...comparisonColumns]);
  } else if (fileStructure === UNFORMATTED_DATA) {
    columns.push(`Unformatted Data ${documentNumber}`);
  }
  return columns;
}
