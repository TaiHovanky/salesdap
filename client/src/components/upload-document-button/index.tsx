import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import UploadIcon from '@mui/icons-material/Upload';

const UploadDocumentButton = () => {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" color="primary" aria-label="add">
        <UploadIcon sx={{ mr: 1 }} />
        Upload
      </Fab>
    </Box>
  );
}

export default UploadDocumentButton;