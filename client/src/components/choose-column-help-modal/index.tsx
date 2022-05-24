import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography
} from '@mui/material';

interface Props {
  isHelpModalOpen: boolean;
  handleOpenHelpModal: any;
}

const ChooseColumnHelpModal = ({ isHelpModalOpen, handleOpenHelpModal }: Props) => {
  return (
    <>
      <Dialog
        open={isHelpModalOpen}
        onClose={handleOpenHelpModal}
      >
        <DialogTitle>Choose columns to compare/match with the other file's columns</DialogTitle>
        <DialogContent dividers={true}>
        <Typography variant="body2">Columns from file A that will be compared with columns
          from file B to determine a matching account. Limit: 5 columns. Hint: the more unique a column's value is
          to a company, the better (DUNS number, company website, etc.).</Typography>
        <DialogContentText sx={{ marginTop: '1.5rem' }}>Using the text input:</DialogContentText>
        <Typography variant="body2">Type in a column that you're trying to find. If it appears in the
          results drop down, click it to select the column. The checkbox next to its label will appear checked.
          Multiple checkboxes can be selected.</Typography>
        <DialogContentText sx={{ marginTop: '1.5rem' }}>Using the data grid:</DialogContentText>
        <Typography variant="body2">The grid below shows 2 example rows from the uploaded file. Columns for
          comparison can also be selected by clicking the column headers.</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChooseColumnHelpModal;