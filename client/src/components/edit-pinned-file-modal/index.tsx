import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Chip, Fab, Grid } from '@mui/material';
import { Attachment, Upload } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import PinnedFileChipContainer from '../../containers/pinned-file-chip';

interface Props {
  isOpen: boolean;
  handleClose: any;
  handleFilePinning: any;
  validateFileSelection: any;
  existingPinnedFile: any;
}

const EditPinnedFileModal = ({
  isOpen,
  handleClose,
  handleFilePinning,
  validateFileSelection,
  existingPinnedFile
}: Props) => {
  const [pinnedFileLabel, setPinnedFileLabel] = useState('');
  const [pinnedFileName, setPinnedFileName] = useState();
  const [pinnedFile, setPinnedFile] = useState();
  const inputFileRef: any = useRef(null);
  const history = useHistory();
  
  useEffect(() => {
    if (existingPinnedFile) {
      const { file_label, file_name } = existingPinnedFile;
      setPinnedFileLabel(file_label);
      setPinnedFileName(file_name);
    }
  }, [existingPinnedFile])

  const handleFileSelectionBtnClick = () => {
    /*Collecting node-element and performing click*/
    if (inputFileRef&& inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handlePinnedFileLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinnedFileLabel(e.target.value);
  }

  const handleFileSelection = (event: any) => {
    validateFileSelection(event);
    const document: any = event && event.target && event.target.files ?
      event.target.files[0] :
      null;
    if (document && document.name) {
      setPinnedFileName(document.name);
      setPinnedFile(document);
    }
  }

  const savePinnedFile = () => {
    handleFilePinning(
      pinnedFile,
      pinnedFileLabel,
      existingPinnedFile ? existingPinnedFile.pinned_file_id : null);
    handleClose();
  }

  const saveAndLeave = () => {
    savePinnedFile();
    history.push('/home');
  }

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Add a Pinned File</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: '2rem' }}>
            To save time on future account list comparisons, pin a file that you will regularly be
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
              label="Pinned file label"
              name="pinnedFileLabel"
              variant="standard"
              sx={{ width: '100%', marginBottom: '2rem' }}
              onChange={handlePinnedFileLabel}
              value={pinnedFileLabel}
            />
            <PinnedFileChipContainer
              fileName={pinnedFileName}
              fileId={existingPinnedFile ? existingPinnedFile.pinned_file_id : ''}
              existingPinnedFile={existingPinnedFile}
            />
            <Fab
              variant="extended"
              aria-label="add"
              sx={{ minWidth: '208px', marginTop: '2rem' }}
              onClick={handleFileSelectionBtnClick}
            >
              <Upload sx={{ mr: 1 }} />
              Select Pinned File
            </Fab>
            <input
              type="file"
              ref={inputFileRef}
              className="file-input"
              onChange={handleFileSelection}
              name="sales_file"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={savePinnedFile}>Save</Button>
          <Button onClick={saveAndLeave}>Save & Leave Profile</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditPinnedFileModal;