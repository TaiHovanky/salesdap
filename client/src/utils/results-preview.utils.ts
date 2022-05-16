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

// export const createResultPreviewRow = () => {
//   if (
//     fileStructure1 === 'structured' &&
//     comparisonColumns1.indexOf(col) > -1 &&
//     index < comparisonColumns1.length
//   ) {
//     return { ...rowObj, [col]: doc1SampleData[i][col] || null };
//   } else if (fileStructure1 === 'unstructured' && index === 0) {
//     return { ...rowObj, 'Unstructured Data 1': doc1SampleData[i] || null }
//   } else if (
//     fileStructure2 === 'structured' &&
//     comparisonColumns2.indexOf(col) > -1 &&
//     ((fileStructure1 === 'structured' && index >= comparisonColumns1.length) ||
//     (fileStructure1 === 'unstructured' && index > 0))
//   ) {
//     return { ...rowObj, [col]: doc2SampleData[i][col] || null };
//   } else if (fileStructure2 === 'unstructured') {
//     return { ...rowObj, 'Unstructured Data 2': doc2SampleData[i] || null }
//   }
//   return { ...rowObj };
// }