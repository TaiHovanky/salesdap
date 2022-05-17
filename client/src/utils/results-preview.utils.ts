import { SelectedDocument } from '../state/reducers/document';

export const createDocumentSampleRows = (
  selectedDocument: SelectedDocument,
  fileStructure: string,
  unstructuredData: string
) => {
  let docSampleData: Array<any>;
  if (fileStructure === 'structured') {
    if (selectedDocument.data.length && selectedDocument.data.length > 10) {
      docSampleData = selectedDocument.data.slice(0, 10);
    } else {
      docSampleData =  selectedDocument.data;
    }
  } else {
    if (unstructuredData.length && unstructuredData.length > 10) {
      docSampleData = unstructuredData.split('\n').slice(0, 10);
    } else {
      docSampleData =  unstructuredData.split('\n');
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
  if (fileStructure === 'structured') {
    columns = columns.concat([...comparisonColumns]);
  } else if (fileStructure === 'unstructured') {
    columns.push(`Unstructured Data ${documentNumber}`);
  }
  return columns;
}
