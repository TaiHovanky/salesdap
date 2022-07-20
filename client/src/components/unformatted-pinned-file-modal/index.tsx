import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';

interface Props {
  isOpen: boolean;
  handleClose: any;
  handleFilePinning: any;
}

const UnformattedPinnedFileModal = ({
  isOpen,
  handleClose,
  handleFilePinning
}: Props) => {
  const [pinnedFileLabel, setPinnedFileLabel] = useState('');
  const [columnNameForValues, setColumnNameForValues] = useState('');
  // const [pinnedFile, setPinnedFile] = useState();

  const handlePinnedFileLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinnedFileLabel(e.target.value);
  }

  const handleColumnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnNameForValues(e.target.value);
  }

  const savePinnedFile = () => {
    handleFilePinning(pinnedFileLabel, columnNameForValues);
    handleClose();
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Pin unformatted list</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: '2rem' }}>
            To save time on future account list comparisons, save this list as a pinned file that you will regularly be
            comparing with your partner reps' lists.
          </DialogContentText>
          <Grid
            item
            container
            xs={12}
            p={1}
            direction="column"
            justifyContent="start"
            alignItems="start"
          >
            <TextField
              id="standard-basic"
              label="Label your pinned file"
              name="pinnedFileLabel"
              variant="standard"
              sx={{ width: '100%', marginBottom: '2rem' }}
              onChange={handlePinnedFileLabel}
              value={pinnedFileLabel}
            />
            <TextField
              id="standard-basic"
              label="Column header for copy pasted data (i.e. what is this data? Website, DUNS, or something else?)"
              name="columnName"
              variant="standard"
              sx={{ width: '100%', marginBottom: '2rem' }}
              onChange={handleColumnNameChange}
              value={columnNameForValues}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={savePinnedFile}>Save</Button>
          {/* <Button onClick={() => {}}>Save & Leave Profile</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UnformattedPinnedFileModal;