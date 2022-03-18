import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Upload, AttachFile } from '@mui/icons-material';
import {
  Fab,
  TextField,
  CircularProgress,
  Backdrop,
  Grid,
} from '@mui/material';
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
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100%' }}
    >
      {!loading ? <>
        <Grid
          item
          container
          xs={4}
          p={0}
          sx={{ height: '100%' }}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            id="standard-basic"
            label="What column do you want duplicate values for?"
            variant="standard"
            sx={{ width: '100%' }}
            onChange={handleColumnFieldChange}
            value={queryColumn}
          />
          <Fab
            variant="extended"
            aria-label="add"
            sx={{ marginTop: '2rem' }}
            onClick={handleUpload}
          >
            <AttachFile sx={{ mr: 1 }} />
            <label>
              Select File
              <input type="file" className="file-input" onChange={handleFileSelection} name="sales_file" />
            </label>
          </Fab>
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            sx={{ marginTop: '2rem' }}
            onClick={handleUpload}
          >
            <Upload sx={{ mr: 1 }} />
            Upload
          </Fab>
        </Grid>
      </> :
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      }
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({
  loading: state.document.loading
});

export default connect(mapStateToProps)(UploadDocumentForm);