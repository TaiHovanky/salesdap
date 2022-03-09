import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import UploadIcon from '@mui/icons-material/Upload';

const UploadDocumentButton = () => {
  const [selectedFile, setSelectedFile] = useState<any>();

  const handleFileSelection = (event: any) => {
    console.log('handle file selection', event);
    setSelectedFile(event.target.files[0]);
  }

  const handleUpload = () => {
    console.log('selected file', selectedFile);
    const formData = new FormData();
    if (selectedFile && selectedFile.name) {
      formData.append(
        "myFile",
        selectedFile,
        selectedFile.name
      );

      axios.post('http://localhost:3001/api/v1/uploadfile', formData);
    }

  };

  return (
    <Box sx={{ m: 1 }}>
      <input type="file" onChange={handleFileSelection} />
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        onClick={handleUpload}
      >
        <UploadIcon sx={{ mr: 1 }} />
        Upload
      </Fab>
    </Box>
  );
}

export default UploadDocumentButton;