import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import DataGrid, { Column } from 'devextreme-react/data-grid';

interface Props {
  isPreviewModalOpen: boolean;
  selectedDocument1: any;
  selectedDocument2: any;
  comparisonColumns1: Array<string>;
  comparisonColumns2: Array<string>;
}

const ResultsPreviewModal = ({
  isPreviewModalOpen,
  selectedDocument1,
  selectedDocument2,
  comparisonColumns1,
  comparisonColumns2
}: Props) => {
  // const [resultsData, setResultsData] = useState([]);

  const doc1SampleData: Array<any> = selectedDocument1.data.length && selectedDocument1.data.length > 10 ?
    selectedDocument1.data.slice(0, 10) :
    selectedDocument1.data;
  const doc2SampleData: Array<any> = selectedDocument2.data.length && selectedDocument2.data.length > 10 ?
    selectedDocument2.data.slice(0, 10) :
    selectedDocument2.data;
  const columns = [...comparisonColumns1, ...comparisonColumns2];

  const resultsData = [];
  for (let i = 0; i < 10; i++) {
    
    const row = columns.reduce((rowObj: any, col: string) => {
      if (comparisonColumns1.indexOf(col) > -1) {
        return { ...rowObj, [col]: item[col] || null };
      }
      return { ...rowObj };
    }, { });
    resultsData.push(row);
  }

  return (
    <Dialog
      open={isPreviewModalOpen}
      // onClose={handleOpenHelpModal}
    >
      <DialogTitle>Results Preview</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText>Here's what your results will look like based on the columns you've chosen:</DialogContentText>
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