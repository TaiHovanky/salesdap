import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Fab, TextField, Typography, CircularProgress, Backdrop } from '@mui/material';
import { connect } from 'react-redux';
import { uploadDocument, uploadDocumentSuccess, uploadDocumentFailure } from '../../state/actions/upload-document';

const UploadDocumentForm = ({ dispatch, loading, handleNext }: any) => {
  const [queryColumn, setQueryColumn] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<any>();

  const handleColumnFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryColumn(e.target.value);
  }

  const handleFileSelection = (event: any) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleUpload = () => {
    const formData = new FormData();
    if (selectedFile && selectedFile.name) {
      formData.append(
        "sales_file",
        selectedFile,
        selectedFile.name
      );
      formData.append('columnName', queryColumn);

      dispatch(uploadDocument());
      axios.post('http://localhost:3001/api/v1/uploadfile', formData)
        .then((res) => {
          dispatch(uploadDocumentSuccess(res.data));
          handleNext();
        })
        .catch((err) => dispatch(uploadDocumentFailure()));
    }
  };

  return (
    <>
      {!loading ? <Box sx={{ m: 1 }}>
        <div>
          <Typography sx={{ mt: 2, mb: 1 }}>
            What column do you want to find duplicate values for?
          </Typography>
          <TextField
            id="standard-basic"
            label="Column Name"
            variant="standard"
            onChange={handleColumnFieldChange}
            value={queryColumn}
          />
        </div>
        <div>
          <input type="file" onChange={handleFileSelection} name="sales_file" />
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            onClick={handleUpload}
          >
            <UploadIcon sx={{ mr: 1 }} />
            Upload
          </Fab>
        </div>
      </Box> :
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      }
    </>
  );
}

const mapStateToProps = (state: any) => ({
  loading: state.document.loading
});

export default connect(mapStateToProps)(UploadDocumentForm);