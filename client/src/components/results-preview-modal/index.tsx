import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { DocumentState } from '../../state/reducers/document';
import { createDocumentSampleRows, updatePreviewColumnsForDocument } from '../../utils/results-preview.utils';

interface Props {
  isPreviewModalOpen: boolean;
  handleClosePreview: any;
  document: DocumentState;
}

const ResultsPreviewModal = ({
  isPreviewModalOpen,
  handleClosePreview,
  document
}: Props) => {
  const [resultsData, setResultsData] = useState<Array<any>>([]);
  const {
    selectedDocument1,
    selectedDocument2,
    comparisonColumns1,
    comparisonColumns2,
    fileStructure1,
    fileStructure2,
    unstructuredData1,
    unstructuredData2
  } = document;

  useEffect(() => {
    const doc1SampleData: Array<any> = createDocumentSampleRows(selectedDocument1, fileStructure1, unstructuredData1);
    const doc2SampleData: Array<any> = createDocumentSampleRows(selectedDocument2, fileStructure2, unstructuredData2);

    let columns: Array<any> = [];
    columns = updatePreviewColumnsForDocument(fileStructure1, comparisonColumns1, 1);
    columns = [...columns, ...updatePreviewColumnsForDocument(fileStructure2, comparisonColumns2, 2)];

    const updatedResultsData = [];
    for (let i = 0; i < 10; i++) {
      
      const row = columns.reduce((rowObj: any, col: string, index: number) => {
        if (
          fileStructure1 === 'structured' &&
          comparisonColumns1.indexOf(col) > -1 &&
          index < comparisonColumns1.length
        ) {
          return { ...rowObj, [col]: doc1SampleData[i][col] || null };
        } else if (fileStructure1 === 'unstructured' && index === 0) {
          return { ...rowObj, 'Unstructured Data 1': doc1SampleData[i] || null }
        } else if (
          fileStructure2 === 'structured' &&
          comparisonColumns2.indexOf(col) > -1 &&
          ((fileStructure1 === 'structured' && index >= comparisonColumns1.length) ||
          (fileStructure1 === 'unstructured' && index > 0))
        ) {
          return { ...rowObj, [col]: doc2SampleData[i][col] || null };
        } else if (fileStructure2 === 'unstructured') {
          return { ...rowObj, 'Unstructured Data 2': doc2SampleData[i] || null }
        }
        return { ...rowObj };
      }, {});
      updatedResultsData.push(row);
    }
    console.log('results list', updatedResultsData);
    setResultsData(updatedResultsData);
  }, [selectedDocument1, selectedDocument2, comparisonColumns1, comparisonColumns2])

  return (
    <Dialog
      open={isPreviewModalOpen}
      onClose={handleClosePreview}
    >
      <DialogTitle>Results Preview</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText sx={{ marginBottom: '1rem' }}>Here's what your results will look like based on the columns you've chosen:</DialogContentText>
        <DataGrid
          id="structuredGridContainer"
          dataSource={resultsData}
          showColumnLines={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          height="100%"
        />
      </DialogContent>
    </Dialog>
  );
}

export default ResultsPreviewModal;