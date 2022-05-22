import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DataGrid from 'devextreme-react/data-grid';
import { DocumentState } from '../../state/reducers/document';
import { createDocumentSampleRows, updateColumnsForDocument } from '../../utils/results-preview.utils';
import { FORMATTED_DATA, UNFORMATTED_DATA } from '../../state/actions/document';

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
    unformattedData1,
    unformattedData2
  } = document;

  useEffect(() => {
    const doc1SampleData: Array<any> = createDocumentSampleRows(selectedDocument1, fileStructure1, unformattedData1);
    const doc2SampleData: Array<any> = createDocumentSampleRows(selectedDocument2, fileStructure2, unformattedData2);

    let columns: Array<any> = [];
    columns = updateColumnsForDocument(fileStructure1, comparisonColumns1, 1);
    columns = [...columns, ...updateColumnsForDocument(fileStructure2, comparisonColumns2, 2)];

    const updatedResultsData = [];
    for (let i = 0; i < 10; i++) {
      
      const row = columns.reduce((rowObj: any, col: string, index: number) => {
        if (
          fileStructure1 === FORMATTED_DATA &&
          comparisonColumns1.indexOf(col) > -1 &&
          index < comparisonColumns1.length
        ) {
          return { ...rowObj, [col]: doc1SampleData[i][col] || null };
        } else if (fileStructure1 === UNFORMATTED_DATA && index === 0) {
          return { ...rowObj, 'Unformatted Data 1': doc1SampleData[i] || null }
        } else if (
          fileStructure2 === FORMATTED_DATA &&
          comparisonColumns2.indexOf(col) > -1 &&
          ((fileStructure1 === FORMATTED_DATA && index >= comparisonColumns1.length) ||
          (fileStructure1 === UNFORMATTED_DATA && index > 0))
        ) {
          return { ...rowObj, [col]: doc2SampleData[i][col] || null };
        } else if (fileStructure2 === UNFORMATTED_DATA) {
          return { ...rowObj, 'Unformatted Data 2': doc2SampleData[i] || null }
        }
        return { ...rowObj };
      }, {});
      updatedResultsData.push(row);
    }

    setResultsData(updatedResultsData);
  }, [selectedDocument1, fileStructure1, unformattedData1, selectedDocument2, fileStructure2, unformattedData2, comparisonColumns1, comparisonColumns2])

  return (
    <Dialog
      open={isPreviewModalOpen}
      onClose={handleClosePreview}
    >
      <DialogTitle>Results Preview</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText sx={{ marginBottom: '1rem' }}>Here's what your results will look like based on the columns you've chosen:</DialogContentText>
        <DataGrid
          id="formattedGridContainer"
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