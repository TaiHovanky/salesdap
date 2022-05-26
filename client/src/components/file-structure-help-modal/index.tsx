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
        <DialogTitle>Formatted vs. Unformatted Data</DialogTitle>
        <DialogContent dividers={true}>
        <DialogContentText>Formatted data example:</DialogContentText>
        <DataGrid
          id="formattedGridContainer"
          dataSource={formattedData}
          showColumnLines={true}
          columnAutoWidth={true}
          showBorders={true}
          width="100%"
          height="100%"
        />
        <Typography variant="body2">Note that "formatted" here is referring to the presence of defined column
        names.</Typography>
        <DialogContentText sx={{ marginTop: '1.5rem' }}>Unformatted data example:</DialogContentText>
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
        <Typography variant="body2">Note that "unformatted" here is referring to the lack of defined column
        names. If you're uploading an unformatted file, only copy/paste 1 column that you think would lead to the most
        precise match when mapped to a column from the other file.</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FileStructureHelpModal;