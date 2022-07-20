import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography
} from '@mui/material';
import DataGrid, { Column } from 'devextreme-react/data-grid';

const formattedData = [
  { 'Account Name': 'Pepsi Co.', Website: 'pepsi.com', 'Account Manager': 'Thomas Henry', DUNS: 123453 },
  { 'Account Name': 'Tropicana', Website: 'tropicana.com', 'Account Manager': 'Jennifer Shaw', DUNS: 345234 },
  { 'Account Name': 'Gatorade', Website: 'gatorade.com', 'Account Manager': 'Kim Yi', DUNS: 645345 }
];

const unformattedData = [
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
        <DialogTitle>File Data vs. Copy/pasted Data</DialogTitle>
        <DialogContent dividers={true}>
        <Typography variant="body2">File data comes from an Excel spreadsheet, a CSV, or a Google Sheet. There are defined columns, and each row represents an account.
        names.</Typography>
        <Typography variant="body2" sx={{ marginTop: '1rem' }}>Formatted data example:</Typography>
        <DataGrid
          id="formattedGridContainer"
          dataSource={formattedData}
          showColumnLines={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          height="100%"
        />
        <Typography variant="body2" sx={{ marginTop: '1.5rem' }}>With a copy/pasted list of account data, there is a lack of defined column
        names. If your data is being copied from a file (a non-Excel file, or a list with no defined columns), only copy/paste 1 column that you think would lead to the most
        precise match when mapped to a column from the other file.</Typography>
        <Typography variant="body2" sx={{ marginTop: '1rem' }}>Unformatted data example:</Typography>
        <DataGrid 
          id="unformattedGridContainer"
          dataSource={unformattedData}
          showColumnLines={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          height="100%"
        >
          <Column caption="" calculateCellValue={(data: any) => data} />
        </DataGrid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FileStructureHelpModal;