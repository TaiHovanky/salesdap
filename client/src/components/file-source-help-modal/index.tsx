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

const FileSourceHelpModal = ({ isHelpModalOpen, handleOpenHelpModal }: Props) => {
  return (
    <>
      <Dialog
        open={isHelpModalOpen}
        onClose={handleOpenHelpModal}
      >
        <DialogTitle>Upload a file from your computer or use a pinned file</DialogTitle>
        <DialogContent dividers={true}>
        <DialogContentText sx={{ marginTop: '1.5rem' }}>Upload a file from your computer:</DialogContentText>
        <Typography variant="body2">Click the Select File button and search for a file.</Typography>
        <DialogContentText sx={{ marginTop: '1.5rem' }}>Use a pinned file:</DialogContentText>
        <Typography variant="body2">In your profile page, you can save a file as a "pinned file". This would be used when you
          have a file that you will regularly be compared to partners' files. Typically, it would be the file that contains all of
          your accounts.</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FileSourceHelpModal;