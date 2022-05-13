import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { DocumentState } from '../../state/reducers/document';

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
    let doc1SampleData: Array<any>;
    if (fileStructure1 === 'structured') {
      if (selectedDocument1.data.length && selectedDocument1.data.length > 10) {
        doc1SampleData = selectedDocument1.data.slice(0, 10);
      } else {
        doc1SampleData =  selectedDocument1.data;
      }
    } else {
      if (unstructuredData1.length && unstructuredData1.length > 10) {
        doc1SampleData = unstructuredData1.split('\n').slice(0, 10);
      } else {
        doc1SampleData =  unstructuredData1.split('\n');
      }
    }
    let doc2SampleData: Array<any>;
    if (fileStructure2 === 'structured') {
      if (selectedDocument2.data.length && selectedDocument2.data.length > 10) {
        doc2SampleData = selectedDocument2.data.slice(0, 10);
      } else {
        doc2SampleData =  selectedDocument2.data;
      }
    } else {
      if (unstructuredData2.length && unstructuredData2.length > 10) {
        doc2SampleData = unstructuredData2.split('\n').slice(0, 10);
      } else {
        doc2SampleData =  unstructuredData2.split('\n');
      }
    }

    let columns: Array<any> = [];
    if (fileStructure1 === 'structured') {
      columns = columns.concat([...comparisonColumns1]);
    } else if (fileStructure1 === 'unstructured') {
      columns.push('Unstructured Data 1');
    }
    if (fileStructure2 === 'structured') {
      columns = columns.concat([...comparisonColumns2]);
    } else if (fileStructure2 === 'unstructured') {
      columns.push('Unstructured Data 2');
    }

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