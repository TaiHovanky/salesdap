import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography
} from '@mui/material';
import DataGrid, { Column } from 'devextreme-react/data-grid';

const structuredData = [
  { 'Account Name': 'Pepsi Co.', Website: 'pepsi.com', 'Account Manager': 'Thomas Henry', DUNS: 123453 },
  { 'Account Name': 'Tropicana', Website: 'tropicana.com', 'Account Manager': 'Jennifer Shaw', DUNS: 345234 },
  { 'Account Name': 'Gatorade', Website: 'gatorade.com', 'Account Manager': 'Kim Yi', DUNS: 645345 }
];

const unstructuredData = [
  'Pepsi Co.',
  'Tropicana',
  'Gatorade'
];

interface Props {
  isHelpModalOpen: boolean;
  handleOpenHelpModal: any;
}

const FileStructureHelpModal = ({ isHelpModalOpen, handleOpenHelpModal }: Props) => {
  return (
    <>
      <Dialog
        open={isHelpModalOpen}
        onClose={handleOpenHelpModal}
      >
        <DialogTitle>Structured vs. Unstructured Data</DialogTitle>
        <DialogContent dividers={true}>
        <DialogContentText>Structured data example:</DialogContentText>
        <DataGrid
          id="structuredGridContainer"
          dataSource={structuredData}
          showColumnLines={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          height="100%"
        />
        <Typography variant="body2">Note that "structured" here is referring to the presence of defined column
        names.</Typography>
        <DialogContentText sx={{ marginTop: '1.5rem' }}>Unstructured data example:</DialogContentText>
        <DataGrid 
          id="unstructuredGridContainer"
          dataSource={unstructuredData}
          showColumnLines={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          height="100%"
        >
          <Column caption="" calculateCellValue={(data: any) => data} />
        </DataGrid>
        <Typography variant="body2">Note that "unstructured" here is referring to the lack of defined column
        names. If you're uploading an unstructured file, only copy/paste 1 column that you think would lead to the most
        precise match when mapped to a column from the other file.</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FileStructureHelpModal;